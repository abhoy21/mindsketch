import { Button } from "@repo/ui/button";

export default function WorkingSection(): React.JSX.Element {
  return (
    <section className=' pt-16 min-h-screen overflow-hidden net-pattern'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center font-montserrat mb-16 md:mb-32'>
          <h2 className='text-3xl md:text-4xl font-bold text-amethyst-200 mb-4'>
            How MindSketch Works
          </h2>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
            Get started with MindSketch in three simple steps
          </p>
        </div>

        <div className='relative'>
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-royal-blue-500/40 to-royal-blue-400/20 hidden md:block'></div>

          <div className='space-y-16'>
            <div className='relative flex items-center md:justify-between flex-col md:flex-row'>
              <div className='md:w-5/12 text-center md:text-right'>
                <div className='bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 rounded-xl border border-amethyst-900 hover:border-royal-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-royal-blue-500/20'>
                  <h3 className='text-2xl font-semibold text-white mb-3'>
                    {" "}
                    Create Your Workspace
                  </h3>
                  <p className='text-gray-400'>
                    Sign up and create your personal workspace in seconds. No
                    complex setup required.
                  </p>
                </div>
              </div>

              <div className='hidden md:flex w-12 h-12 bg-gradient-to-r from-royal-blue-500 to-amethyst-500 rounded-full border border-neutral-900 absolute left-1/2 transform -translate-x-1/2  items-center justify-center shadow-lg shadow-royal-blue-500/50'>
                <span className='text-white font-montserrat'>1</span>
              </div>
              <div className='md:w-5/12'></div>
            </div>

            <div className='relative flex items-center md:justify-between flex-col md:flex-row '>
              <div className='md:w-5/12'></div>
              <div className='hidden md:flex w-12 h-12 bg-gradient-to-r from-royal-blue-500 to-amethyst-500 rounded-full border border-neutral-900 absolute left-1/2 transform -translate-x-1/2  items-center justify-center shadow-lg shadow-royal-blue-500/50'>
                <span className='text-white font-bold'>2</span>
              </div>
              <div className='md:w-5/12 text-center md:text-left'>
                <div className='bg-gradient-to-bl from-neutral-950 to-neutral-900 p-6 rounded-xl border border-amethyst-900 hover:border-royal-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-royal-blue-500/20'>
                  <h3
                    className='text-2xl font-semibold text-white mb-3'
                    id='el-fgjlz2pm'
                  >
                    Start Drawing
                  </h3>
                  <p className='text-gray-400' id='el-6ocdalxy'>
                    Use our intuitive tools to create diagrams. Choose from
                    templates or start from scratch.
                  </p>
                </div>
              </div>
            </div>

            <div className='relative flex items-center md:justify-between flex-col md:flex-row'>
              <div className='md:w-5/12 text-center md:text-right'>
                <div className='bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 rounded-xl border border-amethyst-900 hover:border-royal-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-royal-blue-500/20'>
                  <h3 className='text-2xl font-semibold text-white mb-3'>
                    {" "}
                    Create Your Workspace
                  </h3>
                  <p className='text-gray-400'>
                    Sign up and create your personal workspace in seconds. No
                    complex setup required.
                  </p>
                </div>
              </div>

              <div className='hidden md:flex w-12 h-12 bg-gradient-to-r from-royal-blue-500 to-amethyst-500 rounded-full border border-neutral-900 absolute left-1/2 transform -translate-x-1/2  items-center justify-center shadow-lg shadow-royal-blue-500/50'>
                <span className='text-white font-montserrat'>3</span>
              </div>
              <div className='md:w-5/12'></div>
            </div>
          </div>
        </div>

        <div className='text-center mt-16 md:mt-32'>
          <Button variant='primary' size='lg'>
            Start Creating Now
          </Button>
        </div>
      </div>
    </section>
  );
}
