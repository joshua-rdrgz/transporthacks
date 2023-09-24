'use client';

import { useUserPreferences } from '@/context/user-preference-context';
import { IMatch, Match } from '@/features/matches/Match';
import { allCapsToFirstLetterCapitalized } from '@/lib/utils';

const DUMMY_POTENTIAL_MATCHES = [
  {
    name: 'Jane Smith',
    email: 'janesmith@fakeemail.com',
    startAddress: '5832 E Belknap St, Haltom City, TX 76117',
    endAddress: '2009 E Abram St, Arlington, TX 76010',
    startPoint: {
      lat: 32.80893215812972,
      lng: -97.25602490739479,
    },
    endPoint: {
      lat: 32.7360523257754,
      lng: -97.07539445211121,
    },
  },
  {
    name: 'Joseph Pratt',
    email: 'josephpratt@fakeemail.com',
    startAddress: '5832 E Belknap St, Haltom City, TX 76117',
    endAddress: '2009 E Abram St, Arlington, TX 76010',
    startPoint: {
      lat: 32.80893215812972,
      lng: -97.25602490739479,
    },
    endPoint: {
      lat: 32.7360523257754,
      lng: -97.07539445211121,
    },
  },
  {
    name: 'Mark Zuckerburg',
    email: 'markyboi@meta.com',
    startAddress: '5832 E Belknap St, Haltom City, TX 76117',
    endAddress: '2009 E Abram St, Arlington, TX 76010',
    startPoint: {
      lat: 32.80893215812972,
      lng: -97.25602490739479,
    },
    endPoint: {
      lat: 32.7360523257754,
      lng: -97.07539445211121,
    },
  },
];

const DUMMY_OFFICIAL_MATCHES = [
  {
    name: 'Jeff Bezos',
    email: 'jeffyboi@amazon.com',
    startAddress: '5832 E Belknap St, Haltom City, TX 76117',
    endAddress: '2009 E Abram St, Arlington, TX 76010',
    startPoint: {
      lat: 32.80893215812972,
      lng: -97.25602490739479,
    },
    endPoint: {
      lat: 32.7360523257754,
      lng: -97.07539445211121,
    },
  },
];

export const MatchesClient = () => {
  return (
    <>
      <h1 className='text-5xl font-bold text-center'>Find a Partner</h1>
      <div className='flex flex-col gap-8'>
        <section>
          <h2 className='text-2xl font-semibold mb-3'>
            Your Potential Matches
          </h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_POTENTIAL_MATCHES.map((match) => (
              <Match key={match.name} match={match} status='potential' />
            ))}
          </div>
        </section>
        <section>
          <h2 className='text-2xl font-semibold mb-3'>Your Official Matches</h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_OFFICIAL_MATCHES.map((match) =>
              displayMatch(match, 'official')
            )}
          </div>
        </section>
      </div>
    </>
  );
};

async function displayMatch(match: IMatch, status: 'potential' | 'official') {
  return <Match key={match.name} match={match} status={status} />;
}
