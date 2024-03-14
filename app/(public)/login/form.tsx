'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/app/auth/01-auth';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
  return (
    <form action={action}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            type="email"
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="ml-auto inline-block text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" name="password" />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
        </div>
        {state?.message && <p className="text-red-500">{state.message}</p>}
        <LoginFormButton />
        <Button className="w-full" variant="outline">
          Login with Google
        </Button>
      </div>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
}

function LoginFormButton() {
  // TODO: Style button pending state

  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit">
      Login
    </Button>
  );
}
