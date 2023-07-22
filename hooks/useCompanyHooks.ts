import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { queryClient } from '@/context/ReactQueryProvider';
import { Company } from '@/types/company';

export const useCreateCompanyMutation = () =>
  useMutation({
    mutationFn: async (companyData: Company) =>
      (await axios.post('/api/company', companyData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-companies']),
  });

export const useUpdateCompanyMutation = () =>
  useMutation({
    mutationFn: async (companyData: Company) =>
      (await axios.patch(`/api/company/${companyData.id}`, companyData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-companies']),
  });

export const useGetAllCompanies = () =>
  useQuery({
    queryKey: ['all-companies'],
    queryFn: async () => (await axios.get('/api/company')).data,
  });

export const useGetCompany = (companyId: string) =>
  useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => (await axios.get(`/api/company/${companyId}`)).data,
  });

export const useDeleteCompanyMutation = () =>
  useMutation({
    mutationFn: async (companyId: string) =>
      (await axios.delete(`/api/company/${companyId}`)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-companies']),
  });
