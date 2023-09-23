'use client';

import Link from 'next/link';
import { Logo } from '@/ui/logo';
import { Users, Settings2, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    label: 'Matches',
    icon: Users,
    link: '/matches',
  },
  {
    label: 'Commuting Preferences',
    icon: Settings2,
    link: '/preferences',
  },
  {
    label: 'User Settings',
    icon: Settings,
    link: '/settings',
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='row-span-full pt-5 px-4 flex flex-col gap-12 bg-secondary'>
      <Logo figureClassName='w-full' />
      <nav>
        <ul className='flex flex-col gap-6'>
          {NAV_ITEMS.map((navItem) => {
            const Icon = navItem.icon;
            return (
              <li key={navItem.label} className='group/li shadow-sm'>
                <Link
                  href={navItem.link}
                  className={`flex gap-2 bg-background group-hover/li:bg-muted items-center rounded py-2 px-3 transition group/link ${
                    pathname === navItem.link ? 'active' : ''
                  }`}
                >
                  <Icon className='text-accent group-hover/li:text-accent-foreground group-[.active]/link:text-accent-foreground' />
                  <span>{navItem.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
