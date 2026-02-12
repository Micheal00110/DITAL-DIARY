/**
 * Root layout for Kenyan Student Diary App
 * Sets up metadata, fonts, and global styling
 */

import type { Metadata } from 'next';
import { Inter, Caveat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwriting' });

export const metadata: Metadata = {
  title: {
    default: '***STUDENT DIARY*** - Kenyan Digital School Diary',
    template: '%s | ***STUDENT DIARY***',
  },
  description:
    'TRANSPARENCY - A simple, table-based digital student diary for Kenyan schools. Track attendance, learning progress, homework, and behavior. No login required.',
  keywords: [
    '***STUDENT DIARY***',
    'school diary',
    'Kenya',
    'attendance tracking',
    'learning progress',
    'CBC',
    'digital diary',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://kenyan-student-diary.app',
    siteName: '***STUDENT DIARY*** - Kenyan Student Diary',
    title: '***STUDENT DIARY*** - TRANSPARENCY',
    description: 'TRANSPARENCY - Simple digital student diary for Kenyan schools. No login required.',
    images: [
      {
        url: '/diary-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Student Diary - Transparency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '***STUDENT DIARY*** - TRANSPARENCY',
    description: 'TRANSPARENCY - Simple digital student diary for Kenyan schools',
    images: ['/diary-logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/diary-logo.svg',
    apple: '/diary-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, caveat.variable, 'bg-white text-gray-900')}>
        {/* Main content wrapper */}
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
