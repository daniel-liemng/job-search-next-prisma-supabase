import { Company } from '@/types/company';
import { Job } from '@/types/job';
import { create } from 'zustand';

interface useJobModalStore {
  isEdit?: boolean;
  onEdit: (job: Job) => void;
  onResetEdit: () => void;
  selectedItem?: Job;
  onSelectedItem: (job: Job) => void;
  onResetSelectedItem: () => void;
  isDeleteOpen: boolean;
  onDeleteOpen: (job: Job) => void;
  onDeleteClose: () => void;
}

export const useJobModal = create<useJobModalStore>((set) => ({
  isEdit: false,
  onEdit: (job) => set({ selectedItem: job, isEdit: true }),
  onResetEdit: () => set({ selectedItem: undefined, isEdit: false }),
  selectedItem: undefined,
  onSelectedItem: (job) => set({ selectedItem: job }),
  onResetSelectedItem: () => set({ selectedItem: undefined }),
  isDeleteOpen: false,
  onDeleteOpen: (job) => set({ isDeleteOpen: true, selectedItem: job }),
  onDeleteClose: () => set({ isDeleteOpen: false, selectedItem: undefined }),
}));
