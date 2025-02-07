import Button from "@repo/ui/button";
import Link from "next/link";

export default function Hero(): React.JSX.Element {
  return (
    <section className="pt-16 min-h-screen overflow-hidden net-pattern">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-royal-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[400px] left-20 w-72 h-72 bg-amethyst-600/10 rounded-full blur-3xl"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32 relative">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <span className="px-4 py-2 bg-royal-blue-500/10 text-royal-blue-400 rounded-full text-sm font-medium inline-block">
                Design Better, Faster
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-montserrat text-white leading-tight tracking-tight">
                Create{" "}
                <span className="bg-gradient-to-r from-royal-blue-500 to-amethyst-500 text-transparent bg-clip-text">
                  Beautiful
                </span>{" "}
                Diagrams
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Transform your ideas into stunning visual diagrams instantly.
                Collaborate with your team in real-time and bring your thoughts
                to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/auth/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:translaye-y-[-2px] shadow-amethyst-500/25 shadow-lg"
                >
                  Get Started Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      id="el-qpvcrwmw"
                    ></path>
                  </svg>
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="shadow-lg">
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-gray-400 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-r from-amethyst-500 to-royal-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    id="el-3z33ysrh"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      id="el-b2b0b8ld"
                    ></path>
                  </svg>
                </div>
                <span className="text-xm">Free to Use</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gradient-to-r from-amethyst-500 to-royal-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    id="el-3z33ysrh"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      id="el-b2b0b8ld"
                    ></path>
                  </svg>
                </div>
                <span className="text-xm">Fast Experience</span>
              </div>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="w-full lg:w-3/5 mt-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-royal-blue-500/30 to-amethyst-500/30 blur-[120px] rounded-full"></div>

              <div className="relative bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border border-gray-800/50 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
                </div>

                <div className="aspect-video bg-neutral-800/50 rounded-xl overflow-hidden border border-gray-700/50">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                    <video src="/excalidraw.mp4" autoPlay muted loop />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
