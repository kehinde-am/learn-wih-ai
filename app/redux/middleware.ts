// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the middleware function
export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Adjust based on how you store tokens

  // Redirect to the sign-in page if token is not found
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Allow request to continue if token is present
  return NextResponse.next();
}

// Define the paths where middleware should apply
export const config = {
  matcher: ['/app/dashboard/:path', '/profile/:path*'], // Adjust the paths based on where you want to apply the middleware
};
