import { MoonLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <MoonLoader size={5} color='#4f46e5' />
    </div>
  );
};

export default Loading;
