'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ILogoProps {
  figureClassName: string;
  size: number;
}

export const Logo: React.FC<ILogoProps> = ({ figureClassName, size }) => {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | 'system'>(
    'system'
  );

  useEffect(() => {
    const setToDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const listener = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'dark' : 'light');

    setToDarkQuery.addEventListener('change', listener);

    return () => setToDarkQuery.removeEventListener('change', listener);
  }, []);

  const src =
    theme === 'system'
      ? systemTheme === 'dark'
        ? '/logo-white.svg'
        : '/logo-color.svg'
      : theme === 'dark'
      ? '/logo-white.svg'
      : '/logo-color.svg';

  return (
    <figure className={cn('mx-auto', figureClassName)}>
      <Image src={src} alt='Logo of Budgetbook' width={size} height={size} />
    </figure>
  );
};
