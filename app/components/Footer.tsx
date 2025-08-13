import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primaryBlue text-center text-backgroundLight mt-auto">
      <div className="container mx-auto px-4 pt-6 pb-4">
        <div className="flex justify-center items-center space-x-6 md:space-x-8 lg:space-x-10">
          {/* LinkedIn Logo */}
          <a 
            className="text-backgroundLight hover:text-lightBlue transition-colors duration-300"
            href="https://www.linkedin.com/in/t-cleary/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current"
              viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>

          {/* Email Logo */}
          <a
            className="text-backgroundLight hover:text-lightBlue transition-colors duration-300"
            href="mailto:thomcleary15@gmail.com">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current"
              viewBox="0 0 32 32">
              <path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z"/>
            </svg>
          </a>

          {/* Indeed Logo */}
          <a 
            className="text-backgroundLight hover:text-lightBlue transition-colors duration-300"
            href="https://profile.indeed.com/p/thomasc-jjm1y5b">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current"
              viewBox="0 0 24 24">
              <path d="M14.822 10.308a3.018 3.018 0 111.32-4.038 3.006 3.006 0 01-1.32 4.044zM11.6.572c2.47-.901 5.294-.852 7.408.982a3.587 3.587 0 011.023 1.37c.213.69-.749-.07-.88-.168a9.407 9.407 0 00-2.15-1.095C12.837.386 8.897 2.707 6.463 6.316a19.505 19.505 0 00-2.248 5.126 2.918 2.918 0 01-.213.642c-.107.204-.049-.547-.049-.572a15.821 15.821 0 01.43-2.239C5.511 5.34 8.01 2.065 11.6.565zm.037 20.993v-8.763c.249.025.486.037.736.037a6.167 6.167 0 003.219-.895v9.62c0 .822-.15 1.43-.52 1.826A1.874 1.874 0 0113.62 24a1.825 1.825 0 01-1.427-.609c-.368-.404-.56-1.013-.56-1.825z" />
            </svg>
          </a>

          {/* GitHub Logo */}
          <a 
            className="text-backgroundLight hover:text-lightBlue transition-colors duration-300"
            href="https://github.com/ThomasCleary02">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current"
              viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Bluesky Logo */}
          <a 
            className="text-backgroundLight hover:text-lightBlue transition-colors duration-300"
            href="https://bsky.app/profile/thomasmcleary.bsky.social">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 fill-current"
              viewBox="0 -3.268 64 68.414">
              <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-primaryBlue p-4 text-center text-backgroundLight">
        © {new Date().getFullYear()} Copyright: 
  
        <a
          className="ml-1 text-backgroundLight hover:text-lightBlue transition-colors duration-300"
          href="https://www.linkedin.com/in/t-cleary/"
        >
          Thomas Cleary
        </a>
      </div>
    </footer>
  );
}
