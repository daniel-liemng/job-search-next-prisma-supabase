import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: async (catData: { name: string }) =>
      (await axios.post('/api/category', catData)).data,
  });

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ['all-cat'],
    queryFn: async () => (await axios.get('/api/category')).data,
  });

export const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: async ({ catId, name }: { catId: string; name: string }) =>
      (await axios.put(`/api/category/${catId}`, { name })).data,
  });
