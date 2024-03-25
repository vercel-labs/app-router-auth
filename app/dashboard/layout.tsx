import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import LogoutButton from './logout-button';
import { PackageIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { getUser } from '@/app/auth/03-dal';

const navLinks = [
  { title: 'Home', href: '/dashboard', badge: 0 },
  { title: 'Orders', href: '#', badge: 3 },
  { title: 'Products', href: '#', badge: 0 },
  { title: 'Customers', href: '#', badge: 0 },
  { title: 'Analytics', href: '#', badge: 0 },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const activeLink = '/dashboard';

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-80 border-r lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <PackageIcon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  className={`${
                    activeLink === link.href
                      ? 'bg-gray-100 text-gray-900 hover:text-gray-900'
                      : ''
                  } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900`}
                  href={link.href}
                  key={link.title}
                >
                  <span>{link.title}</span>
                  {link.badge > 0 && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <header className="flex h-14 items-center border-b px-4 md:gap-4">
          <Link
            className="flex items-center rounded-md bg-gray-100 px-2 py-2 lg:hidden"
            href="#"
          >
            <PackageIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <h1 className="md:blobk hidden text-lg font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <form>
              <div className="relative">
                <Input
                  className="bg-gray-100/60 md:w-[200px]"
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
                  objectFit: 'cover',
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
