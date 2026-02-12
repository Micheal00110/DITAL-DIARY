/**
 * Weekly Diary Layout Component
 * Matches the booklet structure but maintains editability
 * Based on WeeklyDiaryPage but with editable functionality
 */

'use client';

import { WeeklyScheduleEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface WeeklyDiaryLayoutProps {
  entries: WeeklyScheduleEntry[];
  editable?: boolean;
  onAdd?: () => void;
  onUpdate?: (id: string, field: keyof WeeklyScheduleEntry, value: string | string[]) => void;
  onDelete?: (id: string) => void;
  onAddEntry?: (dayOfWeek: string) => void;
  weekNumber?: number;
  term?: string;
}

// Custom Hand Icon based on physical diary
const HandIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 6L16 8L10 14H8V12L14 6Z" fill="#104e8b" />
    <path d="M7 11.5V17H12.5L20 9.5L17.5 7L10 14.5V11.5H7Z" stroke="#104e8b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 17C3 17 5 17 6 18C7 19 8 19 8 19" stroke="#104e8b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function WeeklyDiaryLayout({
  entries,
  editable = false,
  onAdd,
  onUpdate,
  onDelete,
  onAddEntry,
  weekNumber = 1,
  term = "Term Three"
}: WeeklyDiaryLayoutProps) {
  
  const handleLessonTopicsChange = (id: string, value: string) => {
    // Convert string to array by splitting on newlines
    const topics = value.split('\n').filter(t => t.trim());
    onUpdate?.(id, 'lessonTopics', topics);
  };

  const handleAddEntryForDay = (dayOfWeek: string) => {
    if (onAddEntry) {
      onAddEntry(dayOfWeek);
    } else if (onAdd) {
      onAdd();
    }
  };

  const getOrCreateEntryForDay = (dayOfWeek: string) => {
    const existingEntry = entries.find(entry => entry.dayOfWeek === dayOfWeek);
    if (existingEntry) {
      return existingEntry;
    }
    // Return a temporary entry for editing
    return {
      id: `temp-${dayOfWeek}`,
      dayOfWeek,
      date: '',
      subject: '',
      lessonTopics: [],
      homework: ''
    };
  };

  // Convert entries to daily format for display
  const dailyEntries = entries.reduce((acc, entry) => {
    const dayKey = entry.dayOfWeek;
    if (!acc[dayKey]) {
      acc[dayKey] = {
        day: entry.dayOfWeek,
        date: entry.date,
        subjects: [],
        homework: ''
      };
    }
    if (entry.subject) {
      acc[dayKey].subjects.push({
        id: entry.id,
        name: entry.subject,
        topics: entry.lessonTopics
      });
    }
    if (entry.homework) {
      acc[dayKey].homework += (acc[dayKey].homework ? '\n' : '') + entry.homework;
    }
    return acc;
  }, {} as Record<string, any>);

  const daysOfWeek = ["Monday / Jumatatu", "Tuesday / Jumanne", "Wednesday / Jumatano", "Thursday / Alhamisi", "Friday / Ijumaa", "Saturday / Jumamosi"];
  
  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="mb-4 flex justify-between items-baseline border-b border-[#104e8b]/30 pb-1">
        <h2 className="text-xl font-[900] text-[#104e8b]">{term} (Week {weekNumber})</h2>
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#5cc5f2]">
          <span className="italic">Date:</span>
          <span className="dotted-line w-24 border-[#5cc5f2]/40"></span>
        </div>
      </div>

      {/* Daily Entries */}
      <div className="flex-1 space-y-4">
        {daysOfWeek.map((dayName, idx) => {
          const dayKey = dayName.split(' / ')[0].toUpperCase();
          const dayData = dailyEntries[dayKey] || { day: dayName, date: '', subjects: [], homework: '' };
          
          return (
            <div key={idx} className="relative pb-4 border-b border-blue-50 last:border-0">
              {/* Day Header with Hand Icon */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-[#104e8b] font-black text-[13px] italic min-w-[140px]">
                  {dayName}
                </h3>
                <HandIcon className="w-5 h-5 opacity-80" />
                {editable && (
                  <Input
                    type="text"
                    value={dayData.date}
                    onChange={(e) => {
                      const dayEntry = getOrCreateEntryForDay(dayKey);
                      if (dayEntry.id.startsWith('temp-')) {
                        // Create new entry when user starts typing
                        handleAddEntryForDay(dayKey);
                        // The entry will be created, then we can update it
                        setTimeout(() => {
                          const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                          if (newEntry && onUpdate) {
                            onUpdate(newEntry.id, 'date', e.target.value);
                          }
                        }, 100);
                      } else if (onUpdate) {
                        onUpdate(dayEntry.id, 'date', e.target.value);
                      }
                    }}
                    placeholder="Add date"
                    className="h-6 text-xs w-24 border-0 border-b border-dotted border-[#5cc5f2]/40 rounded-none focus:ring-0 focus:border-[#5cc5f2]/60"
                  />
                )}
              </div>

              {/* Subjects and Topics - Allow direct input */}
              {editable ? (
                <div className="ml-6 space-y-2">
                  {dayData.subjects.length > 0 ? (
                    dayData.subjects.map((subject: any) => (
                      <div key={subject.id} className="space-y-1">
                        <div className="text-sm font-semibold text-green-700 uppercase">
                          <Input
                            type="text"
                            value={subject.name.replace(' [AYE]', '').replace(' [NO]', '').replace('[AYE]', '').replace('[NO]', '')}
                            onChange={(e) => onUpdate?.(subject.id, 'subject', e.target.value)}
                            className="h-6 text-sm border-0 border-b border-dotted border-gray-400 rounded-none focus:ring-0 focus:border-green-600 px-0"
                          />
                        </div>
                        <div className="ml-4 text-xs space-y-1">
                          <Textarea
                            value={subject.topics.join('\n')}
                            onChange={(e) => handleLessonTopicsChange(subject.id, e.target.value)}
                            className="text-xs border-0 border-b border-dotted border-gray-300 rounded-none focus:ring-0 focus:border-gray-500 px-0 min-h-[40px] resize-none"
                            rows={2}
                            placeholder="Lesson topics..."
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    // Allow adding new subject directly
                    <div className="space-y-1">
                      <Input
                        type="text"
                        placeholder="Add subject..."
                        onChange={(e) => {
                          if (e.target.value.trim()) {
                            handleAddEntryForDay(dayKey);
                            setTimeout(() => {
                              const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                              if (newEntry && onUpdate) {
                                onUpdate(newEntry.id, 'subject', e.target.value);
                              }
                            }, 100);
                          }
                        }}
                        className="h-6 text-sm border-0 border-b border-dotted border-gray-400 rounded-none focus:ring-0 focus:border-green-600 px-0 text-green-700 uppercase"
                      />
                      <Textarea
                        placeholder="Lesson topics..."
                        onChange={(e) => {
                          if (e.target.value.trim()) {
                            handleAddEntryForDay(dayKey);
                            setTimeout(() => {
                              const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                              if (newEntry && onUpdate) {
                                handleLessonTopicsChange(newEntry.id, e.target.value);
                              }
                            }, 100);
                          }
                        }}
                        className="text-xs border-0 border-b border-dotted border-gray-300 rounded-none focus:ring-0 focus:border-gray-500 px-0 min-h-[40px] resize-none ml-4"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ) : (
                // Display mode (existing logic)
                <>
                  {dayData.subjects.length > 0 ? (
                    <div className="ml-6 space-y-2">
                      {dayData.subjects.map((subject: any) => (
                        <div key={subject.id} className="space-y-1">
                          <div className="text-sm font-semibold text-green-700 uppercase">
                            {subject.name.replace(' [AYE]', '').replace(' [NO]', '').replace('[AYE]', '').replace('[NO]', '')}
                          </div>
                          {subject.topics.length > 0 && (
                            <div className="ml-4 text-xs space-y-1">
                              {subject.topics.map((topic: string, topicIdx: number) => (
                                <div key={topicIdx} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="ml-6 space-y-[28px] mt-2">
                      <div className="border-b border-[#5cc5f2]/20 w-full h-0" />
                      <div className="border-b border-[#5cc5f2]/20 w-full h-0" />
                    </div>
                  )}
                </>
              )}

              {/* Homework Section - Allow direct input */}
              <div className="ml-6 mt-2">
                {editable ? (
                  <>
                    <div className="text-xs font-semibold text-red-700 mb-1">HOMEWORK:</div>
                    <Textarea
                      value={dayData.homework}
                      onChange={(e) => {
                        const dayEntry = getOrCreateEntryForDay(dayKey);
                        if (dayEntry.id.startsWith('temp-')) {
                          // Create new entry when user starts typing
                          handleAddEntryForDay(dayKey);
                          setTimeout(() => {
                            const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                            if (newEntry && onUpdate) {
                              onUpdate(newEntry.id, 'homework', e.target.value);
                            }
                          }, 100);
                        } else if (onUpdate) {
                          onUpdate(dayEntry.id, 'homework', e.target.value);
                        }
                      }}
                      placeholder="Add homework..."
                      className="text-xs border-0 border-b border-dotted border-red-300 rounded-none focus:ring-0 focus:border-red-500 px-0 min-h-[40px] resize-none"
                      rows={2}
                    />
                  </>
                ) : (
                  dayData.homework && (
                    <>
                      <div className="text-xs font-semibold text-red-700 mb-1">HOMEWORK:</div>
                      <div className="text-xs whitespace-pre-line text-red-600">
                        {dayData.homework}
                      </div>
                    </>
                  )
                )}
              </div>

              {/* Aye or No Section */}
              <div className="mt-4 flex justify-center gap-8 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-[#104e8b]/60 uppercase">Aye</span>
                  {editable ? (
                    <input
                      type="checkbox"
                      className="w-3 h-3 border-2 border-[#104e8b] rounded focus:ring-2 focus:ring-[#104e8b]/30"
                      onChange={(e) => {
                        // Handle Aye selection
                        const dayEntry = getOrCreateEntryForDay(dayKey);
                        if (dayEntry.id.startsWith('temp-')) {
                          handleAddEntryForDay(dayKey);
                          setTimeout(() => {
                            const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                            if (newEntry && onUpdate) {
                              // Store selection in a custom field or existing field
                              onUpdate(newEntry.id, 'subject', newEntry.subject + (e.target.checked ? ' [AYE]' : ''));
                            }
                          }, 100);
                        } else if (onUpdate) {
                          const currentSubject = dayEntry.subject || '';
                          const hasAye = currentSubject.includes('[AYE]');
                          const hasNo = currentSubject.includes('[NO]');
                          
                          let newSubject = currentSubject;
                          if (e.target.checked) {
                            // Remove [NO] if exists and add [AYE]
                            newSubject = currentSubject.replace(' [NO]', '').replace('[NO]', '');
                            if (!hasAye) {
                              newSubject += ' [AYE]';
                            }
                          } else {
                            // Remove [AYE]
                            newSubject = currentSubject.replace(' [AYE]', '').replace('[AYE]', '');
                          }
                          onUpdate(dayEntry.id, 'subject', newSubject);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-3 h-3 border-2 border-[#104e8b] rounded flex items-center justify-center">
                      {dayData.subjects.some((s: any) => s.name?.includes('[AYE]')) && (
                        <div className="w-1.5 h-1.5 bg-[#104e8b] rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-[#104e8b]/60 uppercase">No</span>
                  {editable ? (
                    <input
                      type="checkbox"
                      className="w-3 h-3 border-2 border-[#104e8b] rounded focus:ring-2 focus:ring-[#104e8b]/30"
                      onChange={(e) => {
                        // Handle No selection
                        const dayEntry = getOrCreateEntryForDay(dayKey);
                        if (dayEntry.id.startsWith('temp-')) {
                          handleAddEntryForDay(dayKey);
                          setTimeout(() => {
                            const newEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                            if (newEntry && onUpdate) {
                              onUpdate(newEntry.id, 'subject', newEntry.subject + (e.target.checked ? ' [NO]' : ''));
                            }
                          }, 100);
                        } else if (onUpdate) {
                          const dayEntry = entries.find(entry => entry.dayOfWeek === dayKey);
                          if (dayEntry && onUpdate) {
                            const currentSubject = dayEntry.subject || '';
                            const hasAye = currentSubject.includes('[AYE]');
                            const hasNo = currentSubject.includes('[NO]');
                            
                            let newSubject = currentSubject;
                            if (e.target.checked) {
                              // Remove [AYE] if exists and add [NO]
                              newSubject = currentSubject.replace(' [AYE]', '').replace('[AYE]', '');
                              if (!hasNo) {
                                newSubject += ' [NO]';
                              }
                            } else {
                              // Remove [NO]
                              newSubject = currentSubject.replace(' [NO]', '').replace('[NO]', '');
                            }
                            onUpdate(dayEntry.id, 'subject', newSubject);
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="w-3 h-3 border-2 border-[#104e8b] rounded flex items-center justify-center">
                      {dayData.subjects.some((s: any) => s.name?.includes('[NO]')) && (
                        <div className="w-1.5 h-1.5 bg-[#104e8b] rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Delete button for editable mode */}
              {editable && onDelete && dayData.subjects.length > 0 && (
                <div className="absolute top-2 right-2">
                  {dayData.subjects.map((subject: any) => (
                    <Button
                      key={subject.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(subject.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Summary Section */}
      <div className="mt-4 pt-4 border-t-2 border-[#104e8b]/20 bg-blue-50/10 p-4 rounded-sm">
         <div className="grid grid-cols-1 gap-4">
            <div className="space-y-4 font-black">
               <h4 className="text-[11px] text-[#104e8b] uppercase border-b border-[#104e8b] inline-block mb-1">WEEKLY SUMMARY</h4>
               
               <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-center gap-8">
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] text-[#104e8b] uppercase font-black">Total Ayes:</span>
                        <span className="text-[12px] font-bold text-[#104e8b]">
                           {entries.filter(entry => entry.subject?.includes('[AYE]')).length}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[9px] text-[#104e8b] uppercase font-black">Total Nos:</span>
                        <span className="text-[12px] font-bold text-[#104e8b]">
                           {entries.filter(entry => entry.subject?.includes('[NO]')).length}
                        </span>
                     </div>
                  </div>
                  
                  {editable && (
                     <div className="flex items-baseline gap-2">
                        <span className="text-[9px] text-[#104e8b] uppercase">Weekly Notes:</span>
                        <div className="flex-1 border-b border-dotted border-[#104e8b]/30"></div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>

      {/* Add Entry Button */}
      {editable && onAdd && (
        <div className="mt-4">
          <Button
            onClick={onAdd}
            variant="outline"
            size="sm"
            className="border-green-600 text-green-700 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      )}
    </div>
  );
}
