import { MoonLoader } from 'react-spinners';

const loading = () => {
  return (
    <div className='h-full w-full min-h-screen flex justify-center items-center'>
      <MoonLoader size={80} />
    </div>
  );
};

export default loading;
