import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className='flex items-center'>
              <HiOutlineExclamationCircle className='mr-2 w-8 h-8 text-red-500' />
              Are you sure?
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
