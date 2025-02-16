import Button from "@repo/ui/button";

export default function ZoomBar({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: (s: number) => void;
}) {
  return (
    <div className="flex space-x-2 items-center justify-center m-1">
      <Button
        id="hand"
        variant="ghost"
        size="icon"
        onClick={() => setZoom(zoom + 0.1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          preserveAspectRatio="xMinYMin"
          viewBox="-4.5 -4.5 24 24"
          fill="#a7a7ac"
        >
          <path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z" />
        </svg>
      </Button>

      <p className="text-gray-400 text-[0.75rem]">{Math.round(zoom * 100)}%</p>

      <Button
        id="hand"
        variant="ghost"
        size="icon"
        onClick={() => setZoom(zoom - 0.1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin"
          viewBox="-5 -11 24 24"
          fill="#a7a7ac"
          className="h-5 w-5 "
        >
          <path d="M1 0h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
        </svg>
      </Button>
    </div>
  );
}
