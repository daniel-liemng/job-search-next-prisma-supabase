import { Category } from '@/types/category';
import { create } from 'zustand';

interface useCategoryModalStore {
  isFormOpen: boolean;
  isDeleteOpen: boolean;
  isEdit?: boolean;
  editItem?: Category;
  deleteItem?: Category;
  onFormOpen: () => void;
  onFormClose: () => void;
  onDeleteOpen: () => void;
  onDeleteClose: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const useCategoryModal = create<useCategoryModalStore>((set) => ({
  isFormOpen: false,
  isDeleteOpen: false,
  isEdit: false,
  editId: undefined,
  onFormOpen: () => set({ isFormOpen: true }),
  onFormClose: () =>
    set({ isFormOpen: false, isEdit: false, editItem: undefined }),
  onEdit: (category: Category) =>
    set({ isFormOpen: true, isEdit: true, editItem: category }),
  onDeleteOpen: () => set({ isDeleteOpen: true }),
  onDeleteClose: () => set({ isDeleteOpen: false, deleteItem: undefined }),
  onDelete: (category: Category) =>
    set({ isDeleteOpen: true, deleteItem: category }),
}));
