import Image from "next/image";
import Link from "next/link";

export default function ProductDescription(): React.JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden my-16 sm:my-24">
      <div className="max-w-3xl mt-6 md:mt-12 lg:mt-16 flex flex-col items-start justify-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-br from-amethyst-200 to-amethyst-500 text-3xl md:text-5xl lg:text-7xl font-montserrat tracking-tighter pb-2">
          Create stunning diagrams with ease.
        </h2>
        <p className="text-lg text-start font-medium text-amethyst-300 leading-loose mt-6">
          ... so you don&apos;t have to worry. Whether you&apos;re a student, a
          professional, or just a person on the the internet. You can easily
          create diagrams.
        </p>
      </div>

      <div className="max-w-7xl mt-6 md:mt-12 lg:mt-16 grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-amethyst-900/45 bg-neutral-900 px-4 py-8 shadow-sm bg-neutral-900/50 backdrop-blur-md ">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="absolute inset-0 top-10 left-[2rem] w-32 h-20 bg-amethyst-600/50 rounded-full blur-3xl"></div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950/75 backdrop-blur-xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amethyst-500"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-base text-gray-400">
            Effortlessly create diagrams in one place for quick access and
            visualizing your ideas in a visually appealing way.
          </p>
        </div>

        <div className="rounded-xl border border-amethyst-900/45 bg-neutral-900 px-4 py-8 shadow-sm bg-neutral-900/50 backdrop-blur-md">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="absolute inset-0 top-10 right-[3rem] w-24 h-24 bg-amethyst-600/50 rounded-full blur-3xl"></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950/75 backdrop-blur-xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amethyst-500"
              >
                <path
                  d="M18 20V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 20V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 20V14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-base text-gray-400">
            Transform complex data into compelling visuals. Our AI turns your
            raw information into engaging diagrams instantly that you can share
            .
          </p>
        </div>

        <div className="rounded-xl border border-amethyst-900/45 bg-neutral-900 px-4 py-8 shadow-sm bg-neutral-900/50 backdrop-blur-md">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="absolute inset-0 top-0 left-[16rem] w-24 h-24 bg-amethyst-600/50 rounded-full blur-3xl"></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950/75 backdrop-blur-xl">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amethyst-500"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-base text-gray-400">
            with MindSketch, you can easily create stunning diagrams in minutes
            using defined shapes and colors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-12 lg:mt-16">
        <h1 className="text-left tracking-tighter text-3xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-amethyst-200 to-amethyst-500 pb-6 md:pb-8 lg:pb-10">
          Sounds awesome right?
        </h1>

        <div className="relative h-[24rem] md:h-[32rem] rounded-3xl border border-amethyst-900/45 bg-neutral-950 px-4 py-8 shadow-sm overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-50">
            <Image
              src="/github.webp"
              alt="Github"
              layout="fill"
              objectFit="cover"
              className="mix-blend-overlay"
            />
          </div>

          {/* Content */}
          <div className="relative inset-0 top-[7rem] z-10 flex flex-col items-center justify-center">
            <h3 className="text-lg md:text-xl lg:text-3xl font-montserrat tracking-tighter text-amethyst-300 mb-4">
              And yes! It&apos;s open source
            </h3>

            <p className="text-base text-center text-gray-400 max-w-lg mx-auto mb-6">
              you can check out the code on Github yourself
            </p>

            <Link
              href="/"
              className="font-semibold text-lg text-amethyst-400 hover:text-amethyst-200 rounded-xl p-2 sm:p-4 flex items-center gap-2 border border-amethyst-950"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                viewBox="0 0 24 24"
                fill="#a85fed"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              Star us on Github
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
