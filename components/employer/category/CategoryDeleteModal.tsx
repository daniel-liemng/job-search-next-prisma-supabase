import ConfirmModal from '@/components/shared/ConfirmModal';
import { Button } from '@/components/ui/button';
import { useDeleteCategoryMutation } from '@/hooks/useCategoryHooks';
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { toast } from 'react-hot-toast';

const CategoryDeleteModal = () => {
  const { isDeleteOpen, onDeleteClose, deleteItem } = useCategoryModal();

  const { mutateAsync: deleteCategory } = useDeleteCategoryMutation();

  const handleDelete = async () => {
    await deleteCategory(deleteItem?.id as string);

    toast.success('Category Deleted');
    onDeleteClose();
  };
  return (
    <ConfirmModal isOpen={isDeleteOpen} onClose={onDeleteClose}>
      <p className='mt-3'>
        This action will delete category: <b>{deleteItem?.name}</b>
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

export default CategoryDeleteModal;
