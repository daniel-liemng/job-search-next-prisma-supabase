import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Provider from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ToasterContext from '@/context/ToasterContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Search | Next',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <ToasterContext />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
