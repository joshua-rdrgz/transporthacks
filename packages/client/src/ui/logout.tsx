import { Button } from '@/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };
  return (
    <Button variant='outline' onClick={handleLogout}>
      <LogOut size={15} />
    </Button>
  );
};
