import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Andon',
  description: 'Area Assistance Ticketing System',
};

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <title>Andon</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
