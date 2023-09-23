'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, SignInResponse } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';

const loginFormSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;

const loginInputs = [
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
];

export const LoginForm = () => {
  const router = useRouter();
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (values: LoginFormSchema) => {
      let error: SignInResponse['error'];
      try {
        const res = await signIn('credentials', {
          ...values,
          redirect: false,
        });
        if (res?.error) {
          error = res.error;
          throw new Error(res.error);
        }
        if (res?.ok) {
          toast.success('Logged in!');
          router.replace('/');
        }
      } catch (err: any) {
        console.error('🔥🔥🔥 ERROR 🔥🔥🔥 : ', err.message);
        toast.error(err.message as string);
      } finally {
        loginForm.reset();
      }
    },
    [router, loginForm]
  );

  return (
    <Form form={loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-3'>
        {loginInputs.map((input) => (
          <Form.Field
            key={input.value}
            control={loginForm.control}
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

        <Button>Log in</Button>
      </form>
    </Form>
  );
};
