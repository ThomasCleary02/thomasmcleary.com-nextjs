import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/lib/services/admin';
import { AuthService } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // More robust IP detection
    const clientIP = request.headers.get('cf-connecting-ip') || 
                     request.headers.get('x-real-ip') || 
                     request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     'unknown';

    // Check rate limiting with enhanced response
    const rateLimitResult = AuthService.checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      const lockoutMinutes = Math.ceil((rateLimitResult.lockoutTime! - Date.now()) / 60000);
      return NextResponse.json(
        { 
          error: `Account temporarily locked. Try again in ${lockoutMinutes} minutes.`,
          lockoutTime: rateLimitResult.lockoutTime 
        },
        { status: 429 }
      );
    }

    // Verify credentials from database
    const isValidCredentials = await AdminService.verifyCredentials(username, password);
    
    if (!isValidCredentials) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Clear rate limit on successful login
    AuthService.clearRateLimit(clientIP);

    // Generate JWT token
    const token = AuthService.generateToken(username);

    // Set HTTP-only cookie with matching expiration
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 hours to match JWT_EXPIRES_IN
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
