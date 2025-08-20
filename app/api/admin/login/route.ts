import { NextRequest, NextResponse } from 'next/server';
import { AdminService } from '@/lib/services/admin';
import { AuthService } from '@/lib/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limiting
    if (!AuthService.checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
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

    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
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
