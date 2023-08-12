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
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Job } from '@/types/job';

const EmployerDashboardPage = () => {
  const { data: company } = useGetAllCompaniesQuery();
  const { data: category } = useGetAllCategories();
  const { data: job } = useGetAllJobsQuery();

  const activeJobs = job?.filter((job: Job) => job.status == true).length;
  const inactiveJobs = job?.filter((job: Job) => job.status == false).length;

  const data = [
    { name: 'Active', value: 6 },
    { name: 'Inactive', value: 4 },
  ];

  console.log('777', activeJobs);
  console.log('777', inactiveJobs);

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
          <h2 className='text-2xl mb-2 text-center'>Jobs</h2>
          <PieChartComponent
            activeJobs={activeJobs}
            inactiveJobs={inactiveJobs}
          />
        </div>
      </div>
    </>
  );
};

export default EmployerDashboardPage;
