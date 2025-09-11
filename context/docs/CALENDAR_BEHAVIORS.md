# 📅 Calendar Component Behaviors

## 🎯 **Component Overview**

The **CalendarView** and **CalendarDay** components provide the visual training calendar that displays the complete 18-week training plan with intensity-based color-coding and chevron indicators.

### **Primary Functions**

- Display all training weeks and months with intensity highlighting
- Color-code days by training intensity (red→orange→blue→green→gray scale)
- Show chevron intensity indicators (»»» → »» → » → ZZZ)
- Display training information with detailed intensity classification
- Highlight current date and provide comprehensive training overview

---

## 🟢 **Color-Coding System**

### **Heroicon-Based Intensity Classification**

```typescript
import { ChevronDoubleUpIcon, ChevronUpIcon, MinusIcon } from '@heroicons/vue/24/outline'

type TrainingIntensity = 'maximum' | 'high' | 'moderate' | 'easy' | 'off'

// Heroicon indicators
const intensityIndicators = {
  maximum: ChevronDoubleUpIcon, // Race days - double chevron
  high: ChevronDoubleUpIcon, // Tempo, threshold - double chevron
  moderate: ChevronUpIcon, // Z2, endurance - single chevron
  easy: ChevronUpIcon, // Light, recovery - single chevron
  off: MinusIcon // Rest days - minus icon
}

// Color mapping by intensity
const intensityColors = {
  maximum: 'bg-red-50 text-red-900 border-l-4 border-red-300',
  high: 'bg-orange-50 text-orange-900 border-l-4 border-orange-300',
  moderate: 'bg-blue-50 text-blue-900 border-l-4 border-blue-300',
  easy: 'bg-green-50 text-green-900 border-l-4 border-green-300',
  off: 'bg-slate-50 text-slate-900 border-l-4 border-slate-300'
}
```

### **Visual Indicators**

- **Background Color**: Shows day type at a glance
- **Dot Indicator**: Small colored circle showing activity type
- **Today Highlight**: Amber border and text for current date
- **Race Day**: Red styling for competition days

---

## 📊 **Data Flow**

### **Calendar Data Structure**

```typescript
interface CalendarMonth {
  name: string // "septiembre 2025"
  year: number // 2025
  month: number // 8 (0-based)
  days: CalendarDay[]
}

interface CalendarDay {
  date: string // "2025-09-15"
  day: number // 15
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasTraining: boolean
  trainingDay?: {
    training: string
    isExercise: boolean
    isRaceDay: boolean
  }
}
```

### **Data Processing**

```typescript
// Build months from training plan
const months = computed(() => {
  const plan = trainingPlan.value
  const monthsArray = []

  // Generate all months from start to end date
  for (let current = startDate; current <= endDate; current.setMonth(current.getMonth() + 1)) {
    const month = buildMonth(current, plan)
    monthsArray.push(month)
  }

  return monthsArray
})

// Create individual calendar days
const createCalendarDay = (date, isCurrentMonth, today, plan) => {
  const dateString = date.toISOString().split('T')[0]
  const trainingDay = findTrainingDay(plan, dateString)

  return {
    date: dateString,
    day: date.getDate(),
    isCurrentMonth,
    isToday: dateString === today.toDateString(),
    hasTraining: !!trainingDay,
    trainingDay
  }
}
```

---

## 🎨 **Visual Layout**

### **Month Display Structure**

```
┌─ September 2025 ──────────────────────────────┐
│  Sun  Mon  Tue  Wed  Thu  Fri  Sat           │
│                                               │
│         1    2    3    4    5    6    7       │
│   8    9   10   11   12   13   14   15       │
│  16   17   18   19   20   21   22   23       │
│  24   25   26   27   28   29   30   31       │
│                                               │
│  [Legend] [Training Days] [Rest Days]        │
└───────────────────────────────────────────────┘
```

### **Day Cell Structure**

```
┌─────────┐
│   15    │ ← Day number
│   ●     │ ← Activity indicator (green/gray dot)
│  [Today]│ ← Today indicator (amber)
└─────────┘
```

---

## 🔄 **Component Interactions**

### **CalendarView Props**

```typescript
interface CalendarViewProps {
  trainingPlan: TrainingPlan | null
  selectedDate: string | null
  compact?: boolean
}
```

### **CalendarDay Props**

```typescript
interface CalendarDayProps {
  day: CalendarDay
  compact?: boolean
  dateMap?: Record<string, any>
  getEntryForDate?: (date: string) => any
}
```

### **Data Lookup Methods**

