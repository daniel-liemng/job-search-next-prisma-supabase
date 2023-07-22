'use client';

import Loading from '@/components/Loading';
import { columns } from '@/components/employer/company/Columns';
import { DataTable } from '@/components/employer/company/DataTable';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';

import { useGetAllCompanies } from '@/hooks/useCompanyHooks';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi';

const EmployerCompanyPage = () => {
  const { data: companies, isLoading, error } = useGetAllCompanies();

  // const convertedCompanies = companies?.map((com: Company) => ({
  //   id: com.id,
  //   name: com.name,
  //   industry: com.industry,
  //   address: com.address,
  //   city: com.city,
  // }));

  if (error) {
    toast.error('Something went wrong');
  }

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

      {isLoading ? (
        <Loading />
      ) : (
        <div className='mx-auto pt-6'>
          <DataTable columns={columns} data={companies} />
        </div>
      )}
    </div>
  );
};

export default EmployerCompanyPage;
