import { toast } from 'react-hot-toast';

import ConfirmModal from '@/components/shared/ConfirmModal';
import { Button } from '@/components/ui/button';
import { useDeleteCompanyMutation } from '@/hooks/useCompanyHooks';
import { useCompanyModal } from '@/hooks/useCompanyModal';

const CompanyDeleteModal = () => {
  const { selectedItem, onDeleteClose, isDeleteOpen } = useCompanyModal();

  const { mutateAsync: deleteCompany } = useDeleteCompanyMutation();

  const handleDelete = async () => {
    await deleteCompany(selectedItem?.id as string);

    toast.success('Company Deleted');
    onDeleteClose();
  };
  return (
    <ConfirmModal isOpen={isDeleteOpen} onClose={onDeleteClose}>
      <p className='mt-3'>
        This action will delete company: <b>{selectedItem?.name}</b>
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

export default CompanyDeleteModal;
