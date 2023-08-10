'use client';

import Loading from '@/components/Loading';
import { columns } from '@/components/employer/category/Columns';
import { DataTable } from '@/components/employer/category/DataTable';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { useGetAllCategories } from '@/hooks/useCategoryHooks';
import { Category } from '@/types/category';
import { toast } from 'react-hot-toast';

const EmployerCategoryPage = () => {
  const { data: categories, isLoading, error } = useGetAllCategories();

  const convertedCategories = categories?.map((cat: Category) => ({
    id: cat.id,
    name: cat.name,
  }));

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <div className='p-5'>
      <Breadcrumb name='Category' />

      <Heading title='Category' description='Manage all categories' />

      {/* {isLoading && <Loading />} */}

      {convertedCategories && (
        <div className='mt-6'>
          <DataTable columns={columns} data={convertedCategories} />
        </div>
      )}
    </div>
  );
};

export default EmployerCategoryPage;
