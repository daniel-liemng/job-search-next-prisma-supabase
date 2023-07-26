'use client';

import { ChangeEvent, SyntheticEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const RegisterPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/employer/dashboard');
    }
  }, [session, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.password2) {
      return toast.error('Password Do Not Match');
    }

    setIsLoading(true);
    axios
      .post('/api/register', registerData)
      .then(() => {
        toast.success('User has been registered');
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
          Create an account
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleRegisterSubmit} className='space-y-6'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              type='text'
              id='name'
              placeholder='Name'
              name='name'
              value={registerData.name}
              onChange={handleChange}
            />
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              id='email'
              placeholder='Email address'
              name='email'
              value={registerData.email}
              onChange={handleChange}
            />
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              placeholder='Password'
              name='password'
              value={registerData.password}
              onChange={handleChange}
            />
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='password2'>Confirm password</Label>
            <Input
              type='password'
              id='password2'
              placeholder='Confirm password'
              name='password2'
              value={registerData.password2}
              onChange={handleChange}
            />
          </div>

          <Button type='submit' className='w-full'>
            Register
          </Button>
        </form>

        <p className='mt-10 text-center text-sm text-gray-500'>
          A member?{' '}
          <Link
            href='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
