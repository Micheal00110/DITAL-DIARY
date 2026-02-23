'use client';

import React from 'react';

export function TermDatesPage() {
  const terms = [
    { name: "TERM I", start: "April, 2026", end: "...", weeks: "14 weeks" },
    { name: "TERM II", start: "August, 2026", end: "...", weeks: "14 weeks" },
    { name: "TERM III", start: "November, 2026", end: "...", weeks: "12 weeks" },
  ];

  return (
    <div className="h-full paper-texture p-8 flex flex-col font-sans bg-white relative">
      <div className="text-center mb-12">
        <h2 className="text-xl font-[900] text-[#104e8b] uppercase tracking-normal leading-tight">ST. HANNAH'S PREPARATORY</h2>
        <h3 className="text-xl font-[900] text-[#104e8b] uppercase tracking-normal leading-tight">
          & JUNIOR SCHOOL
        </h3>
        <p className="mt-8 text-[11px] font-[900] text-[#104e8b] uppercase italic border-y-2 border-[#104e8b]/10 py-2">
          Some General Rules for Guidance of Parents
        </p>
      </div>

      <div className="flex-1 space-y-12 mt-4 px-2">
        <div className="text-center">
          <h4 className="text-2xl font-[900] text-[#104e8b] underline underline-offset-4 decoration-[3px]">TERM DATES</h4>
        </div>

        <div className="space-y-12">
           {terms.map((term, idx) => (
             <div key={idx} className="flex flex-col gap-3 relative">
               <div className="flex justify-between items-baseline">
                 <span className="text-[#104e8b] font-black text-lg italic tracking-tighter">{term.name}</span>
                 <span className="text-[10px] text-[#5cc5f2] font-black italic">{term.weeks}</span>
               </div>
               <div className="flex items-center text-[12px] font-black text-[#104e8b]/80">
                  <span className="min-w-[80px] italic">Wednesday...</span>
                  <div className="flex-1 border-b border-dotted border-[#104e8b]/40 mx-2 pb-0.5 text-[#104e8b] text-[18px] font-handwriting font-bold px-2 italic">
                    {term.start}
                  </div>
                  <span className="uppercase text-xs font-black italic px-2">To</span>
                  <div className="flex-1 border-b border-dotted border-[#104e8b]/40 mx-2"></div>
               </div>
             </div>
           ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="border-[6px] border-[#104e8b] px-12 py-3 font-[900] text-[#104e8b] text-4xl shadow-sm uppercase tracking-tighter rotate-[-1deg] bg-white">
             Total 40 Weeks
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 bg-blue-50/20 rounded-sm border border-blue-50 text-[10px] leading-[1.3] text-[#1e4a7a] italic font-bold">
        A teacher will be on duty until 5:00 p.m. No child should be at school after 6:00 p.m. at the latest. Parents to make sure that children arrive in time for school and are collected accordingly.
      </div>

      <div className="mt-4 flex justify-center text-[#104e8b] text-2xl font-black italic pr-4">
        1
      </div>
    </div>
  );
}
