import ConfirmModal from '@/components/shared/ConfirmModal';
import { Button } from '@/components/ui/button';
import { useDeleteJobMutation } from '@/hooks/useJobHooks';
import { useJobModal } from '@/hooks/useJobModal';
import { toast } from 'react-hot-toast';

const JobDeleteModal = () => {
  const { selectedItem, isDeleteOpen, onDeleteClose } = useJobModal();

  const { mutateAsync: deleteJob } = useDeleteJobMutation();

  const handleDelete = async () => {
    await deleteJob(selectedItem?.id as string);

    toast.success('Job Deleted');
    onDeleteClose();
  };

  console.log('8880', selectedItem);

  return (
    <ConfirmModal isOpen={isDeleteOpen} onClose={onDeleteClose}>
      <p className='mt-3'>
        This action will delete job: <b>{selectedItem?.name}</b>
      </p>
      <div className='w-full flex justify-end items-center gap-2 mt-5'>
        <Button type='button' onClick={onDeleteClose} variant='outline'>
          Cancel
        </Button>
        <Button type='button' onClick={handleDelete} variant='default'>
          Yes, delete
        </Button>
      </div>
    </ConfirmModal>
  );
};

export default JobDeleteModal;
