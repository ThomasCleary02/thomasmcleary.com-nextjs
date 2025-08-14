export interface WeatherContext {
    temperature: number;
    condition: string;
    feelsLike: number;
}

export interface GreetingContext {
    city: string;
    region: string;
    country: string;
    weather: WeatherContext;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface GreetingResponse {
    greeting: string;
    emoji: string;
    tone: 'friendly' | 'professional' | 'casual';
    timestamp: number;
}