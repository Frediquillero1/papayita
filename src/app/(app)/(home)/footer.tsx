import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { cn } from "@/lib/utils";

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
});

export const Footer = () => {
  return (
    <footer className='flex border-t p-6 justify-center'>
      <div className='flex items-center gap-2'>
        <p
          className='text-center text-muted-foreground pb-5 max-sm:text-xs'
        >
          <Link href='/' >
          <span className={cn('text-shadow-neo scroll-m-20 text-[1.125rem] font-extrabold tracking-tight text-papayita-400', font.className)}>papayita</span>
          </Link>&nbsp;  
         | All Rights Reserved</p>
      </div>
    </footer>
  );
};
 