import Button from "@repo/ui/button";

export default function CanvasZoomBar({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: (z: number) => void;
}): React.JSX.Element {
  return (
    <div className='flex gap-6 items-center justify-center m-1'>
      <Button variant='ghost' size='icon' onClick={() => setZoom(zoom + 10)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='text-white hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2'
          data-name='Line Color'
          viewBox='0 0 24 24'
        >
          <path
            d='M5 12h14m-7-7v14'
            style={{
              fill: "none",
              stroke: "#a7a7ac",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        </svg>
      </Button>
      <h3 className='font-mono text-[#a7a7ac]'>{zoom}%</h3>
      <Button variant='ghost' size='icon' onClick={() => setZoom(zoom - 10)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='text-white hover:bg-[#31303b] hover:scale-105 transition-all duration-300 ease-in-out rounded-md p-2'
          data-name='Line Color'
          viewBox='0 0 24 24'
        >
          <path
            d='M19 12H5'
            style={{
              fill: "none",
              stroke: "#a7a7ac",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        </svg>
      </Button>
    </div>
  );
}
