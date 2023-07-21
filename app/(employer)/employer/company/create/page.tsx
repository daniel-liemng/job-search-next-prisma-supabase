'use client';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const EmployerCompanyCreatePage = () => {
  const [file, setFile] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string>();

  // const handleSubmit = async (e: SyntheticEvent) => {
  const handleUploadFile = async () => {
    // e.preventDefault();
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

  const handleSubmit = async (e: SyntheticEvent) => {};

  console.log(logoUrl);

  return (
    <div className='p-5'>
      <Breadcrumb name='Company' />

      <Heading title='Create company' description='Create a new company' />

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

      <form onSubmit={handleSubmit} className='mt-5'></form>
    </div>
  );
};

export default EmployerCompanyCreatePage;
