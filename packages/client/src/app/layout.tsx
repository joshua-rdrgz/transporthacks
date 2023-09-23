import { ThemeProvider } from '@/features/theme/theme-provider';

import './globals.css';
import { ToasterProvider } from '@/lib/ToasterProvider';

export const metadata = {
  title: 'Transport Hacks Project',
  description: 'transport hacks project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system'>
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
