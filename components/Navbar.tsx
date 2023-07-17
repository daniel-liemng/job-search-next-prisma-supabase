'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav className='border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center'>
          {/* <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8 mr-3'
            alt='Flowbite Logo'
          /> */}
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Job Search
          </span>
        </a>
        <button
          onClick={() => setShow((prev) => !prev)}
          data-collapse-toggle='navbar-hamburger'
          type='button'
          className='inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-hamburger'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className={`${show ? 'w-full' : 'hidden w-full'} `}
          id='navbar-hamburger'
        >
          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
            <li>
              <Link
                href='/'
                className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/login'
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href='/register'
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Register
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
