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

import Link from 'next/link';
import { Job } from '@/types/job';
import { useJobModal } from '@/hooks/useJobModal';
import JobDeleteModal from './JobDeleteModal';

interface CellActionProps {
  data: Job;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onDeleteOpen, onEdit } = useJobModal();

  console.log('777', data);

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
            <Link
              href={`/employer/job/${data.id}`}
              className='flex items-center'
            >
              <HiOutlineInformationCircle className='mr-2 w-5 h-5' />
              Info
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              onClick={() => onEdit(data)}
              href={`/employer/job/${data.id}/edit`}
              className='flex items-center'
            >
              <HiOutlinePencilAlt className='mr-2 w-5 h-5' />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div
              onClick={() => onDeleteOpen(data)}
              className='flex items-center'
            >
              <HiOutlineTrash className='mr-2 w-5 h-5' />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <JobDeleteModal />
    </div>
  );
};

export default CellAction;
