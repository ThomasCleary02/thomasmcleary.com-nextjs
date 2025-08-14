import OpenAI from 'openai';
import { GreetingResponse } from "../types/openai";
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
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a charismatic AI that creates highly personalized greetings.

IMPORTANT: You MUST return ONLY a valid JSON object with exactly this structure:
{
  "greeting": "your greeting text here",
  "emoji": "emoji here", 
  "tone": "friendly"
}

Rules:
- Make greetings UNIQUE and specific to weather conditions
- Reference actual temperature and weather description
- Include location details when possible
- Keep greetings under 120 characters
- Use MAXIMUM 1 emoji per greeting (preferably none)
- Make it feel personal, not generic
- Return ONLY the JSON, no other text`
          },
          {
            role: "user",
            content: `Create a greeting for someone visiting from ${city}, ${region}, ${country}.

EXACT WEATHER: ${weather.condition}, ${weather.temperature}°F (feels like ${weather.feelsLike}°F)
TIME: ${timeOfDay}
LOCATION: ${city}, ${region}

Make this greeting feel personal and specific to these exact conditions. Keep emojis minimal or none.

Return ONLY the JSON object.`
          }
        ],
        max_tokens: 150,
        temperature: 0.9,
        // Remove response_format - it doesn't work with chat.completions
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Try to extract JSON from the response (handles cases where model adds extra text)
      let parsedResponse: Record<string, unknown>;
      try {
        // First try direct JSON parse
        parsedResponse = JSON.parse(content);
      } catch {
        // If that fails, try to extract JSON from text using regex
        const text = content.trim();
        const match = text.match(/\{[\s\S]*\}/); // grab JSON object in braces
        if (match) {
          try {
            parsedResponse = JSON.parse(match[0]);
          } catch {
            // If regex extraction fails, use fallback
            return this.generateFallbackGreeting(weather, timeOfDay, city);
          }
        } else {
          // No JSON found, use fallback
          return this.generateFallbackGreeting(weather, timeOfDay, city);
        }
      }
      
      // Validate we have at least a greeting
      if (!parsedResponse || !parsedResponse.greeting) {
        return this.generateFallbackGreeting(weather, timeOfDay, city);
      }
      
      // Extra safety: guarantee all fields are populated
      const response: GreetingResponse = {
        greeting: String(parsedResponse.greeting || this.generateFallbackGreeting(weather, timeOfDay, city).greeting),
        emoji: String(parsedResponse.emoji || '👋'),
        tone: (parsedResponse.tone || 'friendly') as 'friendly' | 'professional' | 'casual',
        timestamp: Date.now()
      };

      // Cache the response (30 minutes in milliseconds)
      await this.cache.set(cacheKey, response, 30 * 60 * 1000);

      return response;
    } catch {
      // Use fallback on any error
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

    // Weather-based greetings with more personality - ALL in °F now
    if (weather.condition.toLowerCase().includes('rain')) {
      greeting = `Rainy ${timeOfDay} in ${city}! Perfect weather for cozy coding ☔`;
      emoji = '☔';
    } else if (weather.condition.toLowerCase().includes('sun') || weather.temperature > 75) { // 75°F = ~24°C
      greeting = `Sunny ${timeOfDay}! ${weather.temperature}°F of perfect weather in ${city} ☀️`;
      emoji = '☀️';
    } else if (weather.temperature < 50) { // 50°F = ~10°C
      greeting = `Chilly ${timeOfDay} in ${city}! ${weather.temperature}°F calls for hot coffee 🧥`;
      emoji = '🧥';
    } else {
      greeting = `Lovely ${timeOfDay}! ${weather.temperature}°F and ${weather.condition} in ${city} 👋`;
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
        weatherContext = ` Current weather: ${weather.condition}, ${weather.temperature}°F.`;
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
    } catch {
      return "A project built with modern web technologies.";
    }
  }
}

// Export a singleton instance
export const openAIService = new OpenAIService();