'use client';

import { PreferenceForm } from '@/features/preferences/PreferenceForm';

export const PreferencesClient = () => {
  return (
    <>
      <h1 className='text-4xl font-bold'>Tell Us About Your Commute!</h1>
      <section>
        <div className='flex flex-col gap-4'>
          <PreferenceForm />
        </div>
      </section>
    </>
  );
};
