import JobForm from '@/components/employer/job/JobForm';
import Breadcrumb from '@/components/shared/Breadcrumb';

const EmployerUpdateJobPage = () => {
  return (
    <div className='p-5'>
      <Breadcrumb name='Job' />

      <JobForm />
    </div>
  );
};

export default EmployerUpdateJobPage;
