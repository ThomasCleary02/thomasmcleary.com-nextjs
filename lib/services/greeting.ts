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
        // GPS coordinates provided - use them directly
        console.log('📍 Using GPS coordinates:', { lat, lon });
        
        // Create location object from coordinates
        location = {
          city: 'Your Location',
          region: 'Your Region',
          country: 'Your Country',
          countryCode: 'XX',
          lat: lat,
          long: lon,
          timezone: 'UTC'
        };
        
        // Get weather for the coordinates
        weather = await this.weatherService.getWeather(lat, lon);
      } else {
        // IP-based location
        console.log('🌐 Using IP-based location:', ip);
        location = await this.locationService.getLocationByIP(ip || '127.0.0.1');
        
        if (location) {
          weather = await this.weatherService.getWeather(location.lat, location.long);
        }
      }

      if (!location) {
        console.log('❌ No location data available, using fallback');
        return {
          greeting: this.getFallbackGreeting(),
          weather: null,
          location: null
        };
      }

      if (!weather) {
        console.log('🌤️ No weather data, attempting to fetch...');
        weather = await this.weatherService.getWeather(location.lat, location.long);
      }

      // Get dynamic greeting from OpenAI
      console.log('🤖 Generating AI greeting for:', location.city);
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

      console.log('✅ Greeting data generated successfully');
      return {
        greeting: aiGreeting.greeting,
        weather: weatherData,
        location: {
          city: location.city,
          region: location.region,
          country: location.country
        }
      };
    } catch (error) {
      console.error('❌ Greeting service error:', error);
      return {
        greeting: this.getFallbackGreeting(),
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