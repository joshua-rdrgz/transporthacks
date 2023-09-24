'use client';

import { Button } from '@/ui/button';
import { DisplayMap } from '@/ui/display-map';

export interface IMatch {
  name: string;
  email: string;
  startPoint: {
    lat: number;
    lng: number;
  };
  endPoint: {
    lat: number;
    lng: number;
  };
  startAddress: string;
  endAddress: string;
}

interface IMatchProps {
  match: IMatch;
  status: 'potential' | 'official';
  maintenancePrediction: number;
  matchingDriver: string;
}

export const Match: React.FC<IMatchProps> = ({
  match,
  status,
  maintenancePrediction,
  matchingDriver,
}) => {
  return (
    <section className='flex flex-col gap-9 bg-muted p-4 rounded'>
      <div className='flex flex-col gap-4 lg:flex-row lg:justify-between mx-auto'>
        <div className='flex flex-col gap-1 text-center'>
          <h3 className='font-bold text-2xl'>
            {matchingDriver} {match.name}
          </h3>
          <p className='text-sm'>
            <strong>Email:</strong> {matchingDriver.toLowerCase()}
            {match.email}
          </p>
          <p className='text-sm'>
            <strong>Start Point:</strong> {match.startAddress}
          </p>
          <p className='text-sm'>
            <strong>End Point:</strong> {match.endAddress}
          </p>
        </div>
        {/* <div className='flex gap-3 items-center mx-auto'>
          <Button
            variant='ghost'
            className='hover:bg-foreground dark:bg-muted dark:hover:bg-background'
          >
            Deny Offer
          </Button>
          <Button className='dark:text-foreground'>Accept Offer</Button>
          <Button className='dark:text-foreground'>See Details</Button>
        </div> */}
      </div>
      <DisplayMap startPoint={match.startPoint} endPoint={match.endPoint} />
      {status === 'potential' && (
        <div>
          <p className='text-sm'>
            <strong>
              Based on our Machine Learning Platform, YOUR car maintenance score
              is
            </strong>
            : {maintenancePrediction}. Not bad - keep this in mind as you look
            for commuters!
          </p>
        </div>
      )}
    </section>
  );
};
