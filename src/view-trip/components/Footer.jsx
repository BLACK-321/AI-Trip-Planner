import React from 'react';

function Footer() {
  return (
    <footer className='bg-black text-white py-8 px-4 mt-20 border-t border-gray-100'>
      <div className='max-w-7xl mx-auto flex flex-col items-center justify-center'>
        
        {/* Social Icons */}
        <div className='flex space-x-6 mb-6 text-white'>
          {/* Twitter / X */}
          <a href="#" className='hover:opacity-75 transition-opacity'>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className='hover:opacity-75 transition-opacity'>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"></path>
            </svg>
          </a>
          {/* GitHub */}
          <a href="#" className='hover:opacity-75 transition-opacity'>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className='hover:opacity-75 transition-opacity'>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
            </svg>
          </a>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-wrap justify-center gap-6 md:gap-10 text-white font-medium mb-6'>
          <a href="#" className='hover:underline'>About</a>
          <a href="#" className='hover:underline'>Blog</a>
          <a href="#" className='hover:underline'>Press</a>
          <a href="#" className='hover:underline'>FAQ</a>
          <a href="#" className='hover:underline'>Contact</a>
        </div>

        {/* Divider */}
        <hr className='w-full max-w-2xl border-gray-200 mb-6' />

        {/* Copyright */}
        <p className='text-sm text-white text-center'>
          © 2026 Copyright, Inc. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;