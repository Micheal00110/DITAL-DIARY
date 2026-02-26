'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WelcomeHeader } from '@/components/ui/WelcomeHeader';

interface BookletContainerProps {
  children: React.ReactNode[];
  onBack?: () => void;
}

export function BookletContainer({ children, onBack }: BookletContainerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = children.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center min-h-screen py-6 px-4 bg-slate-200">
      <WelcomeHeader />
      {/* Navigation Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 print:hidden">
        <Button 
          onClick={onBack} 
          variant="outline" 
          size="sm"
          className="bg-white/80 backdrop-blur border-slate-300 text-slate-600 hover:bg-white"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Exit Booklet
        </Button>
        <div className="flex items-center gap-2 bg-white/20 p-1 rounded-full backdrop-blur-sm border border-white/50">
          <Button 
            onClick={goToPrevPage} 
            disabled={currentPage === 0}
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-1.5 px-3 min-w-[120px] justify-center">
            <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Current Page:</span>
            <span className="text-sm font-black text-blue-900 w-4 text-center">
              {currentPage}
            </span>
          </div>
          <Button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages - 1}
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* The Booklet Shell */}
      <div className="relative w-full max-w-[500px] aspect-[1/1.4] bg-white rounded-r-lg shadow-[20px_20px_60px_rgba(0,0,0,0.2),-5px_0_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-300 transform">
        {/* Page Content with simple fade/slide transition */}
        <div 
          key={currentPage} 
          className="flex-1 overflow-y-auto page-fold animate-in fade-in slide-in-from-right-4 duration-500"
        >
          {children[currentPage]}
        </div>

        {/* Tactile Edge Effects */}
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-2 h-full bg-slate-200 opacity-20 pointer-events-none" />
        
        {/* Spine/Binding effect */}
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 pointer-events-none" />
      </div>

      {/* Control Help */}
      <div className="mt-6 flex flex-col items-center gap-1 opacity-40">
        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Flip Page</p>
        <div className="flex gap-2">
           <div className="px-2 py-1 bg-white rounded border border-slate-300 text-[10px] font-bold">←</div>
           <div className="px-2 py-1 bg-white rounded border border-slate-300 text-[10px] font-bold">→</div>
        </div>
      </div>
    </div>
  );
}
