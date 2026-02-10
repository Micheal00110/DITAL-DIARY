/**
 * Diary Preview Component
 * Shows a read-only sample diary with sample student data
 * Demonstrates what a completed diary looks like
 */

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download } from 'lucide-react';
import type { SampleDiaryData } from '@/lib/types';

interface DiaryPreviewProps {
  data: SampleDiaryData;
  onBack: () => void;
}

export function DiaryPreview({ data, onBack }: DiaryPreviewProps) {
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
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              SAMPLE / PREVIEW
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Diary Preview
            </h1>
            <p className="text-gray-600 mt-2">
              This is what a completed diary looks like
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Student Details Card */}
      <div className="max-w-6xl mx-auto mb-8">
        <Card className="p-6 bg-white border-l-4 border-l-emerald-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Student Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">NEMIS Number</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.nemisNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Admission Number</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.admissionNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.class}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">School Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.schoolName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Term & Year</p>
              <p className="text-lg font-semibold text-gray-900">
                {data.studentDetails.term} {data.studentDetails.year}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white border">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="homework">Homework</TabsTrigger>
            <TabsTrigger value="behaviour">Behaviour</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Attendance Record
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Reason
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Teacher
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.attendance.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-KE')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              record.present
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {record.present ? 'Present' : 'Absent'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {record.reason || '-'}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {record.teacherName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Learning Progress Tab */}
          <TabsContent value="learning">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Learning Progress (CBC)
              </h3>
              <div className="space-y-4">
                {data.learningProgress.map((progress) => (
                  <div
                    key={progress.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {progress.learningArea}
                        </p>
                        <p className="text-sm text-gray-600">
                          {progress.skill}
                        </p>
                      </div>
                      <Badge
                        className={
                          progress.progress === 'Good'
                            ? 'bg-green-100 text-green-800'
                            : progress.progress === 'Fair'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                        }
                      >
                        {progress.progress}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-3">
                      {progress.teacherComment}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Homework Tab */}
          <TabsContent value="homework">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Homework Record
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Subject
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Homework
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.homework.map((hw) => (
                      <tr key={hw.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-semibold text-gray-900">
                          {hw.subject}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {hw.homeworkGiven}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(hw.dueDate).toLocaleDateString('en-KE')}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              hw.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {hw.completed ? 'Completed' : 'Pending'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Behaviour Tab */}
          <TabsContent value="behaviour">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Behaviour Monitoring
              </h3>
              <div className="space-y-4">
                {data.behaviour.map((record) => (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-gray-900">
                        {new Date(record.date).toLocaleDateString('en-KE')}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-gray-600">Behaviour Observed:</p>
                        <p className="text-gray-900 font-medium">
                          {record.behaviourObserved}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Action Taken:</p>
                        <p className="text-gray-900 font-medium">
                          {record.actionTaken}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Teacher Comment:</p>
                        <p className="text-gray-900">{record.teacherComment}</p>
                      </div>
                      {record.parentComment && (
                        <div>
                          <p className="text-gray-600">Parent Comment:</p>
                          <p className="text-gray-900">
                            {record.parentComment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Teacher ↔ Parent Notes
              </h3>
              <div className="space-y-4">
                {data.teacherNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`border rounded-lg p-4 ${
                      note.from === 'teacher'
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-emerald-200 bg-emerald-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge
                          className={
                            note.from === 'teacher'
                              ? 'bg-blue-200 text-blue-800 mb-2'
                              : 'bg-emerald-200 text-emerald-800 mb-2'
                          }
                        >
                          {note.from === 'teacher' ? 'Teacher' : 'Parent'}
                        </Badge>
                        <p className="font-semibold text-gray-900">
                          {note.subject}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(note.date).toLocaleDateString('en-KE')}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700">{note.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Term Summary */}
        {data.termSummary && (
          <Card className="mt-8 p-6 bg-white border-l-4 border-l-blue-600">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Term Summary
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Academics
                </p>
                <p className="text-gray-700">{data.termSummary.academics}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Behaviour
                </p>
                <p className="text-gray-700">{data.termSummary.behaviour}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Attendance
                </p>
                <p className="text-gray-700">{data.termSummary.attendance}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Overall Remarks
                </p>
                <p className="text-gray-700">
                  {data.termSummary.overallRemarks}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
