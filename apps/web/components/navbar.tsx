import Button from "@repo/ui/button";

import Link from "next/link";
import Logo from "./logo";

export default function Navbar(): React.JSX.Element {
  return (
    <nav className='sticky top-1 left-0 right-0 z-50 mx-auto max-w-7xl sm:px-4 lg:px-8 rounded-2xl border border-amethyst-800 bg-neutral-900/5 backdrop-blur-md net-pattern-dark'>
      <div className='flex items-center justify-between'>
        <Logo />
        <Link href='/auth/signup'>
          <Button variant='primary' size='md' className='hidden md:flex'>
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
