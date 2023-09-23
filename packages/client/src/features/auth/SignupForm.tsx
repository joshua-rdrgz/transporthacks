'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';

const signupFormSchema = z
  .object({
    name: z.string().nonempty('Name is required.'),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Email must be valid.'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 characters.'),
    passwordConfirm: z
      .string()
      .nonempty('Password Confirm is required.')
      .min(8, 'Password must be at least 8 characters.'),
  })
  .refine((schema) => schema.password === schema.passwordConfirm, {
    message: 'Password and Confirm Password must match.',
    path: ['passwordConfirm'],
  });

type SignupFormSchema = z.infer<typeof signupFormSchema>;

const signupInputs = [
  {
    value: 'name' as const,
    label: 'Name',
  },
  {
    value: 'email' as const,
    label: 'Email',
  },
  {
    value: 'password' as const,
    label: 'Password',
    props: {
      type: 'password',
    },
  },
  {
    value: 'passwordConfirm' as const,
    label: 'Confirm Password',
    props: {
      type: 'password',
    },
  },
];

export const SignupForm = () => {
  const router = useRouter();
  const signupForm = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (values: SignupFormSchema) => {
      try {
        axios.post('/api/register', values);
        toast.success('Registered!');
        router.replace('/');
      } catch (err) {
        toast.error('Something went wrong.... 🤔');
      } finally {
        signupForm.reset();
      }
    },
    [router, signupForm]
  );

  return (
    <Form form={signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmit)} className='space-y-3'>
        {signupInputs.map((input) => (
          <Form.Field
            key={input.value}
            control={signupForm.control}
            name={input.value}
            render={({ field }) => {
              return (
                <FormItem
                  label={input.label}
                  field={field}
                  inputProps={input.props}
                />
              );
            }}
          />
        ))}

        <Button>Sign up</Button>
      </form>
    </Form>
  );
};
