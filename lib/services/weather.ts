import { WeatherData, OneCallResponse, CurrentWeatherResponse } from "../types/weather";
import { CacheManager } from "../utils/cache";
import { validateCoordinates } from "../utils/validation";

/**
 * Service class for weather-related operations
 * Handles weather data fetching and processing with multiple API fallbacks
 */
export class WeatherService {
    /**
     * Fetches weather data for a given location
     * Attempts multiple weather APIs with fallback to generated weather data
     * @param {number} lat - Latitude coordinate (-90 to 90)
     * @param {number} lon - Longitude coordinate (-180 to 180)
     * @returns {Promise<WeatherData>} Weather information for the location
     * @throws {Error} If all weather APIs fail and fallback generation fails
     * @example
     * const weather = await weatherService.getWeather(40.7128, -74.0060);
     * console.log(weather.temperature); // 72
     */
    async getWeather(lat: number, lon: number): Promise<WeatherData> {
        // Use coordinates for cache key for better accuracy
        const cacheKey = `weather:${lat}-${lon}`;

        // Check cache first
        const cached = CacheManager.getInstance().get(cacheKey);
        if (cached) {
            return cached as WeatherData;
        }

        try {
            if (!process.env.OPENWEATHER_API_KEY) {
                console.warn('OpenWeather API key is not configured, using fallback weather');
                return this.getFallbackWeather(lat);
            }
            
            // Validate coordinates
            if (!validateCoordinates(lat, lon)) {
                console.error('Invalid coordinates:', lat, lon);
                return this.getFallbackWeather(lat);
            }
            
            let weatherData: WeatherData | null = null;
            
            // Try One Call API 3.0 first (paid tier)
            try {
                const oneCallUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`;
                
                const response = await fetch(oneCallUrl);
                if (response.ok) {
                    const data = await response.json();
                    weatherData = this.parseOneCallResponse(data);
                } else if (response.status === 401) {
                    console.warn('One Call API 3.0 requires subscription, falling back to 2.5');
                }
            } catch {
                console.warn('One Call API 3.0 failed, trying fallback');
            }
            
            // Fallback to Current Weather API 2.5 (free tier)
            if (!weatherData) {
                try {
                    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`;
                    
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
                weatherData = this.getFallbackWeather(lat);
            }

            // Cache for 1 hour
            CacheManager.getInstance().set(cacheKey, weatherData, 60 * 60 * 1000);

            return weatherData;
        } catch {
            console.error('Error fetching weather data');
            return this.getFallbackWeather(lat);
        }
    }
    
    /**
     * Parses weather data from OpenWeather One Call API 3.0 response
     * @param {OneCallResponse} data - Raw API response data
     * @returns {WeatherData} Formatted weather data object
     * @private
     */
    private parseOneCallResponse(data: OneCallResponse): WeatherData {
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
    
    /**
     * Parses weather data from OpenWeather Current Weather API 2.5 response
     * @param {CurrentWeatherResponse} data - Raw API response data
     * @returns {WeatherData} Formatted weather data object
     * @private
     */
    private parseCurrentWeatherResponse(data: CurrentWeatherResponse): WeatherData {
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
    
    /**
     * Generates fallback weather data when external APIs fail
     * Provides reasonable weather estimates based on latitude and season
     * @param {number} lat - Latitude coordinate for seasonal adjustments
     * @returns {WeatherData} Generated fallback weather data
     * @private
     * @example
     * const fallback = this.getFallbackWeather(40.7128);
     * // Returns weather data for New York area in current season
     */
    private getFallbackWeather(lat: number): WeatherData {
        // Provide reasonable fallback weather based on location/season
        const now = new Date();
        const month = now.getMonth(); // 0-11
        
        let temp = 20; // Default 20°C
        let condition = 'partly cloudy';
        let conditionCode = 802; // Scattered clouds
        
        // Simple seasonal adjustment (Northern Hemisphere bias)
        if (lat > 0) { // Northern Hemisphere
            if (month >= 11 || month <= 2) { // Winter
                temp = lat > 45 ? 5 : 15; // Colder in higher latitudes
                condition = 'overcast';
                conditionCode = 804;
            } else if (month >= 5 && month <= 8) { // Summer
                temp = lat > 45 ? 25 : 30; // Warmer in summer
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

/**
 * Singleton instance of WeatherService for application-wide use
 * @example
 * import { weatherService } from './services/weather';
 * const weather = await weatherService.getWeather(40.7128, -74.0060);
 */
export const weatherService = new WeatherService();