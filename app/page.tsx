/**
 * Home Page Component
 * Main entry point for the app
 * Manages navigation between Landing Page, Preview, and Diary Editor
 */

'use client';

import { useState } from 'react';
import { LandingPage } from '@/components/sections/LandingPage';
import { DiaryEditor } from '@/components/sections/DiaryEditor';
import { academicDiarySampleData } from '@/lib/sample-data';
import { BookletContainer } from '@/components/booklet/BookletContainer';
import { BookletCover } from '@/components/booklet/BookletCover';
import { TermDatesPage } from '@/components/booklet/TermDatesPage';
import { LearnerDetailsPage } from '@/components/booklet/LearnerDetailsPage';
import { WeeklyDiaryPage } from '@/components/booklet/WeeklyDiaryPage';

// Page state enum for navigation
type PageState = 'landing' | 'preview' | 'editor';

export default function Home() {
  // Track which page/section is currently displayed
  const [currentPage, setCurrentPage] = useState<PageState>('landing');

  // Handle navigation to preview page
  const handlePreview = () => {
    setCurrentPage('preview');
  };

  // Handle navigation to diary editor
  const handleOpenDiary = () => {
    setCurrentPage('editor');
  };

  // Handle navigation back to landing page
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
        <DiaryEditor onBack={handleBackToHome} />
      )}
    </>
  );
}
