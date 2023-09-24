'use client';

import { Match } from '@/features/matches/Match';

const DUMMY_POTENTIAL_MATCHES = [
  {
    name: 'Jane Smith',
    email: 'janesmith@fakeemail.com',
    startPoint: '123 Main St., Anywhere TX 12345',
    endPoint: '456 Second St., Anywhere TX 12345',
  },
  {
    name: 'Joseph Pratt',
    email: 'josephpratt@fakeemail.com',
    startPoint: '123 5th St., Anywhere TX 12345',
    endPoint: '456 Garland Ave., Anywhere TX 12345',
  },
  {
    name: 'Mark Zuckerburg',
    email: 'markyboi@meta.com',
    startPoint: '58423 9th St., Anywhere TX 12345',
    endPoint: '456 Austin Blvd., Anywhere TX 12345',
  },
];

const DUMMY_OFFICIAL_MATCHES = [
  {
    name: 'Jeff Bezos',
    email: 'jeffyboi@amazon.com',
    startPoint: '9825 8th St., Anywhere TX 12345',
    endPoint: '4321 Transport Ave., Anywhere TX 12345',
  },
];

export const MatchesClient = () => {
  return (
    <>
      {/* Find a {BLANK = 'Driver' | 'Commuter'} */}
      <h1 className='text-5xl font-bold text-center'>Find a Partner</h1>
      <div className='flex flex-col gap-8'>
        <section>
          <h2 className='text-2xl font-semibold mb-3'>
            Your Potential Matches
          </h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_POTENTIAL_MATCHES.map((match) => {
              return (
                <Match key={match.name} match={match} status='potential' />
              );
            })}
          </div>
        </section>
        <section>
          <h2 className='text-2xl font-semibold mb-3'>Your Official Matches</h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_OFFICIAL_MATCHES.map((match) => {
              return <Match key={match.name} match={match} status='official' />;
            })}
          </div>
        </section>
      </div>
    </>
  );
};
