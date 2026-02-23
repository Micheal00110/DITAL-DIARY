# Multiple Homework Transitions - Implementation Guide

## Overview
This guide documents **5 production-ready patterns** for transitioning between multiple homework items per day in the Digital Student Diary.

---

## Pattern 1: Carousel with Smooth Slide Transitions (RECOMMENDED)

**Best for:** Mobile-first, touch-friendly interfaces

### Implementation
```tsx
// Already implemented in HomeworkCarousel.tsx
// Features:
// - Slide left/right with ChevronLeft/ChevronRight buttons
// - Dot indicators for quick navigation
// - Framer Motion for smooth 0.2s transitions
// - Disabled state at boundaries

<HomeworkCarousel
  homeworks={dayHomeworks}
  editable={true}
  onAdd={handleAddHomework}
  onUpdate={handleUpdateHomework}
  onDelete={handleDeleteHomework}
  dayOfWeek="Monday"
/>
```

### Pros
- ✅ Intuitive for mobile users
- ✅ One homework visible at a time (focused editing)
- ✅ Smooth animations reduce cognitive load
- ✅ Dot indicators show total count

### Cons
- ❌ Can't see all homeworks at once
- ❌ Requires navigation to compare items

---

## Pattern 2: Tabbed Interface

**Best for:** Desktop-first, quick switching between subjects

### Implementation
```tsx
'use client';
import { useState } from 'react';
import { motion } from 'motion/react';

export function HomeworkTabs({ homeworks, editable, onUpdate, onDelete, onAdd }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-4">
      {/* Tab Headers */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
        {homeworks.map((hw, idx) => (
          <button
            key={hw.id}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === idx
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {hw.subject}
          </button>
        ))}
        {editable && onAdd && (
          <button
            onClick={onAdd}
            className="px-4 py-2 text-emerald-600 font-bold text-sm hover:bg-emerald-50 rounded-lg"
          >
            + Add
          </button>
        )}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className="p-4 bg-white rounded-lg border border-slate-100"
      >
        {/* Render homework details */}
      </motion.div>
    </div>
  );
}
```

### Pros
- ✅ All subjects visible at once
- ✅ Fast switching between tabs
- ✅ Desktop-friendly layout
- ✅ Clear visual hierarchy

### Cons
- ❌ Tabs can overflow on mobile
- ❌ More screen real estate needed

---

## Pattern 3: Accordion (Collapsible List)

**Best for:** Viewing all homeworks with selective expansion

### Implementation
```tsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function HomeworkAccordion({ homeworks, editable, onUpdate, onDelete, onAdd }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([homeworks[0]?.id]));

  const toggle = (id: string) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  return (
    <div className="space-y-2">
      {homeworks.map((hw) => (
        <div key={hw.id} className="border border-slate-200 rounded-lg overflow-hidden">
          {/* Header */}
          <button
            onClick={() => toggle(hw.id)}
            className="w-full px-4 py-3 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-800">{hw.subject}</span>
              <span className="text-xs text-slate-500">{hw.dueDate || 'No due date'}</span>
            </div>
            <motion.div
              animate={{ rotate: expanded.has(hw.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </motion.div>
          </button>

          {/* Content */}
          <AnimatePresence>
            {expanded.has(hw.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 bg-white border-t border-slate-200 space-y-3"
              >
                {/* Homework details */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {editable && onAdd && (
        <button onClick={onAdd} className="w-full py-2 text-emerald-600 font-bold">
          + Add Homework
        </button>
      )}
    </div>
  );
}
```

### Pros
- ✅ See all homeworks at once
- ✅ Expand only what you need
- ✅ Mobile-friendly
- ✅ Smooth height animations

### Cons
- ❌ Can become long if many homeworks
- ❌ Requires scrolling to see all

---

## Pattern 4: Grid/Card Layout

**Best for:** Visual overview of all homeworks

### Implementation
```tsx
'use client';
import { motion } from 'motion/react';

export function HomeworkGrid({ homeworks, editable, onUpdate, onDelete, onAdd }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeworks.map((hw, idx) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-slate-800">{hw.subject}</h4>
              {editable && (
                <button onClick={() => onDelete?.(hw.id)} className="text-red-500 hover:text-red-700">
                  ✕
                </button>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-2">{hw.description}</p>
            <div className="text-xs text-slate-500">
              Due: {hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : 'Not set'}
            </div>
          </motion.div>
        ))}
      </div>

      {editable && onAdd && (
        <button onClick={onAdd} className="w-full py-3 border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 font-bold hover:bg-emerald-50">
          + Add Homework
        </button>
      )}
    </div>
  );
}
```

