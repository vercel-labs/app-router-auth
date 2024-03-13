"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signup } from "@/lib/auth"
import { useFormState, useFormStatus } from "react-dom"

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe" />
      </div>
      {state?.errors?.name && (
        <p className="text-red-500">{state.errors.name}</p>
      )}
      <div className="space-y-2">
        {/* TODO: Check if email is already used */}
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="john@example.com" />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SignupButton />
    </form>
  )
}

function SignupButton() {
  // TODO: Style button pending state
  const { pending } = useFormStatus()

  return (
    <Button className="w-full" type="submit">
      Register
    </Button>
  )
}