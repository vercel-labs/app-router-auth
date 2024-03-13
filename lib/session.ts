// This file includes the session management logic

import 'server-only';

import { db } from '@/drizzle/db';
import { sessions } from '@/drizzle/schema';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';

// TODO: Replace with secret key from environment variables
const secretKey = 'yourSecretKey';

// Option 1: Client-side stateless session with cookies | Optimistic auth check
// Option 2: Server-side sessions with tokens stored in a database | Secure auth check

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
  await db.insert(sessions).values({
    userId: id,
    token,
    expiresAt,
  });
}

// Option 1: Optimistically check for token in cookies
export async function verifyClientSession() {
  const token = cookies().get('token')?.value;

  if (!token) return null;

  const { id } = jwt.verify(token, secretKey) as { id: number };

  return { isAuth: true, userId: id };
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

export function updateSession() {
  // Option 1
  // Option 2
}

export function deleteSession() {
  // Option 1
  cookies().delete('token');

  // Option 2
}
