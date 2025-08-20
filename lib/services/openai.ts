import OpenAI from 'openai';
import { WeatherData } from "../types/weather";
import { CacheManager } from "../utils/cache";
import { GreetingResponse } from '@/lib/types/openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  private cache: CacheManager;

  constructor() {
    // Use singleton pattern like other services
    this.cache = CacheManager.getInstance();
  }

  async generateGreeting(
    city: string, 
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
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a friendly AI that creates personalized greetings focused on weather and time of day.

IMPORTANT: You MUST return ONLY a valid JSON object with exactly this structure:
{
  "greeting": "your greeting text here",
  "emoji": "emoji here", 
  "tone": "friendly"
}

Rules:
- Focus on saying hi and commenting on the weather, NOT welcoming them to the location
- Make greetings about the weather conditions and time of day
- Keep greetings under 120 characters
- Use MAXIMUM 1 emoji per greeting (preferably none)
- Make it feel personal and conversational
- DO NOT say things like "Welcome to [city]", "Enjoy your visit", "Hope you're having a great time in [location]"
- Instead say things like "Good morning! Beautiful sunny weather today" or "Hey there! Perfect rainy day for staying cozy"
- Return ONLY the JSON, no other text`
          },
          {
            role: "user",
            content: `Create a greeting for someone experiencing this weather.

EXACT WEATHER: ${weather.condition}, ${weather.temperature}°F (feels like ${weather.feelsLike}°F)
TIME: ${timeOfDay}

Focus on saying hello and commenting on their weather experience. Don't mention location or welcome them anywhere. Just be friendly about the weather and time of day.

Examples of GOOD greetings:
- "Good morning! Beautiful sunny weather today"
- "Hey there! Perfect rainy day for staying cozy"
- "Good afternoon! Lovely temperature for getting outside"

Examples of BAD greetings (avoid these):
- "Welcome to [city]"
- "Enjoy your visit to [location]"
- "Hope you're having a great time in [region]"

Return ONLY the JSON object.`
          }
        ],
        max_tokens: 150,
        temperature: 0.9,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Try to extract JSON from the response
      let parsedResponse: Record<string, unknown>;
      try {
        parsedResponse = JSON.parse(content);
      } catch {
        const text = content.trim();
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsedResponse = JSON.parse(match[0]);
          } catch {
            return this.generateFallbackGreeting(weather, timeOfDay);
          }
        } else {
          return this.generateFallbackGreeting(weather, timeOfDay);
        }
      }
      
      if (!parsedResponse || !parsedResponse.greeting) {
        return this.generateFallbackGreeting(weather, timeOfDay);
      }
      
      const response: GreetingResponse = {
        greeting: String(parsedResponse.greeting || this.generateFallbackGreeting(weather, timeOfDay).greeting),
        emoji: String(parsedResponse.emoji || '👋'),
        tone: (parsedResponse.tone || 'friendly') as 'friendly' | 'professional' | 'casual',
        timestamp: Date.now()
      };

      await this.cache.set(cacheKey, response, 30 * 60 * 1000);
      return response;
    } catch {
      return this.generateFallbackGreeting(weather, timeOfDay);
    }
  }

  private generateFallbackGreeting(
    weather: WeatherData, 
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  ): GreetingResponse {
    let greeting = '';
    let emoji = '';
    const tone: 'friendly' | 'professional' | 'casual' = 'friendly';

    if (weather.condition.toLowerCase().includes('rain')) {
      greeting = `Rainy ${timeOfDay}! Perfect weather for cozy coding`;
      emoji = '☔';
    } else if (weather.condition.toLowerCase().includes('sun') || weather.temperature > 75) {
      greeting = `Sunny ${timeOfDay}! ${weather.temperature}°F of perfect weather`;
      emoji = '☀️';
    } else if (weather.temperature < 50) {
      greeting = `Chilly ${timeOfDay}! ${weather.temperature}°F calls for hot coffee`;
      emoji = '🧥';
    } else {
      greeting = `Lovely ${timeOfDay}! ${weather.temperature}°F and ${weather.condition}`;
      emoji = '👋';
    }

    return {
      greeting,
      emoji,
      tone,
      timestamp: Date.now()
    };
  }
}

// Export a singleton instance
export const openAIService = new OpenAIService();