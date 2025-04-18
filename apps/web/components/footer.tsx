import Link from "next/link";

export default function Footer(): React.JSX.Element {
  return (
    <footer className='bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16 net-pattern'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16'>
          <div className='lg:col-span-2'>
            <h2 className='text-base md:text-2xl font-montserrat bg-gradient-to-r from-royal-blue-500 to-amethyst-500 text-transparent bg-clip-text'>
              MindSketch
            </h2>
            <p className='text-gray-400 mb-6 max-w-md'>
              Create beautiful diagrams in real-time with the most intuitive
              diagramming tool for teams and individuals.
            </p>

            <div className='flex space-x-4'>
              <Link
                href='#'
                className='text-gray-400 hover:text-royal-blue-500 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  id='el-n8tkjli7'
                >
                  <path
                    d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                    id='el-b2c74t4c'
                  ></path>
                </svg>
              </Link>

              <Link
                href='#'
                className='text-gray-400 hover:text-royal-blue-500 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  id='el-h4jetv3x'
                >
                  <path
                    d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z'
                    id='el-vpaa716u'
                  ></path>
                </svg>
              </Link>

              <Link
                href='#'
                className='text-gray-400 hover:text-royal-blue-500 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  id='el-1wsyz5n5'
                >
                  <path
                    d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
                    id='el-tvt96s9j'
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Product</h3>
            <ul className='space-y-3'>
              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Features
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Testimonials
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Company</h3>

            <ul className='space-y-3'>
              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  About Us
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Careers
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Support</h3>

            <ul className='space-y-3'>
              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Help Center
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Documentation
                </Link>
              </li>

              <li id='el-swct3au0'>
                <Link
                  href='#features'
                  className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-neutral-800 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-gray-400 text-sm'>
              © 2025 MindSketch. All rights reserved.
            </div>
            <div className='flex space-x-6 text-sm' id='el-szp743qg'>
              <Link
                href='#'
                className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                id='el-005uxamv'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-gray-400 hover:text-royal-blue-500 transition-colors'
                id='el-005uxamv'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
