'use client';

import Link from 'next/link';
import { ModeToggle } from '@/features/theme/ModeToggle';
import { Logo } from '@/ui/logo';
import { Button } from '@/ui/button';

interface IAuthPageLayoutProps {
  formTitle: string;
  formSubtitle: string;
  formComponent: React.ReactElement;
  footerLabel: string;
  footerLinkLabel: string;
  footerLinksTo: '/login' | '/signup';
}

export const AuthPageLayout: React.FC<IAuthPageLayoutProps> = ({
  formTitle,
  formSubtitle,
  formComponent,
  footerLabel,
  footerLinkLabel,
  footerLinksTo,
}) => {
  return (
    <>
      <div className='text-right p-3'>
        <ModeToggle />
      </div>
      <div className='flex flex-col justify-start gap-5 min-h-screen text-center bg-secondary'>
        <header>
          <Logo figureClassName='flex justify-center' size={200} />
        </header>
        <main>
          <div className='flex flex-col gap-4'>
            <h1 className='font-display text-5xl text-primary'>{formTitle}</h1>
            <p className='text-primary'>{formSubtitle}</p>
            <div className='w-full mx-auto bg-background rounded-md py-5 px-6 sm:w-3/4 md:w-1/2 xl:w-1/3'>
              {formComponent}
            </div>
          </div>
        </main>
        <footer>
          {footerLabel}{' '}
          <Link href={footerLinksTo}>
            <Button variant='link' className='text-md'>
              {footerLinkLabel}
            </Button>
          </Link>
        </footer>
      </div>
    </>
  );
};
