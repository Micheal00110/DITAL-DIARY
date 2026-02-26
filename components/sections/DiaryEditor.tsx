/**
 * Diary Editor Component - Academic Structure
 * Consolidated academic diary view based on St. Peter's Secondary School template
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertCircle, BookOpen, ClipboardList } from 'lucide-react';
import { AcademicDiaryData, WeeklyScheduleEntry, SchoolDetails, StudentDetails, TeacherRemarks, ParentSignature } from '@/lib/types';
import { StudentDetailsCard } from '@/components/diary/StudentDetailsCard';
import { WeeklyDiaryLayout } from '@/components/diary/WeeklyDiaryLayout';
import { WeeklySummary } from '@/components/diary/WeeklySummary';
import { SignatureSections } from '@/components/diary/SignatureSections';

type EditorPage = 'diary' | 'summary';
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
import { WelcomeHeader } from '@/components/ui/WelcomeHeader';

interface DiaryEditorProps {
  onBack: () => void;
  initialDayIndex?: number;
  initialDate?: string;
}

const DEFAULT_ACADEMIC_DATA: AcademicDiaryData = {
  schoolDetails: DEFAULT_SCHOOL_DETAILS,
  studentDetails: DEFAULT_STUDENT_DETAILS,
  weeklySchedule: [],
  verified: false,
};

export function DiaryEditor({ onBack, initialDayIndex = 0, initialDate = '' }: DiaryEditorProps) {
  const [diaryData, setDiaryData] = useState<AcademicDiaryData>(DEFAULT_ACADEMIC_DATA);
  const [isSaved, setIsSaved] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorPage, setEditorPage] = useState<EditorPage>('diary');
  const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex);

  // Helper function to get day index from date
  const getDayIndexFromDate = (dateString: string): number => {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0=Sunday, 1=Monday...
    // Adjust to Monday=0, Tuesday=1, etc.
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  // Helper function to get day name from date
  const getDayFromDate = (dateString: string): string => {
    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
    const dayIndex = getDayIndexFromDate(dateString);
    return days[dayIndex];
  };

  // Sync date with day index when initialDate changes
  useEffect(() => {
    if (initialDate) {
      const dayIndex = getDayIndexFromDate(initialDate);
      setActiveDayIndex(dayIndex);
    } else {
      // Set default to today's date if no initial date
      const today = new Date().toISOString().split('T')[0];
      const dayIndex = getDayIndexFromDate(today);
      setActiveDayIndex(dayIndex);
    }
  }, [initialDate]);

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
    // Removed guard to allow multiple subjects per day
    const newEntry: WeeklyScheduleEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      dayOfWeek: dayOfWeek as DayOfWeek,
      date: diaryData.weeklySchedule.find(e => e.dayOfWeek === dayOfWeek)?.date || '',
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

  const updateLearningProgress = (id: string, field: keyof any, value: any) => {
    setDiaryData(prev => ({
      ...prev,
      learningProgress: (prev.learningProgress || []).map(lp => 
        lp.id === id ? { ...lp, [field]: value } : lp
      )
    }));
    setIsSaved(false);
  };

  const updateBehaviour = (id: string, field: keyof any, value: any) => {
    setDiaryData(prev => ({
      ...prev,
      behaviour: (prev.behaviour || []).map(b => 
        b.id === id ? { ...b, [field]: value } : b
      )
    }));
    setIsSaved(false);
  };

  const updateTeacherNote = (id: string, field: keyof any, value: any) => {
    setDiaryData(prev => ({
      ...prev,
      teacherNotes: (prev.teacherNotes || []).map(tn => 
        tn.id === id ? { ...tn, [field]: value } : tn
      )
    }));
    setIsSaved(false);
  };

  const addLearningProgress = () => {
    const newEntry: any = {
      id: Date.now().toString(),
      learningArea: 'New Area',
      skill: 'New Skill',
      progress: 'Fair',
      teacherComment: ''
    };
    setDiaryData(prev => ({
      ...prev,
      learningProgress: [...(prev.learningProgress || []), newEntry]
    }));
    setIsSaved(false);
  };

  const addBehaviour = () => {
    const newEntry: any = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      behaviourObserved: 'Interaction',
      actionTaken: 'Discussion',
      teacherComment: ''
    };
    setDiaryData(prev => ({
      ...prev,
      behaviour: [...(prev.behaviour || []), newEntry]
    }));
    setIsSaved(false);
  };

  const addTeacherNote = () => {
    const newEntry: any = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      from: 'TEACHER',
      subject: 'Weekly Progress',
      message: '',
      read: false
    };
    setDiaryData(prev => ({
      ...prev,
      teacherNotes: [...(prev.teacherNotes || []), newEntry]
    }));
    setIsSaved(false);
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
    <div className="min-h-screen bg-gray-100 p-0 sm:p-4 md:p-6 lg:p-8 print:p-0">
      <WelcomeHeader />
      <div className="w-full max-w-4xl mx-auto bg-white shadow-xl min-h-screen sm:min-h-[700px] flex flex-col print:shadow-none">
        
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
        <div className={cn('p-3 sm:p-4 border-b bg-gray-50 flex flex-col gap-3', PRINT_CONFIG.HIDE_DURING_PRINT)}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-sm">Back</span>
              </Button>
              <h1 className="text-base sm:text-lg font-bold">DIARY</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2">

              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <Download className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-sm hidden sm:inline">Print / PDF</span>
                <span className="text-sm sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
          
          {/* Status Indicator - Fixed Position */}
          <div className="flex justify-center sm:justify-end">
            <div className={cn('text-xs px-3 py-1.5 rounded-full font-medium shadow-sm', isSaved ? STATUS_STYLES.SAVED : STATUS_STYLES.SAVING)}>
              {isSaved ? STATUS_TEXT.SAVED : STATUS_TEXT.SAVING}
            </div>
          </div>

          {/* Page Tabs */}
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => setEditorPage('diary')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all',
                editorPage === 'diary'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              )}
            >
              <BookOpen className="w-4 h-4" />
              Daily Entries
            </button>
            <button
              onClick={() => setEditorPage('summary')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all',
                editorPage === 'summary'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              )}
            >
              <ClipboardList className="w-4 h-4" />
              Weekly Summary
            </button>
          </div>
        </div>

        {/* The Diary Document Area */}
        <div className="flex-1 p-3 sm:p-6 md:p-8 lg:p-10 space-y-0">

          {/* Page 1: Daily Entries */}
          <div className={cn(
            "space-y-0",
            editorPage === 'diary' ? 'block' : 'hidden print:block',
            "print:break-after-page"
          )}>
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
              term={diaryData.studentDetails.term}
              onTermChange={(value) => handleUpdateStudent('term', value)}
              onWeekChange={(value) => setDiaryData(prev => ({ ...prev, weekNumber: value }))}
              initialDayIndex={activeDayIndex}
              initialDate={initialDate || new Date().toISOString().split('T')[0]}
              onDateChange={(date) => {
                // Auto-update day index when date changes
                const newDayIndex = getDayIndexFromDate(date);
                setActiveDayIndex(newDayIndex);
              }}
            />
            {/* Page 1 Footer (Print Only) */}
            <div className="hidden print:flex mt-auto pt-8 justify-between text-[10px] text-gray-400 uppercase font-bold border-t border-gray-100">
               <span>Week {diaryData.weekNumber || 1} | Page 1 of 2</span>
               <span>Digital Student Diary</span>
            </div>
          </div>

          {/* Page 2: Weekly Summary */}
          <div className={cn(
            "space-y-0",
            editorPage === 'summary' ? 'block' : 'hidden print:block'
          )}>
            <WeeklySummary
              entries={diaryData.weeklySchedule}
              learningProgress={diaryData.learningProgress}
              behaviour={diaryData.behaviour}
              teacherNotes={diaryData.teacherNotes}
              teacherRemarks={diaryData.teacherRemarks}
              parentSignature={diaryData.parentSignature}
              editable={true}
              weekNumber={diaryData.weekNumber}
              term={diaryData.studentDetails.term}
              onUpdateLearningProgress={updateLearningProgress}
              onUpdateBehaviour={updateBehaviour}
              onUpdateTeacherNote={updateTeacherNote}
              onUpdateTeacherRemarks={updateTeacherRemarks}
              onUpdateParentSignature={updateParentSignature}
              onAddLearningProgress={addLearningProgress}
              onAddBehaviour={addBehaviour}
              onAddTeacherNote={addTeacherNote}
            />
            {/* Page 2 Footer (Print Only) */}
            <div className="hidden print:flex mt-auto pt-8 justify-between text-[10px] text-gray-400 uppercase font-bold border-t border-gray-100">
               <span>Week {diaryData.weekNumber || 1} | Page 2 of 2</span>
               <span>Digital Student Diary</span>
            </div>
          </div>
          
          {/* Page Footer Info */}
          <div className="mt-auto pt-12 flex justify-between text-xs text-gray-500 uppercase font-medium print:hidden">
             <span>Week {diaryData.weekNumber || 1} | {editorPage === 'diary' ? 'Page 1' : 'Page 2'} of 2</span>
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
