'use client';

import JobForm from '@/components/employer/job/JobForm';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useGetJobQuery } from '@/hooks/useJobHooks';
import { useParams } from 'next/navigation';

const EmployerUpdateJobPage = () => {
  const params = useParams();
  const {
    data: job,
    isLoading: isFetchLoading,
    error: fetchingError,
  } = useGetJobQuery(params?.jobId as string);

  return (
    <div className='p-5'>
      <Breadcrumb name='Job' />

      <JobForm />
    </div>
  );
};

export default EmployerUpdateJobPage;
