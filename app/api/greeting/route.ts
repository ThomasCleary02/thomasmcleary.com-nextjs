import { NextRequest, NextResponse } from 'next/server';
import { openAIService } from '@/lib/services/openai';
import { locationService } from '@/lib/services/location';
import { weatherService } from '@/lib/services/weather';
import { LocationData } from '@/lib/types/location';

// Reverse geocoding using OpenStreetMap Nominatim (free, no API key needed)
async function reverseGeocode(lat: number, lng: number): Promise<LocationData | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'ThomasMcLearyWebsite/1.0' // Required by Nominatim
        }
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const address = data.address;
    
    return {
      city: address.city || address.town || address.village || 'Unknown',
      region: address.state || address.county || 'Unknown',
      country: address.country || 'Unknown',
      countryCode: address.country_code?.toUpperCase() || 'XX',
      lat,
      long: lng,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    };
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if precise coordinates were passed
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    // Get IP headers for fallback
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();
    
    let location: LocationData | null = null;
    
    if (lat && lng) {
      // GPS coordinates provided - use for both weather AND city names
      const coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
      
      // Try reverse geocoding first (most accurate)
      location = await reverseGeocode(coordinates.lat, coordinates.lng);
      
      // If reverse geocoding fails, fall back to IP-based city names
      if (!location || location.city === 'Unknown') {
        const locationFromIP = await locationService.getLocationByIp(ip);
        if (locationFromIP) {
          location = {
            city: locationFromIP.city,
            region: locationFromIP.region,
            country: locationFromIP.country,
            countryCode: locationFromIP.countryCode,
            lat: coordinates.lat,
            long: coordinates.lng,
            timezone: locationFromIP.timezone,
          };
        }
      }
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

    // Generate personalized greeting with accurate weather + accurate city names
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
