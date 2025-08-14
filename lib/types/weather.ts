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

// Add API response types
export interface OneCallResponse {
    current: {
        temp: number;
        weather: Array<{
            description: string;
            id: number;
        }>;
        humidity: number;
        wind_speed: number;
        feels_like: number;
    };
}

export interface CurrentWeatherResponse {
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
    };
    weather: Array<{
        description: string;
        id: number;
    }>;
    wind?: {
        speed: number;
    };
}