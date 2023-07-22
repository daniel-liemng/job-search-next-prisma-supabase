'use client';

import { useState, ChangeEvent } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import { useForm } from 'react-hook-form';

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
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from '@/hooks/useCompanyHooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCompanyModal } from '@/hooks/useCompanyModal';
import Heading from '@/components/shared/Heading';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Company name is required.',
  }),
  industry: z.string().min(1, {
    message: 'Industry is required.',
  }),
  capacity: z.string().min(1, {
    message: 'Capacity is required.',
  }),
  url: z.string(),
  desc: z.string(),
  address: z.string().min(1, {
    message: 'Address is required.',
  }),
  city: z.string().min(1, {
    message: 'City is required.',
  }),
  state: z.string().min(1, {
    message: 'State or province is required.',
  }),
  zip: z.string().min(1, {
    message: 'Zip code is required.',
  }),
});

const CompanyForm = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('isEdit');

  const { selectedItem, onResetSelectetedItem } = useCompanyModal();

  const {
    mutateAsync: createComapny,
    isLoading,
    error,
  } = useCreateCompanyMutation();

  const {
    mutateAsync: updateComapny,
    isLoading: isUpdateLoading,
    error: isUpdateError,
  } = useUpdateCompanyMutation();

  const [file, setFile] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string>(selectedItem?.logo || '');

  const handleUploadFile = async () => {
    // upload image
    const filename = `${uuidv4()}-${file?.name}`;

    if (file) {
      const { data, error } = await supabase.storage
        .from('company-image')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.log(`Supabase upload error: ${error}`);
        return toast.error('Failed to upload image');
      }

      toast.success('Image Uploaded');
      const newFilename = data?.path;
      setLogoUrl(
        `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/${newFilename}`
      );
    } else {
      return toast.error('Please select the company logo');
    }
  };

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? selectedItem?.name : '',
      industry: isEdit ? selectedItem?.industry : '',
      capacity: isEdit ? selectedItem?.capacity : '',
      url: isEdit ? selectedItem?.url : '',
      desc: isEdit ? selectedItem?.desc : '',
      address: isEdit ? selectedItem?.address : '',
      city: isEdit ? selectedItem?.city : '',
      state: isEdit ? selectedItem?.state : '',
      zip: isEdit ? selectedItem?.zip : '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!logoUrl) {
      return toast.error('Please select the company logo');
    }

    if (isEdit) {
      await updateComapny({
        ...values,
        ownerId: session?.user?.id,
        logo: logoUrl,
        id: selectedItem?.id,
      });
    } else {
      await createComapny({
        ...values,
        ownerId: session?.user?.id,
        logo: logoUrl,
      });
    }

    toast.success('Company Created');
    form.reset();
    router.push('/employer/company');
  };

  console.log(session);

  if (error) {
    toast.error('Failed to save company');
  }

  console.log('444', selectedItem);
  console.log('555', isEdit);

  return (
    <>
      <Heading
        title={selectedItem ? 'Update company' : 'Create company'}
        description={selectedItem ? 'Update a company' : 'Create a new company'}
      />
      <div className='mt-5 flex gap-5'>
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='logo'>Logo</Label>
          <div className='flex gap-1'>
            <Input
              id='logo'
              type='file'
              name='logo'
              onChange={handleFileSelected}
            />
            <Button type='button' onClick={handleUploadFile}>
              Upload
            </Button>
          </div>
        </div>

        {(logoUrl || (isEdit && selectedItem?.logo)) && (
          <Image
            src={selectedItem?.logo! || logoUrl!}
            alt='logo'
            width={100}
            height={100}
            className='rounded-full object-cover border border-gray-300'
          />
        )}
      </div>

      <div className='mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-3'>
              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Comapany name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder='Website URL' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='industry'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder='Industry' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='capacity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder='capacity' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2'>
                <FormField
                  control={form.control}
                  name='desc'
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

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder='Address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='City' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State | Province</FormLabel>
                      <FormControl>
                        <Input placeholder='State | Province' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <FormField
                  control={form.control}
                  name='zip'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder='Zip Code' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='flex justify-end items-center gap-2 mt-5'>
              <Button
                onClick={onResetSelectetedItem}
                type='button'
                variant='outline'
                asChild
              >
                <Link href='/employer/company'>Cancel</Link>
              </Button>
              <Button type='submit' disabled={isLoading}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CompanyForm;
