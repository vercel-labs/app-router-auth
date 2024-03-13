import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';

const links = [
	{ href: '#', title: 'Home' },
	{ href: '#', title: 'About' },
	{ href: '#', title: 'Services' },
	{ href: '#', title: 'Contact' }
];

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="border-b dark:border-gray-700 border-gray-100">
				<div className="container flex items-center justify-end md:justify-between px-4 md:px-6 py-4 mx-auto max-w-7xl">
					<nav className="hidden md:flex items-center space-x-4 text-sm">
						{links.map((link) => (
							<Link className=" dark:text-white text-gray-900" href={link.href} key={link.title}>
								{link.title}
							</Link>
						))}
					</nav>
					<div className="hidden md:flex items-center space-x-4">
						<Link
							className="dark:text-black inline-flex h-8 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
							href="/login"
						>
							Login
						</Link>
					</div>
					<div className="md:hidden flex items-center space-x-4">
						<Link
							className="dark:text-black inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium"
							href="/login"
						>
							Login
						</Link>
						<button className="inline-flex rounded-md md:hidden" type="button">
							<MenuIcon className="w-6 h-6" />
							<span className="sr-only">Toggle Menu</span>
						</button>
					</div>
				</div>
			</div>

			<main className="flex-1 flex items-center justify-center">{children}</main>
		</div>
	);
}
