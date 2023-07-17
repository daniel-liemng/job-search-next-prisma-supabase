'use client';

import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      DashboardPage
      <h1>{session?.user?.email}</h1>
    </div>
  );
};

export default DashboardPage;
