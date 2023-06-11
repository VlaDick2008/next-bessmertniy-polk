import './globals.css';
import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';

const roboto = Roboto({
  weight: ['300', '400', '500', '900', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata = {
  title: 'Бессмертный полк',
  description: 'Бессмертный полк',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${roboto.className}`}>
        <Header />
        <main className="w-full max-w-[885px] mx-auto">
          {children}
          <p className="mt-10 text-gray-500 text-xs text-center">
            © МБОУ СШ №2 г. Вязьмы Смоленской обл., 2020-2023
          </p>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
