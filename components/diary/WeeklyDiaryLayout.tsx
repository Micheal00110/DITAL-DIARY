/**
 * Weekly Diary Layout Component - Mobile Optimized
 * Responsive design for all screen sizes (320px - 4K)
 * Features day-to-day navigation with smooth animations
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { WeeklyScheduleEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, CheckCircle2, Calendar } from 'lucide-react';
import { COLORS, FONTS, UTILS } from '@/lib/styles';
import { motion, AnimatePresence } from 'motion/react';

const TERM_OPTIONS = ['Term One', 'Term Two', 'Term Three'] as const;
const WEEK_OPTIONS = [
  'Week One', 'Week Two', 'Week Three', 'Week Four', 'Week Five', 
  'Week Six', 'Week Seven', 'Week Eight', 'Week Nine', 'Week Ten', 
  'Week Eleven', 'Week Twelve', 'Week Thirteen'
] as const;

const DAYS_OF_WEEK = [
  "Monday - Jumatatu",
  "Tuesday - Jumanne",
  "Wednesday - Jumatano",
  "Thursday - Alhamisi",
  "Friday - Ijumaa",
  "Saturday - Jumamosi"
];

const getTermAndWeekFromDate = (dateString: string) => {
  if (!dateString) return { term: 'Term One', week: 1 };
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  let term = 'Term One';
  let week = 1;
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  
  if (month === 0 && day >= 5) { term = 'Term One'; week = Math.min(Math.ceil((dayOfYear - 5) / 7), 12); }
  else if (month === 1) { term = 'Term One'; week = Math.min(Math.ceil((dayOfYear - 5) / 7), 12); }
  else if (month === 2 && day <= 25) { term = 'Term One'; week = Math.min(Math.ceil((dayOfYear - 5) / 7), 12); }
  else if (month === 4 && day >= 5) { term = 'Term Two'; week = Math.min(Math.ceil((dayOfYear - 125) / 7), 12); }
  else if (month === 5) { term = 'Term Two'; week = Math.min(Math.ceil((dayOfYear - 125) / 7), 12); }
  else if (month === 6 && day <= 25) { term = 'Term Two'; week = Math.min(Math.ceil((dayOfYear - 125) / 7), 12); }
  else if (month === 8 && day >= 5) { term = 'Term Three'; week = Math.min(Math.ceil((dayOfYear - 248) / 7), 12); }
  else if (month === 9) { term = 'Term Three'; week = Math.min(Math.ceil((dayOfYear - 248) / 7), 12); }
  else if (month === 10 && day <= 20) { term = 'Term Three'; week = Math.min(Math.ceil((dayOfYear - 248) / 7), 12); }
  else { term = 'Term Three'; week = 12; }
  
  return { term, week: Math.max(1, week) };
};

interface WeeklyDiaryLayoutProps {
  entries: WeeklyScheduleEntry[];
  editable?: boolean;
  onAdd?: () => void;
  onUpdate?: (id: string, field: keyof WeeklyScheduleEntry, value: string | string[]) => void;
  onDelete?: (id: string) => void;
  onAddEntry?: (dayOfWeek: string) => void;
  weekNumber?: number;
  term?: string;
  onTermChange?: (term: string) => void;
  onWeekChange?: (week: number) => void;
  onDateChange?: (date: string) => void;
  singleDayView?: boolean;
  initialDayIndex?: number;
  initialDate?: string;
}

export function WeeklyDiaryLayout({
  entries,
  editable = false,
  onAdd,
  onUpdate,
  onAddEntry,
  onTermChange,
  onWeekChange,
  onDateChange,
  initialDayIndex = 0,
  initialDate = '',
}: WeeklyDiaryLayoutProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [pendingTeacher, setPendingTeacher] = useState<Record<string, string>>({});
  const [pendingParent, setPendingParent] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [todayDate, setTodayDate] = useState(() => new Date().toISOString().split('T')[0]);

  // Sync with today's date every minute
  useEffect(() => {
    const updateToday = () => setTodayDate(new Date().toISOString().split('T')[0]);
    updateToday();
    const interval = setInterval(updateToday, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate date options for dropdown (30 days before and after current date)
  const generateDateOptions = () => {
    const options: { value: string; label: string; dayIndex: number }[] = [];
    const currentDate = new Date(selectedDate);
    
    // Generate 30 days before and after
    for (let i = -30; i <= 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayIndex = date.getDay();
      const adjustedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Monday=0
      
      const dayName = DAYS_OF_WEEK[adjustedDayIndex]?.split(' - ')[0] || 'Unknown';
      const label = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      
      options.push({
        value: dateStr,
        label: `${dayName} - ${label}`,
        dayIndex: adjustedDayIndex
      });
    }
    
    // Filter out duplicates by date value
    const seen = new Set<string>();
    const filtered = options.filter(opt => {
      if (seen.has(opt.value)) return false;
      seen.add(opt.value);
      return true;
    });
    
    return filtered.sort((a, b) => a.value.localeCompare(b.value));
  };

  // Helper function to get day index from date
  const getDayIndexFromDate = (dateString: string): number => {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0=Sunday, 1=Monday...
    // Adjust to Monday=0, Tuesday=1, etc.
    return dayIndex === 0 ? 6 : dayIndex - 1;
  };

  // Helper function to get date for a specific day
  const getDateForDay = (dayIndex: number, baseDate?: string): string => {
    // If no base date, use current date and adjust to the target day
    const base = baseDate ? new Date(baseDate) : new Date();
    
    // Get the current day of week (0=Sunday, 1=Monday, etc.)
    const currentDayIndex = base.getDay();
    // Adjust to Monday=0, Tuesday=1, ..., Sunday=6
    const adjustedCurrentDay = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    
    // Calculate the difference to get to the target day
    let dayDiff = dayIndex - adjustedCurrentDay;
    
    // Handle wrapping to previous/next week
    const targetDate = new Date(base);
    targetDate.setDate(base.getDate() + dayDiff);
    
    return targetDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Handle date selection from dropdown
  const handleDateSelect = (dateValue: string, dayIndex: number) => {
    setSelectedDate(dateValue);
    setActiveDayIndex(dayIndex);
    
    if (onDateChange) {
      onDateChange(dateValue);
    }
  };

  // Handle day change and update date
  const handleDayChange = (newDayIndex: number) => {
    console.log('Day changed to:', newDayIndex, 'Current date:', initialDate);
    setActiveDayIndex(newDayIndex);
    
    // Update date when day changes
    if (onDateChange) {
      const newDate = getDateForDay(newDayIndex, selectedDate);
      setSelectedDate(newDate);
      console.log('New calculated date:', newDate);
      onDateChange(newDate);
    }
  };

  // Sync selectedDate with activeDayIndex
  useEffect(() => {
    if (selectedDate) {
      const dayIndex = getDayIndexFromDate(selectedDate);
      setActiveDayIndex(dayIndex);
    }
  }, [selectedDate]);

  // Auto-update day index when date changes
  useEffect(() => {
    setActiveSubjectIndex(0);
  }, [activeDayIndex]);

  const visibleDays = useMemo(() => {
    const indices = entries.map(entry => {
      const idx = DAYS_OF_WEEK.findIndex(d => d.split(' - ')[0].toUpperCase() === (entry.dayOfWeek || '').toUpperCase());
      return idx >= 0 ? idx + 1 : 0;
    });
    return Math.max(3, ...indices);
  }, [entries]);

  useEffect(() => {
    if (activeDayIndex >= visibleDays) {
      setActiveDayIndex(Math.max(0, visibleDays - 1));
    }
  }, [visibleDays, activeDayIndex]);

  const getOrCreateEntryForDay = (dayOfWeek: string, subjectIndex = 0) => {
    const dayEntries = entries.filter(entry => (entry.dayOfWeek || '').toUpperCase() === dayOfWeek.toUpperCase());
    return dayEntries[subjectIndex] || {
      id: `temp-${dayOfWeek}-${subjectIndex}`,
      dayOfWeek,
      date: dayEntries[0]?.date || '',
      subject: '',
      lessonTopics: [],
      homework: ''
    };
  };

  const handleDirectUpdate = (dayKey: string, field: keyof WeeklyScheduleEntry, value: string | string[], subjectIndex: number) => {
    if (!onUpdate) return;
    const dayEntry = getOrCreateEntryForDay(dayKey, subjectIndex);
    
    if (dayEntry.id.startsWith('temp-')) {
      if (onAddEntry) onAddEntry(dayKey);
      else if (onAdd) onAdd();
      if (field === 'teacher') setPendingTeacher(prev => ({ ...prev, [`${dayKey}-${subjectIndex}`]: value as string }));
      if (field === 'parent') setPendingParent(prev => ({ ...prev, [`${dayKey}-${subjectIndex}`]: value as string }));
    } else {
      onUpdate(dayEntry.id, field, value);
    }
  };

  const dailyEntries = useMemo(() => {
    return entries.reduce((acc, entry) => {
      const dayKey = (entry.dayOfWeek || '').toString().split(' - ')[0].toUpperCase();
      if (!acc[dayKey]) acc[dayKey] = { day: dayKey, date: entry.date || '', subjects: [] };
      acc[dayKey].subjects.push({
        id: entry.id,
        subject: entry.subject || 'Untitled Subject',
        lessonTopics: entry.lessonTopics || [],
        homework: entry.homework || '',
        teacher: (entry as any).teacher ?? '',
        parent: (entry as any).parent ?? ''
      });
      return acc;
    }, {} as Record<string, any>);
  }, [entries]);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 pointer-events-none"></div>
        
        <div className="relative bg-white border-r-4 border-blue-900/10 shadow-[20px_20px_60px_rgba(0,0,0,0.2)]">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b-2 border-dotted border-blue-200 pb-2 sm:pb-3 md:pb-4 gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {(() => {
                  const firstDate = entries.find(e => e.date)?.date || selectedDate;
                  const calc = getTermAndWeekFromDate(firstDate || '');
                  const displayTerm = firstDate ? calc.term : 'Term One';
                  const displayWeek = firstDate ? calc.week : 1;
                  const currentDate = getDateForDay(activeDayIndex, firstDate);
                  const dateOptions = generateDateOptions();
                  
                  return (
                    <>
                      {/* Date Picker Dropdown */}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <select
                          value={selectedDate}
                          onChange={(e) => {
                            const selectedOption = dateOptions.find(opt => opt.value === e.target.value);
                            if (selectedOption) {
                              handleDateSelect(selectedOption.value, selectedOption.dayIndex);
                            }
                          }}
                          className="text-xs sm:text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200 focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          {dateOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Current Date Display - Always shows today's date */}
                      <div className="text-xs sm:text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                        {todayDate ? new Date(todayDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : 'No date'}
                      </div>
                      
                      <h2 className="font-black text-blue-900 text-sm sm:text-base md:text-lg">{displayTerm}</h2>
                      
                      <h3 className="text-blue-900/70 text-xs sm:text-sm md:text-base font-bold">- Week {displayWeek}</h3>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Content */}
            <div className="relative min-h-[350px] sm:min-h-[450px] md:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDayIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-full"
                >
                  {(() => {
                    const dayName = DAYS_OF_WEEK[activeDayIndex];
                    const dayKey = dayName.split(" - ")[0].toUpperCase();
                    const dayData = dailyEntries[dayKey] || { day: dayName, subjects: [], homework: '', parent: '' };
                    const subjects = dayData.subjects.length > 0 ? dayData.subjects : [{ subject: '', homework: '', lessonTopics: [] }];
                    const activeSubject = subjects[activeSubjectIndex] || subjects[0];
                    
                    return (
                      <div className="space-y-3 sm:space-y-4 md:space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 md:gap-4">
                          <h3 className="text-base sm:text-lg md:text-2xl font-black italic tracking-tight text-blue-900">{dayName}</h3>
                          
                          {/* Subject Tabs */}
                          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 flex-wrap">
                            {subjects.map((s: any, sIdx: number) => (
                              <button
                                key={sIdx}
                                onClick={() => setActiveSubjectIndex(sIdx)}
                                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap flex-shrink-0
                                  ${activeSubjectIndex === sIdx 
                                    ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                                    : 'text-slate-400 hover:text-slate-600'}`}
                              >
                                {s.subject?.substring(0, 12) || `Subj ${sIdx + 1}`}
                              </button>
                            ))}
                            {editable && (
                              <button
                                onClick={() => {
                                  if (onAddEntry) onAddEntry(dayKey);
                                  else if (onAdd) onAdd();
                                  setTimeout(() => setActiveSubjectIndex(subjects.length), 50);
                                }}
                                className="p-1 sm:p-1.5 rounded-full text-emerald-600 hover:bg-emerald-50 transition-all flex-shrink-0"
                                title="Add Subject"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Subject Input */}
                        {editable && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <label className="text-xs sm:text-sm font-black text-slate-400 uppercase whitespace-nowrap">Current Subject:</label>
                            <Input 
                              value={activeSubject.subject}
                              onChange={(e) => handleDirectUpdate(dayKey, 'subject', e.target.value, activeSubjectIndex)}
                              className="h-6 sm:h-7 md:h-8 w-full text-xs font-bold bg-slate-50 border-slate-100 rounded-lg"
                              placeholder="e.g. MATH"
                            />
                          </div>
                        )}

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeDayIndex}-${activeSubjectIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6"
                          >
                            {/* Homework Card */}
                            <div className="p-2 sm:p-3 md:p-4 lg:p-6 bg-blue-50/30 rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-100/50 space-y-2 sm:space-y-3 md:space-y-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-blue-900 rounded-lg text-white"><CheckCircle2 className="w-4 h-4" /></div>
                                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-blue-900">Homework & Instructions</span>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="flex-1 space-y-2 w-full">
                                  <label className="text-xs font-bold text-slate-400 uppercase block ml-1">Assigned Tasks</label>
                                  {editable ? (
                                    <Textarea
                                      value={activeSubject.homework || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'homework', e.target.value, activeSubjectIndex)}
                                      placeholder="Enter homework..."
                                      className="min-h-[60px] sm:min-h-[80px] md:min-h-[120px] bg-white border-slate-200 focus:border-blue-500 rounded-lg text-xs p-2 sm:p-3 md:p-4 shadow-sm"
                                    />
                                  ) : (
                                    <div className="min-h-[60px] sm:min-h-[80px] md:min-h-[120px] bg-white border border-slate-100 rounded-lg p-2 sm:p-3 md:p-5 text-xs md:text-sm text-slate-600 shadow-sm leading-relaxed whitespace-pre-wrap">
                                      {activeSubject.homework || 'No homework.'}
                                    </div>
                                  )}
                                </div>
                                <div className="w-full sm:w-64 space-y-2">
                                  <label className="text-xs font-bold text-slate-400 uppercase block ml-1">Teacher Signature</label>
                                  {editable ? (
                                    <Input
                                      value={activeSubject.teacher || pendingTeacher[`${dayKey}-${activeSubjectIndex}`] || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'teacher', e.target.value, activeSubjectIndex)}
                                      className="bg-white border-0 border-b-2 border-slate-200 rounded-none focus:border-blue-900 px-2 h-6 sm:h-7 md:h-10 text-xs md:text-sm font-bold text-blue-900 italic"
                                      placeholder="Name"
                                    />
                                  ) : (
                                    <div className="h-6 sm:h-7 md:h-10 border-b-2 border-slate-100 flex items-center px-2 text-xs md:text-sm font-bold text-slate-800 italic">
                                      {activeSubject.teacher || "---"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Remarks Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-5 bg-blue-900 rounded-full"></div>
                                  <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest">Observations / Remarks</span>
                                </div>
                                {editable ? (
                                  <Textarea
                                    value={activeSubject.lessonTopics?.join('\n') || ''}
                                    onChange={(e) => handleDirectUpdate(dayKey, 'lessonTopics', e.target.value.split('\n'), activeSubjectIndex)}
                                    placeholder="Observations..."
                                    className="min-h-[80px] sm:min-h-[100px] md:min-h-[150px] bg-slate-50/50 border-slate-100 rounded-lg md:rounded-2xl text-xs p-2 sm:p-3 md:p-4 italic"
                                  />
                                ) : (
                                  <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[150px] bg-slate-50/50 rounded-lg md:rounded-2xl p-2 sm:p-3 md:p-5 text-xs md:text-sm text-slate-600 italic leading-relaxed border border-slate-50">
                                    {activeSubject.lessonTopics?.join('\n') || 'No remarks.'}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                                  <span className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-widest">Parent Feedback</span>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                  <div className="flex items-center gap-2 p-1.5 sm:p-2 md:p-3 bg-emerald-50/50 rounded-lg md:rounded-xl border border-emerald-100">
                                    <input
                                      type="checkbox"
                                      id={`check-${dayKey}-${activeSubjectIndex}`}
                                      checked={(activeSubject.subject || '').includes('[HOMEWORK_SEEN]')}
                                      onChange={(e) => {
                                        const cur = activeSubject.subject || '';
                                        let next = cur;
                                        if (e.target.checked) { if (!cur.includes('[HOMEWORK_SEEN]')) next += ' [HOMEWORK_SEEN]'; }
                                        else { next = cur.replace(' [HOMEWORK_SEEN]', '').replace('[HOMEWORK_SEEN]', ''); }
                                        handleDirectUpdate(dayKey, 'subject', next, activeSubjectIndex);
                                      }}
                                      className="w-4 h-4 sm:w-5 sm:h-5 accent-emerald-600 cursor-pointer"
                                    />
                                    <label htmlFor={`check-${dayKey}-${activeSubjectIndex}`} className="text-xs sm:text-sm font-black text-emerald-900 cursor-pointer uppercase tracking-tight">I have seen this homework</label>
                                  </div>
                                  {editable ? (
                                    <Textarea
                                      value={activeSubject.parent || pendingParent[`${dayKey}-${activeSubjectIndex}`] || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'parent', e.target.value, activeSubjectIndex)}
                                      placeholder="Note..."
                                      className="min-h-[60px] sm:min-h-[80px] md:min-h-[100px] bg-emerald-50/20 border-emerald-100 rounded-lg md:rounded-2xl text-xs p-2 sm:p-3 md:p-4"
                                    />
                                  ) : (
                                    <div className="min-h-[60px] sm:min-h-[80px] md:min-h-[100px] bg-emerald-50/10 rounded-lg md:rounded-2xl p-2 sm:p-3 md:p-5 text-xs md:text-sm text-slate-600 italic leading-relaxed border border-emerald-50">
                                      {activeSubject.parent || 'Waiting...'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
