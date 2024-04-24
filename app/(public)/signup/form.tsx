'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signup } from '@/app/auth/01-auth';
import { useFormState, useFormStatus } from 'react-dom';
import { PasswordInput } from '@/components/ui/PasswordInput ';
import { useState } from 'react';

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined);
  const [password, setPassword] = useState('');

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" />
        </div>
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="******"
          />
        </div>
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <SignupButton />
      </div>
    </form>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? 'Submitting...' : 'Sign up'}
    </Button>
  );
}
