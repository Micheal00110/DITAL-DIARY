/**
 * Diary Editor Component - Academic Structure
 * Consolidated academic diary view based on St. Peter's Secondary School template
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RotateCcw, AlertCircle } from 'lucide-react';
import { AcademicDiaryData, WeeklyScheduleEntry, SchoolDetails, StudentDetails, TeacherRemarks, ParentSignature } from '@/lib/types';
import { SchoolHeader } from '@/components/diary/SchoolHeader';
import { StudentDetailsCard } from '@/components/diary/StudentDetailsCard';
import { WeeklyDiaryLayout } from '@/components/diary/WeeklyDiaryLayout';
import { SignatureSections } from '@/components/diary/SignatureSections';
import { academicDiarySampleData } from '@/lib/sample-data';
import { cn } from '@/lib/utils';
import { 
  STORAGE_KEYS, 
  AUTO_SAVE_DELAY, 
  DEFAULT_SCHOOL_DETAILS, 
  DEFAULT_STUDENT_DETAILS,
  STATUS_STYLES,
  STATUS_TEXT,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PRINT_CONFIG
} from '@/lib/constants';
import { DayOfWeek } from '@/lib/types/enums';
import { getFromStorage, setToStorage } from '@/lib/storage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DiaryEditorProps {
  onBack: () => void;
}

const DEFAULT_ACADEMIC_DATA: AcademicDiaryData = {
  schoolDetails: DEFAULT_SCHOOL_DETAILS,
  studentDetails: DEFAULT_STUDENT_DETAILS,
  weeklySchedule: [],
  verified: false,
};

export function DiaryEditor({ onBack }: DiaryEditorProps) {
  const [diaryData, setDiaryData] = useState<AcademicDiaryData>(DEFAULT_ACADEMIC_DATA);
  const [isSaved, setIsSaved] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedData = getFromStorage<AcademicDiaryData>('ACADEMIC_DIARY_DATA', DEFAULT_ACADEMIC_DATA);
      if (savedData) {
        setDiaryData(savedData);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : ERROR_MESSAGES.LOAD_DATA;
      setError(errorMsg);
      console.error(ERROR_MESSAGES.LOAD_DATA, e);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const success = setToStorage('ACADEMIC_DIARY_DATA', diaryData);
        if (success) {
          setIsSaved(true);
          setError(null);
        } else {
          setError(ERROR_MESSAGES.SAVE_DATA);
        }
      } catch (e) {
        setError(ERROR_MESSAGES.SAVE_DATA);
        console.error(ERROR_MESSAGES.SAVE_DATA, e);
      }
    }, AUTO_SAVE_DELAY);
    
    return () => clearTimeout(timer);
  }, [diaryData]);

  const handleUpdateSchool = (field: keyof SchoolDetails, value: string) => {
    setDiaryData(prev => ({
      ...prev,
      schoolDetails: { ...prev.schoolDetails, [field]: value }
    }));
    setIsSaved(false);
  };

  const handleUpdateStudent = (field: keyof StudentDetails, value: string | number) => {
    setDiaryData(prev => ({
      ...prev,
      studentDetails: { ...prev.studentDetails, [field]: value as any }
    }));
    setIsSaved(false);
  };

  const addScheduleEntry = () => {
    const newEntry: WeeklyScheduleEntry = {
      id: Date.now().toString(),
      dayOfWeek: DayOfWeek.MONDAY,
      date: '',
      subject: '',
      lessonTopics: [],
      homework: '',
    };
    setDiaryData(prev => ({
      ...prev,
      weeklySchedule: [...prev.weeklySchedule, newEntry]
    }));
    setIsSaved(false);
  };

  const addEntryForDay = (dayOfWeek: string) => {
    // Check if entry already exists for this day
    const existingEntry = diaryData.weeklySchedule.find(entry => entry.dayOfWeek === dayOfWeek);
    if (existingEntry) {
      return; // Entry already exists
    }

    const newEntry: WeeklyScheduleEntry = {
      id: Date.now().toString(),
      dayOfWeek: dayOfWeek as DayOfWeek,
      date: '',
      subject: '',
      lessonTopics: [],
      homework: '',
    };
    setDiaryData(prev => ({
      ...prev,
      weeklySchedule: [...prev.weeklySchedule, newEntry]
    }));
    setIsSaved(false);
  };

  const updateScheduleEntry = (id: string, field: keyof WeeklyScheduleEntry, value: string | string[]) => {
    setDiaryData(prev => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    }));
    setIsSaved(false);
  };

  const deleteScheduleEntry = (id: string) => {
    setDiaryData(prev => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.filter(entry => entry.id !== id)
    }));
    setIsSaved(false);
  };

  const updateTeacherRemarks = (field: keyof TeacherRemarks, value: string) => {
    setDiaryData(prev => ({
      ...prev,
      teacherRemarks: { ...(prev.teacherRemarks || { remarks: '', teacherName: '', date: '' }), [field]: value }
    }));
    setIsSaved(false);
  };

  const updateParentSignature = (field: keyof ParentSignature, value: string) => {
    setDiaryData(prev => ({
      ...prev,
      parentSignature: { ...(prev.parentSignature || { date: '' }), [field]: value }
    }));
    setIsSaved(false);
  };

  const loadSampleData = () => {
    const confirmed = window.confirm(ERROR_MESSAGES.CONFIRM_LOAD_SAMPLE);
    if (confirmed) {
      try {
        setDiaryData(academicDiarySampleData);
        setIsSaved(false);
        setError(null);
      } catch (e) {
        setError('Failed to load sample data');
        console.error('Error loading sample data:', e);
      }
    }
  };

  // Basic PDF export simulation
  const exportToPDF = () => {
    try {
      window.print();
    } catch (e) {
      setError('Failed to open print dialog');
      console.error('Error opening print dialog:', e);
    }
  };

  const clearError = () => setError(null);

  return (
    <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6 lg:p-8 print:p-0">
      <div className="max-w-4xl sm:max-w-5xl mx-auto bg-white shadow-xl min-h-[800px] sm:min-h-[1100px] flex flex-col print:shadow-none">
        
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="m-4 border-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="mt-2 flex items-center justify-between">
              <span>{error}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearError}
                className="ml-2"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Editor Controls (Hidden during print) */}
        <div className={cn('p-3 sm:p-4 border-b bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3', PRINT_CONFIG.HIDE_DURING_PRINT)}>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">Back</span>
            </Button>
            <h1 className="text-base sm:text-lg font-bold">Academic Diary Editor</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2">
            <Button variant="outline" size="sm" onClick={loadSampleData}>
              <RotateCcw className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm">Load Sample</span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm hidden sm:inline">Print / PDF</span>
              <span className="text-sm sm:hidden">PDF</span>
            </Button>
            <div className={cn('text-xs px-2 py-1 rounded', isSaved ? STATUS_STYLES.SAVED : STATUS_STYLES.SAVING)}>
              {isSaved ? STATUS_TEXT.SAVED : STATUS_TEXT.SAVING}
            </div>
          </div>
        </div>

        {/* The Diary Document Area */}
        <div className="flex-1 p-3 sm:p-6 md:p-8 lg:p-10 space-y-0">
          <SchoolHeader 
            schoolDetails={diaryData.schoolDetails} 
            editable={true}
            onUpdate={handleUpdateSchool}
          />
          
          <StudentDetailsCard 
            studentDetails={diaryData.studentDetails}
            editable={true}
            onUpdate={handleUpdateStudent}
          />
          
          <WeeklyDiaryLayout 
            entries={diaryData.weeklySchedule}
            editable={true}
            onAdd={addScheduleEntry}
            onAddEntry={addEntryForDay}
            onUpdate={updateScheduleEntry}
            onDelete={deleteScheduleEntry}
            weekNumber={diaryData.weekNumber}
          />
          
          <SignatureSections 
            teacherRemarks={diaryData.teacherRemarks}
            parentSignature={diaryData.parentSignature}
            verified={diaryData.verified}
            editable={true}
            onUpdateTeacher={updateTeacherRemarks}
            onUpdateParent={updateParentSignature}
          />
          
          {/* Page Footer Info */}
          <div className="mt-auto pt-12 flex justify-between text-xs text-gray-500 uppercase font-medium">
             <span>Week {diaryData.weekNumber || 1} | Page 1 of 12</span>
          </div>
        </div>
      </div>
      
      {/* Visual Instruction (Hidden during print) */}
      <div className={cn('max-w-5xl mx-auto mt-4 text-center text-gray-500 text-sm', PRINT_CONFIG.HIDE_DURING_PRINT)}>
        <p>Tip: Click on fields to edit. Changes are saved automatically.</p>
      </div>
    </div>
  );
}
