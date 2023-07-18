'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      DashboardPage
      <h1>{session?.user?.email}</h1>
    </div>
  );
};

export default DashboardPage;
