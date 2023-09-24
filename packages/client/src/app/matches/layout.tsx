import { AppLayout } from '@/ui/app-layout';

export default async function MatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
