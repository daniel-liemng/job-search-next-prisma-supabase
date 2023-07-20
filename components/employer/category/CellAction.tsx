import { Button } from '@/components/ui/button';
import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { CategoryColumn } from './Columns';

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div>
      <Button variant='outline' className='mr-2'>
        <HiOutlinePencilAlt className='mr-2 w-5 h-5' />
        Edit
      </Button>
      <Button variant='outline'>
        <HiOutlineTrash className='mr-2 w-5 h-5' />
        Delete
      </Button>
    </div>
  );
};

export default CellAction;
