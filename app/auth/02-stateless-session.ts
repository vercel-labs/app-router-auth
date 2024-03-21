// Option 1 (this file): Stateless session with cookies | Optimistic auth check
// Option 2: Database sessions with tokens (or session ID) stored in a database | Secure auth check

// This file goes through **client-side session** management
// See `middleware.ts` and `03-dal.ts` for the authorization / data access logic

// Recommend jose as it supports Edge Runtime (Middleware)

// Context: next.config.js is hard to maintain (e.g i18n)

import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { SessionPayload } from '@/app/auth/definitions';

// TODO: Replace with secret key from environment variables

const secretKey = 'yourSecretKey';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

// Rabbit hole
export function updateSession() {}

export function deleteSession() {
  cookies().delete('session');
}
