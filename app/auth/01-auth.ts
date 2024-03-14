// This file includes the authentication logic for
// signing up, logging in, and logging out using Server Actions.
// See `02-` for the session management logic.

// We're querying the database directly
// but at this point, we should recommend calling an Auth Provider's API.

'use server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import {
  FormState,
  LoginFormSchema,
  SignupFormSchema,
} from '@/app/auth/definitions';
import { createSession, deleteSession } from '@/app/auth/02-client-session';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
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

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // 2. If any form fields are invalid, return early and display errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 3. Query the database for the user with the given email
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedFields.data.email),
    });

    // If user is not found, return early and display an error
    if (!user) {
      return errorMessage;
    }
    // 4. Compare the user's password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      validatedFields.data.password,
      user.password,
    );

    // If the password does not match, return early and display an error
    if (!passwordMatch) {
      return errorMessage;
    }

    // 5. If login successful, create a session for the user
    await createSession(user.id);
  } catch (error) {
    return errorMessage;
  }
}

export async function logout() {
  deleteSession();
  redirect('/login');
}
