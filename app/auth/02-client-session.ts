// Option 1 (this file): Client-side stateless session with cookies | Optimistic auth check
// Option 2: Server-side sessions with tokens (or session ID) stored in a database | Secure auth check

// This file goes through **client-side session** management
// See `middleware.ts` and `03-dal.ts` for the authorization / data access logic

// Recommend iron-session and jose

import 'server-only';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// TODO: Replace with secret key from environment variables
const secretKey = 'yourSecretKey';

export async function createSession(id: number) {
  const token = jwt.sign({ id }, secretKey, {
    expiresIn: '1h',
  });
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// If invoking this function from:
// - Middleware, pass token from the request header
// - Server Actions or Server Components, use `cookies()`
// - Route handler, can use either headers or cookies

export async function verifyClientSession(token: string | undefined) {
  if (!token) return null;

  try {
    const { id } = jwt.verify(token, secretKey);
    if (!id) return null;
    return { isAuth: true, userId: id };
  } catch (error) {
    return null;
  }
}

export function updateSession() {}

export function deleteSession() {
  cookies().delete('token');
}
