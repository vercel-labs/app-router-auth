import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Page() {
	return (
		<div className="grid gap-4 md:gap-8">
			<Card>
				<CardHeader>
					<CardTitle>Today&apos;s Orders</CardTitle>
					<CardDescription>Your orders for today. Keep up the good work!</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-4">
						<Card>
							<CardContent className="flex flex-col md:flex-row md:items-center gap-4 py-4">
								<Image
									alt="Image"
									className="rounded-md object-cover"
									height="64"
									src="/placeholder.svg"
									style={{
										aspectRatio: '64/64',
										objectFit: 'cover'
									}}
									width="64"
								/>
								<div className="flex-1 grid gap-1">
									<h3 className="font-semibold">Crispy Chicken Burger</h3>
									<p className="text-sm text-gray-500">Order ID: #123456</p>
								</div>
								<Button size="sm">Track</Button>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col md:flex-row md:items-center gap-4 py-4">
								<Image
									alt="Image"
									className="rounded-md object-cover"
									height="64"
									src="/placeholder.svg"
									style={{
										aspectRatio: '64/64',
										objectFit: 'cover'
									}}
									width="64"
								/>
								<div className="flex-1 grid gap-1">
									<h3 className="font-semibold">Iced Latte</h3>
									<p className="text-sm text-gray-500">Order ID: #654321</p>
								</div>
								<Button size="sm">Track</Button>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="flex flex-col md:flex-row md:items-center gap-4 py-4">
								<Image
									alt="Image"
									className="rounded-md object-cover"
									height="64"
									src="/placeholder.svg"
									style={{
										aspectRatio: '64/64',
										objectFit: 'cover'
									}}
									width="64"
								/>
								<div className="flex-1 grid gap-1">
									<h3 className="font-semibold">Pepperoni Pizza</h3>
									<p className="text-sm text-gray-500">Order ID: #987654</p>
								</div>
								<Button size="sm">Track</Button>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
