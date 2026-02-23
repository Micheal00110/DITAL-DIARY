// Consistent Color Palette for Kenyan Student Diary
export const COLORS = {
  // Primary Brand Colors
  primary: {
    blue: '#104e8b',      // Deep blue for headers and main text
    lightBlue: '#5cc5f2',   // Light blue for accents
    yellow: '#FEF3C7',      // Soft yellow for backgrounds
    yellowBorder: '#F59E0B',  // Yellow for borders
  },
  
  // Text Colors
  text: {
    primary: '#1e3a8a',     // Dark blue for main text
    secondary: '#374151',    // Gray for secondary text
    muted: '#6B7280',       // Light gray for muted text
    white: '#FFFFFF',         // White text
    black: '#000000',        // Black text
  },
  
  // Background Colors
  bg: {
    primary: '#FFFFFF',       // White main background
    secondary: '#F9FAFB',   // Light gray background
    accent: '#EFF6FF',      // Light blue accent
    yellow: '#FEF3C7',      // Yellow background
    gray: '#F3F4F6',       // Gray background
  },
  
  // Border Colors
  border: {
    primary: '#104e8b',      // Primary blue border
    secondary: '#D1D5DB',    // Light gray border
    accent: '#5cc5f2',      // Light blue accent border
    dotted: '#D1D5DB80',    // Dotted border with transparency
  },
  
  // Status Colors
  status: {
    success: '#10B981',      // Green for success
    warning: '#F59E0B',      // Yellow for warning
    error: '#EF4444',        // Red for error
    info: '#3B82F6',         // Blue for info
  },
  
  // Button Colors
  button: {
    primary: 'from-emerald-600 to-blue-600',
    primaryHover: 'from-emerald-700 to-blue-700',
    secondary: 'bg-gray-100 hover:bg-gray-200',
    danger: 'bg-red-600 hover:bg-red-700',
  }
} as const;

// Consistent Font System
export const FONTS = {
  // Font Families
  family: {
    primary: 'font-sans',           // Main font family
    heading: 'font-[900]',         // Bold headings
    body: 'font-normal',           // Regular body text
    mono: 'font-mono',            // Monospace for codes
  },
  
  // Font Sizes
  size: {
    xs: 'text-[10px]',           // Extra small text
    sm: 'text-[12px]',           // Small text
    base: 'text-[14px]',         // Base text size
    lg: 'text-[16px]',           // Large text
    xl: 'text-[18px]',           // Extra large text
    '2xl': 'text-[20px]',       // 2X large
    '3xl': 'text-[24px]',       // 3X large
    '4xl': 'text-[32px]',       // 4X large
    '5xl': 'text-[40px]',       // 5X large
  },
  
  // Font Weights
  weight: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-[900]',
  },
  
  // Responsive Font Sizes
  responsive: {
    xs: 'text-[10px] sm:text-[11px]',
    sm: 'text-[11px] sm:text-[12px]',
    base: 'text-[12px] sm:text-[14px]',
    lg: 'text-[14px] sm:text-[16px]',
    xl: 'text-[16px] sm:text-[18px]',
    '2xl': 'text-[18px] sm:text-[20px]',
    '3xl': 'text-[20px] sm:text-[24px]',
    heading: 'text-lg sm:text-xl font-[900]',
  }
} as const;

// Consistent Spacing
export const SPACING = {
  // Padding
  padding: {
    xs: 'p-1 sm:p-2',
    sm: 'p-2 sm:p-3',
    md: 'p-3 sm:p-4',
    lg: 'p-4 sm:p-6',
    xl: 'p-6 sm:p-8',
  },
  
  // Margin
  margin: {
    xs: 'm-1 sm:m-2',
    sm: 'm-2 sm:m-3',
    md: 'm-3 sm:m-4',
    lg: 'm-4 sm:m-6',
    xl: 'm-6 sm:m-8',
  },
  
  // Gap
  gap: {
    xs: 'gap-1 sm:gap-2',
    sm: 'gap-2 sm:gap-3',
    md: 'gap-3 sm:gap-4',
    lg: 'gap-4 sm:gap-6',
    xl: 'gap-6 sm:gap-8',
  }
} as const;

// Utility Classes for Consistent Styling
export const UTILS = {
  // Text utilities
  text: {
    primary: `text-[${COLORS.text.primary}]`,
    secondary: `text-[${COLORS.text.secondary}]`,
    muted: `text-[${COLORS.text.muted}]`,
    white: `text-[${COLORS.text.white}]`,
    uppercase: 'uppercase tracking-wide',
    italic: 'italic',
  },
  
  // Background utilities
  bg: {
    primary: `bg-[${COLORS.bg.primary}]`,
    secondary: `bg-[${COLORS.bg.secondary}]`,
    accent: `bg-[${COLORS.bg.accent}]`,
    yellow: `bg-[${COLORS.bg.yellow}]`,
  },
  
  // Border utilities
  border: {
    primary: `border-[${COLORS.border.primary}]`,
    secondary: `border-[${COLORS.border.secondary}]`,
    dotted: `border-b-2 border-dotted border-[${COLORS.border.dotted}]`,
  }
} as const;
