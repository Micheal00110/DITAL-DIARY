/**
 * Weekly Summary Component
 * Displays Ayes/Nos tally and weekly notes on a separate page/section
 */

'use client';

import { 
  WeeklyScheduleEntry, 
  LearningProgress, 
  BehaviourRecord, 
  TeacherNote, 
  TeacherRemarks, 
  ParentSignature 
} from '@/lib/types';
import { CommunicationDirection } from '@/lib/types/enums';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LogIn, Plus, Trash2, Edit2, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedCheckbox } from '@/components/ui/animated-checkbox';

interface WeeklySummaryProps {
  entries: WeeklyScheduleEntry[];
  learningProgress?: LearningProgress[];
  behaviour?: BehaviourRecord[];
  teacherNotes?: TeacherNote[];
  editable?: boolean;
  weekNumber?: number;
  term?: string;
  onUpdateLearningProgress?: (id: string, field: keyof LearningProgress, value: any) => void;
  onUpdateBehaviour?: (id: string, field: keyof BehaviourRecord, value: any) => void;
  onUpdateTeacherNote?: (id: string, field: keyof TeacherNote, value: any) => void;
  onUpdateTeacherRemarks?: (field: keyof TeacherRemarks, value: string) => void;
  onUpdateParentSignature?: (field: keyof ParentSignature, value: string) => void;
  onAddLearningProgress?: () => void;
  onAddBehaviour?: () => void;
  onAddTeacherNote?: () => void;
  teacherRemarks?: TeacherRemarks;
  parentSignature?: ParentSignature;
}

