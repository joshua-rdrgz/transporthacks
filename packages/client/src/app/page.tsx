import { getCurrentUser } from '@/services/apiAuth';

export default async function HomePage() {
  const user = await getCurrentUser();
  console.log('USER: ', user);
  return <main>protected content</main>;
}
