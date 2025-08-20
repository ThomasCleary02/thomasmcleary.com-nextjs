import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/utils/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, username: payload.username });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
