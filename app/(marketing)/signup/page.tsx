import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
	return (
		<div className="flex items-center md:w-1/3 w-full p-6">
			<div className="w-full mx-auto space-y-8">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Create an account</h1>
					<p className="text-gray-500">Enter your information to get started</p>
				</div>
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" placeholder="John Doe" required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" placeholder="john@example.com" required />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" required type="password" />
				</div>
				<div className="space-y-2">
					<div className="flex items-center">
						<Checkbox id="terms" />
						<Label className="ml-2 leading-none" htmlFor="terms">
							I agree to the{' '}
							<Link className="underline" href="#">
								terms and conditions
							</Link>
						</Label>
					</div>
				</div>
				<Button className="w-full" type="submit">
					Register
				</Button>

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
