/**
 * Signature Sections Component
 * Displays Class Teacher's Remarks and Parent/Guardian signature areas
 * Includes the "VERIFIED" circular badge
 */

'use client';

import { TeacherRemarks, ParentSignature } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AnimatedCheckbox } from '@/components/ui/animated-checkbox';
import { Check } from 'lucide-react';

interface SignatureSectionsProps {
  teacherRemarks?: TeacherRemarks;
  parentSignature?: ParentSignature;
  verified?: boolean;
  editable?: boolean;
  onUpdateTeacher?: (field: keyof TeacherRemarks, value: string) => void;
  onUpdateParent?: (field: keyof ParentSignature, value: string) => void;
}

export function SignatureSections({
  teacherRemarks,
  parentSignature,
  verified = false,
  editable = false,
  onUpdateTeacher,
  onUpdateParent,
}: SignatureSectionsProps) {
  return (
    <div className="w-full mt-4 grid md:grid-cols-2 gap-4 relative">
      {/* Class Teacher's Remarks */}
      <div className="border-2 border-gray-800 flex flex-col">
        <div className="bg-green-800 text-white py-1 px-3 font-bold text-sm">
          CLASS TEACHER&apos;S REMARKS:
        </div>
        <div className="p-3 flex-1 bg-white">
          {editable && onUpdateTeacher ? (
            <div className="space-y-2">
              <Textarea
                value={teacherRemarks?.remarks || ''}
                onChange={(e) => onUpdateTeacher('remarks', e.target.value)}
                placeholder="Enter remarks here..."
                className="min-h-[60px] text-sm"
              />
              <AnimatedCheckbox
                id="teacher-sign"
                label="Signed"
                checked={!!(teacherRemarks?.teacherName || teacherRemarks?.signature)}
                onChange={(checked) => onUpdateTeacher('teacherName', checked ? 'Signed' : '')}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm italic min-h-[40px]">
                {teacherRemarks?.remarks || 'No remarks provided.'}
              </p>
              <div className="text-xs border-t border-gray-200 pt-2 flex items-center gap-1">
                <AnimatedCheckbox
                  id="teacher-sign-readonly"
                  label="Signed"
                  checked={!!(teacherRemarks?.teacherName)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parent / Guardian Section */}
      <div className="border-2 border-gray-800 flex flex-col relative">
        <div className="bg-orange-500 text-white py-1 px-3 font-bold text-sm">
          PARENT / GUARDIAN:
        </div>
        <div className="p-3 flex-1 bg-white">
          {editable && onUpdateParent ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Signature:</span>
                <Input
                  value={parentSignature?.signature || ''}
                  onChange={(e) => onUpdateParent('signature', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Parent Signature"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <div className="text-sm">
                Signature: <span className="underline decoration-dotted ml-2">{parentSignature?.signature || '____________________'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Verified Stamp Overlay */}
        {verified && (
          <div className="absolute -right-4 -bottom-4 z-10">
            <div className="w-16 h-16 rounded-full border-4 border-green-600 flex flex-col items-center justify-center bg-white shadow-md transform rotate-12">
              <div className="text-[10px] font-bold text-green-600 leading-none">VERIFIED</div>
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
