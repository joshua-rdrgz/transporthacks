import { UserProvider } from '@/context/user-context';
import { UserPreferenceProvider } from '@/context/user-preference-context';
import { getAddressFromLatLng } from '@/lib/utils';
import { getCurrentUser } from '@/services/apiAuth';
import { getUserLocation } from '@/services/apiLocations';
import { getUserPreferences } from '@/services/apiPreferences';
import { Header } from '@/ui/header';
import { Sidebar } from '@/ui/sidebar';

interface IAppPageLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<IAppPageLayoutProps> = async ({
  children,
}) => {
  const currentUser = await getCurrentUser();
  const userPreference = await getUserPreferences();

  if (!userPreference) {
    return <div>Loading...</div>;
  }

  const startPoint = await getUserLocation(userPreference.startPointId);
  const endPoint = await getUserLocation(userPreference.endPointId);

  return (
    <UserProvider value={currentUser}>
      <UserPreferenceProvider
        value={{
          userId: userPreference?.userId,
          status: userPreference?.status,
          startPoint: startPoint,
          endPoint: endPoint,
          startPointAddress: await getAddressFromLatLng(
            startPoint?.lat,
            startPoint?.lng
          ),
          endPointAddress: await getAddressFromLatLng(
            endPoint?.lat,
            endPoint?.lng
          ),
        }}
      >
        <div className='grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] h-screen'>
          <Header />
          <Sidebar />
          <main className='overflow-auto scrollb px-6 py-4'>
            <div className='max-w-3xl mx-auto flex flex-col gap-6'>
              {children}
            </div>
          </main>
        </div>
      </UserPreferenceProvider>
    </UserProvider>
  );
};
