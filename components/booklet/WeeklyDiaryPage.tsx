'use client';

import React from 'react';
import { Pencil } from 'lucide-react';

interface DayEntry {
  day: string;
  date: string;
  subjects?: string;
  homework?: string;
  parentSig?: boolean;
  teacherSig?: boolean;
  parentSignature?: { remarks?: string };
  teacherSignature?: { remarks?: string };
}

interface WeeklyDiaryPageProps {
  term?: string;
  week?: number;
  entries?: DayEntry[];
  parentSummarySignature?: { signature?: string; date?: string };
  teacherSummaryRemarks?: { remarks?: string; teacherName?: string; date?: string };
}

export function WeeklyDiaryPage({ 
  term = "Term Three", 
  week = 13,
  isEvenPage = false, // Odd pages have daily logs, Even pages have log + summary
  entries = [
    { day: "Monday / Jumatatu", date: "" },
    { day: "Tuesday / Jumanne", date: "" },
    { day: "Wednesday / Jumatano", date: "" },
  ],
  parentSummarySignature,
  teacherSummaryRemarks
}: WeeklyDiaryPageProps & { isEvenPage?: boolean }) {
  // Use page numbers from photos (94, 95 etc)
  const pageNum = 90 + (week * 2) + (isEvenPage ? 1 : 0);

  return (
    <div className="h-full paper-texture p-6 flex flex-col font-sans relative bg-white">
      {/* Header Area */}
      <div className="mb-4 flex justify-between items-baseline border-b border-[#104e8b]/30 pb-1">
        <h2 className="text-xl font-[900] text-[#104e8b]">{term} (Week {week})</h2>
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#5cc5f2]">
          <span className="italic">Date:</span>
          <span className="dotted-line w-24 border-[#5cc5f2]/40"></span>
        </div>
      </div>

      {/* Daily Entries */}
      <div className="flex-1 space-y-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="relative pb-4 border-b border-blue-50 last:border-0">
            {/* Day Header */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-[#104e8b] font-black text-[13px] italic min-w-[140px]">
                {entry.day}
              </h3>
            </div>

            {/* Writing Lines: Blue and subtle */}
            <div className="ml-6 space-y-[28px] mt-2">
              <div className="border-b border-[#5cc5f2]/20 w-full h-0" />
              <div className="border-b border-[#5cc5f2]/20 w-full h-0" />
            </div>

            {/* Signature Blocks (Image 2 Style) */}
            <div className="mt-4 flex justify-between gap-6 px-2">
              <div className="flex-1">
                <div className="flex items-baseline gap-1 w-full relative">
                   <span className="text-[10px] font-black text-[#104e8b]/60 uppercase whitespace-nowrap">Parents Comments / Signature</span>
                 </div>
                 <div className="flex-1 flex flex-col justify-end pb-1 overflow-hidden">
                    <p className="text-[10px] italic leading-tight text-gray-700 h-[36px] overflow-hidden px-1">
                      {entry.parentSignature?.remarks}
                    </p>
                 </div>
               </div>
               <div className="flex-1 flex flex-col pt-1 border-l border-[#104e8b]/20 px-2 group hover:bg-emerald-50/30 transition-colors">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-black text-[#104e8b]/60 uppercase whitespace-nowrap">Teachers Comments / Signature</span>
                   <div className="flex-1 border-b border-dotted border-[#5cc5f2]/40 mb-0.5"></div>
                </div>
                <div className="flex-1 flex flex-col justify-end pb-1 overflow-hidden">
                    <p className="text-[10px] italic leading-tight text-gray-700 h-[36px] overflow-hidden px-1">
                      {entry.teacherSignature?.remarks}
                    </p>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Footer / Summary Area (Visible mostly on even pages as per Image 5) */}
      {isEvenPage && (
        <div className="mt-4 pt-4 border-t-2 border-[#104e8b]/20 bg-blue-50/10 p-4 rounded-sm">
           <div className="grid grid-cols-1 gap-4">
              <div className="space-y-4 font-black">
                 <h4 className="text-[11px] text-[#104e8b] uppercase border-b border-[#104e8b] inline-block mb-1">WEEKLY SUMMARY</h4>
                 
                 <div className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col gap-2">
                       <span className="text-xs text-[#104e8b] uppercase font-black tracking-tight">Parent/Guardian Name: <span className="underline decoration-dotted font-handwriting text-base ml-1">{parentSummarySignature?.signature || '____________________'}</span></span>
                       <div className="flex gap-4">
                          <span className="text-xs text-[#104e8b] uppercase tracking-tight">Signature: <span className="underline decoration-dotted ml-1">__________</span></span>
                          <span className="text-xs text-[#104e8b] uppercase tracking-tight">Date: <span className="underline decoration-dotted ml-1">{parentSummarySignature?.date || '__________'}</span></span>
                       </div>
                    </div>

                    <div className="flex flex-col gap-2">
                       <span className="text-xs text-[#104e8b] uppercase font-black tracking-tight">Teacher&apos;s Remarks: <span className="underline decoration-dotted font-handwriting text-base ml-1">{teacherSummaryRemarks?.remarks || '____________________'}</span></span>
                       <div className="flex gap-4 flex-wrap">
                          <span className="text-xs text-[#104e8b] uppercase tracking-tight">Name: <span className="underline decoration-dotted ml-1">{teacherSummaryRemarks?.teacherName || '__________'}</span></span>
                          <span className="text-xs text-[#104e8b] uppercase tracking-tight">Signature: <span className="underline decoration-dotted ml-1">__________</span></span>
                          <span className="text-xs text-[#104e8b] uppercase tracking-tight">Date: <span className="underline decoration-dotted ml-1">__________</span></span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Official Stamp & Page Number */}
      <div className="mt-auto pt-2 flex justify-between items-end">
         <div className="flex flex-col items-center opacity-40">
            <div className="w-16 h-16 border border-dotted border-[#104e8b]/20 flex flex-col items-center justify-center p-1 text-center">
               <span className="text-[6px] text-[#104e8b] font-black uppercase tracking-tighter leading-none mb-1">Official School</span>
               <div className="w-full h-[1px] bg-[#104e8b]/10 mb-1" />
               <span className="text-[10px] text-[#104e8b] font-bold italic tracking-tighter">Rubber Stamp</span>
            </div>
         </div>
         <div className="text-[14px] font-[900] text-[#104e8b] italic pr-2">
            {pageNum}
         </div>
      </div>
    </div>
  );
}

// Simple helper to simulate page numbers
function idx_to_page_num(week: number) {
  return 90 + week;
}
