/**
 * Diary Preview Component - Academic Structure
 * Shows a read-only preview of the academic diary
 * Matches the St. Peter's Secondary School template
 */

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { AcademicDiaryData, WeeklyScheduleEntry, SchoolDetails, StudentDetails, TeacherRemarks, ParentSignature } from '@/lib/types';
import { SchoolHeader } from '@/components/diary/SchoolHeader';
import { StudentDetailsCard } from '@/components/diary/StudentDetailsCard';
import { WeeklyScheduleTable } from '@/components/diary/WeeklyScheduleTable';
import { SignatureSections } from '@/components/diary/SignatureSections';
import { academicDiarySampleData } from '@/lib/sample-data';

interface DiaryPreviewProps {
  data: AcademicDiaryData; // Keep it flexible for transition
  onBack: () => void;
}

export function DiaryPreview({ data, onBack }: DiaryPreviewProps) {
  // Use academic sample data for preview if the provided data doesn't match the new structure
  const displayData = data?.weeklySchedule ? data : academicDiarySampleData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
      <div className="max-w-5xl mx-auto">
        {/* Preview Header (Hidden during print) */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <Badge className="bg-blue-100 text-blue-800 border-none mb-1">
                SAMPLE PREVIEW
              </Badge>
              <h1 className="text-2xl font-bold text-gray-900">
                Academic Diary Preview
              </h1>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print Diary
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* The Diary Document Area (Matches Editor structure but non-editable) */}
        <div className="bg-white shadow-xl min-h-[1100px] flex flex-col p-6 md:p-10 space-y-0 print:shadow-none print:p-0">
          <SchoolHeader 
            schoolDetails={displayData.schoolDetails} 
            editable={false}
          />
          
          <StudentDetailsCard 
            studentDetails={displayData.studentDetails}
            editable={false}
          />
          
          <WeeklyScheduleTable 
            entries={displayData.weeklySchedule}
            editable={false}
          />
          
          <SignatureSections 
            teacherRemarks={displayData.teacherRemarks}
            parentSignature={displayData.parentSignature}
            verified={displayData.verified}
            editable={false}
          />
          
          {/* Page Footer Info */}
          <div className="mt-auto pt-12 flex justify-between text-xs text-gray-500 uppercase font-medium">
             <span>Week {displayData.weekNumber || 1} | Page 1 of 12</span>
             <span className="text-emerald-600 font-bold">Kenyan Student Digital Diary</span>
          </div>
        </div>

        {/* Info Box (Hidden during print) */}
        <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-sm print:hidden">
          <p className="font-semibold mb-1">About this preview:</p>
          <p>This demonstrates the professional academic diary structure inspired by leading Kenyan secondary schools. It includes built-in sections for tracking daily lessons, homework, and stakeholder communication.</p>
        </div>
      </div>
    </div>
  );
}
