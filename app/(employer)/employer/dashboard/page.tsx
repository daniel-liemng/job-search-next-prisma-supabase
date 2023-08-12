'use client';

import {
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineLibrary,
} from 'react-icons/hi';

import NumberCard from '@/components/employer/dashboard/NumberCard';
import { useGetAllCompaniesQuery } from '@/hooks/useCompanyHooks';
import { useGetAllCategories } from '@/hooks/useCategoryHooks';
import { useGetAllJobsQuery } from '@/hooks/useJobHooks';
import PieChartComponent from '@/components/employer/dashboard/PieChartComponent';
import { Job } from '@/types/job';
import BarChartComponent from '@/components/employer/dashboard/BarChartComponent';

const EmployerDashboardPage = () => {
  const { data: company } = useGetAllCompaniesQuery();
  const { data: category } = useGetAllCategories();
  const { data: job } = useGetAllJobsQuery();

  const activeJobs = job?.filter((job: Job) => job.status == true).length;
  const inactiveJobs = job?.filter((job: Job) => job.status == false).length;

  const monthJobCountArr = new Array(12).fill(0);
  job?.forEach(
    ({ startDate }: { startDate: string }) =>
      (monthJobCountArr[new Date(startDate).getMonth()] += 1)
  );

  return (
    <>
      <div className='flex items-center gap-4 justify-center flex-wrap mt-5'>
        <NumberCard
          icon={<HiOutlineLibrary className='h-12 w-12' />}
          text='Company'
          number={company?.length}
        />
        <NumberCard
          icon={<HiOutlineCollection className='h-12 w-12' />}
          text='Category'
          number={category?.length}
        />
        <NumberCard
          icon={<HiOutlineCube className='h-12 w-12' />}
          text='Job'
          number={job?.length}
        />
      </div>

      <div className='p-5'>
        <div className='w-[250px] h-[250px]'>
          <h2 className='text-xl mb-2 text-center'>Jobs</h2>
          <PieChartComponent
            activeJobs={activeJobs}
            inactiveJobs={inactiveJobs}
          />
        </div>
      </div>

      <div className='p-5 w-full h-[400px]'>
        <BarChartComponent jobData={monthJobCountArr} />
      </div>
    </>
  );
};

export default EmployerDashboardPage;
