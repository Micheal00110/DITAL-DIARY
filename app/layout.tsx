/**
 * Root layout for Kenyan Student Diary App
 * Sets up metadata, fonts, and global styling
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Kenyan Student Diary - Digital School Diary',
    template: '%s | Kenyan Student Diary',
  },
  description:
    'A simple, table-based digital student diary for Kenyan schools. Track attendance, learning progress, homework, and behavior. No login required.',
  keywords: [
    'student diary',
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
    siteName: 'Kenyan Student Diary',
    title: 'Kenyan Student Diary - Digital School Diary',
    description: 'Simple digital student diary for Kenyan schools. No login required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kenyan Student Diary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kenyan Student Diary',
    description: 'Simple digital student diary for Kenyan schools',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        {/* Main content wrapper */}
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
