/**
 * Diary Editor Component - Academic Structure
 * Consolidated academic diary view based on St. Peter's Secondary School template
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';
import { AcademicDiaryData, WeeklyScheduleEntry, SchoolDetails, StudentDetails, TeacherRemarks, ParentSignature } from '@/lib/types';
import { SchoolHeader } from '@/components/diary/SchoolHeader';
import { StudentDetailsCard } from '@/components/diary/StudentDetailsCard';
import { WeeklyScheduleTable } from '@/components/diary/WeeklyScheduleTable';
import { SignatureSections } from '@/components/diary/SignatureSections';
import { academicDiarySampleData } from '@/lib/sample-data';

interface DiaryEditorProps {
  onBack: () => void;
}

const DEFAULT_ACADEMIC_DATA: AcademicDiaryData = {
  schoolDetails: {
    name: 'MY SCHOOL NAME',
    address: 'P.O. BOX 00000, CITY',
    phone: '000-000000',
    email: 'info@myschool.ac.ke',
  },
  studentDetails: {
    id: '1',
    name: '',
    nemisNumber: '',
    admissionNumber: '',
    class: '',
    schoolName: '',
    term: 'TERM 1, 2026',
    year: 2026,
  },
  weeklySchedule: [],
  verified: false,
};

export function DiaryEditor({ onBack }: DiaryEditorProps) {
  const [diaryData, setDiaryData] = useState<AcademicDiaryData>(DEFAULT_ACADEMIC_DATA);
  const [isSaved, setIsSaved] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('academicDiaryData');
    if (savedData) {
      try {
        setDiaryData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error loading academic diary data:', e);
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('academicDiaryData', JSON.stringify(diaryData));
      setIsSaved(true);
    }, 1000);
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
      studentDetails: { ...prev.studentDetails, [field]: value }
    }));
    setIsSaved(false);
  };

  const addScheduleEntry = () => {
    const newEntry: WeeklyScheduleEntry = {
      id: Date.now().toString(),
      dayOfWeek: 'MON',
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
    if (confirm('Load sample data? This will overwrite your current entries.')) {
      setDiaryData(academicDiarySampleData);
      setIsSaved(false);
    }
  };

  // Basic PDF export simulation
  const exportToPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
      <div className="max-w-5xl mx-auto bg-white shadow-xl min-h-[1100px] flex flex-col print:shadow-none">
        
        {/* Editor Controls (Hidden during print) */}
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold">Academic Diary Editor</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadSampleData}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Load Sample
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              Print / PDF
            </Button>
            <div className={`text-xs px-2 py-1 rounded ${isSaved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {isSaved ? '✓ Saved' : 'Saving...'}
            </div>
          </div>
        </div>

        {/* The Diary Document Area */}
        <div className="flex-1 p-6 md:p-10 space-y-0">
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
          
          <WeeklyScheduleTable 
            entries={diaryData.weeklySchedule}
            editable={true}
            onAdd={addScheduleEntry}
            onUpdate={updateScheduleEntry}
            onDelete={deleteScheduleEntry}
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
      <div className="max-w-5xl mx-auto mt-4 text-center text-gray-500 text-sm print:hidden">
        <p>Tip: Click on fields to edit. Changes are saved automatically.</p>
      </div>
    </div>
  );
}
