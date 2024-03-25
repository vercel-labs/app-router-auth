import Link from 'next/link';
import { SignupForm } from '@/app/(public)/signup/form';
export default function Page() {
  return (
    <div className="flex w-1/4 items-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500">Enter your information to get started</p>
        </div>
        <SignupForm />
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link className="underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
