/**
 * Landing Page Component
 * Shows the diary cover and navigation options
 * No login required - users can preview or open the diary directly
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Eye, LogIn } from 'lucide-react';

interface LandingPageProps {
  onPreview: () => void;
  onOpenDiary: () => void;
}

export function LandingPage({ onPreview, onOpenDiary }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-white flex items-center justify-center p-4">
      {/* Main container */}
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kenyan Student Diary
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Digital School Diary for Kenyan Schools
          </p>
          <p className="text-gray-500">
            As easy as a paper diary, but more reliable
          </p>
        </div>

        {/* Diary Cover Card */}
        <Card className="mb-8 overflow-hidden shadow-2xl border-0">
          <div className="bg-gradient-to-br from-emerald-600 to-blue-700 p-12 text-white text-center">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 mx-auto opacity-80" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Student Diary</h2>
            <p className="text-emerald-100 mb-6">
              Track attendance, learning progress, homework, and behavior
            </p>
            <div className="space-y-2 text-sm text-emerald-50">
              <p>✓ No login required</p>
              <p>✓ Works offline</p>
              <p>✓ Printable to PDF</p>
              <p>✓ Simple and easy to use</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Preview Button */}
          <Button
            onClick={onPreview}
            variant="outline"
            size="lg"
            className="h-16 text-lg border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview the Diary
          </Button>

          {/* Open Diary Button */}
          <Button
            onClick={onOpenDiary}
            size="lg"
            className="h-16 text-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Open Student Diary
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            This app is designed for parents and teachers in Kenyan schools.
          </p>
          <p className="mt-2">
            Your data stays on your device. No login required to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
