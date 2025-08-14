import { LocationData } from "../types/location";

export async function getVisitorLocation(): Promise<LocationData> {
  // Try browser geolocation first (most accurate)
  if (navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { 
          enableHighAccuracy: true, 
          timeout: 7000 
        })
      );

      return {
        city: "Unknown",          // We'll get city from reverse geocoding or IP
        region: "Unknown",
        country: "Unknown", 
        countryCode: "XX",
        lat: position.coords.latitude,
        long: position.coords.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      };
    } catch (err) {
      console.warn("Geolocation API denied or failed, falling back to IP", err);
    }
  }

  // Fallback: ask your API to use IP geolocation
  const res = await fetch("/api/get-location");
  if (!res.ok) throw new Error("Failed to fetch IP-based location");
  return res.json() as Promise<LocationData>;
}
