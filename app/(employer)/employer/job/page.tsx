'use client';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi';

import Loading from '@/components/Loading';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';

import { useGetAllJobs } from '@/hooks/useJobHooks';
import { DataTable } from '@/components/employer/job/DataTable';
import { columns } from '@/components/employer/job/Columns';

const EmployerJobPage = () => {
  const { data: jobs, isLoading, error } = useGetAllJobs();

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <div className='p-5'>
      <Breadcrumb name='Job' />

      <Heading title='Job' description='Manage all jobs' />

      <Button variant='outline' asChild className='mt-5'>
        <div>
          <HiPlus className='mr-2 h-5 w-5' />
          <Link href='/employer/job/create'>Add job</Link>
        </div>
      </Button>

      {isLoading ? (
        <Loading />
      ) : (
        <div className='mx-auto pt-6'>
          <DataTable columns={columns} data={jobs} />
        </div>
      )}
    </div>
  );
};

export default EmployerJobPage;
