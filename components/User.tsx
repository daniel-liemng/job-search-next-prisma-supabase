'use client';

import { useSession } from 'next-auth/react';

const User = () => {
  const { data, status, update } = useSession();

  return (
    <div>
      User
      <h1>Client side</h1>
      <h1>Data</h1>
      <pre>{JSON.stringify(data)}</pre>
      <h1>Status</h1>
      <pre>{JSON.stringify(status)}</pre>
      <h1>Update</h1>
      <pre>{JSON.stringify(update)}</pre>
    </div>
  );
};

export default User;
