import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { TRPCReactProvider } from '@/trpc/client';

const dmSans = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Papayita Your Marketplace, Your Rules.',
  description:
    'Papayita – Where Elegance Meets Everyday Living is a curated e-commerce destination designed for those who appreciate quality, sophistication, and timeless style. 🌴✨',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${dmSans.className} antialiased`}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
