import { NextRequest, NextResponse } from 'next/server';
import { LocationService } from '@/lib/services/location';

export async function GET(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();

    const locationService = new LocationService(); // Create instance
    const location = await locationService.getLocationByIP(ip || '127.0.0.1');

    if (!location) {
      return NextResponse.json({
        error: 'Could not determine location'
      }, { status: 500 });
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Location API error:', error);
    return NextResponse.json({
      error: 'Failed to get location'
    }, { status: 500 });
  }
}
