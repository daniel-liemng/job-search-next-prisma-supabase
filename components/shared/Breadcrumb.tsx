import Link from 'next/link';
import React from 'react';
import { HiHome, HiOutlineChevronRight } from 'react-icons/hi';

interface BreadcrumbProps {
  name: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ name }) => {
  return (
    <div className='flex gap-2'>
      <Link href='/employer/dashboard' className='flex'>
        <HiHome className='mr-2 w-6 h-6' />
        <p>Home</p>
      </Link>
      <HiOutlineChevronRight className='w-6 h-6' />
      <p>{name}</p>
    </div>
  );
};

export default Breadcrumb;
