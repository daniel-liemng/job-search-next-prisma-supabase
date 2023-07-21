import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '@/context/ReactQueryProvider';

export const useCreateCategoryMutation = () =>
  useMutation({
    mutationFn: async (catData: { name: string }) =>
      (await axios.post('/api/category', catData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-cat']),
  });

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ['all-cat'],
    queryFn: async () => (await axios.get('/api/category')).data,
  });

export const useUpdateCategoryMutation = () =>
  useMutation({
    mutationFn: async ({
      catId,
      name,
    }: {
      catId: string | undefined;
      name: string | undefined;
    }) => (await axios.put(`/api/category/${catId}`, { name })).data,
    onSuccess: () => queryClient.invalidateQueries(['all-cat']),
  });

export const useDeleteCategoryMutation = () =>
  useMutation({
    mutationFn: async (catId: string) =>
      (await axios.delete(`/api/category/${catId}`)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-cat']),
  });

export const useGetCategoryQuery = (id: string) =>
  useQuery({
    queryKey: ['cat', id],
    queryFn: async () => (await axios.get(`/api/category/${id}`)).data,
  });
