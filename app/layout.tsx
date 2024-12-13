import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Debate Club',
  description: 'Two AI models debate a topic of your choice.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
