/**
 * Diary Editor Component
 * Main interface for editing student diary
 * Includes all sections: Student Details, Attendance, Learning Progress, etc.
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    setDiaryData((prev) => ({
      ...prev,
      studentDetails: {
        ...prev.studentDetails,
        [field]: value,
      },
    }));
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
    setDiaryData((prev) => ({
      ...prev,
      attendance: [...prev.attendance, newRecord],
    }));
    setIsSaved(false);
  };

  // Update attendance record
  const updateAttendanceRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => ({
      ...prev,
      attendance: prev.attendance.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      ),
    }));
    setIsSaved(false);
  };

  // Delete attendance record
  const deleteAttendanceRecord = (id: string) => {
    setDiaryData((prev) => ({
      ...prev,
      attendance: prev.attendance.filter((record) => record.id !== id),
    }));
    setIsSaved(false);
  };

  // Add new learning progress record
  const addLearningProgress = () => {
    const newRecord = {
      id: Date.now().toString(),
      learningArea: '',
      skill: '',
      progress: 'Fair' as const,
      teacherComment: '',
    };
    setDiaryData((prev) => ({
      ...prev,
      learningProgress: [...prev.learningProgress, newRecord],
    }));
    setIsSaved(false);
  };

  // Update learning progress record
  const updateLearningProgress = (id: string, field: string, value: any) => {
    setDiaryData((prev) => ({
      ...prev,
      learningProgress: prev.learningProgress.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      ),
    }));
    setIsSaved(false);
  };

  // Delete learning progress record
  const deleteLearningProgress = (id: string) => {
    setDiaryData((prev) => ({
      ...prev,
      learningProgress: prev.learningProgress.filter(
        (record) => record.id !== id
      ),
    }));
    setIsSaved(false);
  };

  // Add new homework record
  const addHomeworkRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      subject: '',
      homeworkGiven: '',
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      parentSignature: false,
    };
    setDiaryData((prev) => ({
      ...prev,
      homework: [...prev.homework, newRecord],
    }));
    setIsSaved(false);
  };

  // Update homework record
  const updateHomeworkRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => ({
      ...prev,
      homework: prev.homework.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      ),
    }));
    setIsSaved(false);
  };

  // Delete homework record
  const deleteHomeworkRecord = (id: string) => {
    setDiaryData((prev) => ({
      ...prev,
      homework: prev.homework.filter((record) => record.id !== id),
    }));
    setIsSaved(false);
  };

  // Add new behaviour record
  const addBehaviourRecord = () => {
    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      behaviourObserved: '',
      actionTaken: '',
      teacherComment: '',
      parentComment: '',
    };
    setDiaryData((prev) => ({
      ...prev,
      behaviour: [...prev.behaviour, newRecord],
    }));
    setIsSaved(false);
  };

  // Update behaviour record
  const updateBehaviourRecord = (id: string, field: string, value: any) => {
    setDiaryData((prev) => ({
      ...prev,
      behaviour: prev.behaviour.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      ),
    }));
    setIsSaved(false);
  };

  // Delete behaviour record
  const deleteBehaviourRecord = (id: string) => {
    setDiaryData((prev) => ({
      ...prev,
      behaviour: prev.behaviour.filter((record) => record.id !== id),
    }));
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-emerald-700 hover:bg-emerald-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Diary
            </h1>
            <p className="text-gray-600 mt-2">
              {diaryData.studentDetails.name || 'Enter student details to get started'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              {isSaved ? 'Saved' : 'Saving...'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white border">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="homework">Homework</TabsTrigger>
            <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Student Details Tab */}
          <TabsContent value="details">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Student Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student Name *
                  </label>
                  <Input
                    value={diaryData.studentDetails.name}
                    onChange={(e) =>
                      handleStudentDetailsChange('name', e.target.value)
                    }
                    placeholder="Enter student name"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NEMIS Number *
                  </label>
                  <Input
                    value={diaryData.studentDetails.nemisNumber}
                    onChange={(e) =>
                      handleStudentDetailsChange('nemisNumber', e.target.value)
                    }
                    placeholder="e.g., KE/2024/001234"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Admission Number
                  </label>
                  <Input
                    value={diaryData.studentDetails.admissionNumber}
                    onChange={(e) =>
                      handleStudentDetailsChange('admissionNumber', e.target.value)
                    }
                    placeholder="e.g., ADM/2024/5678"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Class
                  </label>
                  <Input
                    value={diaryData.studentDetails.class}
                    onChange={(e) =>
                      handleStudentDetailsChange('class', e.target.value)
                    }
                    placeholder="e.g., Grade 4 - Blue"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    School Name
                  </label>
                  <Input
                    value={diaryData.studentDetails.schoolName}
                    onChange={(e) =>
                      handleStudentDetailsChange('schoolName', e.target.value)
                    }
                    placeholder="Enter school name"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Term
                  </label>
                  <Input
                    value={diaryData.studentDetails.term}
                    onChange={(e) =>
                      handleStudentDetailsChange('term', e.target.value)
                    }
                    placeholder="e.g., Term 1"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card className="p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Attendance Record
                </h3>
                <Button
                  onClick={addAttendanceRecord}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Record
                </Button>
              </div>

              {diaryData.attendance.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No attendance records yet. Click "Add Record" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {diaryData.attendance.map((record) => (
                    <div
                      key={record.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date
                          </label>
                          <Input
                            type="date"
                            value={record.date}
                            onChange={(e) =>
                              updateAttendanceRecord(record.id, 'date', e.target.value)
                            }
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={record.present ? 'present' : 'absent'}
                            onChange={(e) =>
                              updateAttendanceRecord(
                                record.id,
                                'present',
                                e.target.value === 'present'
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Reason (if absent)
                          </label>
                          <Input
                            value={record.reason || ''}
                            onChange={(e) =>
                              updateAttendanceRecord(record.id, 'reason', e.target.value)
                            }
                            placeholder="e.g., Sick"
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Teacher Name
                          </label>
                          <Input
                            value={record.teacherName}
                            onChange={(e) =>
                              updateAttendanceRecord(
                                record.id,
                                'teacherName',
                                e.target.value
                              )
                            }
                            placeholder="Teacher name"
                            className="border-gray-300"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteAttendanceRecord(record.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Learning Progress Tab */}
          <TabsContent value="learning">
            <Card className="p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Learning Progress (CBC)
                </h3>
                <Button
                  onClick={addLearningProgress}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Progress
                </Button>
              </div>

              {diaryData.learningProgress.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No learning progress records yet. Click "Add Progress" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {diaryData.learningProgress.map((progress) => (
                    <div
                      key={progress.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Learning Area
                          </label>
                          <Input
                            value={progress.learningArea}
                            onChange={(e) =>
                              updateLearningProgress(
                                progress.id,
                                'learningArea',
                                e.target.value
                              )
                            }
                            placeholder="e.g., Literacy and Language"
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Skill
                          </label>
                          <Input
                            value={progress.skill}
                            onChange={(e) =>
                              updateLearningProgress(progress.id, 'skill', e.target.value)
                            }
                            placeholder="e.g., Reading Comprehension"
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Progress Level
                          </label>
                          <select
                            value={progress.progress}
                            onChange={(e) =>
                              updateLearningProgress(
                                progress.id,
                                'progress',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Needs Support">Needs Support</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Teacher Comment
                        </label>
                        <Textarea
                          value={progress.teacherComment}
                          onChange={(e) =>
                            updateLearningProgress(
                              progress.id,
                              'teacherComment',
                              e.target.value
                            )
                          }
                          placeholder="Enter teacher comment"
                          className="border-gray-300"
                          rows={3}
                        />
                      </div>
                      <Button
                        onClick={() => deleteLearningProgress(progress.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Homework Tab */}
          <TabsContent value="homework">
            <Card className="p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Homework Record
                </h3>
                <Button
                  onClick={addHomeworkRecord}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Homework
                </Button>
              </div>

              {diaryData.homework.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No homework records yet. Click "Add Homework" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {diaryData.homework.map((hw) => (
                    <div
                      key={hw.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Subject
                          </label>
                          <Input
                            value={hw.subject}
                            onChange={(e) =>
                              updateHomeworkRecord(hw.id, 'subject', e.target.value)
                            }
                            placeholder="e.g., Mathematics"
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Due Date
                          </label>
                          <Input
                            type="date"
                            value={hw.dueDate}
                            onChange={(e) =>
                              updateHomeworkRecord(hw.id, 'dueDate', e.target.value)
                            }
                            className="border-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            value={hw.completed ? 'completed' : 'pending'}
                            onChange={(e) =>
                              updateHomeworkRecord(
                                hw.id,
                                'completed',
                                e.target.value === 'completed'
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Homework Given
                        </label>
                        <Textarea
                          value={hw.homeworkGiven}
                          onChange={(e) =>
                            updateHomeworkRecord(hw.id, 'homeworkGiven', e.target.value)
                          }
                          placeholder="Describe the homework"
                          className="border-gray-300"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={hw.parentSignature}
                            onChange={(e) =>
                              updateHomeworkRecord(
                                hw.id,
                                'parentSignature',
                                e.target.checked
                              )
                            }
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-700">
                            Parent Signature
                          </span>
                        </label>
                      </div>
                      <Button
                        onClick={() => deleteHomeworkRecord(hw.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Behaviour Tab */}
          <TabsContent value="behaviour">
            <Card className="p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Behaviour Monitoring
                </h3>
                <Button
                  onClick={addBehaviourRecord}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Record
                </Button>
              </div>

              {diaryData.behaviour.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No behaviour records yet. Click "Add Record" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {diaryData.behaviour.map((record) => (
                    <div
                      key={record.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={record.date}
                          onChange={(e) =>
                            updateBehaviourRecord(record.id, 'date', e.target.value)
                          }
                          className="border-gray-300"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Behaviour Observed
                        </label>
                        <Textarea
                          value={record.behaviourObserved}
                          onChange={(e) =>
                            updateBehaviourRecord(
                              record.id,
                              'behaviourObserved',
                              e.target.value
                            )
                          }
                          placeholder="Describe the behaviour"
                          className="border-gray-300"
                          rows={2}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Action Taken
                        </label>
                        <Textarea
                          value={record.actionTaken}
                          onChange={(e) =>
                            updateBehaviourRecord(record.id, 'actionTaken', e.target.value)
                          }
                          placeholder="Describe the action taken"
                          className="border-gray-300"
                          rows={2}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Teacher Comment
                        </label>
                        <Textarea
                          value={record.teacherComment}
                          onChange={(e) =>
                            updateBehaviourRecord(
                              record.id,
                              'teacherComment',
                              e.target.value
                            )
                          }
                          placeholder="Teacher comment"
                          className="border-gray-300"
                          rows={2}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Parent Comment
                        </label>
                        <Textarea
                          value={record.parentComment || ''}
                          onChange={(e) =>
                            updateBehaviourRecord(
                              record.id,
                              'parentComment',
                              e.target.value
                            )
                          }
                          placeholder="Parent comment (optional)"
                          className="border-gray-300"
                          rows={2}
                        />
                      </div>
                      <Button
                        onClick={() => deleteBehaviourRecord(record.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Teacher ↔ Parent Notes
              </h3>
              <p className="text-gray-600 text-center py-8">
                Notes feature coming soon. This will allow structured communication between teachers and parents.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
