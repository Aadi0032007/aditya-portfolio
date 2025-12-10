import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';

const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Aditya Raj | AI Engineer Portfolio',
  description: 'Award-winning immersive portfolio for Aditya Raj — AI Engineer specializing in robotics, LLMs, and physics-inspired systems.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="bg-deep text-slate-100 antialiased min-h-screen">{children}</body>
    </html>
  );
}
