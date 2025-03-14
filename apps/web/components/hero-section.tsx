"use client";
import Button from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hero(): React.JSX.Element {
  const [videoError, setVideoError] = useState(false);
  return (
    <section className="py-16 md:py-24 min-h-screen overflow-hidden">
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
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-montserrat bg-gradient-to-br from-amethyst-200 to-amethyst-500 text-transparent bg-clip-text leading-tight tracking-tight py-2">
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
              <div className="absolute inset-0 bg-gradient-to-r from-royal-blue-500/30 to-amethyst-500/30 blur-[120px] rounded-full animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 border border-neutral-800/60 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-300 hover:scale-110"></div>
                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 hover:scale-110"></div>
                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-all duration-300 hover:scale-110"></div>
                  </div>

                  <div className="hidden md:flex bg-neutral-800/40 backdrop-blur-sm border border-neutral-700/20 rounded-full px-4 py-1.5 text-sm text-gray-300 shadow-inner">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2v20M2 12h20"></path>
                        </svg>
                      </div>
                      <span className="truncate font-medium">
                        mindsketch.abhoy.xyz
                      </span>
                    </div>
                  </div>
                </div>

                <div className="aspect-video bg-neutral-800/60 rounded-xl overflow-hidden border border-neutral-700/40 shadow-inner group relative">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium relative">
                    <div className="w-full h-full object-cover absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900"></div>

                    {!videoError ? (
                      <video
                        className="w-full h-full object-cover absolute inset-0 z-10"
                        autoPlay
                        playsInline
                        muted
                        loop
                        onError={() => setVideoError(true)}
                      >
                        <source src="/excalidraw.mp4" type="video/mp4" />
                      </video>
                    ) : null}

                    {videoError && (
                      <Image
                        src="/demo-fallback.png"
                        alt="Fallback image"
                        fill
                        style={{ objectFit: "cover" }}
                        className="absolute inset-0 z-20"
                        priority
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 text-center text-gray-400 text-sm font-medium">
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-indigo-400"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <span>Interactive whiteboard demonstration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        {/* Shadow overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-900/45 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-900/45 to-transparent z-10"></div>

        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div className="flex gap-8 animate-carousel opacity-50">
            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-amethyst-200 mb-3">
                Real-Time Collaboration
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Work together with your team in real-time. See changes instantly
                as they happen with smooth synchronization across all devices.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amethyst-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-amethyst-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-amethyst-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-royal-blue-200 mb-3">
                Intuitive Tools
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Powerful yet simple tools designed for productivity. Our
                intuitive interface makes complex tasks feel effortless and
                natural.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-royal-blue-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-royal-blue-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-royal-blue-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-amethyst-200 mb-3">
                Secure Sharing
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Share your work with confidence. Advanced encryption and
                granular permission controls keep your data protected at all
                times.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amethyst-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-amethyst-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-amethyst-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-amethyst-200 mb-3">
                Manage Rooms
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Create dedicated spaces for different projects. Organize your
                workflow with custom rooms that keep your team focused and
                aligned.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amethyst-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-amethyst-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-amethyst-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-royal-blue-200 mb-3">
                Smooth Experience
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Enjoy a seamless workflow with our optimized performance. Fast
                loading times and responsive design create a frictionless
                experience.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-royal-blue-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-royal-blue-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-royal-blue-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-6 w-72 rounded-xl bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-xl border border-gray-800/50 flex flex-col">
              <h3 className="text-xl font-semibold text-amethyst-200 mb-3">
                Export Anywhere
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Take your work wherever you need it. Export in multiple formats
                compatible with all your favorite tools and platforms.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-amethyst-500/20 to-transparent"></div>
              <div className="mt-4 flex justify-end">
                <div className="h-6 w-6 rounded-full bg-amethyst-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-amethyst-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
