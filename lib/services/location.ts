import { LocationData } from "../types/location";
import { CacheManager } from "../utils/cache";

const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export class LocationService {
    private cache = CacheManager.getInstance();

    async getLocationByIp(ip?: string): Promise<LocationData | null> {
        // Enhanced development/local IP detection
        if (this.isLocalEnvironment(ip)) {
            console.log('Development/local environment detected, using default location');
            return this.getDefaultLocation();
        }
        
        const cacheKey = `location:${ip || 'current'}`;

        // Check cache first
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached as LocationData;
        }
        
        try {
            let locationData: LocationData | null = null;
            
            // First try: ipapi.co
            try {
                const response = await fetch(`https://ipapi.co/${ip || 'me'}/json/`);
                if (response.ok) {
                    const data = await response.json();
                    
                    // Check for API errors (common with some IPs)
                    if (!data.error && data.latitude && data.longitude) {
                        locationData = {
                            city: data.city || 'Unknown City',
                            region: data.region || 'Unknown Region',
                            country: data.country_name || 'Unknown Country',
                            countryCode: data.country_code || 'XX',
                            lat: parseFloat(data.latitude),
                            long: parseFloat(data.longitude),
                            timezone: data.timezone || 'UTC',
                        };
                    } else {
                        console.warn('ipapi.co returned invalid data:', data.error || 'Missing coordinates');
                    }
                }
            } catch {
                console.warn('ipapi.co failed, trying fallback service');
            }
            
            // Fallback: ip-api.com
            if (!locationData) {
                try {
                    const response = await fetch(`https://ip-api.com/json/${ip || ''}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.status === 'success' && data.lat && data.lon) {
                            locationData = {
                                city: data.city || 'Unknown City',
                                region: data.regionName || 'Unknown Region',
                                country: data.country || 'Unknown Country',
                                countryCode: data.countryCode || 'XX',
                                lat: parseFloat(data.lat),
                                long: parseFloat(data.lon),
                                timezone: data.timezone || 'UTC',
                            };
                        } else {
                            console.warn('ip-api.com failed:', data.message || 'Invalid response');
                        }
                    }
                } catch {
                    console.warn('ip-api.com also failed');
                }
            }
            
            // Final fallback: Default location
            if (!locationData) {
                console.warn('All location services failed, using default location');
                locationData = this.getDefaultLocation();
            }
            
            this.cache.set(cacheKey, locationData, CACHE_TTL);
            return locationData;
        } catch (error) {
            console.error('Error fetching location data:', error);
            return this.getDefaultLocation(); // Return default instead of null
        }
    }
    
    private isLocalEnvironment(ip?: string): boolean {
        // Check for development environment
        if (process.env.NODE_ENV === 'development') {
            return true;
        }
        
        // Check for local/private IP addresses
        if (!ip) return true;
        
        const localIPs = [
            '127.0.0.1',
            'localhost',
            '::1',
            '0.0.0.0'
        ];
        
        // Check exact matches
        if (localIPs.includes(ip)) return true;
        
        // Check private IP ranges
        if (ip.startsWith('192.168.') ||  // Private network
            ip.startsWith('10.') ||       // Private network
            ip.startsWith('172.')) {      // Private network
            const octets = ip.split('.');
            if (octets.length === 4) {
                const second = parseInt(octets[1]);
                if (ip.startsWith('172.') && second >= 16 && second <= 31) {
                    return true; // 172.16.0.0 to 172.31.255.255
                }
                return ip.startsWith('192.168.') || ip.startsWith('10.');
            }
        }
        
        return false;
    }
    
    private getDefaultLocation(): LocationData {
        return {
            city: 'New York',
            region: 'New York',
            country: 'United States',
            countryCode: 'US',
            lat: 40.7128,
            long: -74.0060,
            timezone: 'America/New_York',
        };
    }
}

export const locationService = new LocationService();