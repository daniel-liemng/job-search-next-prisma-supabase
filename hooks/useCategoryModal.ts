import { Category } from '@/types/category';
import { create } from 'zustand';

interface useCategoryModalStore {
  isOpen: boolean;
  isEdit?: boolean;
  editItem?: Category;
  onOpen: () => void;
  onEdit: (category: Category) => void;
  onClose: () => void;
}

export const useCategoryModal = create<useCategoryModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  editId: undefined,
  onOpen: () => set({ isOpen: true }),
  onEdit: (category: Category) =>
    set({ isOpen: true, isEdit: true, editItem: category }),
  onClose: () => set({ isOpen: false, isEdit: false, editItem: undefined }),
}));
