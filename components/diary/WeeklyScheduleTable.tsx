/**
 * Weekly Schedule Table Component
 * Main academic schedule with Date, Subject, Lesson/Topic, and Homework columns
 * Matches the St. Peter's Secondary School diary structure
 */

'use client';

import { WeeklyScheduleEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface WeeklyScheduleTableProps {
  entries: WeeklyScheduleEntry[];
  editable?: boolean;
  onAdd?: () => void;
  onUpdate?: (id: string, field: keyof WeeklyScheduleEntry, value: string | string[]) => void;
  onDelete?: (id: string) => void;
}

export function WeeklyScheduleTable({
  entries,
  editable = false,
  onAdd,
  onUpdate,
  onDelete,
}: WeeklyScheduleTableProps) {
  const handleLessonTopicsChange = (id: string, value: string) => {
    // Convert string to array by splitting on newlines
    const topics = value.split('\n').filter(t => t.trim());
    onUpdate?.(id, 'lessonTopics', topics);
  };

  return (
    <div className="w-full mt-2">
      <div className="border-2 border-gray-800 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="py-2 px-3 text-left font-bold border-r border-white w-[12%]">
                DATE
              </th>
              <th className="py-2 px-3 text-left font-bold border-r border-white w-[15%]">
                SUBJECT
              </th>
              <th className="py-2 px-3 text-left font-bold border-r border-white w-[38%]">
                LESSON / TOPIC
              </th>
              <th className="py-2 px-3 text-left font-bold w-[30%]">
                HOMEWORK
              </th>
              {editable && (
                <th className="py-2 px-3 text-center font-bold border-l border-white w-[5%]">
                  
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={editable ? 5 : 4} className="py-8 text-center text-gray-500">
                  No schedule entries yet. {editable && 'Click "Add Entry" to get started.'}
                </td>
              </tr>
            ) : (
              entries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={`border-b border-gray-400 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {/* Date Column */}
                  <td className="py-2 px-3 border-r border-gray-400 align-top">
                    {editable && onUpdate ? (
                      <div className="space-y-1">
                        <Input
                          type="text"
                          value={entry.dayOfWeek}
                          onChange={(e) => onUpdate(entry.id, 'dayOfWeek', e.target.value.toUpperCase())}
                          placeholder="MON"
                          className="h-8 text-sm font-semibold uppercase"
                        />
                        <Input
                          type="text"
                          value={entry.date}
                          onChange={(e) => onUpdate(entry.id, 'date', e.target.value)}
                          placeholder="10/02"
                          className="h-8 text-sm"
                        />
                      </div>
                    ) : (
                      <div className="text-sm">
                        <div className="font-semibold">{entry.dayOfWeek}</div>
                        <div>{entry.date}</div>
                      </div>
                    )}
                  </td>

                  {/* Subject Column */}
                  <td className="py-2 px-3 border-r border-gray-400 align-top">
                    {editable && onUpdate ? (
                      <Input
                        type="text"
                        value={entry.subject}
                        onChange={(e) => onUpdate(entry.id, 'subject', e.target.value.toUpperCase())}
                        placeholder="MATHEMATICS"
                        className="h-8 text-sm font-semibold text-green-700 uppercase"
                      />
                    ) : (
                      <div className="text-sm font-semibold text-green-700 uppercase">
                        {entry.subject}
                      </div>
                    )}
                  </td>

                  {/* Lesson/Topic Column */}
                  <td className="py-2 px-3 border-r border-gray-400 align-top">
                    {editable && onUpdate ? (
                      <Textarea
                        value={entry.lessonTopics.join('\n')}
                        onChange={(e) => handleLessonTopicsChange(entry.id, e.target.value)}
                        placeholder="• Quadratic Equations&#10;• Completing the square&#10;• Factorization method"
                        className="min-h-[80px] text-sm"
                        rows={4}
                      />
                    ) : (
                      <ul className="text-sm space-y-1">
                        {entry.lessonTopics.map((topic, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>

                  {/* Homework Column */}
                  <td className="py-2 px-3 align-top">
                    {editable && onUpdate ? (
                      <Textarea
                        value={entry.homework}
                        onChange={(e) => onUpdate(entry.id, 'homework', e.target.value)}
                        placeholder="Exercise 4.2&#10;Page 156&#10;Questions 1-10&#10;Due: 12/02/26"
                        className="min-h-[80px] text-sm"
                        rows={4}
                      />
                    ) : (
                      <div className="text-sm whitespace-pre-line">
                        {entry.homework.split('\n').map((line, idx) => {
                          const isDueLine = line.toLowerCase().includes('due:');
                          return (
                            <div key={idx} className={isDueLine ? 'text-red-600 font-semibold' : ''}>
                              {line}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </td>

                  {/* Delete Button */}
                  {editable && onDelete && (
                    <td className="py-2 px-2 border-l border-gray-400 align-top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(entry.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Entry Button */}
      {editable && onAdd && (
        <div className="mt-2">
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
