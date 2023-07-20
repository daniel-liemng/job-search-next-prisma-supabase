'use client';

import Loading from '@/components/Loading';
import { columns } from '@/components/employer/category/Columns';
import { DataTable } from '@/components/employer/category/DataTable';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { useGetAllCategories } from '@/hooks/categoryHooks';
import { Category } from '@/types/category';
import { toast } from 'react-hot-toast';

const EmployerCategoryPage = () => {
  const { data: categories, isLoading, error } = useGetAllCategories();

  const convertedCategories = categories?.map((cat: Category) => ({
    id: cat.id,
    name: cat.name,
  }));

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <div className='p-5'>
      <Breadcrumb name='Category' />
      <h2 className='text-3xl text-gray-900 my-6 font-semibold'>
        All categories
      </h2>

      {isLoading && <Loading />}

      {convertedCategories && (
        <div className='mt-6'>
          <DataTable columns={columns} data={convertedCategories} />
        </div>
      )}
    </div>
  );
};

export default EmployerCategoryPage;
