'use client';

import { useState } from 'react';
import { PreferenceForm } from '@/features/preferences/PreferenceForm';
import { TLatLng } from '@/lib/utils';
import { TCurrentUser } from '@/services/apiAuth';
import axios from 'axios';

export const PreferencesClient = () => {
  return (
    <>
      <h1 className='text-4xl font-bold'>Update Your Preferences</h1>
      <section>
        <div className='flex flex-col gap-4'>
          <h2 className=' text-2xl font-semibold'>You are a....</h2>
          <PreferenceForm />
        </div>
      </section>
    </>
  );
};
