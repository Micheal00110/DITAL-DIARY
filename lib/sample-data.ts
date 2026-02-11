/**
 * Sample diary data for preview/demo purposes
 * Shows what a completed diary looks like
 */

import { DiaryData, AcademicDiaryData, SampleDiaryData } from './types';

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

export const academicDiarySampleData: AcademicDiaryData = {
  schoolDetails: {
    name: "ST. PETER'S SECONDARY SCHOOL",
    address: 'P.O. BOX 12345, NAIROBI',
    phone: '0712-345678',
    email: 'info@stpeters.ac.ke',
  },
  studentDetails: {
    id: 's1',
    name: 'WANJIRU KAMAU',
    class: 'FORM 3 EAST',
    admissionNumber: '2023/0456',
    term: 'TERM 1, 2026',
    year: 2026,
    nemisNumber: '',
    schoolName: "ST. PETER'S SECONDARY SCHOOL",
  },
  weeklySchedule: [
    {
      id: 'w1',
      dayOfWeek: 'MON',
      date: '10/02',
      subject: 'MATHEMATICS',
      lessonTopics: [
        'Quadratic Equations',
        'Completing the square',
        'Factorization method',
        'Formula application',
      ],
      homework: 'Exercise 4.2\nPage 156\nQuestions 1-10\nDue: 12/02/26',
    },
    {
      id: 'w2',
      dayOfWeek: 'MON',
      date: '10/02',
      subject: 'ENGLISH',
      lessonTopics: [
        'Literature:',
        '"The River and the Source"',
        "Chapter 5: Akoko's Journey",
        'Themes: Determination, Culture',
      ],
      homework: 'Essay: "My Village"\nMin. 450 words\n2 pages\nDue: 13/02/26',
    },
    {
      id: 'w3',
      dayOfWeek: 'TUE',
      date: '11/02',
      subject: 'KISWAHILI',
      lessonTopics: [
        'Insha: Sherehe ya Harus',
        '• Utangulizi (Introduction)',
        '• Kiini (Body)',
        '• Hitimisho (Conclusion)',
      ],
      homework: 'Andika insha\nkamili\nKurasa 2\nDue: 14/02/26',
    },
    {
      id: 'w4',
      dayOfWeek: 'TUE',
      date: '11/02',
      subject: 'BIOLOGY',
      lessonTopics: [
        'Human Digestive System',
        '• Alimentary canal parts',
        '• Enzyme functions',
        '• Practical: Diagram labeling',
      ],
      homework: 'Revise Chapter 7\nDraw & label\nfull diagram\nTest Friday',
    },
    {
      id: 'w5',
      dayOfWeek: 'WED',
      date: '12/02',
      subject: 'CHEMISTRY',
      lessonTopics: [
        'Acids, Bases and Salts',
        '• pH scale (0-14)',
        '• Indicators: Litmus, phenolphthalein',
        '• Practical experiment done',
      ],
      homework: 'Read Ch. 6\nAnswer Q 1-8\nPage 89\nDue: 15/02/26',
    },
  ],
  teacherRemarks: {
    remarks: 'Wanjiru demonstrates excellent understanding of concepts. Keep up the good work!',
    teacherName: 'Mr. Maina',
    date: '12/02/26',
  },
  parentSignature: {
    signature: 'Kamau M.',
    date: '13/02/26',
  },
  verified: true,
  weekNumber: 1,
};

