import Link from 'next/link';
import { MenuIcon } from '@/components/ui/icons';

const links = [
  { href: '#', title: 'Home' },
  { href: '#', title: 'About' },
  { href: '#', title: 'Services' },
  { href: '#', title: 'Contact' },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto flex max-w-7xl items-center justify-end px-4 py-4 md:justify-between md:px-6">
          <nav className="hidden items-center space-x-4 text-sm md:flex">
            {links.map((link) => (
              <Link
                className=" text-gray-900 dark:text-white"
                href={link.href}
                key={link.title}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              className="inline-flex h-8 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-black"
              href="/login"
            >
              Login
            </Link>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              className="inline-flex h-8 items-center rounded-md border border-gray-200 bg-white px-3 text-sm font-medium dark:text-black"
              href="/login"
            >
              Login
            </Link>
            <button className="inline-flex rounded-md md:hidden" type="button">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  );
}
