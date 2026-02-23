/**
 * Type definitions for Kenyan Student Diary App
 * Defines all data structures used throughout the application
 */

import type { ProgressLevel, CommunicationDirection } from './enums';

// Student profile information
export interface StudentDetails {
  id: string;
  name: string;
  nemisNumber: string;
  admissionNumber: string;
  class: string;
  schoolName: string;
  term: string;
  year: number;
  photo?: string; // Optional photo URL or path
}

// Attendance record
export interface AttendanceRecord {
  id: string;
  date: string;
  present: boolean;
  reason?: string;
  teacherName: string;
}

// Learning progress (CBC - Competency Based Curriculum)
export interface LearningProgress {
  id: string;
  learningArea: string;
  skill: string;
  progress: ProgressLevel;
  teacherComment: string;
}

// Homework record
export interface HomeworkRecord {
  id: string;
  subject: string;
  homeworkGiven: string;
  dueDate: string;
  completed: boolean;
  parentSignature: boolean;
}

// Behaviour monitoring record
export interface BehaviourRecord {
  id: string;
  date: string;
  behaviourObserved: string;
  actionTaken: string;
  teacherComment: string;
  parentComment?: string;
}

// Teacher-Parent communication note
export interface TeacherNote {
  id: string;
  date: string;
  from: CommunicationDirection;
  subject: string;
  message: string;
  read: boolean;
}

// Term summary
export interface TermSummary {
  academics: string;
  behaviour: string;
  attendance: string;
  overallRemarks: string;
}

// Complete diary data structure
export interface DiaryData {
  studentDetails: StudentDetails;
  attendance: AttendanceRecord[];
  learningProgress: LearningProgress[];
  homework: HomeworkRecord[];
  behaviour: BehaviourRecord[];
  teacherNotes: TeacherNote[];
  termSummary?: TermSummary;
}

// Sample/preview diary data
export interface SampleDiaryData extends DiaryData {
  isSample: boolean;
}

// ===== NEW ACADEMIC DIARY STRUCTURE =====

// School information
export interface SchoolDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo?: string; // Optional logo URL or path
}

// Weekly academic schedule entry
export interface WeeklyScheduleEntry {
  id: string;
  date: string; // Format: "MON 10/02" or similar
  dayOfWeek: string; // "MON", "TUE", etc.
  subject: string; // "MATHEMATICS", "ENGLISH", etc.
  lessonTopics: string[]; // Array of lesson topics/points
  homework: string; // Homework description
  homeworkDue?: string; // Due date for homework
  teacher?: string; // Teacher name for this entry
  parent?: string; // Parent name/input for this entry
}

// Teacher remarks and signature
export interface TeacherRemarks {
  remarks: string;
  teacherName: string;
  signature?: string;
  date: string;
}

// Parent/Guardian signature
export interface ParentSignature {
  signature?: string;
  date: string;
}

// Complete academic diary data
export interface AcademicDiaryData {
  schoolDetails: SchoolDetails;
  studentDetails: StudentDetails;
  weeklySchedule: WeeklyScheduleEntry[];
  teacherRemarks?: TeacherRemarks;
  parentSignature?: ParentSignature;
  verified: boolean; // Whether the diary has been verified
  weekNumber?: number; // Week number in the term
  pageNumber?: number; // Page number for multi-page diaries
  learningProgress?: LearningProgress[];
  behaviour?: BehaviourRecord[];
  teacherNotes?: TeacherNote[];
}

