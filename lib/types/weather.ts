export interface WeatherData {
    temperature: number;
    condition: string;
    conditionCode: number;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    timestamp: number;
}

export interface CachedWeatherData extends WeatherData {
    expiresAt: number;
    location: string;
}