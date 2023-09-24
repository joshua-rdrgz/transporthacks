'use client';

import { useCurrentUser } from '@/context/user-context';
import { ModeToggle } from '@/features/theme/ModeToggle';
import { Logout } from '@/ui/logout';

export const Header = () => {
  const currentUser = useCurrentUser();
  return (
    <header className='bg-secondary flex items-center gap-6 justify-end py-2 pr-3'>
      <div>Welcome, {currentUser.name}!</div>
      <ModeToggle />
      <Logout />
    </header>
  );
};