export function WeeklySummary({ 
  entries, 
  learningProgress = [],
  behaviour = [],
  teacherNotes = [],
  editable = false, 
  weekNumber = 1, 
  term = 'Term One',
  onUpdateLearningProgress,
  onUpdateBehaviour,
  onUpdateTeacherNote,
  onUpdateTeacherRemarks,
  onUpdateParentSignature,
  onAddLearningProgress,
  onAddBehaviour,
  onAddTeacherNote,
  teacherRemarks,
  parentSignature
}: WeeklySummaryProps) {
  const totalAyes = entries.filter(entry => entry.subject?.includes('[AYE]')).length;
  const totalNos = entries.filter(entry => entry.subject?.includes('[NO]')).length;

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="relative">
        {/* Booklet Shadow Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-slate-200 opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40 pointer-events-none"></div>

        {/* Booklet Page */}
        <div className="relative bg-white border-r-4 border-blue-900/10 shadow-[20px_20px_60px_rgba(0,0,0,0.2),-5px_0_15px_rgba(0,0,0,0.05)]">
          <div className="p-6 sm:p-8">

            {/* Page Header */}
            <div className="mb-6 pb-2 border-b-2 border-[#104e8b]/20">
              <h2 className="text-xl font-[900] text-[#104e8b]">{term} — Week {weekNumber}</h2>
              <p className="text-xs uppercase font-bold text-[#104e8b]/50 tracking-widest mt-1">Weekly Summary</p>
            </div>

            {/* Summary Content */}
            <div className="space-y-6">
              {/* Aye / No Tally */}
              <div className="bg-blue-50/30 border border-[#104e8b]/10 rounded-lg p-5">
                <h4 className="text-xs text-[#104e8b] uppercase border-b border-[#104e8b] inline-block mb-4 font-black">
                  Attendance Summary
                </h4>
                <div className="flex items-center justify-center gap-10">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[#104e8b] uppercase font-black">Total Ayes</span>
                    <span className="text-3xl font-[900] text-emerald-600">{totalAyes}</span>
                  </div>
                  <div className="w-px h-12 bg-[#104e8b]/20"></div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-[#104e8b] uppercase font-black">Total Nos</span>
                    <span className="text-3xl font-[900] text-red-500">{totalNos}</span>
                  </div>
                </div>
              </div>

              {/* Learning Progress (CBC) Section */}
              <div className="space-y-4 font-black">
                <div className="flex justify-between items-baseline border-b border-[#104e8b]">
                  <h4 className="text-xs text-[#104e8b] uppercase inline-block mb-1">
                    Learning Progress (CBC)
                  </h4>
                  {editable && (
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary" onClick={onAddLearningProgress}>
                      <Plus className="w-3 h-3 mr-1" /> Add Area
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {learningProgress.length > 0 ? (
                    learningProgress.map((lp, idx) => (
                      <div key={lp.id || idx} className="grid grid-cols-1 gap-2 p-3 bg-blue-50/20 rounded-lg border border-dotted border-[#104e8b]/20 hover:border-[#104e8b]/40 transition-colors">
                        {editable ? (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input 
                                value={lp.learningArea} 
                                onChange={(e) => onUpdateLearningProgress?.(lp.id, 'learningArea', e.target.value)}
                                className="h-7 text-[10px] flex-1 font-bold border-[#104e8b]/20"
                                placeholder="Learning Area"
                              />
                              <Input 
                                value={lp.skill} 
                                onChange={(e) => onUpdateLearningProgress?.(lp.id, 'skill', e.target.value)}
                                className="h-7 text-[10px] flex-1 border-[#104e8b]/20"
                                placeholder="Skill"
                              />
                              <select 
                                value={lp.progress} 
                                onChange={(e) => onUpdateLearningProgress?.(lp.id, 'progress', e.target.value)}
                                className="h-7 text-[10px] rounded-md border border-[#104e8b]/20 bg-white px-2 outline-none"
                              >
                                <option value="Exceeds Expectation">Exceeds Expectation</option>
                                <option value="Meets Expectation">Meets Expectation</option>
                                <option value="Approaching Expectation">Approaching Expectation</option>
                                <option value="Below Expectation">Below Expectation</option>
                              </select>
                            </div>
                            <Textarea 
                              value={lp.teacherComment} 
                              onChange={(e) => onUpdateLearningProgress?.(lp.id, 'teacherComment', e.target.value)}
                              className="text-[10px] min-h-[40px] border-[#104e8b]/10 bg-white/50"
                              placeholder="Teacher assessment comment..."
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-[10px] text-[#104e8b] font-black">{lp.learningArea}: {lp.skill}</span>
                              <span className="text-[10px] text-emerald-600 font-black">{lp.progress}</span>
                            </div>
                            <p className="text-xs italic text-[#104e8b]/80">
                              {lp.teacherComment}
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] italic text-gray-400 py-2 border-b border-dotted border-gray-200">
                      No learning progress recorded for this week.
                    </div>
                  )}
                </div>
              </div>

              {/* Behaviour Record Section */}
              <div className="space-y-4 font-black">
                <div className="flex justify-between items-baseline border-b border-[#104e8b]">
                  <h4 className="text-xs text-[#104e8b] uppercase inline-block mb-1">
                    Behaviour Record
                  </h4>
                  {editable && (
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary" onClick={onAddBehaviour}>
                      <Plus className="w-3 h-3 mr-1" /> Add Incident
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {behaviour.length > 0 ? (
                    behaviour.map((b, idx) => (
                      <div key={b.id || idx} className="p-3 bg-red-50/20 rounded-lg border border-dotted border-red-200 hover:border-red-300 transition-colors">
                        {editable ? (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input 
                                value={b.behaviourObserved} 
                                onChange={(e) => onUpdateBehaviour?.(b.id, 'behaviourObserved', e.target.value)}
                                className="h-7 text-[10px] flex-1 font-bold border-red-200"
                                placeholder="Incident / Observation"
                              />
                              <Input 
                                value={b.date} 
                                onChange={(e) => onUpdateBehaviour?.(b.id, 'date', e.target.value)}
                                className="h-7 text-[10px] w-24 border-red-200"
                                placeholder="Date"
                              />
                            </div>
                            <div className="flex gap-2">
                               <Input 
                                 value={b.actionTaken} 
                                 onChange={(e) => onUpdateBehaviour?.(b.id, 'actionTaken', e.target.value)}
                                 className="h-7 text-[10px] flex-1 border-red-100 italic"
                                 placeholder="Action Taken"
                               />
                            </div>
                            <Textarea 
                              value={b.teacherComment} 
                              onChange={(e) => onUpdateBehaviour?.(b.id, 'teacherComment', e.target.value)}
                              className="text-[10px] min-h-[40px] border-red-100 bg-white/50"
                              placeholder="Remarks..."
                            />
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[10px] text-red-900 font-black uppercase">Incident: {b.behaviourObserved}</span>
                              <span className="text-xs text-gray-400">{b.date}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                               <div className="flex items-baseline gap-1">
                                  <span className="text-[10px] text-red-700 uppercase">Action:</span>
                                  <span className="text-xs italic flex-1">{b.actionTaken}</span>
                               </div>
                               <div className="flex items-baseline gap-1">
                                  <span className="text-[10px] text-red-700 uppercase">Comment:</span>
                                  <span className="text-xs italic flex-1">{b.teacherComment}</span>
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] italic text-gray-400 py-2 border-b border-dotted border-gray-200">
                      Excellent behaviour! No incidents recorded.
                    </div>
                  )}
                </div>
              </div>

              {/* Communication Notes Section */}
              <div className="space-y-4 font-black">
                <div className="flex justify-between items-baseline border-b border-[#104e8b]">
                  <h4 className="text-xs text-[#104e8b] uppercase inline-block mb-1">
                    Teacher ↔ Parent Communication
                  </h4>
                  {editable && (
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary" onClick={onAddTeacherNote}>
                      <Plus className="w-3 h-3 mr-1" /> Add Note
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {teacherNotes.length > 0 ? (
                    teacherNotes.map((note, idx) => (
                      <div key={note.id || idx} className={cn(
                        "p-3 rounded-lg border border-dotted transition-colors",
                        note.from === CommunicationDirection.TEACHER ? "bg-green-50/20 border-green-200" : "bg-purple-50/20 border-purple-200"
                      )}>
                        {editable ? (
                          <div className="space-y-2">
                             <div className="flex justify-between items-center">
                                <span className={cn(
                                  "text-[10px] px-1.5 py-0.5 rounded-full font-black uppercase shadow-xs",
                                  note.from === CommunicationDirection.TEACHER ? "bg-green-600 text-white" : "bg-purple-600 text-white"
                                )}>
                                  From: {note.from}
                                </span>
                                <Input 
                                  value={note.date} 
                                  onChange={(e) => onUpdateTeacherNote?.(note.id, 'date', e.target.value)}
                                  className="h-7 text-xs w-24 border-gray-200"
                                  placeholder="Date"
                                />
                             </div>
                             <Input 
                               value={note.subject} 
                               onChange={(e) => onUpdateTeacherNote?.(note.id, 'subject', e.target.value)}
                               className="h-7 text-[10px] font-bold border-gray-200"
                               placeholder="Subject"
                             />
                             <Textarea 
                               value={note.message} 
                               onChange={(e) => onUpdateTeacherNote?.(note.id, 'message', e.target.value)}
                               className="text-[10px] min-h-[40px] border-gray-100 bg-white/50"
                               placeholder="Type your message here..."
                             />
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-baseline mb-2">
                              <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full font-black uppercase text-white shadow-xs",
                                note.from === CommunicationDirection.TEACHER ? "bg-green-600" : "bg-purple-600"
                              )}>
                                {note.from === CommunicationDirection.TEACHER ? 'Teacher' : 'Parent'}
                              </span>
                              <span className="text-xs text-gray-400">{note.date}</span>
                            </div>
                            <h5 className="text-xs font-black text-[#104e8b] mb-1">{note.subject}</h5>
                            <p className="text-xs leading-relaxed text-gray-700 italic">
                                &quot;{note.message}&quot;
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] italic text-gray-400 py-2 border-b border-dotted border-gray-200">
                      No communication notes for this week.
                    </div>
                  )}
                </div>
              </div>

              {/* Parent / Guardian Section */}
              <div className="space-y-4 font-black">
                <h4 className="text-xs text-[#104e8b] uppercase border-b border-[#104e8b] inline-block mb-1">
                  Parent / Guardian
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#104e8b] uppercase whitespace-nowrap">Parent&apos;s / Guardian&apos;s Name:</span>
                    {editable ? (
                      <Input 
                        value={parentSignature?.signature || ''} 
                        onChange={(e) => onUpdateParentSignature?.('signature', e.target.value)}
                        className="h-7 text-xs flex-1 border-0 border-b border-dotted border-[#104e8b]/30 rounded-none bg-transparent px-0"
                      />
                    ) : (
                      <div className="flex-1 border-b border-dotted border-[#104e8b]/30 min-h-[16px]">
                        <span className="text-xs">{parentSignature?.signature}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs text-[#104e8b] uppercase">Date:</span>
                      {editable ? (
                        <Input 
                          value={parentSignature?.date || ''} 
                          onChange={(e) => onUpdateParentSignature?.('date', e.target.value)}
                          className="h-6 text-[10px] flex-1 border-0 border-b border-dotted border-[#104e8b]/30 rounded-none bg-transparent px-0"
                        />
                      ) : (
                        <div className="flex-1 border-b border-dotted border-[#104e8b]/30 min-h-[16px]">
                          <span className="text-[10px]">{parentSignature?.date}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 w-32">
                       <AnimatedCheckbox 
                         id="parent-sign-summary"
                         label="Signed"
                         checked={!!parentSignature?.signature}
                       />
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher Notes & Remarks */}
              <div className="space-y-4 font-black">
                <h4 className="text-xs text-[#104e8b] uppercase border-b border-[#104e8b] inline-block mb-1">
                  Teacher&apos;s Note &amp; Remarks
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#104e8b] uppercase font-black">Remarks:</span>
                    {editable ? (
                      <Textarea 
                        value={teacherRemarks?.remarks || ''} 
                        onChange={(e) => onUpdateTeacherRemarks?.('remarks', e.target.value)}
                        className="text-xs min-h-[60px] border-dotted border-[#104e8b]/20 bg-blue-50/5"
                        placeholder="Weekly teacher input..."
                      />
                    ) : (
                      <div className="flex-1 border-b border-dotted border-[#104e8b]/30 min-h-[40px] text-[10px] p-1 bg-gray-50/50">
                        {teacherRemarks?.remarks || 'No teacher remarks recorded for this week.'}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-xs text-[#104e8b] uppercase">Name:</span>
                      {editable ? (
                        <Input 
                          value={teacherRemarks?.teacherName || ''} 
                          onChange={(e) => onUpdateTeacherRemarks?.('teacherName', e.target.value)}
                          className="h-6 text-[10px] flex-1 border-0 border-b border-dotted border-[#104e8b]/30 rounded-none bg-transparent px-0"
                        />
                      ) : (
                        <div className="flex-1 border-b border-dotted border-[#104e8b]/30 min-h-[16px]">
                          <span className="text-[10px]">{teacherRemarks?.teacherName}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 w-32">
                       <AnimatedCheckbox 
                         id="teacher-sign-summary"
                         label="Signed"
                         checked={!!teacherRemarks?.signature || !!teacherRemarks?.teacherName}
                         onChange={(checked) => onUpdateTeacherRemarks?.('signature', checked ? 'Signed' : '')}
                       />
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code & Submission Section */}
              <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-6 mt-8 print:mt-12">
                <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="bg-white p-3 rounded-lg shadow-inner">
                    <QrCode className="w-24 h-24 text-gray-800" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Scan to Verify Digital Diary</span>
                </div>

                <Button className="w-full bg-[#0c0eff] hover:bg-[#0c0eff]/90 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2" onClick={() => alert('Diary workflow locked and sent to school portal!')}>
                  <LogIn className="w-5 h-5" />
                  SEND DIARY TO SCHOOL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
