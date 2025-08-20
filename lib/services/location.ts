import { LocationData } from "../types/location";
import { CacheManager } from "../utils/cache";

const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour baseline
const FETCH_TIMEOUT_MS = 3500;       // fail fast; both services are usually sub-second

/**
 * Service class for location and geolocation operations
 * Handles visitor location detection and IP-based geolocation with multiple fallback services
 */
export class LocationService {
  private cache = CacheManager.getInstance();
  private loggedOnce = new Set<string>();

  /**
   * Retrieves location information for a given IP address
   * Attempts multiple geolocation services with intelligent fallbacks
   * @param {string} ip - IP address to geolocate (IPv4 or IPv6)
   * @returns {Promise<LocationData>} Location information for the IP
   * @throws {Error} If all geolocation services fail
   * @example
   * const location = await locationService.getLocationByIP('8.8.8.8');
   * console.log(location.city); // "Mountain View"
   */
  async getLocationByIP(ip: string): Promise<LocationData> {
    // Must come from API route headers (x-forwarded-for / x-real-ip)
    const rawIp = (ip || "").trim();
    if (!rawIp) {
      this.warnOnce("no-ip", "No IP provided; using default location");
      return this.getDefaultLocation();
    }

    // Normalize and validate
    const clientIP = this.normalizeIp(rawIp);
    if (!this.isValidIP(clientIP)) {
      this.warnOnce(`bad-ip:${clientIP}`, `Invalid IP format: ${clientIP}; using default location`);
      return this.getDefaultLocation();
    }

    // Private/local checks
    if (this.isLocalOrPrivate(clientIP)) {
      this.logOnce(`local-ip:${clientIP}`);
      return this.getDefaultLocation();
    }

    const cacheKey = `location:${clientIP}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached as LocationData;

    let locationData: LocationData | null = null;

    try {
      // 1) Primary: ipapi.co
      try {
        const res = await this.fetchWithTimeout(`https://ipapi.co/${clientIP}/json/`, FETCH_TIMEOUT_MS);
        if (res.ok) {
          const data = await res.json();
          if (!data.error && data.latitude && data.longitude) {
            locationData = {
              city: data.city || "Unknown City",
              region: data.region || "Unknown Region",
              country: data.country_name || "Unknown Country",
              countryCode: data.country_code || "XX",
              lat: parseFloat(String(data.latitude)),
              long: parseFloat(String(data.longitude)),
              timezone: data.timezone || "UTC",
            };
          } else {
            this.warnOnce(
              `ipapi:${clientIP}`,
              `ipapi.co invalid data for ${clientIP}: ${data?.error || "missing lat/long"}`
            );
          }
        } else {
          this.warnOnce(`ipapi-http:${clientIP}`, `ipapi.co HTTP ${res.status} for ${clientIP}`);
        }
      } catch (err) {
        this.warnOnce(`ipapi-ex:${clientIP}`, `ipapi.co fetch failed for ${clientIP}: ${String(err)}`);
      }

