import { Company, ShortCompany } from '@/types/company';
import { create } from 'zustand';

interface useCompanyModalStore {
  isDeleteOpen: boolean;
  isInfoOpen: boolean;
  selectedItem?: Company;
  onDeleteOpen: () => void;
  onDeleteClose: () => void;
  onSelectedItem: (company: Company) => void;
  onResetSelectetedItem: () => void;
  onDelete: (company: Company) => void;
  onInfoOpen: (company: Company) => void;
  onInfoClose: () => void;
}

export const useCompanyModal = create<useCompanyModalStore>((set) => ({
  isDeleteOpen: false,
  isInfoOpen: false,
  selectedItem: undefined,
  onDeleteOpen: () => set({ isDeleteOpen: true }),
  onDeleteClose: () => set({ isDeleteOpen: false, selectedItem: undefined }),
  onSelectedItem: (company) => set({ selectedItem: company }),
  onResetSelectetedItem: () => set({ selectedItem: undefined }),
  onDelete: (company) => set({ isDeleteOpen: true, selectedItem: company }),
  onInfoOpen: (company) => set({ isInfoOpen: true, selectedItem: company }),
  onInfoClose: () => set({ isInfoOpen: false }),
}));
