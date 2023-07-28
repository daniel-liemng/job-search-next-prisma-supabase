import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { queryClient } from '@/context/ReactQueryProvider';
import { Job } from '@/types/job';

export const useCreateJobMutation = () =>
  useMutation({
    mutationFn: async (jobData: Job) =>
      (await axios.post('/api/job', jobData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-jobs']),
  });

export const useGetAllJobsQuery = () =>
  useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => (await axios.get('/api/job')).data,
  });

export const useGetJobQuery = (jobId: string) =>
  useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => (await axios.get(`/api/job/${jobId}`)).data,
  });

export const useUpdateJobMutation = () =>
  useMutation({
    mutationFn: async (jobData: Job) =>
      (await axios.patch(`/api/job/${jobData.id}`, jobData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-jobs']),
  });

export const useDeleteJobMutation = () =>
  useMutation({
    mutationFn: async (jobId: string) =>
      (await axios.delete(`/api/job/${jobId}`)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-jobs']),
  });