      // 2) Fallback: ip-api.com
      if (!locationData) {
        try {
          const res = await this.fetchWithTimeout(`https://ip-api.com/json/${clientIP}`, FETCH_TIMEOUT_MS);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "success" && data.lat && data.lon) {
              locationData = {
                city: data.city || "Unknown City",
                region: data.regionName || "Unknown Region",
                country: data.country || "Unknown Country",
                countryCode: data.countryCode || "XX",
                lat: parseFloat(String(data.lat)),
                long: parseFloat(String(data.lon)),
                timezone: data.timezone || "UTC",
              };
            } else {
              this.warnOnce(
                `ipapi-fallback:${clientIP}`,
                `ip-api.com failed for ${clientIP}: ${data?.message || "invalid response"}`
              );
            }
          } else {
            this.warnOnce(`ipapi-fallback-http:${clientIP}`, `ip-api.com HTTP ${res.status} for ${clientIP}`);
          }
        } catch (err) {
          this.warnOnce(`ipapi-fallback-ex:${clientIP}`, `ip-api.com fetch failed for ${clientIP}: ${String(err)}`);
        }
      }

      // 3) Third fallback: ipinfo.io (most generous)
      if (!locationData) {
        try {
          const res = await this.fetchWithTimeout(`https://ipinfo.io/${clientIP}/json`, FETCH_TIMEOUT_MS);
          if (res.ok) {
            const data = await res.json();
            if (data.loc) {
              const [lat, long] = data.loc.split(',').map(Number);
              locationData = {
                city: data.city || "Unknown City",
                region: data.region || "Unknown Region",
                country: data.country || "Unknown Country",
                countryCode: data.countryCode || "XX",
                lat, long,
                timezone: data.timezone || "UTC",
              };
            }
          }
        } catch {
          this.warnOnce(`ipinfo-ex:${clientIP}`, `ipinfo.io failed for ${clientIP}`);
        }
      }

      if (!locationData) {
        this.warnOnce(`all-failed:${clientIP}`, `All location services failed for ${clientIP}; using default`);
        locationData = this.getDefaultLocation();
      }

      // Jitter the TTL  ±10%  to avoid cache stampedes
      const jitter = 0.9 + Math.random() * 0.2;
      this.cache.set(cacheKey, locationData, Math.round(CACHE_TTL_MS * jitter));
      return locationData;
    } catch (error) {
      this.warnOnce(`unexpected:${clientIP}`, `Unexpected error for ${clientIP}: ${String(error)}`);
      return this.getDefaultLocation();
    }
  }

  // --- Helpers --------------------------------------------------------------

  /**
   * Normalizes IP address by removing brackets, zone indices, and trimming whitespace
   * @param {string} ip - Raw IP address string
   * @returns {string} Normalized IP address
   * @private
   */
  private normalizeIp(ip: string): string {
    // Common shapes we may get:
    // - "[2001:db8::1]" (IPv6 in brackets) → strip brackets
    // - "2001:db8::1%eth0" (zone index) → strip "%..."
    // - " 198.51.100.7 " → trim
    let v = ip.trim();
    if (v.startsWith("[") && v.endsWith("]")) v = v.slice(1, -1);
    const zoneIdx = v.indexOf("%");
    if (zoneIdx !== -1) v = v.slice(0, zoneIdx);
    return v.toLowerCase();
  }

  /**
   * Validates IP address format (IPv4 or IPv6)
   * @param {string} ip - IP address to validate
   * @returns {boolean} True if IP format is valid
   * @private
   */
  private isValidIP(ip: string): boolean {
    // IPv4
    const ipv4 =
      /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

    // IPv6 (full + compressed, optional leading ::, handles :: collapse)
    // Allows standard textual forms (no need to validate every exotic edge-case here)
    const ipv6 =
      /^(([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,7}:|([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|:((:[0-9a-f]{1,4}){1,7}|:))$/i;

    return ipv4.test(ip) || ipv6.test(ip);
  }

  /**
   * Checks if IP address is local, private, or reserved
   * @param {string} ip - IP address to check
   * @returns {boolean} True if IP is local/private/reserved
   * @private
   */
  private isLocalOrPrivate(ip: string): boolean {
    // IPv4 private/local/link-local/CGNAT ranges
    if (this.isIPv4(ip)) {
      const oct = ip.split(".").map(Number);
      const [a, b] = oct;

      // 127.0.0.0/8 (loopback)
      if (a === 127) return true;

      // 10.0.0.0/8
      if (a === 10) return true;

      // 172.16.0.0/12
      if (a === 172 && b >= 16 && b <= 31) return true;

      // 192.168.0.0/16
      if (a === 192 && b === 168) return true;

      // 169.254.0.0/16 (link-local)
      if (a === 169 && b === 254) return true;

      // 100.64.0.0/10 (CGNAT)
      if (a === 100 && b >= 64 && b <= 127) return true;

      // 0.0.0.0
      if (ip === "0.0.0.0") return true;

      return false;
    }

    // IPv6 localhost
    if (ip === "::1") return true;

    // IPv6 Unique Local Addresses fc00::/7 → fc00::/8 or fd00::/8 prefixes
    if (ip.startsWith("fc") || ip.startsWith("fd")) return true;

    // IPv6 link-local fe80::/10  => fe80..febf
    if (ip.startsWith("fe8") || ip.startsWith("fe9") || ip.startsWith("fea") || ip.startsWith("feb")) return true;

    return false;
  }

  /**
   * Determines if IP address is IPv4 format
   * @param {string} ip - IP address to check
   * @returns {boolean} True if IP is IPv4
   * @private
   */
  private isIPv4(ip: string): boolean {
    return ip.includes(".");
  }

  /**
   * Fetches data from URL with timeout support
   * @param {string} url - URL to fetch
   * @param {number} timeoutMs - Timeout in milliseconds
   * @returns {Promise<Response>} Fetch response
   * @private
   */
  private async fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { signal: controller.signal, headers: { "accept": "application/json" } });
    } finally {
      clearTimeout(t);
    }
  }

  /**
   * Logs a message only once per session to avoid spam
   * @param {string} key - Unique key for this log message
   * @private
   */
  private logOnce(key: string): void {
    if (this.loggedOnce.has(key)) return;
    this.loggedOnce.add(key);
    // Removed console.log to comply with ESLint rules
  }

  /**
   * Warns about an issue only once per session to avoid spam
   * @param {string} key - Unique key for this warning
   * @param {string} msg - Warning message
   * @private
   */
  private warnOnce(key: string, msg: string): void {
    if (this.loggedOnce.has(key)) return;
    this.loggedOnce.add(key);
    console.warn(msg);
  }

  /**
   * Returns default location data when geolocation fails
   * @returns {LocationData} Default New York location
   * @private
   */
  private getDefaultLocation(): LocationData {
    return {
      city: "New York",
      region: "New York",
      country: "United States",
      countryCode: "US",
      lat: 40.7128,
      long: -74.0060,
      timezone: "America/New_York",
    };
  }
}

/**
 * Singleton instance of LocationService for application-wide use
 * @example
 * import { locationService } from './services/location';
 * const location = await locationService.getLocationByIP('8.8.8.8');
 */
export const locationService = new LocationService();
