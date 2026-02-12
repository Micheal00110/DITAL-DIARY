/**
 * Student Details Card Component
 * Simplified header with student name, photo, and date
 */

'use client';

import { StudentDetails } from '@/lib/types';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface StudentDetailsCardProps {
  studentDetails: StudentDetails;
  editable?: boolean;
  onUpdate?: (field: keyof StudentDetails, value: string | number) => void;
}

export function StudentDetailsCard({ studentDetails, editable = false, onUpdate }: StudentDetailsCardProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="w-full mt-2">
      {/* Simple header bar */}
      <div className="bg-yellow-400 border-2 border-gray-800 border-b-0 py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            {/* Student Name */}
            <div className="text-right">
              {editable && onUpdate ? (
                <Input
                  type="text"
                  value={studentDetails.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className="h-8 uppercase text-center font-bold text-gray-900 border-0 bg-transparent focus:bg-white/50"
                  placeholder="Enter student name"
                />
              ) : (
                <span className="font-bold text-gray-900 uppercase tracking-wide">
                  {studentDetails.name}
                </span>
              )}
            </div>
            
            {/* Student Photo */}
            <div className="w-16 h-16 bg-gray-200 border-2 border-gray-800 rounded flex items-center justify-center overflow-hidden">
              {studentDetails.photo ? (
                <Image
                  src={studentDetails.photo}
                  alt="Student Photo"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-500 text-xs text-center">
                  <div>PHOTO</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Date bar */}
      <div className="bg-white border-2 border-gray-800 border-t-0 py-2 px-4">
        <div className="flex justify-end">
          <span className="text-sm font-semibold text-gray-700">
            {currentDate}
          </span>
        </div>
      </div>
    </div>
  );
}
