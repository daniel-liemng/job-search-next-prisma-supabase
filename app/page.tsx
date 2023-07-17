import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import User from '@/components/User';

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      HomePage
      <h1>Server side</h1>
      <pre>{JSON.stringify(session)}</pre>
      <User />
    </div>
  );
};

export default HomePage;
