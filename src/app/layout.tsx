import './globals.css';
import type { Metadata } from 'next';
import TanStackProvider from '@/context/TanStackContext';
export const metadata: Metadata = {
  title: 'ZATS',
  description: 'Zone Assistance Ticketing System',
};

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <title>ZATS</title>
      </head>
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
