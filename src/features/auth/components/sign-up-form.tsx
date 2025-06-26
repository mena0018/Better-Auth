'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormFields, SignUpFormSchema } from '@/features/auth';
import { InputWithLabel } from '@/components/form/input-with-label';
import { Form } from '@/components/ui/form';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: SignUpFormFields = {
    name: '',
    email: '',
    password: '',
  };

  const form = useForm<SignUpFormFields>({
    mode: 'onBlur',
    defaultValues,
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    setIsLoading(true);

    try {
      await authClient.signUp.email({
        ...data,
        fetchOptions: {
          onResponse: () => {
            setIsLoading(false);
          },
          onRequest: () => {
            setIsLoading(true);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: async () => {
            router.replace('/');
          },
        },
      });
    } catch (error) {
      console.error('An error occurred during registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <InputWithLabel<SignUpFormFields>
          required
          label='Name'
          name='name'
          placeholder='John Doe'
        />
        <InputWithLabel<SignUpFormFields>
          required
          label='Email'
          name='email'
          placeholder='m@example.com'
        />
        <InputWithLabel<SignUpFormFields>
          required
          label='Password'
          name='password'
          type='password'
          placeholder='Enter your password'
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? <LoaderCircle className='animate-spin' /> : 'SignUp'}
        </Button>
        <div className='space-x-1 text-center text-sm'>
          <span>Already have an account ?</span>
          <Link href='/sign-in' className='underline underline-offset-4'>
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
