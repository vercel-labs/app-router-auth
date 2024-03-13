import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	HomeIcon,
	LineChartIcon,
	LogOutIcon,
	PackageIcon,
	ShoppingCartIcon,
	UsersIcon
} from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex min-h-screen w-full">
			<div className="hidden border-r dark:border-gray-700 lg:block w-80">
				<div className="flex h-full flex-col gap-2">
					<div className="flex h-14 items-center border-b dark:border-gray-700 px-4">
						<Link className="flex items-center gap-2 font-semibold" href="#">
							<PackageIcon className="h-6 w-6" />
							<span className="">Acme Inc</span>
						</Link>
					</div>
					<div className="flex-1 overflow-auto py-2">
						<nav className="grid items-start px-4 text-sm font-medium">
							<Link
								className="flex items-center gap-3  text-gray-900 bg-gray-100 rounded-lg px-3 py-2 transition-all hover:text-gray-900 hover:dark:text-gray-300"
								href="#"
							>
								<HomeIcon className="h-4 w-4" />
								Home
							</Link>
							<Link
								className="hover:dark:text-gray-300 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
								href="#"
							>
								<ShoppingCartIcon className="h-4 w-4" />
								Orders
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									3
								</Badge>
							</Link>
							<Link
								className="hover:dark:text-gray-300 flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500  hover:text-gray-900"
								href="#"
							>
								<PackageIcon className="h-4 w-4" />
								Products
							</Link>
							<Link
								className="hover:dark:text-gray-300 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
								href="#"
							>
								<UsersIcon className="h-4 w-4" />
								Customers
							</Link>
							<Link
								className="hover:dark:text-gray-300 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
								href="#"
							>
								<LineChartIcon className="h-4 w-4" />
								Analytics
							</Link>
						</nav>
					</div>
					<div className="border-t dark:border-gray-700 p-4">
						<Link
							className="hover:dark:text-gray-300 font-medium flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 text-sm transition-all hover:text-gray-900"
							href="#"
						>
							<LogOutIcon className="h-4 w-4" />
							Logout
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full">
				<header className="flex h-14 items-center md:gap-4 border-b dark:border-gray-700 px-4">
					<Link className="lg:hidden flex items-center rounded-md bg-gray-100 px-2 py-2" href="#">
						<PackageIcon className="h-6 w-6" />
						<span className="sr-only">Home</span>
					</Link>
					<h1 className="hidden md:blobk font-semibold text-lg">Dashboard</h1>
					<div className="ml-auto flex items-center md:gap-4">
						<form>
							<div className="relative">
								<Input
									className="md:w-[200px] bg-gray-100/60"
									placeholder="Search orders..."
									type="search"
								/>
							</div>
						</form>
						<Button className="rounded-full" size="icon" variant="ghost">
							<Image
								alt="Avatar"
								className="rounded-full"
								height="32"
								src="/placeholder.svg"
								style={{
									aspectRatio: '32/32',
									objectFit: 'cover'
								}}
								width="32"
							/>
							<span className="sr-only">View profile</span>
						</Button>
					</div>
				</header>
				<main className="flex-1 p-4 md:p-6">{children}</main>
			</div>
		</div>
	);
}
