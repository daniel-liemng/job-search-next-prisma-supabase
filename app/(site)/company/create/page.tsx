import CreateCompanyForm from '@/components/company/CreateCompanyForm';
import React from 'react';

const CreateCompany = () => {
  return (
    <div className='container mx-auto px-10 mt-10'>
      <div className='flex justify-center'>
        <div className='p-8 bg-gradient-to-tr from-gray-200 to-indigo-400 min-w-[400px] rounded-xl'>
          <h1 className='text-3xl text-gray-800 text-center '>
            Create a company
          </h1>
        </div>
      </div>

      <CreateCompanyForm />
    </div>
  );
};

export default CreateCompany;
