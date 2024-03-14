// This file includes the session management logic
// It's the 2nd part of the auth process
// See `01-auth.ts` for the authentication logic
// See `middleware.ts` and `03-dal.ts` for the authorization / data access logic

import 'server-only';

import { db } from '@/drizzle/db';
import { sessions } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// TODO: Replace with secret key from environment variables
const secretKey = 'yourSecretKey';

// Option 1: Client-side stateless session with cookies | Optimistic auth check
// Option 2: Server-side sessions with tokens (or session ID) stored in a database | Secure auth check

export async function createSession(id: number) {
  const token = jwt.sign({ id }, secretKey, {
    expiresIn: '1h',
  });
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // Option 1: Send cookie from server to client
  cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  // Option 2: Store token in database
  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      token, // or session ID
      expiresAt,
    })
    .returning({ token: sessions.token });

  // Store session ID in a cookie...
}

// Option 1: Optimistically check for token in cookies
export async function verifyClientSession() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const { id } = jwt.verify(token, secretKey) as { id: number };
    if (!id) return null;
    return { isAuth: true, userId: id };
  } catch (error) {
    return null;
  }
}

// Option 2: Securely check for token in the database
export async function verifyServerSession() {
  const token = cookies().get('token')?.value;

  if (!token) return null;

  // This is nuts
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
  // Option 1
  cookies().delete('token');

  // Option 2
}
