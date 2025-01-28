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
  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
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
        <Input readOnly value={fullUrl} />
        <div className='flex gap-2 mt-4'>
          <Button
            variant='outline'
            size='sm'
            className='w-full'
            onClick={handleCopy}
          >
            Copy Link
          </Button>
          <Button
            variant='danger'
            size='sm'
            className='w-full'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