### Pros
- ✅ Visual overview of all items
- ✅ Responsive grid layout
- ✅ Easy to scan
- ✅ Good for quick comparison

### Cons
- ❌ Limited space for descriptions
- ❌ Can be overwhelming with many items

---

## Pattern 5: Stacked List with Inline Editing

**Best for:** Rapid data entry and editing

### Implementation
```tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function HomeworkList({ homeworks, editable, onUpdate, onDelete, onAdd }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {homeworks.map((hw, idx) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: idx * 0.05 }}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            {editingId === hw.id ? (
              // Edit Mode
              <div className="space-y-2">
                <input
                  autoFocus
                  value={hw.subject}
                  onChange={(e) => onUpdate?.(hw.id, 'subject', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm font-bold"
                />
                <textarea
                  value={hw.description}
                  onChange={(e) => onUpdate?.(hw.id, 'description', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-sm min-h-[60px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-slate-300 text-slate-700 rounded text-xs font-bold hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div
                onClick={() => editable && setEditingId(hw.id)}
                className={`cursor-pointer ${editable ? 'hover:bg-slate-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{hw.subject}</h4>
                    <p className="text-sm text-slate-600">{hw.description}</p>
                    <p className="text-xs text-slate-500 mt-1">Due: {hw.dueDate || 'Not set'}</p>
                  </div>
                  {editable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(hw.id);
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {editable && onAdd && (
        <button onClick={onAdd} className="w-full py-2 text-emerald-600 font-bold text-sm hover:bg-emerald-50 rounded">
          + Add Homework
        </button>
      )}
    </div>
  );
}
```

### Pros
- ✅ Compact, space-efficient
- ✅ Inline editing without modal
- ✅ Fast data entry
- ✅ Mobile-friendly

### Cons
- ❌ Limited visual hierarchy
- ❌ Can feel cramped with long descriptions

---

## Integration with WeeklyDiaryLayout

To use any of these patterns, update WeeklyDiaryLayout:

```tsx
import { HomeworkCarousel } from '@/components/diary/HomeworkCarousel';

// In the day rendering section:
<div className="space-y-4">
  <HomeworkCarousel
    homeworks={dayData.homeworks || []}
    editable={editable}
    onAdd={() => handleAddHomework(dayKey)}
    onUpdate={(id, field, value) => handleUpdateHomework(dayKey, id, field, value)}
    onDelete={(id) => handleDeleteHomework(dayKey, id)}
    dayOfWeek={dayName}
  />
</div>
```

---

## Data Model Migration

### Before (Single Homework)
```typescript
interface WeeklyScheduleEntry {
  homework: string; // "Exercise 4.2, Page 156, Questions 1-10"
}
```

### After (Multiple Homeworks)
```typescript
interface WeeklyScheduleEntry {
  homework: string; // Keep for backward compatibility
  homeworks?: HomeworkItem[]; // New field
}

interface HomeworkItem {
  id: string;
  subject: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
  parentSeen?: boolean;
}
```

---

## Performance Considerations

| Pattern | Render Count | Animation Cost | Memory | Best For |
|---------|-------------|-----------------|--------|----------|
| Carousel | 1 item | Low (slide) | Low | Mobile |
| Tabs | All items | Low (fade) | Medium | Desktop |
| Accordion | All items | Medium (height) | Medium | Mixed |
| Grid | All items | Medium (scale) | Medium | Visual |
| List | All items | Low (fade) | Low | Data entry |

---

## Accessibility Guidelines

1. **Keyboard Navigation**: Support arrow keys for carousel/tabs
2. **ARIA Labels**: Add `aria-label` to buttons and regions
3. **Focus Management**: Trap focus in modals, restore on close
4. **Screen Readers**: Announce "Homework 1 of 3" for carousel
5. **Color Contrast**: Ensure 4.5:1 ratio for text

---

## Recommended Implementation Path

1. **Phase 1**: Use **Carousel** (Pattern 1) for mobile-first MVP
2. **Phase 2**: Add **Tabs** (Pattern 2) for desktop breakpoint
3. **Phase 3**: Offer user preference toggle between patterns
4. **Phase 4**: Add **Accordion** (Pattern 3) as alternative view

---

## Code Examples: Complete Integration

See `HomeworkCarousel.tsx` for the recommended Pattern 1 implementation.

To use other patterns, copy the code snippets above into separate component files:
- `HomeworkTabs.tsx`
- `HomeworkAccordion.tsx`
- `HomeworkGrid.tsx`
- `HomeworkList.tsx`

Then import and use in WeeklyDiaryLayout based on your needs.
