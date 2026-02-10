/**
 * Diary Editor Component - Unified Table View
 * All diary sections consolidated into one comprehensive table
 * Includes: Student Details, Attendance, Learning Progress, Homework, Behaviour, Notes
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Save, Download } from 'lucide-react';
import type { DiaryData } from '@/lib/types';

interface DiaryEditorProps {
  onBack: () => void;
}

// Default empty diary structure
const defaultDiaryData: DiaryData = {
  studentDetails: {
    id: '1',
    name: '',
    nemisNumber: '',
    admissionNumber: '',
    class: '',
    schoolName: '',
    term: 'Term 1',
    year: new Date().getFullYear(),
  },
  attendance: [],
  learningProgress: [],
  homework: [],
  behaviour: [],
  teacherNotes: [],
};

export function DiaryEditor({ onBack }: DiaryEditorProps) {
  // State management for diary data
  const [diaryData, setDiaryData] = useState<DiaryData>(defaultDiaryData);
  const [isSaved, setIsSaved] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('diaryData');
    if (savedData) {
      try {
        setDiaryData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading diary data:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('diaryData', JSON.stringify(diaryData));
      setIsSaved(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [diaryData]);

  // Handle student details change
  const handleStudentDetailsChange = (field: string, value: string | number) => {
    setDiaryData((prev) => (
      {
        ...prev,
        studentDetails: {
          ...prev.studentDetails,
          [field]: value,
        },
      }
    ));
    setIsSaved(false);
  };

  // Add new attendance record
  const addAttendanceRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      present: true,
      reason: '',
      teacherName: '',
    };
    setDiaryData((prev) => (
      {
        ...prev,
        attendance: [...prev.attendance, newRecord],
      }
    ));
    setIsSaved(false);
  };

  // Update attendance record
  const updateAttendanceRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => (
      {
        ...prev,
        attendance: prev.attendance.map((record) =>
          record.id === id ? { ...record, [field]: value } : record
        ),
      }
    ));
    setIsSaved(false);
  };

  // Delete attendance record
  const deleteAttendanceRecord = (id: string) => {
    setDiaryData((prev) => (
      {
        ...prev,
        attendance: prev.attendance.filter((record) => record.id !== id),
      }
    ));
    setIsSaved(false);
  };

  // Add new learning progress record
  const addLearningRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      subject: '',
      topic: '',
      grade: 'A',
      comments: '',
    };
    setDiaryData((prev) => (
      {
        ...prev,
        learningProgress: [...prev.learningProgress, newRecord],
      }
    ));
    setIsSaved(false);
  };

  // Update learning progress record
  const updateLearningRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => (
      {
        ...prev,
        learningProgress: prev.learningProgress.map((record) =>
          record.id === id ? { ...record, [field]: value } : record
        ),
      }
    ));
    setIsSaved(false);
  };

  // Delete learning progress record
  const deleteLearningRecord = (id: string) => {
    setDiaryData((prev) => (
      {
        ...prev,
        learningProgress: prev.learningProgress.filter((record) => record.id !== id),
      }
    ));
    setIsSaved(false);
  };

  // Add new homework record
  const addHomeworkRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      subject: '',
      task: '',
      dueDate: '',
      completed: false,
      teacherName: '',
    };
    setDiaryData((prev) => (
      {
        ...prev,
        homework: [...prev.homework, newRecord],
      }
    ));
    setIsSaved(false);
  };

  // Update homework record
  const updateHomeworkRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => (
      {
        ...prev,
        homework: prev.homework.map((record) =>
          record.id === id ? { ...record, [field]: value } : record
        ),
      }
    ));
    setIsSaved(false);
  };

  // Delete homework record
  const deleteHomeworkRecord = (id: string) => {
    setDiaryData((prev) => (
      {
        ...prev,
        homework: prev.homework.filter((record) => record.id !== id),
      }
    ));
    setIsSaved(false);
  };

  // Add new behaviour record
  const addBehaviourRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      incident: '',
      type: 'Positive',
      notes: '',
      teacherName: '',
    };
    setDiaryData((prev) => (
      {
        ...prev,
        behaviour: [...prev.behaviour, newRecord],
      }
    ));
    setIsSaved(false);
  };

  // Update behaviour record
  const updateBehaviourRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => (
      {
        ...prev,
        behaviour: prev.behaviour.map((record) =>
          record.id === id ? { ...record, [field]: value } : record
        ),
      }
    ));
    setIsSaved(false);
  };

  // Delete behaviour record
  const deleteBehaviourRecord = (id: string) => {
    setDiaryData((prev) => (
      {
        ...prev,
        behaviour: prev.behaviour.filter((record) => record.id !== id),
      }
    ));
    setIsSaved(false);
  };

  // Add new teacher note
  const addTeacherNote = () => {
    const newNote = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      subject: '',
      note: '',
      teacherName: '',
    };
    setDiaryData((prev) => (
      {
        ...prev,
        teacherNotes: [...prev.teacherNotes, newNote],
      }
    ));
    setIsSaved(false);
  };

  // Update teacher note
  const updateTeacherNote = (id: string, field: string, value: any) => {
    setDiaryData((prev) => (
      {
        ...prev,
        teacherNotes: prev.teacherNotes.map((note) =>
          note.id === id ? { ...note, [field]: value } : note
        ),
      }
    ));
    setIsSaved(false);
  };

  // Delete teacher note
  const deleteTeacherNote = (id: string) => {
    setDiaryData((prev) => (
      {
        ...prev,
        teacherNotes: prev.teacherNotes.filter((note) => note.id !== id),
      }
    ));
    setIsSaved(false);
  };

  // Export to PDF
  const exportToPDF = () => {
    const content = generatePDFContent();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${diaryData.studentDetails.name || 'Student'}_Diary.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Generate PDF content
  const generatePDFContent = () => {
    return `
      <html>
        <head>
          <title>Student Diary</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #059669; }
            h2 { color: #0891b2; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #059669; color: white; }
            .section { margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>Student Diary Report</h1>
          <div class="section">
            <h2>Student Details</h2>
            <p><strong>Name:</strong> ${diaryData.studentDetails.name}</p>
            <p><strong>NEMIS Number:</strong> ${diaryData.studentDetails.nemisNumber}</p>
            <p><strong>Class:</strong> ${diaryData.studentDetails.class}</p>
            <p><strong>School:</strong> ${diaryData.studentDetails.schoolName}</p>
          </div>
          <div class="section">
            <h2>Attendance Records</h2>
            ${diaryData.attendance.length > 0 ? `
              <table>
                <tr><th>Date</th><th>Status</th><th>Reason</th><th>Teacher</th></tr>
                ${diaryData.attendance.map(r => `
                  <tr>
                    <td>${r.date}</td>
                    <td>${r.present ? 'Present' : 'Absent'}</td>
                    <td>${r.reason}</td>
                    <td>${r.teacherName}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No attendance records</p>'}
          </div>
          <div class="section">
            <h2>Learning Progress</h2>
            ${diaryData.learningProgress.length > 0 ? `
              <table>
                <tr><th>Date</th><th>Subject</th><th>Topic</th><th>Grade</th><th>Comments</th></tr>
                ${diaryData.learningProgress.map(r => `
                  <tr>
                    <td>${r.date}</td>
                    <td>${r.subject}</td>
                    <td>${r.topic}</td>
                    <td>${r.grade}</td>
                    <td>${r.comments}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No learning progress records</p>'}
          </div>
          <div class="section">
            <h2>Homework</h2>
            ${diaryData.homework.length > 0 ? `
              <table>
                <tr><th>Date</th><th>Subject</th><th>Task</th><th>Due Date</th><th>Status</th></tr>
                ${diaryData.homework.map(r => `
                  <tr>
                    <td>${r.date}</td>
                    <td>${r.subject}</td>
                    <td>${r.task}</td>
                    <td>${r.dueDate}</td>
                    <td>${r.completed ? 'Completed' : 'Pending'}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No homework records</p>'}
          </div>
          <div class="section">
            <h2>Behaviour Records</h2>
            ${diaryData.behaviour.length > 0 ? `
              <table>
                <tr><th>Date</th><th>Incident</th><th>Type</th><th>Notes</th></tr>
                ${diaryData.behaviour.map(r => `
                  <tr>
                    <td>${r.date}</td>
                    <td>${r.incident}</td>
                    <td>${r.type}</td>
                    <td>${r.notes}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No behaviour records</p>'}
          </div>
          <div class="section">
            <h2>Teacher Notes</h2>
            ${diaryData.teacherNotes.length > 0 ? `
              <table>
                <tr><th>Date</th><th>Subject</th><th>Note</th><th>Teacher</th></tr>
                ${diaryData.teacherNotes.map(r => `
                  <tr>
                    <td>${r.date}</td>
                    <td>${r.subject}</td>
                    <td>${r.note}</td>
                    <td>${r.teacherName}</td>
                  </tr>
                `).join('')}
              </table>
            ` : '<p>No teacher notes</p>'}
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Diary</h1>
              <p className="text-gray-600">Complete student information in one table</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <div className={`px-4 py-2 rounded-lg font-medium ${
              isSaved
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {isSaved ? '✓ Saved' : 'Saving...'}
            </div>
          </div>
        </div>

        {/* Student Details Section */}
        <Card className="mb-6 p-6 border-emerald-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Student Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <Input
                value={diaryData.studentDetails.name}
                onChange={(e) => handleStudentDetailsChange('name', e.target.value)}
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NEMIS Number *
              </label>
              <Input
                value={diaryData.studentDetails.nemisNumber}
                onChange={(e) => handleStudentDetailsChange('nemisNumber', e.target.value)}
                placeholder="e.g., KE/2024/001234"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admission Number
              </label>
              <Input
                value={diaryData.studentDetails.admissionNumber}
                onChange={(e) => handleStudentDetailsChange('admissionNumber', e.target.value)}
                placeholder="e.g., ADM/2024/5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <Input
                value={diaryData.studentDetails.class}
                onChange={(e) => handleStudentDetailsChange('class', e.target.value)}
                placeholder="e.g., Grade 4 - Blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name
              </label>
              <Input
                value={diaryData.studentDetails.schoolName}
                onChange={(e) => handleStudentDetailsChange('schoolName', e.target.value)}
                placeholder="Enter school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term
              </label>
              <Input
                value={diaryData.studentDetails.term}
                onChange={(e) => handleStudentDetailsChange('term', e.target.value)}
                placeholder="Term 1"
              />
            </div>
          </div>
        </Card>

        {/* Attendance Table */}
        <Card className="mb-6 p-6 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Attendance Records</h2>
            <Button
              onClick={addAttendanceRecord}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-100 border-b-2 border-cyan-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Reason (if absent)</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Teacher Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {diaryData.attendance.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No attendance records yet. Click "Add Record" to get started.
                    </td>
                  </tr>
                ) : (
                  diaryData.attendance.map((record) => (
                    <tr key={record.id} className="border-b border-gray-200 hover:bg-cyan-50">
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={record.date}
                          onChange={(e) => updateAttendanceRecord(record.id, 'date', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={record.present ? 'Present' : 'Absent'}
                          onChange={(e) => updateAttendanceRecord(record.id, 'present', e.target.value === 'Present')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option>Present</option>
                          <option>Absent</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.reason}
                          onChange={(e) => updateAttendanceRecord(record.id, 'reason', e.target.value)}
                          placeholder="e.g., Sick"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.teacherName}
                          onChange={(e) => updateAttendanceRecord(record.id, 'teacherName', e.target.value)}
                          placeholder="Teacher name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteAttendanceRecord(record.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Learning Progress Table */}
        <Card className="mb-6 p-6 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
            <Button
              onClick={addLearningRecord}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Topic</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Grade</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Comments</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {diaryData.learningProgress.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No learning progress records yet. Click "Add Record" to get started.
                    </td>
                  </tr>
                ) : (
                  diaryData.learningProgress.map((record) => (
                    <tr key={record.id} className="border-b border-gray-200 hover:bg-emerald-50">
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={record.date}
                          onChange={(e) => updateLearningRecord(record.id, 'date', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.subject}
                          onChange={(e) => updateLearningRecord(record.id, 'subject', e.target.value)}
                          placeholder="e.g., Mathematics"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.topic}
                          onChange={(e) => updateLearningRecord(record.id, 'topic', e.target.value)}
                          placeholder="e.g., Fractions"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={record.grade}
                          onChange={(e) => updateLearningRecord(record.id, 'grade', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                          <option>D</option>
                          <option>E</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.comments}
                          onChange={(e) => updateLearningRecord(record.id, 'comments', e.target.value)}
                          placeholder="Comments"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteLearningRecord(record.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Homework Table */}
        <Card className="mb-6 p-6 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Homework</h2>
            <Button
              onClick={addHomeworkRecord}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-100 border-b-2 border-cyan-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Task</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Due Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Teacher</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {diaryData.homework.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No homework records yet. Click "Add Record" to get started.
                    </td>
                  </tr>
                ) : (
                  diaryData.homework.map((record) => (
                    <tr key={record.id} className="border-b border-gray-200 hover:bg-cyan-50">
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={record.date}
                          onChange={(e) => updateHomeworkRecord(record.id, 'date', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.subject}
                          onChange={(e) => updateHomeworkRecord(record.id, 'subject', e.target.value)}
                          placeholder="e.g., English"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.task}
                          onChange={(e) => updateHomeworkRecord(record.id, 'task', e.target.value)}
                          placeholder="Homework task"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={record.dueDate}
                          onChange={(e) => updateHomeworkRecord(record.id, 'dueDate', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={record.completed ? 'Completed' : 'Pending'}
                          onChange={(e) => updateHomeworkRecord(record.id, 'completed', e.target.value === 'Completed')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option>Pending</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.teacherName}
                          onChange={(e) => updateHomeworkRecord(record.id, 'teacherName', e.target.value)}
                          placeholder="Teacher name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteHomeworkRecord(record.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Behaviour Table */}
        <Card className="mb-6 p-6 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Behaviour Records</h2>
            <Button
              onClick={addBehaviourRecord}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Incident</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Teacher</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {diaryData.behaviour.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No behaviour records yet. Click "Add Record" to get started.
                    </td>
                  </tr>
                ) : (
                  diaryData.behaviour.map((record) => (
                    <tr key={record.id} className="border-b border-gray-200 hover:bg-emerald-50">
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={record.date}
                          onChange={(e) => updateBehaviourRecord(record.id, 'date', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.incident}
                          onChange={(e) => updateBehaviourRecord(record.id, 'incident', e.target.value)}
                          placeholder="Describe incident"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={record.type}
                          onChange={(e) => updateBehaviourRecord(record.id, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option>Positive</option>
                          <option>Negative</option>
                          <option>Neutral</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.notes}
                          onChange={(e) => updateBehaviourRecord(record.id, 'notes', e.target.value)}
                          placeholder="Additional notes"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={record.teacherName}
                          onChange={(e) => updateBehaviourRecord(record.id, 'teacherName', e.target.value)}
                          placeholder="Teacher name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteBehaviourRecord(record.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Teacher Notes Table */}
        <Card className="mb-6 p-6 border-cyan-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Teacher Notes</h2>
            <Button
              onClick={addTeacherNote}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-100 border-b-2 border-cyan-300">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Note</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Teacher</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {diaryData.teacherNotes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No teacher notes yet. Click "Add Note" to get started.
                    </td>
                  </tr>
                ) : (
                  diaryData.teacherNotes.map((note) => (
                    <tr key={note.id} className="border-b border-gray-200 hover:bg-cyan-50">
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={note.date}
                          onChange={(e) => updateTeacherNote(note.id, 'date', e.target.value)}
                          className="w-full"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={note.subject}
                          onChange={(e) => updateTeacherNote(note.id, 'subject', e.target.value)}
                          placeholder="e.g., Academic Progress"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Textarea
                          value={note.note}
                          onChange={(e) => updateTeacherNote(note.id, 'note', e.target.value)}
                          placeholder="Teacher note"
                          className="min-h-12"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          value={note.teacherName}
                          onChange={(e) => updateTeacherNote(note.id, 'teacherName', e.target.value)}
                          placeholder="Teacher name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteTeacherNote(note.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
