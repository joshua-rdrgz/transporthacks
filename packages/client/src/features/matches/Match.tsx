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
}

export const Match: React.FC<IMatchProps> = ({ match, status }) => {
  return (
    <section className='flex flex-col gap-9 bg-muted p-4 rounded'>
      <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
        <div className='flex flex-col gap-1 text-center lg:text-left'>
          <h3 className='font-bold text-2xl'>{match.name}</h3>
          <p className='text-sm'>
            <strong>Email:</strong> {match.email}
          </p>
          <p className='text-sm'>
            <strong>Start Point:</strong> {match.startAddress}
          </p>
          <p className='text-sm'>
            <strong>End Point:</strong> {match.endAddress}
          </p>
        </div>
        <div className='flex gap-3 items-center mx-auto'>
          <Button
            variant='ghost'
            className='hover:bg-foreground dark:bg-muted dark:hover:bg-background'
          >
            Deny Offer
          </Button>
          <Button
            variant='outline'
            className='hover:bg-foreground dark:bg-muted dark:hover:bg-background'
          >
            Accept Offer
          </Button>
          <Button className='dark:text-foreground'>See Details</Button>
        </div>
      </div>
      <DisplayMap startPoint={match.startPoint} endPoint={match.endPoint} />
      {status === 'potential' && (
        <div>
          <p className='text-sm'>
            <strong>Our Machine Learning platform&apos;s thoughts</strong>: This
            car is likely costly to maintain. Make sure you have the dough to
            spend for this commute!
          </p>
        </div>
      )}
    </section>
  );
};
