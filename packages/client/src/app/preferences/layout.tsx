import { AppLayout } from '@/ui/app-layout';

export default async function PreferencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
