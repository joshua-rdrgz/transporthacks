import { AppLayout } from '@/ui/app-layout';

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
