'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { login } from '@/lib/auth';
import { useFormState, useFormStatus } from 'react-dom';

export default function Login() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="flex w-1/4 items-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm text-gray-500">
            Enter your email below to login to your account
          </p>
        </div>
        <form action={action}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" required type="password" name="password" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label className="text-sm" htmlFor="remember">
                Remember me
              </Label>
            </div>
            {state?.message && <p className="text-red-500">{state.message}</p>}
            <Button className="w-full">Login</Button>
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
      </div>
    </div>
  );
}
