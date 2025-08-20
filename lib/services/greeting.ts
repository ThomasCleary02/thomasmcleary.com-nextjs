import { LocationService } from './location';
import { WeatherService } from './weather';
import { OpenAIService } from './openai';

export interface GreetingData {
  greeting: string;
  weather: any;
  location: {
    city: string;
    region: string;
    country: string;
  } | null;
}

export class GreetingService {
  private locationService: LocationService;
  private weatherService: WeatherService;
  private openaiService: OpenAIService;

  constructor() {
    this.locationService = new LocationService();
    this.weatherService = new WeatherService();
    this.openaiService = new OpenAIService();
  }

  getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour < 6) return 'night';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'night';
  }

  async getGreetingData(ip?: string, lat?: number, lon?: number): Promise<GreetingData> {
    try {
      let location;
      let weather;

      if (lat && lon) {
        // GPS coordinates provided
        location = await this.locationService.getLocationByIP(ip || '127.0.0.1');
        weather = await this.weatherService.getWeather(lat, lon);
      } else {
        // IP-based location
        location = await this.locationService.getLocationByIP(ip || '127.0.0.1');
        if (location) {
          weather = await this.weatherService.getWeather(location.lat, location.long);
        }
      }

      if (!location) {
        return {
          greeting: 'Hello',
          weather: null,
          location: null
        };
      }

      if (!weather) {
        weather = await this.weatherService.getWeather(location.lat, location.long);
      }

      // Get dynamic greeting from OpenAI
      const aiGreeting = await this.openaiService.generateGreeting(
        location.city, 
        weather, 
        this.getTimeOfDay()
      );

      // Make sure the weather object has the right structure:
      const weatherData = {
        temperature: weather?.temperature || 0,
        condition: weather?.condition || 'unknown',
        feelsLike: weather?.feelsLike || 0
      };

      return {
        greeting: aiGreeting.greeting,
        weather: weatherData, // Include this
        location: {
          city: location.city,
          region: location.region,
          country: location.country
        }
      };
    } catch (error) {
      console.error('Greeting service error:', error);
      return {
        greeting: 'Hello',
        weather: null,
        location: null
      };
    }
  }

  // Fallback method for when OpenAI is unavailable
  getFallbackGreeting(): string {
    const timeOfDay = this.getTimeOfDay();
    switch (timeOfDay) {
      case 'morning': return 'Good morning';
      case 'afternoon': return 'Good afternoon';
      case 'evening': return 'Good evening';
      case 'night': return 'Good evening';
      default: return 'Hello';
    }
  }
}