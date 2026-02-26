/**
 * Landing Page Component
 * Shows the diary preview page as the main landing page
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModalAnimation } from '@/components/ui/modal-animation';
import { Eye, LogIn } from 'lucide-react';
import { WelcomeHeader } from '@/components/ui/WelcomeHeader';

interface LandingPageProps {
  onPreview: () => void;
  onOpenDiary: () => void;
}

export function LandingPage({ onPreview, onOpenDiary }: LandingPageProps) {
  const [showForm, setShowForm] = useState(false);

  // If form is shown, return the form view
  if (showForm) {
    return (
      <ModalAnimation>
        <WelcomeHeader />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-white flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Enter Student Details
              </h2>
              <p className="text-gray-600">
                Please provide your information to access the diary
              </p>
            </div>
            
            {/* Three Section Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Section 1: Personal Information */}
            <Card className="p-6 shadow-xl border-0 item cursor-pointer hover:shadow-2xl transition-all duration-300" data-duration="800">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600 mt-1">Basic student details</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learner's name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="text"
                    placeholder="11 July 2016"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </Card>

            {/* Section 2: School Information */}
            <Card className="p-6 shadow-xl border-0 item cursor-pointer hover:shadow-2xl transition-all duration-300" data-duration="800">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">School Information</h3>
                <p className="text-sm text-gray-600 mt-1">Academic details</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                  <input
                    type="text"
                    placeholder="Enter religion"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House</label>
                  <input
                    type="text"
                    placeholder="Enter house"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <input
                    type="text"
                    placeholder="e.g., Form 1, Grade 5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </Card>

            {/* Section 3: Guardian Information */}
            <Card className="p-6 shadow-xl border-0 item cursor-pointer hover:shadow-2xl transition-all duration-300" data-duration="800">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Guardian Information</h3>
                <p className="text-sm text-gray-600 mt-1">Parent/guardian details</p>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guardian's Name</label>
                  <input
                    type="text"
                    placeholder="Enter guardian's full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
                  <input
                    type="text"
                    placeholder="Enter postal address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="Enter residential address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={onOpenDiary}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      </ModalAnimation>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100/80 via-teal-50/50 to-white flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-lg pb-8 sm:pb-12">
      {/* Diary cover / preview page one */}
      <div className="flex justify-center">
        <div className="relative w-full aspect-auto sm:aspect-[1/1.4] bg-white rounded-r-lg shadow-[20px_20px_60px_rgba(0,0,0,0.2),-5px_0_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-300 transform min-h-[550px] sm:min-h-0">
          <div className="flex-1 overflow-y-auto page-fold animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="h-full bg-white flex flex-col relative font-sans overflow-hidden border-r-4 border-blue-900/10">
              <div className="bg-[#5cc5f2] p-4 sm:p-6 pb-10 sm:pb-12 relative overflow-hidden">
                <div className="absolute top-4 left-4 z-20 flex flex-col items-center">
                  <div className="relative">
                    <div className="bg-black text-white text-[10px] sm:text-xs md:text-sm font-black py-0.5 px-2 sm:px-3 flex flex-col items-center gap-0.5 shadow-md">
                      <span className="leading-none">EXCEL</span>
                      <div className="h-[1px] w-full bg-white/30" />
                      <span className="leading-none">WE</span>
                      <div className="h-[1px] w-full bg-white/30" />
                      <span className="leading-none">TOGETHER</span>
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-1">
                      <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-t-[6px] sm:border-t-[8px] border-t-black" />
                      <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-t-[6px] sm:border-t-[8px] border-t-black" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pr-1 sm:pr-2 py-3 sm:py-4">
                  <div className="text-right text-white max-w-[180px] sm:max-w-[220px]">
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-normal leading-tight">ST. HANNAH&apos;S PREPARATORY</h2>
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-normal leading-tight">SCHOOL LTD.</h3>
                  </div>
                </div>
                <div className="px-4 sm:px-8 mt-1 sm:mt-2 relative z-10">
                  <div className="flex flex-col items-start translate-x-2 sm:translate-x-4">
                    <span className="text-[#104e8b] font-handwriting text-4xl sm:text-5xl font-bold -mb-3 sm:-mb-4 drop-shadow-sm rotate-[-4deg] relative z-20">My School</span>
                    <span className="text-5xl sm:text-6xl font-[900] text-yellow-300 uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] -ml-1">Diary</span>
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-[40%] flex flex-col items-center">
                  <h4 className="[writing-mode:vertical-rl] text-[#1e4a7a] font-serif text-3xl sm:text-4xl font-bold tracking-tighter opacity-80 select-none pointer-events-none">Together We Excel</h4>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-0 border-y-[4px] sm:border-y-[6px] border-[#104e8b]">
                <div className="aspect-[1.4] bg-slate-200 border-r-[2px] sm:border-r-[3px] border-[#104e8b] relative group overflow-hidden">
                  <div className="absolute inset-0 bg-blue-100/50 flex items-center justify-center font-black italic text-2xl sm:text-4xl text-blue-900/10 -rotate-12 transition-transform group-hover:scale-110">PHOTO 1</div>
                </div>
                <div className="aspect-[1.4] bg-slate-300 border-l-[2px] sm:border-l-[3px] border-[#104e8b] relative group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center font-black italic text-2xl sm:text-4xl text-slate-900/10 rotate-12 transition-transform group-hover:scale-110">PHOTO 2</div>
                </div>
              </div>
              <div className="flex-1 p-4 sm:p-8 pt-6 sm:pt-10 flex flex-col bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />
                <div className="space-y-4 sm:space-y-6 relative z-10 max-w-[360px] mx-auto w-full">
                  <div className="flex items-end gap-2 sm:gap-3 group">
                    <span className="font-[900] text-[#104e8b] uppercase text-xs sm:text-sm tracking-widest min-w-[60px] sm:min-w-[70px] mb-1">Name</span>
                    <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                      <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1">Zanny Imani Karan</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 sm:gap-3 group">
                    <span className="font-[900] text-[#104e8b] uppercase text-xs sm:text-sm tracking-widest min-w-[60px] sm:min-w-[70px] mb-1">Campus</span>
                    <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                      <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1">Ngong Road</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div className="flex items-end gap-1 sm:gap-2 group">
                      <span className="font-[900] text-[#104e8b] uppercase text-xs sm:text-sm tracking-widest mb-1">Grade</span>
                      <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                        <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1 text-center">5M</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 sm:gap-2 group">
                      <span className="font-[900] text-[#104e8b] uppercase text-xs sm:text-sm tracking-widest mb-1">Year</span>
                      <div className="flex-1 border-b border-dotted border-blue-900/40 pb-0.5 relative">
                        <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#1e3a8a] italic px-2 block leading-none py-1 text-center">2026</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 sm:mt-auto flex justify-center py-4">
                  <button 
                    data-slot="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-6 sm:px-8 h-12 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] uppercase tracking-wider"
                    onClick={() => setShowForm(true)}
                    data-component-name="LandingPage"
                  >
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5 " />
                    Open Student Diary
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-2 h-full bg-slate-200 opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 pointer-events-none" />
          
        </div>
      </div>

        <div className="mt-8"></div>
      </div>
    </div>
  );
}
