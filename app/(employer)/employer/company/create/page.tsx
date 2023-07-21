import CompanyForm from '@/components/employer/company/CompanyForm';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';

const EmployerCompanyCreatePage = () => {
  return (
    <div className='p-5'>
      <Breadcrumb name='Company' />

      <Heading title='Create company' description='Create a new company' />

      <CompanyForm />
    </div>
  );
};

export default EmployerCompanyCreatePage;
