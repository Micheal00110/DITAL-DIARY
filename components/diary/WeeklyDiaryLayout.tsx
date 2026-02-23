/**
 * Weekly Diary Layout Component
 * Matches the booklet structure but maintains editability
 * Based on WeeklyDiaryPage but with editable functionality
 * Features Managed Tabs with Day-to-Day navigation.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { WeeklyScheduleEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarPlus, ChevronLeft, ChevronRight, Plus, CheckCircle2, Info } from 'lucide-react';
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

// Function to calculate term and week based on date - Standard Kenyan School Calendar
const getTermAndWeekFromDate = (dateString: string) => {
  if (!dateString) return { term: 'Term One', week: 1 };
  
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
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
}

export function WeeklyDiaryLayout({
  entries,
  editable = false,
  onAdd,
  onUpdate,
  onAddEntry,
  onTermChange,
  onWeekChange,
}: WeeklyDiaryLayoutProps) {
  // Fix: visibleDays should be tracked based on entries presence
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [pendingTeacher, setPendingTeacher] = useState<Record<string, string>>({});
  const [pendingParent, setPendingParent] = useState<Record<string, string>>({});

  // Reset subject index when day changes
  useEffect(() => {
    setActiveSubjectIndex(0);
  }, [activeDayIndex]);

  // Calculate visible days from entries + a minimum of 3
  const visibleDays = useMemo(() => {
    const indices = entries.map(entry => {
      const idx = DAYS_OF_WEEK.findIndex(d => d.split(' - ')[0].toUpperCase() === (entry.dayOfWeek || '').toUpperCase());
      return idx >= 0 ? idx + 1 : 0;
    });
    return Math.max(3, ...indices);
  }, [entries]);

  // Ensure active day is within visible range
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
      
      // We can't easily set pending for temp multi-entries because the IDs change,
      // but for now we'll support it for the current active subject.
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
          <div className="p-6 sm:p-8">
            {/* Header with Term/Week Selection */}
            <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b-2 border-dotted border-blue-200 pb-4 gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {(() => {
                  const firstDate = entries.find(e => e.date)?.date;
                  const calc = getTermAndWeekFromDate(firstDate || '');
                  const displayTerm = firstDate ? calc.term : 'Term One';
                  const displayWeek = firstDate ? calc.week : 1;
                  
                  return (
                    <>
                      {editable && onTermChange ? (
                        <select
                          value={TERM_OPTIONS.includes(displayTerm as any) ? displayTerm : 'Term One'}
                          onChange={(e) => onTermChange(e.target.value)}
                          className={`${FONTS.responsive.heading} ${UTILS.text.primary} bg-blue-50/50 px-3 py-1 rounded-lg border-b-2 border-blue-900/30 focus:outline-none focus:border-blue-900 cursor-pointer text-sm sm:text-base`}
                        >
                          {TERM_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      ) : (
                        <h2 className={`${FONTS.responsive.heading} ${UTILS.text.primary} font-black`}>{displayTerm}</h2>
                      )}
                      
                      {editable && onWeekChange ? (
                        <select
                          value={WEEK_OPTIONS[displayWeek - 1] || 'Week One'}
                          onChange={(e) => {
                            const idx = WEEK_OPTIONS.indexOf(e.target.value as any);
                            if (idx !== -1) onWeekChange(idx + 1);
                          }}
                          className={`${FONTS.responsive.heading} ${UTILS.text.primary} bg-blue-50/50 px-3 py-1 rounded-lg border-b-2 border-blue-900/30 focus:outline-none focus:border-blue-900 cursor-pointer text-sm sm:text-base`}
                        >
                          {WEEK_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                      ) : (
                        <h3 className={`${FONTS.responsive.heading} ${UTILS.text.secondary} opacity-70`}>- Week {displayWeek}</h3>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-blue-50">
              {DAYS_OF_WEEK.slice(0, visibleDays).map((dayName, idx) => {
                const isActive = activeDayIndex === idx;
                const dayShort = dayName.split(" - ")[0].substring(0, 3);
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`relative px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-300 min-w-[85px] uppercase tracking-wider
                      ${isActive ? 'text-white bg-blue-900 shadow-md transform -translate-y-0.5' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                  >
                    {dayShort}
                    {isActive && (
                      <motion.div
                        layoutId="activeDayGlow"
                        className="absolute inset-0 bg-blue-400/20 blur-md rounded-xl -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
              
              {visibleDays < DAYS_OF_WEEK.length && (
                <button
                  onClick={() => {
                    const next = DAYS_OF_WEEK[visibleDays].split(" - ")[0].toUpperCase();
                    if (onAddEntry) onAddEntry(next);
                    else if (onAdd) onAdd();
                    setActiveDayIndex(visibleDays);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-emerald-600 hover:bg-emerald-50 transition-all border-2 border-dashed border-emerald-100 flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" /> ADD DAY
                </button>
              )}
            </div>

            {/* Main Content Area with Transitions */}
            <div className="relative min-h-[500px]">
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
                    
                    // Fallback for empty day - ensure we have at least one slot
                    const subjects = dayData.subjects.length > 0 ? dayData.subjects : [{ subject: '', homework: '', lessonTopics: [] }];
                    const activeSubject = subjects[activeSubjectIndex] || subjects[0];
                    
                    return (
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <h3 className={`${UTILS.text.primary} text-2xl font-black italic tracking-tight`}>{dayName}</h3>
                          
                          {/* Subject Tabs - NESTED */}
                          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                            {subjects.map((s: any, sIdx: number) => (
                              <button
                                key={sIdx}
                                onClick={() => setActiveSubjectIndex(sIdx)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                                  ${activeSubjectIndex === sIdx 
                                    ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                                    : 'text-slate-400 hover:text-slate-600'}`}
                              >
                                {s.subject || `Subj ${sIdx + 1}`}
                              </button>
                            ))}
                            {editable && (
                              <button
                                onClick={() => {
                                  if (onAddEntry) onAddEntry(dayKey);
                                  else if (onAdd) onAdd();
                                  setTimeout(() => setActiveSubjectIndex(subjects.length), 50);
                                }}
                                className="p-1.5 rounded-full text-emerald-600 hover:bg-emerald-50 transition-all"
                                title="Add Subject"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Subject Header Input */}
                        {editable && (
                           <div className="flex items-center gap-3">
                             <label className="text-[10px] font-black text-slate-400 uppercase">Current Subject:</label>
                             <Input 
                               value={activeSubject.subject}
                               onChange={(e) => handleDirectUpdate(dayKey, 'subject', e.target.value, activeSubjectIndex)}
                               className="h-8 max-w-[200px] text-xs font-bold bg-slate-50 border-slate-100 rounded-lg"
                               placeholder="e.g. MATHEMATICS"
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
                            className="grid grid-cols-1 gap-8"
                          >
                            {/* Teacher's Input Card */}
                            <div className="p-6 bg-blue-50/30 rounded-2xl border border-blue-100/50 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-900 rounded-lg text-white"><CheckCircle2 className="w-4 h-4" /></div>
                                <span className="text-xs font-black uppercase tracking-widest text-blue-900">Homework & Instructions</span>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="flex-1 space-y-2 w-full">
                                  <label className="text-[10px] uppercase font-bold text-slate-400 block ml-1">Assigned Tasks</label>
                                  {editable ? (
                                    <Textarea
                                      value={activeSubject.homework || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'homework', e.target.value, activeSubjectIndex)}
                                      placeholder="Enter homework details for this subject..."
                                      className="min-h-[120px] bg-white border-slate-200 focus:border-blue-500 rounded-xl text-sm p-4 shadow-sm"
                                    />
                                  ) : (
                                    <div className="min-h-[120px] bg-white border border-slate-100 rounded-xl p-5 text-sm text-slate-600 shadow-sm leading-relaxed whitespace-pre-wrap">
                                      {activeSubject.homework || 'No special homework entries for this subject.'}
                                    </div>
                                  )}
                                </div>
                                <div className="w-full sm:w-64 space-y-2">
                                  <label className="text-[10px] uppercase font-bold text-slate-400 block ml-1">Teacher Signature</label>
                                  {editable ? (
                                    <Input
                                      value={activeSubject.teacher || pendingTeacher[`${dayKey}-${activeSubjectIndex}`] || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'teacher', e.target.value, activeSubjectIndex)}
                                      className="bg-white border-0 border-b-2 border-slate-200 rounded-none focus:border-blue-900 px-2 h-10 font-bold text-blue-900 italic"
                                      placeholder="Signatory Name"
                                    />
                                  ) : (
                                    <div className="h-10 border-b-2 border-slate-100 flex items-center px-2 font-bold text-slate-800 italic">
                                      {activeSubject.teacher || "---"}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Remarks Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-5 bg-blue-900 rounded-full"></div>
                                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Observations / Remarks</span>
                                </div>
                                {editable ? (
                                  <Textarea
                                    value={activeSubject.lessonTopics?.join('\n') || ''}
                                    onChange={(e) => handleDirectUpdate(dayKey, 'lessonTopics', e.target.value.split('\n'), activeSubjectIndex)}
                                    placeholder="Observations on conduct and progress..."
                                    className="min-h-[150px] bg-slate-50/50 border-slate-100 rounded-2xl text-xs p-4 italic"
                                  />
                                ) : (
                                  <div className="min-h-[150px] bg-slate-50/50 rounded-2xl p-5 text-sm text-slate-600 italic leading-relaxed border border-slate-50">
                                    {activeSubject.lessonTopics?.join('\n') || 'No remarks recorded.'}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-5 bg-emerald-500 rounded-full"></div>
                                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Parent Communication</span>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
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
                                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                                    />
                                    <label htmlFor={`check-${dayKey}-${activeSubjectIndex}`} className="text-xs font-black text-emerald-900 cursor-pointer">I have seen this homework</label>
                                  </div>
                                  {editable ? (
                                    <Textarea
                                      value={activeSubject.parent || pendingParent[`${dayKey}-${activeSubjectIndex}`] || ''}
                                      onChange={(e) => handleDirectUpdate(dayKey, 'parent', e.target.value, activeSubjectIndex)}
                                      placeholder="Note to the teacher regarding this subject..."
                                      className="min-h-[100px] bg-emerald-50/20 border-emerald-100 rounded-2xl text-xs p-4"
                                    />
                                  ) : (
                                    <div className="min-h-[100px] bg-emerald-50/10 rounded-2xl p-5 text-sm text-slate-600 italic leading-relaxed border border-emerald-50">
                                      {activeSubject.parent || 'Waiting for parent feedback...'}
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
