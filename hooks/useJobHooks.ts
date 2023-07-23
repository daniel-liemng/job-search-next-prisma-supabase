import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { queryClient } from '@/context/ReactQueryProvider';
import { Job } from '@/types/job';

export const useCreateJobMutation = () =>
  useMutation({
    mutationFn: async (jobData: Job) =>
      (await axios.post('/api/job', jobData)).data,
    // onSuccess: () => queryClient.invalidateQueries(['all-jobs']),
  });

export const useGetAllJobs = () =>
  useQuery({
    queryKey: ['all-jobs'],
    queryFn: async () => (await axios.get('/api/job')).data,
  });
