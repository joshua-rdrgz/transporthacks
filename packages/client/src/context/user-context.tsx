'use client';

import { TCurrentUser } from '@/services/apiAuth';
import { createContext, useContext } from 'react';

type UserContextProps = TCurrentUser;

const UserContext = createContext<UserContextProps | null>(null);

interface IUserProviderProps {
  children: React.ReactNode;
  value: UserContextProps | null;
}
export const UserProvider: React.FC<IUserProviderProps> = async ({
  children,
  value: currentUser,
}) => {
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const currentUser = useContext(UserContext);

  if (currentUser === undefined) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }

  if (!currentUser) {
    throw new Error('no user available');
  }
  return currentUser;
};
