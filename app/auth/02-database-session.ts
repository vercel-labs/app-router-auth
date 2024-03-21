// Option 1: Stateless session with cookies | Optimistic auth
// Option 2 (this file): Database sessions with tokens (or session ID) stored in a database | Secure auth

// This file goes through **servers-side session** management
// See `middleware.ts` and `03-dal.ts` for the authorization / data access logic

// Store session ID, encrypted in a cookie
// Ensure the user is logged with the cookies (optimistic)
// Combine database with stateless session
// A session can contain more information than the current state, e.g. role, expiresAt, etc.
// Solving out of sync issues with database <> cookie

// Look into vercel kv / redis for storing sessions (for faster data retrieval)
// Discuss handling multiple devices (benefit of using database session)
// https://authjs.dev/concepts/session-strategies

import 'server-only';

import { db } from '@/drizzle/db';
import { sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// TODO: Replace with secret key from environment variables
// Update to use jose instead of jwt
const secretKey = 'yourSecretKey';

export async function createSession(id: number) {
  const token = jwt.sign({ id }, secretKey, {
    expiresIn: '1h',
  });
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // 1. Store token (or session ID) in database
  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      token,
      expiresAt,
    })
    .returning({ token: sessions.token });

  // 2. Set token in cookies to be read in middleware
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

export async function verifySession(token: string | undefined) {
  // const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const data = await db
      .select({
        expiresAt: sessions.expiresAt,
        userId: sessions.userId,
      })
      .from(sessions)
      .where(eq(sessions.token, token));

    if (!data || data[0].expiresAt < new Date()) return null;
    return { isAuth: true, userId: data[0].userId };
  } catch (error) {
    return null;
  }
}

export function updateSession() {}

export function deleteSession() {
  cookies().delete('token');
  // TODO: Delete token from database
}
