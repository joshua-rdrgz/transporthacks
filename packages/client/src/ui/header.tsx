'use client';

import { ModeToggle } from '@/features/theme/ModeToggle';

interface IHeaderProps {
  userName: string;
}

export const Header: React.FC<IHeaderProps> = ({ userName }) => {
  return (
    <header className='bg-secondary flex items-center gap-6 justify-end py-2 pr-3'>
      <div>{userName}</div>
      <ModeToggle />
    </header>
  );
};
