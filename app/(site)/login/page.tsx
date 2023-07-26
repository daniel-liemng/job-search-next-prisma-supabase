'use client';

import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';

const LoginPage = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (session?.status === 'authenticated') {
  //     router.push('/employer/dashboard');
  //   }
  // }, []);

  useEffect(() => {
    if (session && !isRedirecting) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      setTimeout(() => {
        // redirect to the return url or home page
        router.push('/employer/dashboard');
      }, 2000);
    }
  }, [session, isRedirecting, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      return toast.error('Missing Fields');
    }

    setIsLoading(true);
    signIn('credentials', { ...loginData, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success('User has been logged in');
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleLoginSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                value={loginData.email}
                onChange={handleChange}
                type='email'
                // required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                type='password'
                // required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>

        <div className='inline-flex items-center justify-center w-full'>
          <hr className='w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
          <span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900'>
            or
          </span>
        </div>

        <button
          onClick={() => signIn('github')}
          type='button'
          className='w-full text-black bg-white border border-gray-400 hover:bg-indigo-600 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center justify-center   mr-2 mb-2'
        >
          <svg
            className='w-4 h-4 mr-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
              clipRule='evenodd'
            />
          </svg>
          Sign in with Github
        </button>

        <button
          onClick={() => signIn('google')}
          type='button'
          className='text-black bg-white hover:bg-indigo-600 hover:text-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center justify-center mr-2 mb-2 border border-gray-400 w-full mt-2'
        >
          <svg
            className='w-4 h-4 mr-2'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 19'
          >
            <path
              fillRule='evenodd'
              d='M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z'
              clipRule='evenodd'
            />
          </svg>
          Sign in with Google
        </button>

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?{' '}
          <Link
            href='/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
