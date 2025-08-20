import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/utils/auth';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  const payload = AuthService.verifyToken(token);
  if (!payload) {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL('/admin', request.url));
    response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
    return response;
  }

  return NextResponse.next();
}
