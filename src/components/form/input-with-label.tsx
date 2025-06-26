'use client';

import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Props<TSchema> = {
  label: string;
  name: keyof TSchema & string;
  required?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<TSchema>({
  name,
  label,
  className,
  required,
  ...props
}: Props<TSchema>) {
  const form = useFormContext();

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel htmlFor={name} className='gap-1'>
            <span>{label}</span>
            {required && <span className='text-destructive'>*</span>}
          </FormLabel>

          <FormControl>
            <Input
              id={name}
              className={cn({ 'border-destructive': error }, className)}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
