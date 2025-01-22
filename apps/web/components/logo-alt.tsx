export default function LogoAlt(): React.JSX.Element {
  return (
    <div className='w-10 h-10 relative group'>
      <div className='absolute inset-0 bg-gradient-to-br from-royal-blue-500 to-amethyst-600 rounded-xl shadow-lg transform rotate-45 transition-all duration-300 group-hover:shadow-xl'></div>

      <div className='absolute inset-1.5 bg-amethyst-100 rounded-lg flex items-center justify-center backdrop-filter backdrop-blur-sm transition-all duration-300 group-hover:inset-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlSpace='preserve'
          width={500}
          height={500}
          viewBox='0 0 32 32'
        >
          <path
            d='M23.621 13.328 7.657 29.293 2 30l.707-5.657L18.672 8.379l4.949 4.949zm.707-.707 2.293-2.293-4.95-4.95-2.293 2.293 4.95 4.95zm4.542-7.37L26.749 3.13a2 2 0 0 0-2.828 0l-1.542 1.542 4.95 4.95L28.87 8.08a2 2 0 0 0 0-2.829z'
            style={{
              fill: "#a85fed",
            }}
          />
        </svg>
      </div>

      <div className='absolute inset-0 bg-amethyst-400 rounded-xl opacity-0 filter blur-xl transition-opacity duration-300 group-hover:opacity-20'></div>
    </div>
  );
}
