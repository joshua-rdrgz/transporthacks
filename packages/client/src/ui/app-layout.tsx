'use client';

import { Header } from '@/ui/header';
import { Sidebar } from '@/ui/sidebar';

interface IAppPageLayoutProps {
  children: React.ReactNode;
  userName: string;
}

export const AppLayout: React.FC<IAppPageLayoutProps> = ({
  children,
  userName,
}) => {
  return (
    <div className='grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <Header userName={userName} />
      <Sidebar />
      <main className='overflow-auto scrollb px-6 py-4'>
        <div className='max-w-3xl mx-auto flex flex-col gap-6'>{children}</div>
      </main>
    </div>
  );
};
