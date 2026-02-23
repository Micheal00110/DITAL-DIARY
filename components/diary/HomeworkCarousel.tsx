/**
 * Homework Carousel Component
 * Displays and manages multiple homework items per day with smooth transitions
 * Supports add, edit, delete, and mark-as-seen functionality
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface HomeworkItem {
  id: string;
  subject: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
  parentSeen?: boolean;
}

interface HomeworkCarouselProps {
  homeworks: HomeworkItem[];
  editable?: boolean;
  onAdd?: () => void;
  onUpdate?: (id: string, field: keyof HomeworkItem, value: string | boolean) => void;
  onDelete?: (id: string) => void;
  dayOfWeek?: string;
}

export function HomeworkCarousel({
  homeworks = [],
  editable = false,
  onAdd,
  onUpdate,
  onDelete,
  dayOfWeek = 'Monday',
}: HomeworkCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (homeworks.length === 0) {
    return (
      <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 text-center space-y-4">
        <div className="text-sm text-slate-500 italic">No homework assigned for {dayOfWeek}</div>
        {editable && onAdd && (
          <Button
            onClick={onAdd}
            variant="outline"
            size="sm"
            className="mx-auto border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Homework
          </Button>
        )}
      </div>
    );
  }

  const currentHomework = homeworks[activeIndex];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < homeworks.length - 1;

  return (
    <div className="space-y-4">
      {/* Homework Counter & Navigation */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Homework {activeIndex + 1} of {homeworks.length}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveIndex(p => Math.max(0, p - 1))}
            disabled={!canGoPrev}
            variant="outline"
            size="sm"
            className="rounded-full w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setActiveIndex(p => Math.min(homeworks.length - 1, p + 1))}
            disabled={!canGoNext}
            variant="outline"
            size="sm"
            className="rounded-full w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Homework Item with Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="space-y-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm"
        >
          {/* Subject */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Subject</label>
            {editable ? (
              <Input
                value={currentHomework.subject}
                onChange={(e) => onUpdate?.(currentHomework.id, 'subject', e.target.value)}
                placeholder="e.g., MATHEMATICS"
                className="bg-slate-50 border-slate-200 rounded-lg text-sm font-semibold"
              />
            ) : (
              <div className="text-sm font-bold text-slate-800">{currentHomework.subject}</div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Task Description</label>
            {editable ? (
              <Textarea
                value={currentHomework.description}
                onChange={(e) => onUpdate?.(currentHomework.id, 'description', e.target.value)}
                placeholder="e.g., Exercise 4.2, Page 156, Questions 1-10"
                className="min-h-[100px] bg-slate-50 border-slate-200 rounded-lg text-sm p-3"
              />
            ) : (
              <div className="min-h-[100px] bg-slate-50 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-wrap border border-slate-100">
                {currentHomework.description}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Due Date</label>
            {editable ? (
              <Input
                type="date"
                value={currentHomework.dueDate || ''}
                onChange={(e) => onUpdate?.(currentHomework.id, 'dueDate', e.target.value)}
                className="bg-slate-50 border-slate-200 rounded-lg text-sm"
              />
            ) : (
              <div className="text-sm text-slate-700">
                {currentHomework.dueDate ? new Date(currentHomework.dueDate).toLocaleDateString() : 'No due date set'}
              </div>
            )}
          </div>

          {/* Status Indicators */}
          <div className="flex gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdate?.(currentHomework.id, 'completed', !currentHomework.completed)}
                disabled={!editable}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors disabled:opacity-50"
              >
                {currentHomework.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                Completed
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdate?.(currentHomework.id, 'parentSeen', !currentHomework.parentSeen)}
                disabled={!editable}
                className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors disabled:opacity-50"
              >
                {currentHomework.parentSeen ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                Parent Seen
              </button>
            </div>
          </div>

          {/* Delete Button */}
          {editable && onDelete && (
            <div className="pt-2 border-t border-slate-100">
              <Button
                onClick={() => onDelete(currentHomework.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50 w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete This Homework
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2">
        {homeworks.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === activeIndex ? 'bg-blue-900 w-6' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to homework ${idx + 1}`}
          />
        ))}
      </div>

      {/* Add Homework Button */}
      {editable && onAdd && (
        <Button
          onClick={onAdd}
          variant="outline"
          size="sm"
          className="w-full border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Homework
        </Button>
      )}
    </div>
  );
}
