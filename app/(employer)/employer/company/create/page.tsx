import CompanyForm from '@/components/employer/company/CompanyForm';
import Breadcrumb from '@/components/shared/Breadcrumb';

const EmployerCompanyCreatePage = () => {
  return (
    <div className='p-5'>
      <Breadcrumb name='Company' />

      <CompanyForm />
    </div>
  );
};

export default EmployerCompanyCreatePage;
