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

import { Button } from '@/components/ui/button';
import { useCompanyModal } from '@/hooks/useCompanyModal';
import { Company } from '@/types/company';
import Link from 'next/link';
// import { CompanyColumn } from './Columns';

interface CellActionProps {
  data: Company;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onDelete, onInfoOpen, onSelectedItem } = useCompanyModal();

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
            <div onClick={() => onInfoOpen(data)} className='flex items-center'>
              <HiOutlineInformationCircle className='mr-2 w-5 h-5' />
              Info
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div
              onClick={() => onSelectedItem(data)}
              className='flex items-center'
            >
              <HiOutlinePencilAlt className='mr-2 w-5 h-5' />
              <Link href='/employer/company/create/?isEdit=true'>Edit</Link>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div onClick={() => onDelete(data)} className='flex items-center'>
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
