import { NextRequest, NextResponse } from 'next/server';
import { openAIService } from '@/lib/services/openai';
import { locationService } from '@/lib/services/location';
import { weatherService } from '@/lib/services/weather';
import { LocationData } from '@/lib/types/location';

export async function GET(request: NextRequest) {
  try {
    // Check if precise coordinates were passed
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    let location: LocationData | null = null;
    
    if (lat && lng) {
      // Use precise coordinates from browser geolocation
      location = {
        city: "Unknown", // We'll get this from reverse geocoding
        region: "Unknown",
        country: "Unknown",
        countryCode: "XX",
        lat: parseFloat(lat),
        long: parseFloat(lng),
        timezone: "UTC", // We'll get this from the coordinates
      };
    } else {
      // Fallback to IP-based location
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');
      location = await locationService.getLocationByIp(ip || undefined);
    }
    
    if (!location) {
      return NextResponse.json({ 
        greeting: "Hello there! 👋", 
        emoji: "👋", 
        tone: "friendly" 
      });
    }

    // Get weather data
    const weather = await weatherService.getWeatherByLocation(location);
    
    // Handle case where weather service returns null
    if (!weather) {
        return NextResponse.json({ 
            greeting: "Hello there! 👋", 
            emoji: "👋", 
            tone: "friendly" 
        });
    }

    // Determine time of day based on user's timezone
    const userTime = new Date().toLocaleString('en-US', { 
      timeZone: location.timezone 
    });
    const hour = new Date(userTime).getHours();
    
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    if (hour >= 5 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    // Generate personalized greeting
    const greetingResponse = await openAIService.generateGreeting(
      location.city,
      location.region,
      location.country,
      weather || { temperature: 20, condition: 'clear', feelsLike: 20, conditionCode: 800, humidity: 50, windSpeed: 5, timestamp: Date.now() },
      timeOfDay
    );

    return NextResponse.json(greetingResponse);
  } catch (error) {
    console.error('Error generating greeting:', error);
    
    // Fallback greeting
    return NextResponse.json({
      greeting: "Hello there! 👋",
      emoji: "👋",
      tone: "friendly"
    });
  }
}
