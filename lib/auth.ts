// this file includes the authentication logic for
// signing up, logging in, and logging out.
// see `session.ts` for the session management logic.

'use server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // 2. If any form fields are invalid, return early and display errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // 3.1 Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Insert the user into the database
  try {
    const data = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id });

    // 5. Create a session for the user
    if (data && data.length > 0) {
      const user = data[0];
      await createSession(user.id);
    }
  } catch (error) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
}

export async function login(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // 2. If any form fields are invalid, return early and display errors
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 3. Query the database for the user with the given email
    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedFields.data.email),
    });

    // If user is not found, return an error
    if (!user) {
      return {
        message: 'No user found with that email.',
      };
    }

    // 4. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      validatedFields.data.password,
      user.password,
    );

    // If the password does not match, return an error
    if (!passwordMatch) {
      return {
        message: 'Invalid login credentials.',
      };
    }

    // 5. If the password is correct, create a session for the user
    await createSession(user.id);
  } catch (error) {
    return {
      message: 'An error occurred while logging in to your account.',
    };
  }
}

export async function logout() {
  console.log('logging out');
  deleteSession();
  redirect('/login');
}
