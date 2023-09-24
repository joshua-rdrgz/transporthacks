'use client';

import { IMatch, Match } from '@/features/matches/Match';
import axios from 'axios';
import { useEffect, useState } from 'react';

const DUMMY_POTENTIAL_MATCHES = [
  {
    name: 'Parker',
    email: 'parker@fakeemail.com',
    startAddress: '1510 Webster St, Alameda, CA 94501',
    endAddress: '9777 Golf Links Rd, Oakland, CA 94605',
    startPoint: {
      lat: 37.77614797557192,
      lng: -122.27546656070986,
    },
    endPoint: {
      lat: 37.750228001906045,
      lng: -122.14019739608221,
    },
  },
  // {
  //   name: 'Joseph Pratt',
  //   email: 'josephpratt@fakeemail.com',
  //   startAddress: '920 Heinz Ave, Berkeley, CA 94710',
  //   endAddress: '2465 34th Ave, Oakland, CA 94601',
  //   startPoint: {
  //     lat: 37.854327766208975,
  //     lng: -122.2896286233388,
  //   },
  //   endPoint: {
  //     lat: 37.78842625583173,
  //     lng: -122.21684420067433,
  //   },
  // },
  // {
  //   name: 'Mark Zuckerburg',
  //   email: 'markyboi@meta.com',
  //   startAddress: 'La Salle & Whitney Young Circle, San Francisco, CA 94124',
  //   endAddress: '8th Street, Otis Dr, Alameda, CA 94501',
  //   startPoint: {
  //     lat: 37.734210076704294,
  //     lng: -122.38189661455894,
  //   },
  //   endPoint: {
  //     lat: 37.76868503910152,
  //     lng: -122.2674843084329,
  //   },
  // },
];

// const DUMMY_OFFICIAL_MATCHES = [
//   {
//     name: 'Jeff Bezos',
//     email: 'jeffyboi@amazon.com',
//     startAddress: '5832 E Belknap St, Haltom City, TX 76117',
//     endAddress: '2009 E Abram St, Arlington, TX 76010',
//     startPoint: {
//       lat: 32.80893215812972,
//       lng: -97.25602490739479,
//     },
//     endPoint: {
//       lat: 32.7360523257754,
//       lng: -97.07539445211121,
//     },
//   },
// ];

export const MatchesClient = () => {
  const [matchingDriver, setMatchingDriver] = useState();
  const [maintenancePrediction, setMaintenancePrediction] = useState();

  useEffect(() => {
    async function fetch() {
      const matchesRes = await axios.post('/api/matches');
      const maintenanceRes = await axios.post('/api/maintenance');
      return {
        matchingDriver: matchesRes.data.matched_driver_id,
        maintenancePrediction: maintenanceRes.data.class,
      };
    }

    fetch().then(({ matchingDriver, maintenancePrediction }) => {
      console.log('res from Matches: ', matchingDriver);
      console.log('res from Maintenance: ', maintenancePrediction);
      setMatchingDriver(matchingDriver);
      setMaintenancePrediction(maintenancePrediction);
    });
  }, []);
  return (
    <>
      <h1 className='text-5xl font-bold text-center'>Find a Partner</h1>
      <div className='flex flex-col gap-8'>
        <section>
          <h2 className='text-2xl font-semibold mb-3'>
            Your Potential Matches
          </h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_POTENTIAL_MATCHES.map((match) => {
              if (!matchingDriver) return <div>Loading...</div>;
              if (!maintenancePrediction) return <div>Loading...</div>;
              return (
                <Match
                  key={match.name}
                  match={match}
                  status='potential'
                  maintenancePrediction={maintenancePrediction}
                  matchingDriver={matchingDriver}
                />
              );
            })}
          </div>
        </section>
        {/* <section>
          <h2 className='text-2xl font-semibold mb-3'>Your Official Matches</h2>
          <div className='flex flex-col gap-5'>
            {DUMMY_OFFICIAL_MATCHES.map((match) => (
              <Match key={match.name} match={match} status='official' />
            ))}
          </div>
        </section> */}
      </div>
    </>
  );
};
