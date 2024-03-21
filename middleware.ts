import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/app/auth/02-stateless-session';
import { cookies } from 'next/headers';

// Stateless sessions can be verified in Middleware
// as we're only checking for a cookie in the headers
// and there are no data requests to block the stream

// We should avoid verifying Server Sessions in Middleware
// since we're making a data request on every route change
// 👆 This is especially important with Next.js Route prefetching
// multiple middleware calls can be triggered on a single route change

// can use cookies() in middleware
// can't use redirect() in middleware

// 1. Specify all protected routes
const protectedRoutes = ['/dashboard'];
// 2. Specify **only** the public paths that should redirect if user is authed
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 3. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 4. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 5. Redirect to login if user is not authed and tries to access a protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // 6. Redirect to dashboard if user is authed and tries to access a public route
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