```typescript
// Fast lookup for training data
const dateMap = computed(() => {
  const map = {}
  trainingPlan.value.weeks.forEach(week => {
    week.rows.forEach(day => {
      map[day.date] = {
        training: day.training,
        isExercise: day.isExercise,
        isRaceDay: day.isRaceDay
      }
    })
  })
  return map
})

// Get entry for specific date
const getEntryForDate = dateString => {
  return dateMap.value[dateString] || null
}
```

---

## 🎯 **Behavior Logic**

### **Day Classification Logic**

```typescript
const getDayClassification = (day: CalendarDay) => {
  // Priority 1: Race days
  if (day.trainingDay?.isRaceDay) {
    return 'race'
  }

  // Priority 2: Exercise vs rest
  if (day.hasTraining && day.trainingDay?.isExercise) {
    return 'exercise'
  }

  if (day.hasTraining && !day.trainingDay?.isExercise) {
    return 'rest'
  }

  // Priority 3: Non-training days
  return 'off'
}
```

### **Color Application Logic**

```typescript
const applyDayStyling = (day: CalendarDay) => {
  const classification = getDayClassification(day)
  const baseStyles = 'relative p-2 text-sm rounded-md border border-transparent'

  // Apply classification-specific colors
  switch (classification) {
    case 'exercise':
      return `${baseStyles} bg-emerald-50 text-emerald-800 hover:bg-emerald-100`
    case 'rest':
      return `${baseStyles} bg-slate-50 text-slate-700 hover:bg-slate-100`
    case 'race':
      return `${baseStyles} bg-red-50 text-red-900 hover:bg-red-100`
    default:
      return `${baseStyles} text-gray-900 hover:bg-gray-50`
  }
}
```

---

## 📱 **Responsive Behavior**

### **Mobile Layout**

- Compact 7-column grid
- Smaller day cells
- Essential information only
- Touch-friendly sizing

### **Tablet Layout**

- Medium-sized grid
- More spacing
- Better readability
- Balanced information density

### **Desktop Layout**

- Full-sized grid
- Maximum information display
- Enhanced visual hierarchy
- Optimized for reference use

---

## 🎨 **Visual States**

### **Current Month Days**

- Full opacity and color
- Interactive hover states
- Complete information display
- Training indicators visible

### **Adjacent Month Days**

- Reduced opacity (60%)
- Muted colors
- Limited interactivity
- Contextual information only

### **Today Highlight**

- Amber border (`border-amber-400`)
- Bold text (`font-semibold`)
- Special today indicator dot
- Enhanced visibility

### **Selected Day**

- Yellow border (`border-amber-400`)
- Maintained day color background
- Visual selection feedback
- Current focus indication

---

## 🔍 **Information Display**

### **Tooltip Information**

```typescript
const getTooltipText = (day: CalendarDay) => {
  if (!day.isCurrentMonth) return ''

  const entry = getEntryForDate(day.date)

  if (entry) {
    return entry.training || 'Training scheduled'
  }

  if (day.trainingDay?.isExercise === false) {
    return 'Rest day - recovery and preparation'
  }

  if (day.hasTraining) {
    return 'Training day scheduled'
  }

  return 'No training scheduled'
}
```

### **Legend Information**

- **🟢 Green**: Exercise/Training Days
- **⚫ Gray**: Rest/Recovery Days
- **🔴 Red**: Race Days
- **🟡 Amber**: Today
- **🔵 Blue**: Selected Day

---

## ✅ **Quality Assurance**

### **Data Integrity Checks**

- [ ] All months display correctly
- [ ] Training days have complete information
- [ ] Color-coding matches training data
- [ ] Date ranges cover complete plan
- [ ] No missing or duplicate days

### **Visual Consistency**

- [ ] Color scheme applied uniformly
- [ ] Typography hierarchy maintained
- [ ] Responsive layout works across devices
- [ ] Legend information accurate
- [ ] Today/selected states visible

### **Performance Verification**

- [ ] Fast rendering of all months
- [ ] Efficient data lookup
- [ ] Smooth scrolling between months
- [ ] No memory leaks
- [ ] Optimized re-renders

---

## 📝 **Usage Guidelines**

### **Standard Usage**

```vue
<CalendarView :training-plan="currentTrainingPlan" :selected-date="selectedDate" :compact="false" />
```

### **Compact Display**

```vue
<CalendarView :training-plan="currentTrainingPlan" :selected-date="selectedDate" :compact="true" />
```

### **Custom Styling**

```vue
<CalendarView
  :training-plan="currentTrainingPlan"
  :selected-date="selectedDate"
  class="custom-calendar"
/>
```

---

**Component Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
