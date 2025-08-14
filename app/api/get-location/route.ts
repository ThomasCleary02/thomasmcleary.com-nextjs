import { NextRequest, NextResponse } from 'next/server';
import { locationService } from '@/lib/services/location';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim();
    
    const location = await locationService.getLocationByIp(ip || undefined);
    
    if (!location) {
      return NextResponse.json({ 
        error: 'Unable to determine location' 
      }, { status: 400 });
    }
    
    return NextResponse.json(location);
  } catch (error) {
    console.error('Location API error:', error);
    return NextResponse.json({ 
      error: 'Failed to get location' 
    }, { status: 500 });
  }
}
