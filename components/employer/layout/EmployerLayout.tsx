import React, { useEffect } from 'react';
import EmployerNavbar from './EmployerNavbar';
import EmployerSidebar from './EmployerSidebar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === 'authenticated';
  const unAuthorized = sessionStatus === 'unauthenticated';
  const loading = sessionStatus === 'loading';

  useEffect(() => {
    if (loading || !router.isReady) return;

    if (unAuthorized) {
      console.log('not authorized');
      router.push({
        pathname: '/',
        query: { returnUrl: router.asPath },
      });
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  // if the user refreshed the page or somehow navigated to the protected page
  if (loading) {
    return <>Loading app...</>;
  }

  return authorized ? (
    <div className='w-full '>
      <EmployerNavbar />
      <div className='w-full flex gap-5'>
        <div>
          <EmployerSidebar></EmployerSidebar>
        </div>
        <div className='w-full flex'>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default EmployerLayout;
