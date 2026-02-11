/**
 * Landing Page Component
 * Shows the diary cover and student details form
 * Users must enter student details before accessing the diary
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Eye, LogIn, User } from 'lucide-react';

interface LandingPageProps {
  onPreview: () => void;
  onOpenDiary: () => void;
}

interface StudentDetails {
  name: string;
  class: string;
  admissionNumber: string;
}

export function LandingPage({ onPreview, onOpenDiary }: LandingPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    name: '',
    class: '',
    admissionNumber: '',
  });
  const [errors, setErrors] = useState<Partial<StudentDetails>>({});

  // Check if student details already exist
  useEffect(() => {
    const savedDetails = localStorage.getItem('studentDetails');
    if (savedDetails) {
      setStudentDetails(JSON.parse(savedDetails));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentDetails> = {};
    
    if (!studentDetails.name.trim()) {
      newErrors.name = 'Student name is required';
    }
    if (!studentDetails.class.trim()) {
      newErrors.class = 'Class is required';
    }
    if (!studentDetails.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Admission number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem('studentDetails', JSON.stringify(studentDetails));
      // Open diary
      onOpenDiary();
    }
  };

  const handleInputChange = (field: keyof StudentDetails, value: string) => {
    setStudentDetails(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Student Details
            </h1>
            <p className="text-gray-600">
              Please enter your information to continue
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 shadow-xl border-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Student Name */}
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Student Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  value={studentDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Class */}
              <div>
                <Label htmlFor="class" className="text-gray-700 font-medium">
                  Class *
                </Label>
                <Input
                  id="class"
                  type="text"
                  placeholder="e.g., Form 1, Grade 5"
                  value={studentDetails.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  className={`mt-1 ${errors.class ? 'border-red-500' : ''}`}
                />
                {errors.class && (
                  <p className="text-red-500 text-sm mt-1">{errors.class}</p>
                )}
              </div>

              {/* Admission Number */}
              <div>
                <Label htmlFor="admissionNumber" className="text-gray-700 font-medium">
                  Admission Number *
                </Label>
                <Input
                  id="admissionNumber"
                  type="text"
                  placeholder="Enter admission number"
                  value={studentDetails.admissionNumber}
                  onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
                  className={`mt-1 ${errors.admissionNumber ? 'border-red-500' : ''}`}
                />
                {errors.admissionNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.admissionNumber}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Card>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your information is stored locally on your device</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-white flex items-center justify-center p-4">
      {/* Main container */}
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kenyan Student Diary
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Digital School Diary for Kenyan Schools
          </p>
          <p className="text-gray-500 mb-4">
            As easy as a paper diary, but more reliable
          </p>
          {/* Diary Motto */}
          <div className="mt-6 inline-block">
            <div className="px-8 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-2 border-emerald-500/30 rounded-full">
              <p className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                TRANSPARENCY
              </p>
            </div>
          </div>
        </div>

        {/* Diary Cover Card */}
        <Card className="mb-8 overflow-hidden shadow-2xl border-0">
          <div className="bg-gradient-to-br from-emerald-600 to-blue-700 p-12 text-white text-center">
            <div className="mb-6">
              <BookOpen className="w-16 h-16 mx-auto opacity-80" />
            </div>
            <h2 className="text-3xl font-bold uppercase">STUDENT DIARY</h2>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Preview Button */}
          <Button
            onClick={onPreview}
            variant="outline"
            size="lg"
            className="h-16 text-lg border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
          >
            <Eye className="w-5 h-5 mr-2" />
            Preview the Diary
          </Button>

          {/* Open Diary Button */}
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="h-16 text-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Open Student Diary
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            This app is designed for parents and teachers in Kenyan schools.
          </p>
          <p className="mt-2">
            Your data stays on your device. No login required to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
