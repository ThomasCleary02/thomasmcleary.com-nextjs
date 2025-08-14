import { WeatherData } from "../types/weather";
import { LocationData } from "../types/location";
import { CacheManager } from "../utils/cache";
import { validateCoordinates } from "../utils/validation";

const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export class WeatherService {
    private cache = CacheManager.getInstance();

    async getWeatherByLocation(location: LocationData): Promise<WeatherData | null> {
        // Use coordinates for cache key for better accuracy
        const cacheKey = `weather:${location.lat}-${location.long}`;

        // Check cache first
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached as WeatherData;
        }

        try {
            if (!OPENWEATHER_API_KEY) {
                console.warn('OpenWeather API key is not configured, using fallback weather');
                return this.getFallbackWeather(location);
            }
            
            // Validate coordinates
            if (!validateCoordinates(location.lat, location.long)) {
                console.error('Invalid coordinates:', location.lat, location.long);
                return this.getFallbackWeather(location);
            }
            
            let weatherData: WeatherData | null = null;
            
            // Try One Call API 3.0 first (paid tier)
            try {
                const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.long}&exclude=minutely,hourly,daily,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`;
                
                const response = await fetch(oneCallUrl);
                if (response.ok) {
                    const data = await response.json();
                    weatherData = this.parseOneCallResponse(data);
                } else if (response.status === 401) {
                    console.warn('One Call API 3.0 requires subscription, falling back to 2.5');
                }
            } catch (error) {
                console.warn('One Call API 3.0 failed, trying fallback');
            }
            
            // Fallback to Current Weather API 2.5 (free tier)
            if (!weatherData) {
                try {
                    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${OPENWEATHER_API_KEY}&units=metric`;
                    
                    console.log('Weather API URL:', currentWeatherUrl.replace(OPENWEATHER_API_KEY, '***HIDDEN***'));
                    console.log('Location data:', { lat: location.lat, long: location.long });

                    const response = await fetch(currentWeatherUrl);
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Weather API response:', response.status, errorText);
                        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
                    }

                    const data = await response.json();
                    weatherData = this.parseCurrentWeatherResponse(data);
                } catch (error) {
                    console.error('Current weather API also failed:', error);
                }
            }
            
            // Final fallback
            if (!weatherData) {
                console.warn('All weather APIs failed, using fallback weather');
                weatherData = this.getFallbackWeather(location);
            }

            // Cache for 1 hour
            this.cache.set(cacheKey, weatherData, CACHE_TTL);

            return weatherData;
        } catch {
            console.error('Error fetching weather data');
            return null;
        }
    }
    
    private parseOneCallResponse(data: any): WeatherData {
        return {
            temperature: Math.round(data.current.temp),
            condition: data.current.weather[0].description,
            conditionCode: data.current.weather[0].id,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_speed,
            feelsLike: Math.round(data.current.feels_like),
            timestamp: Date.now(),
        };
    }
    
    private parseCurrentWeatherResponse(data: any): WeatherData {
        return {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description,
            conditionCode: data.weather[0].id,
            humidity: data.main.humidity,
            windSpeed: data.wind?.speed || 0,
            feelsLike: Math.round(data.main.feels_like),
            timestamp: Date.now(),
        };
    }
    
    private getFallbackWeather(location: LocationData): WeatherData {
        // Provide reasonable fallback weather based on location/season
        const now = new Date();
        const month = now.getMonth(); // 0-11
        
        let temp = 20; // Default 20°C
        let condition = 'partly cloudy';
        let conditionCode = 802; // Scattered clouds
        
        // Simple seasonal adjustment (Northern Hemisphere bias)
        if (location.lat > 0) { // Northern Hemisphere
            if (month >= 11 || month <= 2) { // Winter
                temp = location.lat > 45 ? 5 : 15; // Colder in higher latitudes
                condition = 'overcast';
                conditionCode = 804;
            } else if (month >= 5 && month <= 8) { // Summer
                temp = location.lat > 45 ? 25 : 30; // Warmer in summer
                condition = 'clear sky';
                conditionCode = 800;
            }
        }
        
        return {
            temperature: temp,
            condition,
            conditionCode,
            humidity: 65,
            windSpeed: 3.5,
            feelsLike: temp + Math.round(Math.random() * 4 - 2), // ±2°C variation
            timestamp: Date.now(),
        };
    }
}

export const weatherService = new WeatherService();