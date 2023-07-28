import { Company } from '@/types/company';
import { Job } from '@/types/job';
import { create } from 'zustand';

interface useJobModalStore {
  selectedItem?: Job;
  onSelectedItem: (job: Job) => void;
  onResetSelectedItem: () => void;
  isDeleteOpen: boolean;
  onDeleteOpen: (job: Job) => void;
  onDeleteClose: () => void;
}

export const useJobModal = create<useJobModalStore>((set) => ({
  selectedItem: undefined,
  onSelectedItem: (job) => set({ selectedItem: job }),
  onResetSelectedItem: () => set({ selectedItem: undefined }),
  isDeleteOpen: false,
  onDeleteOpen: (job) => set({ isDeleteOpen: true, selectedItem: job }),
  onDeleteClose: () => set({ isDeleteOpen: false, selectedItem: undefined }),
}));
