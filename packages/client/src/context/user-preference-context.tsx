'use client';

import { TLatLng } from '@/lib/utils';
import { createContext, useContext } from 'react';

type TLocation = (TLatLng & { id: string }) | null;

export type TUserPreferenceProps = {
  userId?: string | null;
  status?: 'DRIVER' | 'COMMUTER' | 'UNKNOWN' | null;
  startPoint: TLocation;
  endPoint: TLocation;
  startPointAddress: string | null;
  endPointAddress: string | null;
  carBuyingPrice?: string;
  numDoors?: string;
  numSeats?: string;
  luggageBootSize?: string;
  safetyRating?: string;
  popularity?: string;
};

const UserPreferenceContext = createContext<TUserPreferenceProps | null>(null);

interface IUserProviderProps {
  children: React.ReactNode;
  value: TUserPreferenceProps | null;
}
export const UserPreferenceProvider: React.FC<IUserProviderProps> = async ({
  children,
  value: userPreferences,
}) => {
  return (
    <UserPreferenceContext.Provider value={userPreferences}>
      {children}
    </UserPreferenceContext.Provider>
  );
};

export const useUserPreferences = () => {
  const userPreference = useContext(UserPreferenceContext);

  if (userPreference === undefined) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }

  if (!userPreference) {
    throw new Error('no user preferences available');
  }
  return userPreference;
};
