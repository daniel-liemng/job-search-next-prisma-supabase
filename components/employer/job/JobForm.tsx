'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  useCreateCompanyMutation,
  useGetAllCompanies,
  useUpdateCompanyMutation,
} from '@/hooks/useCompanyHooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCompanyModal } from '@/hooks/useCompanyModal';
import Heading from '@/components/shared/Heading';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Job } from '@/types/job';
import { useGetAllCategories } from '@/hooks/useCategoryHooks';
import { Category } from '@/types/category';
import { useCreateJobMutation } from '@/hooks/useJobHooks';
import { Company } from '@/types/company';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  requirement: z.string().min(1, {
    message: 'Requirement is required.',
  }),
  location: z.string().min(1, {
    message: 'Location is required.',
  }),
  salary: z.string().min(1, {
    message: 'Salary is required.',
  }),
  type: z.string().min(1, {
    message: 'Please select a type.',
  }),
  workType: z.string().min(1, {
    message: 'Please select a work type.',
  }),
  schedule: z.string().min(1, {
    message: 'Schedule is required.',
  }),
  status: z.string().min(1, {
    message: 'Status is required.',
  }),
  benefit: z.string().min(1, {
    message: 'Benefit is required.',
  }),
  startDate: z.date({
    required_error: 'A start date is required.',
  }),
  categoryId: z.string().min(1, {
    message: 'Please select a category.',
  }),
  companyId: z.string().min(1, {
    message: 'Please select a company.',
  }),
});

const JobForm = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('isEdit');

  const { data: categories } = useGetAllCategories();
  const { data: companies } = useGetAllCompanies();

  const { mutateAsync: createJob } = useCreateJobMutation();

  let selectedItem: Job = {};

  // const {
  //   mutateAsync: createComapny,
  //   isLoading,
  //   error,
  // } = useCreateCompanyMutation();

  // const {
  //   mutateAsync: updateComapny,
  //   isLoading: isUpdateLoading,
  //   error: isUpdateError,
  // } = useUpdateCompanyMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? selectedItem?.name : '',
      description: isEdit ? selectedItem?.description : '',
      requirement: isEdit ? selectedItem?.requirement : '',
      location: isEdit ? selectedItem?.location : '',
      salary: isEdit ? selectedItem?.salary : '',
      schedule: isEdit ? selectedItem?.schedule : '',
      type: isEdit ? selectedItem?.type : '',
      workType: isEdit ? selectedItem?.workType : '',
      benefit: isEdit ? selectedItem?.benefit : '',
      startDate: isEdit ? selectedItem?.startDate : new Date(),
      status: 'true',
      categoryId: isEdit ? selectedItem?.categoryId : '',
      companyId: isEdit ? selectedItem?.companyId : '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    if (isEdit) {
      console.log('Edit');
    } else {
      await createJob({
        ...values,
        status: 'true' ? true : false,
      });
    }

    toast.success(isEdit ? 'Job Updated' : 'Job Created');
    form.reset();
    router.push('/employer/job');
  };

  // if (error) {
  //   toast.error('Failed to save job');
  // }

  return (
    <>
      <Heading
        title={isEdit ? 'Update job' : 'Create job'}
        description={isEdit ? 'Update a job' : 'Create a new job'}
      />

      <div className='mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-3'>
              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Job name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='companyId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a company' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies?.map((comp: Company) => (
                            <SelectItem value={comp.id!} key={comp.id}>
                              {comp.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Description'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='requirement'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Requirement'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='Location' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='salary'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input placeholder='Salary' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='full-time'>Full-time</SelectItem>
                          <SelectItem value='part-time'>Part-time</SelectItem>
                          <SelectItem value='permanent'>Permanent</SelectItem>
                          <SelectItem value='contract'>Contract</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='workType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a work type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='in-person'>In-person</SelectItem>
                          <SelectItem value='remote'>Remote</SelectItem>
                          <SelectItem value='hybrid'>Hybrid</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='schedule'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule</FormLabel>
                      <FormControl>
                        <Input placeholder='Schedule' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='startDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start date</FormLabel>
                      <br />
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal ',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((cat: Category) => (
                            <SelectItem value={cat.id} key={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='true'>Active</SelectItem>
                          <SelectItem value='false'>Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='benefit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefit</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Benefit'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex justify-end items-center gap-2 mt-5'>
              <Button type='button' variant='outline' asChild>
                <Link href='/employer/job'>Cancel</Link>
              </Button>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default JobForm;
