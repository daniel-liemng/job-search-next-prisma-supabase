'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);
  return (
    <>
      {isClientMounted ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      ) : (
        <></>
      )}
    </>
  );
};
