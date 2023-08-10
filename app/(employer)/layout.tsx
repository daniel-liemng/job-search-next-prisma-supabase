'use client';

import EmployerSidebar from '@/components/employer/layout/EmployerSidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      console.log('not authorized');
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className='flex gap-3 h-full w-full min-h-screen p-5 flex-wrap'>
      <EmployerSidebar />
      <section className='border border-gray-200 p-3 rounded-lg flex-1'>
        {children}
      </section>
    </div>
  );
};

export default EmployerLayout;
