'use client';

import { Button } from '@/ui/button';

interface IMatch {
  name: string;
  email: string;
  startPoint: string;
  endPoint: string;
}

interface IMatchProps {
  match: IMatch;
}

export const Match: React.FC<IMatchProps> = ({ match }) => {
  return (
    <section className='flex flex-col gap-7 lg:flex-row lg:justify-between bg-muted p-4 rounded'>
      <div className='flex flex-col gap-1 text-center'>
        <h3 className='font-bold text-2xl'>{match.name}</h3>
        <p className='text-sm'>
          <strong>Email:</strong> {match.email}
        </p>
        <p className='text-sm'>
          <strong>Start Point:</strong> {match.startPoint}
        </p>
        <p className='text-sm'>
          <strong>End Point:</strong> {match.endPoint}
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
    </section>
  );
};
