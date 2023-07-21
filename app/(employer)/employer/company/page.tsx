'use client';

import Loading from '@/components/Loading';
import { columns } from '@/components/employer/category/Columns';
import { DataTable } from '@/components/employer/category/DataTable';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { useGetAllCategories } from '@/hooks/useCategoryHooks';
import { Category } from '@/types/category';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi';

const EmployerCompanyPage = () => {
  // if (error) {
  //   toast.error('Something went wrong');
  // }

  return (
    <div className='p-5'>
      <Breadcrumb name='Company' />

      <Heading title='Company' description='Manage all companies' />

      <Button variant='outline' asChild className='mt-5'>
        <div>
          <HiPlus className='mr-2 h-5 w-5' />
          <Link href='/employer/company/create'>Add company</Link>
        </div>
      </Button>

      {/* {convertedCategories && (
        <div className='mt-6'>
          <DataTable columns={columns} data={convertedCategories} />
        </div>
      )} */}
    </div>
  );
};

export default EmployerCompanyPage;
