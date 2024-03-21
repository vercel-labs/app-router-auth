// Authorization begins with middleware.ts, where we check for a local cookie

import 'server-only';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { users } from '@/drizzle/schema';
import { decrypt } from '@/app/auth/02-stateless-session';

export async function verifySession() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: Number(session.userId) };
}

// Option 1: Simpler version, individual functions verify the session
// This guarantees items cannot be fetched without a valid session

// In addition to middleware, we should always check for a valid session in any request that requires authentication. This guarantees if the function returns any data, then the user is allowed to access it.
// Further reading, consider using JS classes and DTO.
export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),

      // explicitly return the columns we need rather than the whole user object. This is a good practice...reason.
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    const user = data[0];

    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});

// Option 2: A class that holds all the requests that need to be authorized
// You may consider using a class to consolidate all the requests that need to be authorized

// blockers
// - constructors can't be async, so you can't verify the session in the constructor
// - not sure how to use react.cache with classes
export class User {
  async getUser() {
    const session = await verifySession();

    try {
      const user = await db.query.users.findMany({
        where: eq(users.id, session.userId),
        columns: {
          id: true,
          name: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      console.log('Failed to fetch user');
      return null;
    }
  }

  async getItems() {}
}
