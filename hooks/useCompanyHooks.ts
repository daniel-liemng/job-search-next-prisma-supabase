import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { queryClient } from '@/context/ReactQueryProvider';
import { ICompany } from '@/types/company';

export const useCreateCompanyMutation = () =>
  useMutation({
    mutationFn: async (companyData: ICompany) =>
      (await axios.post('/api/company', companyData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-companies']),
  });

export const useGetAllCompanies = () =>
  useQuery({
    queryKey: ['all-companies'],
    queryFn: async () => (await axios.get('/api/company')).data,
  });

export const useDeleteCompanyMutation = () =>
  useMutation({
    mutationFn: async (companyId: string) =>
      (await axios.delete(`/api/company/${companyId}`)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-companies']),
  });
