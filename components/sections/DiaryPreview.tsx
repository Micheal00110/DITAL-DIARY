/**
 * Diary Preview Component - Academic Structure
 * Shows a read-only preview of the academic diary
 * Matches the St. Peter's Secondary School template
 */

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { AcademicDiaryData } from '@/lib/types';
import { StudentDetailsCard } from '@/components/diary/StudentDetailsCard';
import { WeeklyDiaryLayout } from '@/components/diary/WeeklyDiaryLayout';
import { SignatureSections } from '@/components/diary/SignatureSections';
import { academicDiarySampleData } from '@/lib/sample-data';

interface DiaryPreviewProps {
  data: AcademicDiaryData; // Keep it flexible for transition
  onBack: () => void;
}

