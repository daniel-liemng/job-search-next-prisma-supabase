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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

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
  description: z.string(),
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
  const [file, setFile] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string>();

  const handleUploadFile = async () => {
    // upload image
    const filename = `${uuidv4()}-${file?.name}`;

    const { data, error } = await supabase.storage
      .from('company-image')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.log(`Supabase upload error: ${error}`);
    }

    const newFilename = data?.path;
    setLogoUrl(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/${newFilename}`);
  };

  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      industry: '',
      capacity: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
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
            <Button type='button' onClick={handleUploadFile} variant='outline'>
              Upload
            </Button>
          </div>
        </div>

        {logoUrl && (
          <Image
            src={logoUrl}
            alt='logo'
            width={100}
            height={100}
            className='rounded-full object-cover'
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

            <Button type='submit' className='mt-5'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CompanyForm;
