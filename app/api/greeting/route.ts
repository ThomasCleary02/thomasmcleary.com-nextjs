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
    
    // Get IP headers once at the top
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();
    
    let location: LocationData | null = null;
    
    if (lat && lng) {
      // GPS coordinates provided - use for weather accuracy
      // Get city/region names from IP geolocation
      const locationFromIP = await locationService.getLocationByIp(ip);
      
      // Combine GPS coordinates with IP-based city info
      location = {
        city: locationFromIP?.city || 'Unknown',
        region: locationFromIP?.region || 'Unknown',
        country: locationFromIP?.country || 'Unknown',
        countryCode: locationFromIP?.countryCode || 'XX',
        lat: parseFloat(lat),
        long: parseFloat(lng),
        timezone: locationFromIP?.timezone || 'UTC',
      };
    } else {
      // No GPS - fallback to IP-based location for both weather and city
      location = await locationService.getLocationByIp(ip || undefined);
    }
    
    if (!location) {
      return NextResponse.json({ 
        greeting: "Hello there! 👋", 
        emoji: "👋", 
        tone: "friendly" 
      });
    }

    // Get weather data using the coordinates (GPS if available, IP-based if not)
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

    // Generate personalized greeting with accurate weather + proper city names
    const greetingResponse = await openAIService.generateGreeting(
      location.city,
      location.region,
      location.country,
      weather,
      timeOfDay
    );

    return NextResponse.json(greetingResponse);
  } catch {
    
    // Fallback greeting
    return NextResponse.json({
      greeting: "Hello there! 👋",
      emoji: "👋",
      tone: "friendly"
    });
  }
}
