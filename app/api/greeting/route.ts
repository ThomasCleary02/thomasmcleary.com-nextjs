import { NextRequest, NextResponse } from 'next/server';
import { GreetingService } from '@/lib/services/greeting';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

    const greetingService = new GreetingService();
    const greetingData = await greetingService.getGreetingData(
      ip, 
      lat ? parseFloat(lat) : undefined, 
      lon ? parseFloat(lon) : undefined
    );

    return NextResponse.json(greetingData);
  } catch (error) {
    console.error('Greeting API error:', error);
    // Fallback to basic greeting
    const greetingService = new GreetingService();
    return NextResponse.json({
      greeting: greetingService.getFallbackGreeting(),
      weather: null,
      location: null
    });
  }
}
