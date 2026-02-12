# Quick Reference Guide - DITAL-DIARY Improvements

## 🎯 For Developers: How to Use the New Systems

### Using Constants
```tsx
import { 
  ERROR_MESSAGES, 
  STATUS_STYLES, 
  AUTO_SAVE_DELAY 
} from '@/lib/constants';

// Example: Error message
console.error(ERROR_MESSAGES.LOAD_DATA);

// Example: Styling
className={cn('px-2 py-1', isSaved ? STATUS_STYLES.SAVED : STATUS_STYLES.SAVING)}
```

### Using Enums
```tsx
import { DayOfWeek, ProgressLevel } from '@/lib/types/enums';

const entry: WeeklyScheduleEntry = {
  dayOfWeek: DayOfWeek.MONDAY,
  // ...
};

const progress: LearningProgress = {
  progress: ProgressLevel.GOOD,
  // ...
};
```

### Using Storage Utility
```tsx
import { getFromStorage, setToStorage } from '@/lib/storage';

// Get data (with fallback)
const data = getFromStorage<AcademicDiaryData>(
  'ACADEMIC_DIARY_DATA',
  defaultData
);

// Set data (returns boolean for success)
const success = setToStorage('ACADEMIC_DIARY_DATA', data);
if (!success) {
  console.error('Failed to save data');
}
```

### Using Error Boundary
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// Optional: Custom fallback UI
<ErrorBoundary fallback={<CustomError />}>
  <YourComponent />
</ErrorBoundary>

// Optional: Error callback
<ErrorBoundary onError={(error, info) => logToSentry(error, info)}>
  <YourComponent />
</ErrorBoundary>
```

### Using cn() for Styling
```tsx
import { cn } from '@/lib/utils';

// Good ✓
className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isError && 'border-red-500'
)}

// Avoid ✗
className={`px-4 py-2 rounded ${isActive ? 'bg-blue-500' : ''}`}
```

---

## 📦 File Organization Guide

| File | Purpose | Usage |
|------|---------|-------|
| `lib/constants.ts` | App configuration & messages | Import constants |
| `lib/types/enums.ts` | Enum definitions | Type-safe values |
| `lib/storage.ts` | Data persistence | Safe localStorage access |
| `components/ErrorBoundary.tsx` | Error catching | Wrap components |
| `lib/utils.ts` | CSS class merging | Style composition |

---

## ⚠️ Common Patterns to Avoid

### ❌ String Literals
```tsx
// Bad
const day = 'MON'; // Magic string
const progress = 'Good'; // String literal
```

### ✅ Use Enums
```tsx
// Good
const day = DayOfWeek.MONDAY;
const progress = ProgressLevel.GOOD;
```

### ❌ Direct localStorage
```tsx
// Bad
localStorage.getItem('data');
localStorage.setItem('key', JSON.stringify(data));
```

### ✅ Use Storage Utility
```tsx
// Good
getFromStorage<DataType>('KEY');
setToStorage('KEY', data);
```

### ❌ Template Literals for Styles
```tsx
// Bad
className={`px-2 ${error ? 'border-red-500' : ''} text-sm`}
```

### ✅ Use cn()
```tsx
// Good
className={cn('px-2 text-sm', error && 'border-red-500')}
```

---

## 🆘 Error Handling Best Practices

### Storage Operations
```tsx
const success = setToStorage('KEY', data);
if (!success) {
  setError(ERROR_MESSAGES.SAVE_DATA);
  // Show user feedback
}
```

### API-like Operations
```tsx
try {
  const result = await doSomething();
} catch (e) {
  const errorMsg = e instanceof Error ? e.message : 'Unknown error';
  setError(errorMsg);
  console.error('Operation failed:', e);
}
```

### User Confirmations
```tsx
const confirmed = window.confirm(ERROR_MESSAGES.CONFIRM_LOAD_SAMPLE);
if (confirmed) {
  // Perform action
}
```

---

## 🧪 Quick Testing Checklist

When making changes:

- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] Enums used instead of magic strings
- [ ] Constants imported from `lib/constants.ts`
- [ ] Storage operations use utility functions
- [ ] Error states handled with user feedback
- [ ] Styles use `cn()` utility, not template literals
- [ ] Components wrapped in ErrorBoundary where needed

---

## 📚 Where to Add New Features

| Feature Type | Location | Example |
|--------------|----------|---------|
| Configuration | `lib/constants.ts` | New API endpoint |
| Type Options | `lib/types/enums.ts` | New user role |
| Error Messages | `lib/constants.ts` | New error case |
| UI Utilities | `lib/utils.ts` | New helper function |
| Error Handling | `components/ErrorBoundary.tsx` | Custom error UI |

---

## 🔗 Import Cheatsheet

```tsx
// Constants
import { ERROR_MESSAGES, STATUS_STYLES, AUTO_SAVE_DELAY } from '@/lib/constants';

// Enums
import { DayOfWeek, ProgressLevel, CommunicationDirection } from '@/lib/types/enums';

// Storage
import { getFromStorage, setToStorage } from '@/lib/storage';

// Utilities
import { cn } from '@/lib/utils';

// Components
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Alert, AlertDescription } from '@/components/ui/alert';
```

---

## 🚀 Performance Tips

1. **Debounce Auto-Save**: Uses `AUTO_SAVE_DELAY` constant (1s)
2. **Fallback Defaults**: Always provide fallback in `getFromStorage()`
3. **Error Boundaries**: Prevent entire app from crashing
4. **Type Safety**: Catch errors at compile time, not runtime

---

**Last Updated:** February 12, 2026  
**Version:** 1.0
