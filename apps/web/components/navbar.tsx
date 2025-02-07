import Button from "@repo/ui/button";

import Link from "next/link";
import Logo from "./logo";

export default function Navbar(): React.JSX.Element {
  return (
    <nav className="sticky top-2 left-0 right-0 z-50 max-w-7xl mx-auto sm:px-4 lg:px-8 border border-amethyst-900 bg-neutral-900/10 backdrop-blur-md rounded-2xl">
      <div className="flex h-16 md:h-20 items-center justify-between py-4 px-4">
        <Logo />

        <div className="hidden md:flex items-center space-x-8 ">
          <Link
            className="text-base text-gray-500 duration-300 ease-in-out hover:text-supernova-600"
            href="/home"
          >
            Features
          </Link>
          <Link
            className="text-base text-gray-500 duration-300 ease-in-out hover:text-supernova-600"
            href="/home"
          >
            Solutions
          </Link>
          <Link
            className="text-base text-gray-500 duration-300 ease-in-out hover:text-supernova-600"
            href="/home"
          >
            Pricing
          </Link>
          <Link
            className="text-base text-gray-500 duration-300 ease-in-out hover:text-supernova-600"
            href="/home"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-2">
          <Link href="/auth/signin">
            <Button variant="outline" className="hover:text-supernova-950">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="text-supernova-950 hover:text-supernova-500">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
