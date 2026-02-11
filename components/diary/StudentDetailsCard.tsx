/**
 * Student Details Card Component
 * Displays student information with yellow title bar
 * Includes: Student Name, Class/Form, Admission Number, Term
 */

'use client';

import { StudentDetails } from '@/lib/types';
import { Input } from '@/components/ui/input';

interface StudentDetailsCardProps {
  studentDetails: StudentDetails;
  editable?: boolean;
  onUpdate?: (field: keyof StudentDetails, value: string | number) => void;
}

export function StudentDetailsCard({ studentDetails, editable = false, onUpdate }: StudentDetailsCardProps) {
  return (
    <div className="w-full mt-2">
      {/* Yellow title bar */}
      <div className="bg-yellow-400 border-2 border-gray-800 border-b-0 py-2 px-4">
        <h2 className="text-center font-bold text-gray-900 uppercase tracking-wide">
          STUDENT ACADEMIC DIARY
        </h2>
      </div>

      {/* Student details table */}
      <div className="bg-white border-2 border-gray-800">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-400">
              <td className="py-2 px-4 font-semibold text-green-800 w-1/4 border-r border-gray-400">
                STUDENT NAME:
              </td>
              <td className="py-2 px-4 w-1/4 border-r border-gray-400">
                {editable && onUpdate ? (
                  <Input
                    type="text"
                    value={studentDetails.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    className="h-8 uppercase"
                    placeholder="Enter student name"
                  />
                ) : (
                  <span className="uppercase">{studentDetails.name}</span>
                )}
              </td>
              <td className="py-2 px-4 font-semibold text-green-800 w-1/4 border-r border-gray-400">
                CLASS / FORM:
              </td>
              <td className="py-2 px-4 w-1/4">
                {editable && onUpdate ? (
                  <Input
                    type="text"
                    value={studentDetails.class}
                    onChange={(e) => onUpdate('class', e.target.value)}
                    className="h-8 uppercase"
                    placeholder="e.g., FORM 3 EAST"
                  />
                ) : (
                  <span className="uppercase">{studentDetails.class}</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-semibold text-green-800 border-r border-gray-400">
                ADMISSION NO:
              </td>
              <td className="py-2 px-4 border-r border-gray-400">
                {editable && onUpdate ? (
                  <Input
                    type="text"
                    value={studentDetails.admissionNumber}
                    onChange={(e) => onUpdate('admissionNumber', e.target.value)}
                    className="h-8"
                    placeholder="e.g., 2023/0456"
                  />
                ) : (
                  <span>{studentDetails.admissionNumber}</span>
                )}
              </td>
              <td className="py-2 px-4 font-semibold text-green-800 border-r border-gray-400">
                TERM:
              </td>
              <td className="py-2 px-4">
                {editable && onUpdate ? (
                  <Input
                    type="text"
                    value={studentDetails.term}
                    onChange={(e) => onUpdate('term', e.target.value)}
                    className="h-8 text-red-600 font-semibold"
                    placeholder="e.g., TERM 1, 2026"
                  />
                ) : (
                  <span className="text-red-600 font-semibold uppercase">{studentDetails.term}</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
