/**
 * Student Details Card Component
 * Simplified header with student name, photo, and date
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { StudentDetails } from '@/lib/types';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { COLORS, FONTS, UTILS } from '@/lib/styles';

interface StudentDetailsCardProps {
  studentDetails: StudentDetails;
  editable?: boolean;
  onUpdate?: (field: keyof StudentDetails, value: string | number) => void;
}

function formatDateOption(d: Date) {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function StudentDetailsCard({ studentDetails, editable = false, onUpdate }: StudentDetailsCardProps) {
  const dateOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    for (let i = -14; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const value = d.toISOString().slice(0, 10);
      options.push({ value, label: formatDateOption(d) });
    }
    return options;
  }, []);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // Initialize modal animation
  useEffect(() => {
    // Add anime.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initializeModal();
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Listen for date changes from WeeklyDiaryLayout
  useEffect(() => {
    const handleDateChange = (event: any) => {
      if (event.detail?.date) {
        setSelectedDate(event.detail.date);
      }
    };

    document.addEventListener('date-change', handleDateChange);
    
    return () => {
      document.removeEventListener('date-change', handleDateChange);
    };
  }, []);

  const initializeModal = () => {
    const items = document.querySelectorAll('.student-detail-item');
    
    // Create demo dialog
    const $dialog = document.createElement('dialog');
    $dialog.id = 'student-detail-dialog';
    $dialog.className = 'p-0 border-0 bg-transparent backdrop:bg-black/50';
    document.body.appendChild($dialog);

    // Create modal layout
    const a = (window as any).anime;
    if (!a || typeof a.createLayout !== 'function') {
      // anime.js not available or createLayout unsupported; skip modal animation
      return;
    }
    const modalLayout = a.createLayout($dialog, {
      children: ['.student-detail-item', 'label', 'input', 'span'],
      properties: ['--overlay-alpha'],
    });

    const closeModal = () => {
      modalLayout.update(({ root }: any) => {
        $dialog.close();
        const $item = document.querySelector('.student-detail-item.is-open') as HTMLElement;
        if ($item) {
          $item.classList.remove('is-open');
          $item.focus();
        }
      });
    };

    const openModal = (e: Event) => {
      const $target = e.target as HTMLElement;
      const $item = $target.closest('.student-detail-item') as HTMLElement;
      if (!$item) return;

      const $clone = $item.cloneNode(true) as HTMLElement;
      $clone.classList.add('scale-105', 'shadow-2xl', 'transform-gpu');
      $dialog.innerHTML = '';
      $dialog.appendChild($clone);

      modalLayout.update(() => {
        $dialog.showModal();
        $item.classList.add('is-open');
      }, {
        duration: parseInt($item.dataset.duration || '600')
      });
    };

    // Add event listeners
    items.forEach($item => $item.addEventListener('click', openModal));
    $dialog.addEventListener('cancel', closeModal);
    $dialog.addEventListener('click', (e) => {
      if (e.target === $dialog) closeModal();
    });

    // Cleanup
    return () => {
      items.forEach($item => $item.removeEventListener('click', openModal));
      $dialog.removeEventListener('cancel', closeModal);
      $dialog.removeEventListener('click', closeModal);
    };
  };

  return (
    <div className="w-full mt-2 flex justify-center">
      {/* Aspect Ratio Container */}
      <div className="relative w-full max-w-[500px]">
        {/* Booklet Container */}
        <div className="relative w-full">
          {/* Booklet Shadow Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-slate-200 opacity-20 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 pointer-events-none"></div>
          
          {/* Booklet Page */}
          <div className="relative bg-white border-r-4 border-blue-900/10 shadow-[20px_20px_60px_rgba(0,0,0,0.2),-5px_0_15px_rgba(0,0,0,0.05)] pb-4">
            {/* Page Content */}
            <div className="flex flex-col">
              {/* Simple header bar */}
              <div className={`${UTILS.bg.yellow} border-2 ${UTILS.border.primary} border-b-0 py-2 px-4 student-detail-item cursor-pointer hover:bg-yellow-300/50 transition-colors duration-200`} data-duration="600">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Student Name */}
            <div className="text-right sm:text-left">
              {editable && onUpdate ? (
                <Input
                  type="text"
                  value="" // Remove the value
                  onChange={(e) => onUpdate('name', e.target.value)}
                  className={`h-6 sm:h-8 uppercase text-center sm:text-left ${FONTS.weight.bold} ${UTILS.text.primary} border-0 bg-transparent focus:bg-white/50 ${FONTS.responsive.base}`}
                  placeholder="Enter student name"
                />
              ) : (
                <span className={`${FONTS.weight.bold} ${UTILS.text.primary} uppercase tracking-wide ${FONTS.responsive.base}`}>
                  {/* Remove the displayed name */}
                </span>
              )}
            </div>
            
            {/* Student Photo - Replace with Diary Image */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 border-2 border-gray-800 rounded flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date bar - scroll-down menu */}
      <div className="bg-white border-2 border-gray-800 border-t-0 py-2 px-4 student-detail-item cursor-pointer hover:bg-gray-50 transition-colors duration-200" data-duration="600">
        <div className="flex justify-end">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm text-gray-600 border-0 bg-transparent focus:outline-none"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
