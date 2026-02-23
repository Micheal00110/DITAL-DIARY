/**
 * Application-wide constants
 * Centralized configuration for colors, strings, and other constants
 */

// Storage keys
export const STORAGE_KEYS = {
  ACADEMIC_DIARY_DATA: 'academicDiaryData',
  USER_PREFERENCES: 'userPreferences',
} as const;

// Auto-save delay in milliseconds
export const AUTO_SAVE_DELAY = 1000;

// Default school details
export const DEFAULT_SCHOOL_DETAILS = {
  name: 'MY SCHOOL NAME',
  address: 'P.O. BOX 00000, CITY',
  phone: '000-000000',
  email: 'info@myschool.ac.ke',
} as const;

// Default student details
export const DEFAULT_STUDENT_DETAILS = {
  id: '1',
  name: '',
  nemisNumber: '',
  admissionNumber: '',
  class: '',
  schoolName: '',
  term: 'Term One',
  year: 2026,
  photo: '', // Optional photo URL
} as const;

// Status indicator styles
export const STATUS_STYLES = {
  SAVED: 'bg-green-100 text-green-700',
  SAVING: 'bg-yellow-100 text-yellow-700',
} as const;

// Status indicator text
export const STATUS_TEXT = {
  SAVED: '✓ Saved',
  SAVING: 'Saving...',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  LOAD_DATA: 'Error loading diary data. Using defaults.',
  SAVE_DATA: 'Error saving diary data.',
  STORAGE_UNAVAILABLE: 'Storage is not available. Changes may not persist.',
  CONFIRM_LOAD_SAMPLE: 'Load sample data? This will overwrite your current entries.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAMPLE_DATA_LOADED: 'Sample data loaded successfully!',
  DATA_SAVED: 'Data saved successfully!',
  PDF_EXPORTED: 'Preparing PDF for download...',
} as const;

// Toast/notification durations (in milliseconds)
export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
} as const;

// Form-related constants
export const FORM_CONSTRAINTS = {
  MAX_NAME_LENGTH: 100,
  MAX_CLASS_LENGTH: 50,
  MAX_SUBJECT_LENGTH: 50,
  MAX_COMMENT_LENGTH: 500,
} as const;

// Print-related constants
export const PRINT_CONFIG = {
  HIDE_DURING_PRINT: 'print:hidden',
  SHOW_DURING_PRINT: 'print:block',
} as const;
