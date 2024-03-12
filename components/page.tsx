import Link from "next/link"

export function Page() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm">
        <div className="container flex items-center justify-between px-4 h-16 md:px-6">
          <nav className="hidden space-x-4 md:flex">
            <Link
              className="flex items-center text-sm font-semibold rounded-md padding-2 hover:underline "
              href="#"
            >
              Home
            </Link>
            <Link
              className="flex items-center text-sm font-semibold rounded-md padding-2 hover:underline"
              href="#"
            >
              About
            </Link>
            <Link
              className="flex items-center text-sm font-semibold rounded-md padding-2 hover:underline"
              href="#"
            >
              Services
            </Link>
            <Link
              className="flex items-center text-sm font-semibold rounded-md padding-2 hover:underline"
              href="#"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              className="flex items-center text-sm font-semibold rounded-md padding-2 hover:underline"
              href="#"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="container grid gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to our Platform
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The all-in-one platform for automating modern workflows. Let your
              team focus on shipping features instead of managing
              infrastructure.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
