import { NextRequest, NextResponse } from 'next/server';
import { verifyClientSession } from '@/app/auth/02-stateless-session';

// Client Sessions can be verified in Middleware
// as we're only checking for a cookie in the headers
// and there are no data requests to block the stream

// We should avoid verifying Server Sessions in Middleware
// since we're making a data request on every route change
// 👆 This is especially important with Next.js Route prefetching
// multiple middleware calls can be triggered on a single route change

// 1. Specify all protected routes
const protectedRoutes = ['/dashboard'];
// 2. Specify **only** the public paths that should redirect if user is authed
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 3. Get the token from the request
  const session = req.cookies.get('session')?.value;
  const { isAuth } = (await verifyClientSession(session)) || {};

  // 4. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 5. Redirect based on the user's auth status
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (
    isPublicRoute &&
    isAuth &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
