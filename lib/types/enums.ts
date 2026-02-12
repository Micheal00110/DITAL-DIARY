/**
 * Enums for type-safe constants
 */

/**
 * Days of the week abbreviations
 */
export enum DayOfWeek {
  MONDAY = 'MON',
  TUESDAY = 'TUE',
  WEDNESDAY = 'WED',
  THURSDAY = 'THU',
  FRIDAY = 'FRI',
  SATURDAY = 'SAT',
  SUNDAY = 'SUN',
}

/**
 * Full day names for display
 */
export enum DayNameFull {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

/**
 * Learning progress levels (CBC - Competency Based Curriculum)
 */
export enum ProgressLevel {
  GOOD = 'Good',
  FAIR = 'Fair',
  NEEDS_SUPPORT = 'Needs Support',
}

/**
 * Communication directions
 */
export enum CommunicationDirection {
  TEACHER = 'teacher',
  PARENT = 'parent',
}

/**
 * Term identifiers
 */
export enum Term {
  TERM_1 = 'TERM 1',
  TERM_2 = 'TERM 2',
  TERM_3 = 'TERM 3',
}

/**
 * User roles
 */
export enum UserRole {
  STUDENT = 'student',
  PARENT = 'parent',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

/**
 * Map from abbreviated day to full day name
 */
export const DAY_ABBREVIATION_TO_FULL: Record<DayOfWeek, DayNameFull> = {
  [DayOfWeek.MONDAY]: DayNameFull.MONDAY,
  [DayOfWeek.TUESDAY]: DayNameFull.TUESDAY,
  [DayOfWeek.WEDNESDAY]: DayNameFull.WEDNESDAY,
  [DayOfWeek.THURSDAY]: DayNameFull.THURSDAY,
  [DayOfWeek.FRIDAY]: DayNameFull.FRIDAY,
  [DayOfWeek.SATURDAY]: DayNameFull.SATURDAY,
  [DayOfWeek.SUNDAY]: DayNameFull.SUNDAY,
};
