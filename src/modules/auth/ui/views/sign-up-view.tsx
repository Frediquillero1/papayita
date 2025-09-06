'use client';

import z from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { registerSchema } from '../../schemas';

const font = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
});

export const SignUpView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push('/');
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch('username');
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

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
                  href='/sign-in'
                >
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className='text-4xl text-papayita_emerald font-medium'>
              Join over 1,580 creators earning money on{' '}
              <span
                className={cn(
                  'text-shadow-in text-4xl font-semibold tracking-tight text-papayita-400',
                  font.className
                )}
              >
                Papayita.
              </span>
            </h1>
            <FormField
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base'>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className={cn('hidden', true && 'block')}>
                    Your store will be available at&nbsp;
                    {/* TODO: Use proper method to generate preview url */}
                    <strong>{username}</strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input
                      {...field}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={register.isPending}
              type='submit'
              size='lg'
              variant='elevated'
              className='bg-papayita_green/80 text-white hover:bg-papayita_pink hover:text-white'
            >
              Create account
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
