'use client';

import Loading from '@/components/Loading';
import EmployerSidebar from '@/components/employer/layout/EmployerSidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === 'authenticated';
  const unAuthorized = sessionStatus === 'unauthenticated';
  const loading = sessionStatus === 'loading';

  useEffect(() => {
    if (loading) return;

    if (unAuthorized) {
      console.log('not authorized');
      router.push('/login');
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  if (loading) {
    return <Loading />;
  }

  console.log(sessionStatus);

  return authorized ? (
    <div className='flex gap-3 h-full w-full min-h-screen p-5 flex-wrap'>
      <EmployerSidebar />
      <section className='border border-gray-200 p-3 rounded-lg flex-1'>
        {children}
      </section>
    </div>
  ) : (
    <></>
  );
};

export default EmployerLayout;
