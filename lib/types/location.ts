export interface LocationData {
    city: string;
    region: string;
    country: string;
    countryCode: string;
    lat: number;
    long: number;
    timezone: string;
}

export interface CachedLocationData extends LocationData {
    expiresAt: number;
    ip: string
}