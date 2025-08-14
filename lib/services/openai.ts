import OpenAI from 'openai';
import { GreetingContext, GreetingResponse } from "../types/openai";
import { WeatherData } from "../types/weather";
import { CacheManager } from "../utils/cache";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

export class OpenAIService {
  private cache: CacheManager;

  constructor() {
    // Use singleton pattern like other services
    this.cache = CacheManager.getInstance();
  }

  async generateGreeting(
    city: string, 
    region: string, 
    country: string, 
    weather: WeatherData, 
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  ): Promise<GreetingResponse> {
    const cacheKey = `greeting_${city}_${weather.condition}_${timeOfDay}_${Math.floor(Date.now() / (30 * 60 * 1000))}`;
    
    // Check cache first
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return cached as GreetingResponse;
    }

    try {
      console.log(`Generating greeting for ${city}, ${weather.condition}, ${timeOfDay}`);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a charismatic AI that creates highly personalized, contextual greetings. 
            
            CRITICAL RULES:
            - Make each greeting UNIQUE and SPECIFIC to the exact weather conditions
            - Reference the actual temperature numbers and weather description
            - Include location-specific details when possible
            - Vary the tone and style - don't be repetitive
            - Keep greetings under 120 characters for mobile display
            - Use weather-appropriate emojis that match the conditions
            - Make it feel like a real person greeting them, not a generic message
            
            Return JSON: { greeting: string, emoji: string, tone: string }`
          },
          {
            role: "user",
            content: `Create a unique greeting for someone visiting from ${city}, ${region}, ${country}.
            
            EXACT WEATHER: ${weather.condition}, ${weather.temperature}°C (feels like ${weather.feelsLike}°C)
            TIME: ${timeOfDay}
            LOCATION: ${city}, ${region}
            
            Make this greeting feel personal and specific to these exact conditions. Don't be generic!`
          }
        ],
        max_tokens: 150,
        temperature: 0.9, // Higher creativity
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      const parsedResponse = JSON.parse(content);
      
      // Validate the response structure
      if (!parsedResponse.greeting || !parsedResponse.emoji || !parsedResponse.tone) {
        throw new Error('Invalid response structure from OpenAI');
      }
      
      const response: GreetingResponse = {
        greeting: parsedResponse.greeting,
        emoji: parsedResponse.emoji,
        tone: parsedResponse.tone,
        timestamp: Date.now()
      };

      // Cache the response (30 minutes in milliseconds)
      await this.cache.set(cacheKey, response, 30 * 60 * 1000);

      return response;
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Pass city to fallback method
      return this.generateFallbackGreeting(weather, timeOfDay, city);
    }
  }

  private generateFallbackGreeting(
    weather: WeatherData, 
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night',
    city: string
  ): GreetingResponse {
    let greeting = '';
    let emoji = '';
    const tone: 'friendly' | 'professional' | 'casual' = 'friendly';

    // Weather-based greetings with more personality
    if (weather.condition.toLowerCase().includes('rain')) {
      greeting = `Rainy ${timeOfDay} in ${city}! Perfect weather for cozy coding ☔`;
      emoji = '☔';
    } else if (weather.condition.toLowerCase().includes('sun') || weather.temperature > 25) {
      greeting = `Sunny ${timeOfDay}! ${weather.temperature}°C of perfect weather in ${city} ☀️`;
      emoji = '☀️';
    } else if (weather.temperature < 10) {
      greeting = `Chilly ${timeOfDay} in ${city}! ${weather.temperature}°C calls for hot coffee 🧥`;
      emoji = '🧥';
    } else {
      greeting = `Lovely ${timeOfDay}! ${weather.temperature}°C and ${weather.condition} in ${city} 👋`;
      emoji = '👋';
    }

    return {
      greeting,
      emoji,
      tone,
      timestamp: Date.now()
    };
  }

  // Method to generate project descriptions with weather context
  async generateProjectDescription(
    projectTitle: string, 
    technologies: string[], 
    weather?: WeatherData
  ): Promise<string> {
    try {
      let weatherContext = '';
      if (weather) {
        weatherContext = ` Current weather: ${weather.condition}, ${weather.temperature}°C.`;
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a technical writer who creates concise, engaging project descriptions."
          },
          {
            role: "user",
            content: `Write a brief description for a project called "${projectTitle}" using technologies: ${technologies.join(', ')}.${weatherContext}`
          }
        ],
        max_tokens: 200,
        temperature: 0.6,
      });

      return completion.choices[0]?.message?.content || "A project built with modern web technologies.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "A project built with modern web technologies.";
    }
  }
}

// Export a singleton instance
export const openAIService = new OpenAIService();