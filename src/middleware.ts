import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Protect dashboard and other authenticated routes
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Redirect authenticated users away from auth pages
  if ((pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup')) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/auth/signin', '/auth/signup'],
};