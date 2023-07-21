import Modal from '@/components/shared/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/hooks/useCategoryHooks';
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface CategoryFormModalProps {
  isOpen?: boolean | undefined;
  onClose?: () => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({}) => {
  const { isFormOpen, onFormClose, editItem, isEdit } = useCategoryModal();

  const { mutateAsync: createCategory } = useCreateCategoryMutation();
  const { mutateAsync: updateCategory } = useUpdateCategoryMutation();

  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (isEdit) {
      await updateCategory({ catId: editItem?.id, name });
    } else {
      await createCategory({ name });
    }

    toast.success(isEdit ? 'Category Updated' : 'Category Created');
    setName('');
    onFormClose();
  };

  return (
    <Modal
      title={isEdit ? 'Update category' : 'Create category'}
      isOpen={isFormOpen}
      onClose={onFormClose}
    >
      <div className='space-y-3'>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          type='text'
          placeholder='Category name'
          defaultValue={editItem?.name || name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className='w-full flex justify-end'>
        <Button
          type='button'
          onClick={handleSubmit}
          variant='outline'
          className='mt-5'
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default CategoryFormModal;
