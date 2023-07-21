import {
  HiOutlineInformationCircle,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';

import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CompanyColumn } from './Columns';

import { Button } from '@/components/ui/button';

interface CellActionProps {
  data: CompanyColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className='flex items-center'>
              <HiOutlineInformationCircle className='mr-2 w-5 h-5' />
              Info
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className='flex items-center'>
              <HiOutlinePencilAlt className='mr-2 w-5 h-5' />
              Edit
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className='flex items-center'>
              <HiOutlineTrash className='mr-2 w-5 h-5' />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;
