import Button from "@repo/ui/button";
import Input from "@repo/ui/input";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function CanvasShare({
  setShowModal,
}: {
  setShowModal: (s: boolean) => void;
}): React.JSX.Element {
  const pathName = usePathname();
  console.log("Pathname: ", pathName);
  const fullUrl = `${window.location.origin}${pathName}`;
  const roomCode = pathName.split("/canvas/")[1];
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };
  return (
    <div
      className='flex items-center justify-center z-[999] bg-[#232329] bg-opacity-20 backdrop-blur-md w-screen h-screen'
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setShowModal(false);
        }
      }}
    >
      <div className='p-9 m-2 bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/45 rounded-xl w-full max-w-md'>
        <div className='flex flex-col items-start'>
          <Logo />
          <h1 className='text-2xl font-semibold text-amethyst-200'>
            Share Canvas
          </h1>
          <p className='text-gray-400 text-center text-sm mb-6'>
            Share and collaborate with others!
          </p>
        </div>
        <div className='relative'>
          <p className='text-gray-400'>Full URL</p>
          <Input readOnly value={fullUrl} className='pr-16' />
          <div className='absolute right-4 top-12 -translate-y-1/2 text-gray-400 hover:text-royal-blue-700 transition-colors'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => handleCopy(fullUrl)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#a7a7ac'
                viewBox='0 0 24 24'
                className='h-5 w-5 hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out'
              >
                <path d='M21 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19.32.32 0 0 0-.09 0 .88.88 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z' />
              </svg>
            </Button>
          </div>
        </div>

        <div className='relative mt-4'>
          <p className='text-gray-400'>Room Code</p>
          <Input readOnly value={roomCode} className='pr-16' />
          <div className='absolute right-4 top-12 -translate-y-1/2 text-gray-400 hover:text-royal-blue-700 transition-colors'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => handleCopy(roomCode!)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#a7a7ac'
                viewBox='0 0 24 24'
                className='h-5 w-5 hover:bg-[#31303b]  hover:scale-105 transition-all duration-300 ease-in-out'
              >
                <path d='M21 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19.32.32 0 0 0-.09 0 .88.88 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z' />
              </svg>
            </Button>
          </div>
        </div>
        <div className='flex gap-2 mt-4'>
          <Button
            variant='danger'
            size='sm'
            className='w-full mt-4'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
