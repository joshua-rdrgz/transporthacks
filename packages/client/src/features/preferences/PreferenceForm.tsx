'use client';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '@/context/user-context';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';
import { getLatLngForAddress } from '@/lib/utils';
import { DisplayMap } from '@/ui/display-map';
import { Label } from '@/ui/label';
import { Input } from '@/ui/input';
import axios from 'axios';
import { useUserPreferences } from '@/context/user-preference-context';
import { useRouter } from 'next/navigation';

const preferenceFormSchema = z.object({
  userId: z.string().nonempty('User Id is required'),
  status: z.enum(['DRIVER', 'COMMUTER', 'UNKNOWN']),
  startPoint: z.string().nonempty('Start point is required.'),
  endPoint: z.string().nonempty('End point is required.'),
});

type PreferenceFormSchema = z.infer<typeof preferenceFormSchema>;

const LOCATION_INPUTS = [
  {
    value: 'startPoint' as const,
    label: 'Where do you start your commute?',
  },
  {
    value: 'endPoint' as const,
    label: 'Where do you end your commute?',
  },
];

export const PreferenceForm = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const curUserPreferences = useUserPreferences();

  const preferenceForm = useForm<PreferenceFormSchema>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: {
      userId: currentUser.id,
      status: curUserPreferences.status || 'COMMUTER',
      startPoint: curUserPreferences.startPointAddress || '',
      endPoint: curUserPreferences.endPointAddress || '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (values: PreferenceFormSchema) => {
      const startPointLatlng = await getLatLngForAddress(values.startPoint);
      const endPointLatlng = await getLatLngForAddress(values.endPoint);

      await axios.put('/api/preferences', {
        ...values,
        startPoint: startPointLatlng,
        endPoint: endPointLatlng,
      });

      router.refresh();
    },
    [router]
  );

  const handleRadioInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      preferenceForm.setValue(
        'status',
        e.target.value as 'DRIVER' | 'COMMUTER'
      );
    },
    [preferenceForm]
  );

  return (
    <div>
      <Form form={preferenceForm}>
        <form
          onSubmit={preferenceForm.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <section className='flex gap-5'>
            <div className='flex gap-1 items-center'>
              <Label htmlFor='driver' className='text-lg'>
                Driver
              </Label>
              <Input
                {...preferenceForm.register('status')}
                id='driver'
                type='radio'
                value='DRIVER'
                defaultChecked={curUserPreferences.status === 'DRIVER'}
                className='w-5 h-5'
                onChange={handleRadioInputChange}
              />
            </div>
            <div className='flex gap-1 items-center'>
              <Label htmlFor='commuter' className='text-lg'>
                Commuter
              </Label>
              <Input
                {...preferenceForm.register('status')}
                id='commuter'
                type='radio'
                value='COMMUTER'
                defaultChecked={curUserPreferences.status === 'COMMUTER'}
                className='w-5 h-5'
                onChange={handleRadioInputChange}
              />
            </div>
          </section>
          {LOCATION_INPUTS.map((input) => {
            return (
              <Form.Field
                key={input.value}
                control={preferenceForm.control}
                name={input.value}
                render={({ field }) => {
                  return <FormItem label={input.label} field={field} />;
                }}
              />
            );
          })}
          {curUserPreferences.startPoint && curUserPreferences.endPoint && (
            <DisplayMap
              startPoint={curUserPreferences.startPoint}
              endPoint={curUserPreferences.endPoint}
            />
          )}
          <Button type='submit'>Update Preferences</Button>
        </form>
      </Form>
    </div>
  );
};
