'use client';

import Loading from '@/components/Loading';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { useGetJobQuery } from '@/hooks/useJobHooks';
import { useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow, format } from 'date-fns';

const EmployerJobDetailsPage = () => {
  const params = useParams();
  const {
    data: job,
    isLoading,
    error,
  } = useGetJobQuery(params?.jobId as string);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return toast.error('Failed to fetch the details.');
  }

  console.log(job);

  return (
    <div className='p-5'>
      <Breadcrumb name='Job' />

      <Heading
        title='Job information'
        description='All details about the job'
      />

      <div className='mt-5'>
        <h2 className='text-3xl font-semibold tracking-tight'>{job?.name}</h2>
        <p className='font-medium'>
          Posted{' '}
          {formatDistanceToNow(new Date(job?.createdAt), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </p>

        <div className='grid grid-cols-6 mt-4 gap-3'>
          <div className='col-span-2'>
            <p className='font-semibold'>Company</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.company?.name}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Category</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.category?.name}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Location</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.location}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Salary</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.salary}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Job type</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.type}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Work type</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.workType}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Job description</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.description}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Requirements</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.requirement}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Schedule</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.schedule}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Start date</p>
          </div>
          <div className='col-span-4'>
            <p>{format(new Date(job?.startDate), 'PPP')}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Benefits</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.benefit}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Status</p>
          </div>
          <div className='col-span-4'>
            <p>{job?.status ? 'Active' : 'Inactive'}</p>
          </div>

          <div className='col-span-2'>
            <p className='font-semibold'>Posted</p>
          </div>
          <div className='col-span-4'>
            <p>{format(new Date(job?.createdAt), 'PPP')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobDetailsPage;
