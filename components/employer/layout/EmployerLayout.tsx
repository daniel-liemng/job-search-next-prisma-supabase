import React from 'react';
import EmployerNavbar from './EmployerNavbar';
import EmployerSidebar from './EmployerSidebar';

const EmployerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full '>
      <EmployerNavbar />
      <div className='w-full flex gap-5'>
        <div>
          <EmployerSidebar></EmployerSidebar>
        </div>
        <div className='w-full flex'>{children}</div>
      </div>
    </div>
  );
};

export default EmployerLayout;
