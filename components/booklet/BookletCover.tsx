'use client';

import React from 'react';
import Image from 'next/image';

interface BookletCoverProps {
  studentName?: string;
  campus?: string;
  grade?: string;
  year?: string;
}

export function BookletCover({ 
  studentName = "Zanny Imani Karan", 
  campus = "Ngong Road", 
  grade = "5M", 
  year = "2026" 
}: BookletCoverProps) {
  return (
    <div className="h-full bg-white flex flex-col relative font-sans overflow-hidden border-r-4 border-blue-900/10">
      {/* Top Section: Sky Blue Branding */}
      <div className="bg-[#5cc5f2] p-6 pb-12 relative overflow-hidden">
        {/* Banner Decoration (EXCEL WE TOGETHER) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col items-center">
           <div className="relative">
              {/* Black Ribbon Ribbon Style */}
              <div className="bg-black text-white text-[7px] font-black py-0.5 px-3 flex flex-col items-center gap-0.5 shadow-md">
                 <span className="leading-none">EXCEL</span>
                 <div className="h-[1px] w-full bg-white/30" />
                 <span className="leading-none">WE</span>
                 <div className="h-[1px] w-full bg-white/30" />
                 <span className="leading-none">TOGETHER</span>
              </div>
              {/* Ribbon Tail */}
              <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-1">
                 <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[8px] border-t-black"></div>
                 <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[8px] border-t-black"></div>
              </div>
           </div>
        </div>

        {/* School Name Branding */}
        <div className="flex justify-end pr-2 py-4">
           <div className="text-right text-white max-w-[220px]">
             <h2 className="text-sm font-black uppercase tracking-normal leading-tight">ST. HANNAH'S PREPARATORY</h2>
             <h3 className="text-sm font-black uppercase tracking-normal leading-tight">SCHOOL LTD.</h3>
           </div>
        </div>

        {/* Main Title Area */}
        <div className="px-8 mt-2 relative z-10">
           <div className="flex flex-col items-start translate-x-4">
             {/* "My School" in Blue Script */}
             <span className="text-[#104e8b] font-handwriting text-5xl font-bold -mb-4 drop-shadow-sm rotate-[-4deg] relative z-20">My School</span>
             {/* "Diary" in Yellow/Orange Bold Sans */}
             <span className="text-6xl font-[900] text-yellow-300 uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] -ml-1">Diary</span>
           </div>
        </div>

        {/* Vertical Motto (Large, stylized) */}
        <div className="absolute right-0 top-1/2 -translate-y-[40%] flex flex-col items-center">
           <h4 className="[writing-mode:vertical-rl] text-[#1e4a7a] font-serif text-4xl font-bold tracking-tighter opacity-80 select-none pointer-events-none">
             Together We Excel
           </h4>
        </div>
      </div>

      {/* Photo Section with Blue Borders */}
      <div className="grid grid-cols-2 gap-0 border-y-[6px] border-[#104e8b]">
        <div className="aspect-[1.4] bg-slate-200 border-r-[3px] border-[#104e8b] relative group overflow-hidden">
           <div className="absolute inset-0 bg-blue-100/50 flex items-center justify-center font-black italic text-4xl text-blue-900/10 -rotate-12 transition-transform group-hover:scale-110">PHOTO 1</div>
        </div>
        <div className="aspect-[1.4] bg-slate-300 border-l-[3px] border-[#104e8b] relative group overflow-hidden">
           <div className="absolute inset-0 bg-slate-200 flex items-center justify-center font-black italic text-4xl text-slate-900/10 rotate-12 transition-transform group-hover:scale-110">PHOTO 2</div>
        </div>
      </div>

      {/* Info Fields Container: White Box with Blue Text */}
      <div className="flex-1 p-8 pt-10 flex flex-col bg-slate-50 relative overflow-hidden">
        {/* Subtle Paper Grain */}
        <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

        <div className="space-y-6 relative z-10 max-w-[360px] mx-auto w-full">
          <div className="flex items-end gap-3 group">
            <span className="font-[900] text-[#104e8b] uppercase text-[10px] tracking-widest min-w-[70px] mb-1">Name</span>
            <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
              <span className="font-handwriting text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1">
                {studentName}
              </span>
            </div>
          </div>
          
          <div className="flex items-end gap-3 group">
            <span className="font-[900] text-[#104e8b] uppercase text-[10px] tracking-widest min-w-[70px] mb-1">Campus</span>
            <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
              <span className="font-handwriting text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1">
                {campus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex items-end gap-2 group">
              <span className="font-[900] text-[#104e8b] uppercase text-[10px] tracking-widest mb-1">Grade</span>
              <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                <span className="font-handwriting text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1 text-center">
                  {grade}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 group">
              <span className="font-[900] text-[#104e8b] uppercase text-[10px] tracking-widest mb-1">Year</span>
              <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                <span className="font-handwriting text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1 text-center">
                  {year}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Logo Decoration */}
        <div className="mt-auto flex justify-center py-4">
           <div className="w-16 h-16 rounded-full border border-blue-100 flex items-center justify-center opacity-40">
              <Image src="/diary-logo.svg" alt="logo" width={32} height={32} className="grayscale" />
           </div>
        </div>
      </div>
    </div>
  );
}
