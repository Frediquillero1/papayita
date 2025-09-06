'use client';

import z from 'zod';
import Link from 'next/link';
import { toast} from 'sonner';
import { Space_Grotesk } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { loginSchema } from '../../schemas';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
});

export const SignInView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
      router.push('/');
    },
  }));

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
      <div className='grid grid-cols-1 lg:grid-cols-5'>
        <div className='bg-[#F2F2F0] h-screen w-full lg:col-span-3 overflow-y-auto'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-8 p-4 lg:p-16'
            >
              <div className='flex items-center justify-between mb-8'>
                <Link href='/'>
                  <span
                    className={cn(
                      'text-shadow-neo text-2xl font-semibold tracking-tight text-papayita-400',
                      font.className
                    )}
                  >
                    papayita
                  </span>
                </Link>
                <Button
                  asChild
                  variant='ghost'
                  className='text-base border-none underline'
                >
                  <Link
                    prefetch
                    href='/sign-up'
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
              <h1 className="text-4xl text-papayita_emerald font-medium">Welcome back to&nbsp;
                <span
                    className={cn(
                      'text-shadow-in text-4xl font-semibold tracking-tight text-papayita-400',
                      font.className
                    )}
                  >
                    papayita
                  </span>
              </h1>
              <FormField 
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={login.isPending}
                type='submit'
                size='lg'
                variant='elevated'
                className='bg-papayita_green/80 text-white hover:bg-papayita_pink hover:text-white'
              >
                Log in
              </Button>
            </form>
          </Form>
        </div>
        <div
          className='h-screen w-full lg:col-span-2 hidden lg:block'
          style={{
            backgroundImage: 'url("/people.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
  );
};
