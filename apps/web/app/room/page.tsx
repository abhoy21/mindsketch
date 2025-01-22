import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import Link from "next/link";
import Logo from "../../components/logo";

export default function Room(): React.JSX.Element {
  return (
    <div className='bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 w-screen h-screen flex items-center justify-center'>
      <div className='p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-md'>
        <div className='flex flex-col items-start'>
          <Logo />
          <h1 className='text-2xl font-semibold text-amethyst-200'>
            Create Room
          </h1>
          <p className='text-gray-400 text-center text-sm mb-6'>
            Create room to start drawing diagrams!
          </p>
        </div>

        <form className='space-y-4'>
          <Input placeholder='Enter Room name' type='text' />
          <Button className='w-full'>Create Room</Button>

          <p className='text-gray-400'>
            If you want to join a room, please click here.{" "}
            <Link
              href='#'
              className='font-semibold text-amethyst-300 hover:text-royal-blue-400 transition-colors'
            >
              Join
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
