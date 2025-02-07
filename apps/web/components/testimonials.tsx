import Image from "next/image";

export default function Testimonials(): React.JSX.Element {
  return (
    <div className="py-16 md:pb-32 net-pattern">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center font-montserrat mb-16 md:mb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-amethyst-200 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied users who love MindSketch
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex w-full flex-col gap-8 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-royal-blue-500/25 px-4 py-4 shadow-lg md:gap-60 md:px-8">
                <h3 className="mt-4 text-base font-medium text-gray-700 md:text-lg">
                  “Mindsketch is an absolute game-changer! The real-time
                  collaboration feature makes it incredibly easy to work with my
                  team, no matter where they are. We can brainstorm ideas,
                  sketch out diagrams, and refine our plans together in real
                  time. It&apos;s intuitive, fast, and perfect for creative
                  projects!”
                </h3>

                <div className="mb-4 flex items-start md:mb-0">
                  <div className="mr-4">
                    <Image
                      alt="avatar"
                      className="rounded-full"
                      height={48}
                      src="/avatar1.jpeg"
                      width={48}
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-base font-medium text-gray-700 md:text-lg">
                      Sophia R.
                    </h3>
                    <p className="text-xs font-bold text-gray-500 md:text-sm">
                      Product Manager
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/25 p-4 shadow-md md:gap-10">
                <h3 className="mt-2 text-base font-medium text-gray-700 md:text-lg">
                  “As a designer working with a remote team, Mindsketch has
                  become an essential tool for us. It feels like we&apos;re in
                  the same room, brainstorming on a whiteboard together. Highly
                  recommended!”
                </h3>

                <div className="mb-2 flex items-center md:mb-6">
                  <div className="mr-4">
                    <Image
                      alt="avatar"
                      className="rounded-full"
                      height={48}
                      src="/avatar4.jpeg"
                      width={48}
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-base font-medium text-gray-700 md:text-lg">
                      James T.
                    </h3>
                    <p className="text-xs font-bold text-gray-500 md:text-sm">
                      UX Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-8 lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2 w-full gap-4 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-amethyst-500/25 p-4 shadow-md md:gap-8">
                  <h3 className="text-base font-medium text-gray-700 md:text-lg my-2 md:mt-6 md:mb-12">
                    “Mindsketch has unlocked a whole new level of creativity for
                    me and my colleagues. Whether we&apos;re mapping out ideas
                    or creating detailed flowcharts, it&apos;s easy to use and
                    super effective. Plus, collaborating with others is seamless
                    and fun!”
                  </h3>

                  <div className="flex items-center">
                    <div className="mr-4">
                      <Image
                        alt="avatar"
                        className="rounded-full"
                        height={48}
                        src="/avatar3.jpeg"
                        width={48}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <h3 className="text-base font-medium text-gray-700 md:text-lg">
                        Ananya P.
                      </h3>
                      <p className="text-xs font-bold text-gray-500 md:text-sm">
                        Marketing Strategist
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex w-full flex-col gap-8 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-royal-blue-500/25 px-4 py-4 shadow-lg md:gap-60 md:px-8">
                  <h3 className="mt-4 text-base font-medium text-gray-700 md:text-lg">
                    “Mindsketch is the perfect platform for anyone who loves to
                    visualize their ideas. The interface is intuitive, and the
                    collaborative features are spot on. I&apos;ve used it for
                    everything from team planning sessions to teaching virtual
                    workshops. It&apos;s a must-have tool for modern
                    collaboration! The ability to seamlessly share ideas in real
                    time makes it an invaluable tool for both personal and
                    professional use.”
                  </h3>

                  <div className="flex items-start">
                    <div className="mr-4">
                      <Image
                        alt="avatar"
                        className="rounded-full"
                        height={48}
                        src="/avatar2.jpeg"
                        width={48}
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <h3 className="text-base font-medium text-gray-700 md:text-lg">
                        Lucas D.
                      </h3>
                      <p className="text-xs font-bold text-gray-500 md:text-sm">
                        Educator
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-[400px] w-full flex-col gap-8 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900 border border-royal-blue-500/25 shadow-lg md:h-auto md:gap-60">
                  <Image
                    alt="testimonial"
                    className="z-0 rounded-xl object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src="/testimonial.jpeg"
                  />

                  <div className="absolute bottom-4 left-4 z-10 flex h-10 w-1/2 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-900/25 p-4 backdrop-blur-md md:w-1/2">
                    <h1 className="text-sm font-medium text-white md:text-base">
                      Rajesh K., Software Engineers
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
