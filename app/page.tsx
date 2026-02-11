/**
 * Home Page Component
 * Main entry point for the app
 * Manages navigation between Landing Page, Preview, and Diary Editor
 */

'use client';

import { useState } from 'react';
import { LandingPage } from '@/components/sections/LandingPage';
import { DiaryPreview } from '@/components/sections/DiaryPreview';
import { DiaryEditor } from '@/components/sections/DiaryEditor';
import { academicDiarySampleData } from '@/lib/sample-data';

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

      {/* Preview Page - Read-only sample diary */}
      {currentPage === 'preview' && (
        <DiaryPreview
          data={academicDiarySampleData}
          onBack={handleBackToHome}
        />
      )}

      {/* Editor Page - Editable diary for user input */}
      {currentPage === 'editor' && (
        <DiaryEditor onBack={handleBackToHome} />
      )}
    </>
  );
}
