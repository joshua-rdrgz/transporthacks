import { MatchesClient } from '@/app/matches/MatchesClient';
import { getCurrentUser } from '@/services/apiAuth';

export default async function MatchesPage() {
  const currentUser = await getCurrentUser();
  return <MatchesClient currentUser={currentUser} />;
}
