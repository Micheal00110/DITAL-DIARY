/**
 * Home Page Component
 * Main entry point for the app
 * Manages navigation between Landing Page, Preview, and Diary Editor
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { LandingPage } from '@/components/sections/LandingPage';
import { DiaryEditor } from '@/components/sections/DiaryEditor';
import { academicDiarySampleData } from '@/lib/sample-data';
import { BookletContainer } from '@/components/booklet/BookletContainer';
import { BookletCover } from '@/components/booklet/BookletCover';
import { TermDatesPage } from '@/components/booklet/TermDatesPage';
import { LearnerDetailsPage } from '@/components/booklet/LearnerDetailsPage';
import { WeeklyDiaryPage } from '@/components/booklet/WeeklyDiaryPage';

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function getDayOfWeekIndex(dateString: string): number {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

function parseDateFromParams(): { date: string; dayIndex: number } {
  if (typeof window === 'undefined') return { date: '', dayIndex: 0 };
  
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get('date');
  
  if (dateParam) {
    const dayIndex = getDayOfWeekIndex(dateParam);
    return { date: dateParam, dayIndex };
  }
  return { date: '', dayIndex: 0 };
}

// Page state enum for navigation
type PageState = 'landing' | 'preview' | 'editor';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [initialDayIndex, setInitialDayIndex] = useState(0);
  const [initialDate, setInitialDate] = useState('');

  useEffect(() => {
    const { date, dayIndex } = parseDateFromParams();
    if (date) {
      setInitialDate(date);
      setInitialDayIndex(dayIndex);
    }
  }, []);

  const handlePreview = () => {
    setCurrentPage('preview');
  };

  const handleOpenDiary = () => {
    setCurrentPage('editor');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  return (
    <>
      {/* Landing Page - Initial view with navigation options */}
      {currentPage === 'landing' && (
        <LandingPage
          onPreview={handlePreview}
          onOpenDiary={handleOpenDiary}
        />
      )}

      {/* Preview Page - Interactive Booklet */}
      {currentPage === 'preview' && (
        <div className="min-h-screen bg-slate-200">
          <BookletContainer onBack={handleBackToHome}>
            <BookletCover />
            <TermDatesPage />
            <LearnerDetailsPage />
            <WeeklyDiaryPage 
              entries={[
                { day: "Monday / Jumatatu", date: "" },
                { day: "Tuesday / Jumanne", date: "" },
                { day: "Wednesday / Jumatano", date: "" },
              ]}
            />
            <WeeklyDiaryPage 
              isEvenPage={true}
              entries={[
                { day: "Thursday / Alhamisi", date: "" },
                { day: "Friday / Ijumaa", date: "" },
                { day: "Saturday / Jumamosi", date: "" },
              ]}
            />
          </BookletContainer>
        </div>
      )}

      {/* Editor Page - Editable diary for user input */}
      {currentPage === 'editor' && (
        <DiaryEditor 
          onBack={handleBackToHome} 
          initialDayIndex={initialDayIndex}
          initialDate={initialDate}
        />
      )}
    </>
  );
}
