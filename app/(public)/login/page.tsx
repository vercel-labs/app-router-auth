import { LoginForm } from './form';

export default function Page() {
  return (
    <div className="flex w-1/4 items-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm text-gray-500">
            Enter your email below to login to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
