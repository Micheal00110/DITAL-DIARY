/**
 * Sample diary data for preview/demo purposes
 * Shows what a completed diary looks like
 */

import type { SampleDiaryData } from './types';

export const sampleDiaryData: SampleDiaryData = {
  isSample: true,
  studentDetails: {
    id: '1',
    name: 'John Kipchoge Mwangi',
    nemisNumber: 'KE/2024/001234',
    admissionNumber: 'ADM/2024/5678',
    class: 'Grade 4 - Blue',
    schoolName: 'Nairobi Primary School',
    term: 'Term 1',
    year: 2024,
  },
  attendance: [
    {
      id: '1',
      date: '2024-01-08',
      present: true,
      teacherName: 'Mrs. Njeri',
    },
    {
      id: '2',
      date: '2024-01-09',
      present: true,
      teacherName: 'Mrs. Njeri',
    },
    {
      id: '3',
      date: '2024-01-10',
      present: false,
      reason: 'Sick - fever',
      teacherName: 'Mrs. Njeri',
    },
    {
      id: '4',
      date: '2024-01-11',
      present: true,
      teacherName: 'Mrs. Njeri',
    },
    {
      id: '5',
      date: '2024-01-12',
      present: true,
      teacherName: 'Mrs. Njeri',
    },
  ],
  learningProgress: [
    {
      id: '1',
      learningArea: 'Literacy and Language',
      skill: 'Reading Comprehension',
      progress: 'Good',
      teacherComment: 'Excellent progress. John reads fluently and understands stories well.',
    },
    {
      id: '2',
      learningArea: 'Literacy and Language',
      skill: 'Writing Skills',
      progress: 'Fair',
      teacherComment: 'Needs to improve handwriting and spelling. Keep practicing.',
    },
    {
      id: '3',
      learningArea: 'Numeracy',
      skill: 'Addition and Subtraction',
      progress: 'Good',
      teacherComment: 'Strong understanding of basic operations. Ready for multiplication.',
    },
    {
      id: '4',
      learningArea: 'Science and Technology',
      skill: 'Observation Skills',
      progress: 'Good',
      teacherComment: 'Very curious and asks good questions during science lessons.',
    },
    {
      id: '5',
      learningArea: 'Social Studies',
      skill: 'Community Awareness',
      progress: 'Fair',
      teacherComment: 'Participates in discussions but needs to listen more to others.',
    },
  ],
  homework: [
    {
      id: '1',
      subject: 'Mathematics',
      homeworkGiven: 'Complete page 45 - Addition problems (1-20)',
      dueDate: '2024-01-09',
      completed: true,
      parentSignature: true,
    },
    {
      id: '2',
      subject: 'English',
      homeworkGiven: 'Read chapter 3 of "The Lion and the Mouse" and answer questions',
      dueDate: '2024-01-10',
      completed: true,
      parentSignature: true,
    },
    {
      id: '3',
      subject: 'Science',
      homeworkGiven: 'Draw and label parts of a plant',
      dueDate: '2024-01-11',
      completed: true,
      parentSignature: true,
    },
    {
      id: '4',
      subject: 'Social Studies',
      homeworkGiven: 'Write about your family and community',
      dueDate: '2024-01-12',
      completed: false,
      parentSignature: false,
    },
  ],
  behaviour: [
    {
      id: '1',
      date: '2024-01-08',
      behaviourObserved: 'Helped a classmate with reading',
      actionTaken: 'Praised for kindness',
      teacherComment: 'Shows good social skills and empathy.',
    },
    {
      id: '2',
      date: '2024-01-10',
      behaviourObserved: 'Talked during lesson without raising hand',
      actionTaken: 'Reminded about classroom rules',
      teacherComment: 'Needs to improve listening and waiting for turn.',
      parentComment: 'Will remind him at home about classroom behavior.',
    },
    {
      id: '3',
      date: '2024-01-12',
      behaviourObserved: 'Completed all tasks on time',
      actionTaken: 'Positive reinforcement',
      teacherComment: 'Excellent focus and responsibility today.',
    },
  ],
  teacherNotes: [
    {
      id: '1',
      date: '2024-01-12',
      from: 'teacher',
      subject: 'Progress Update',
      message:
        'John is settling well into Grade 4. He is a bright student with good potential. Please encourage him to practice writing at home.',
      read: true,
    },
    {
      id: '2',
      date: '2024-01-11',
      from: 'parent',
      subject: 'Homework Concern',
      message:
        'John seems to struggle with the social studies homework. Can you provide more guidance on what is expected?',
      read: true,
    },
  ],
  termSummary: {
    academics: 'John shows strong academic performance, particularly in literacy and numeracy. He is curious and engaged in learning.',
    behaviour: 'Generally well-behaved. Needs to work on listening skills and following classroom procedures consistently.',
    attendance: 'Good attendance with only one absence due to illness.',
    overallRemarks:
      'John is a capable student with good potential. With continued support from home and school, he will make excellent progress.',
  },
};
