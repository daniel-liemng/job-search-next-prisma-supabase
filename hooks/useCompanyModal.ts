import { ICompany } from '@/types/company';
import { create } from 'zustand';

interface useCompanyModalStore {
  isDeleteOpen: boolean;
  isEdit: boolean;
  selectedItem?: {
    id: string;
    name: string;
    industry: string;
    address: string;
    city: string;
  };
  onDeleteOpen: () => void;
  onDeleteClose: () => void;

  onDelete: (category: {
    id: string;
    name: string;
    industry: string;
    address: string;
    city: string;
  }) => void;
}

export const useCompanyModal = create<useCompanyModalStore>((set) => ({
  isDeleteOpen: false,
  isEdit: false,
  selectedItem: undefined,
  onDeleteOpen: () => set({ isDeleteOpen: true }),
  onDeleteClose: () => set({ isDeleteOpen: false, selectedItem: undefined }),
  onDelete: (company) => set({ isDeleteOpen: true, selectedItem: company }),
}));
