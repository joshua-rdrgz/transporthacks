import { AppLayout } from '@/ui/app-layout';
import { getCurrentUser } from '@/services/apiAuth';

export default async function PreferencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <AppLayout userName={currentUser?.name as string}>{children}</AppLayout>
  );
}
