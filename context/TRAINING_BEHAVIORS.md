# 🏋️ Training Plan Display Behaviors

## 🎯 **Component Overview**

The **TrainingPlanView** and **TrainingWeek** components provide the detailed training schedule display, showing day-by-day training activities, nutrition guidance, and weekly progression through the 16-week training plan.

### **Primary Functions**
- Display complete weekly training schedules
- Show daily training activities and intensity
- Provide nutrition guidance for each day
- Track training phase progression
- Display rest and recovery days clearly

---

## 📊 **Weekly Structure Display**

### **Week Display Layout**
```
┌─ Week 5 (Sep 22–28) - Continued build ──────────────┐
│  Build Phase • Week 5 of 16                          │
│                                                     │
│  Mon Sep 22 │ Off + mobility                         │
│             │ Protein focus                         │
│             │ 2100 kcal                             │
│                                                     │
│  Tue Sep 23 │ Stairs 40–45 min + Gym Lower          │
│             │ Carbs pre/post gym                    │
│             │ 2300 kcal                             │
│                                                     │
│  Wed Sep 24 │ Easy 35–45 min Z2 run-walk + Gym      │
│             │ Balanced                              │
│             │ 2300 kcal                             │
│                                                     │
│  [Daily training cards continue...]                 │
│                                                     │
│  Progress: 31% complete • Race: Dec 1, 2025        │
└─────────────────────────────────────────────────────┘
```

### **Daily Training Card Structure**
```
┌─ Monday, September 22 ──────────────────────────────┐
│  🏃 Off + mobility                                  │
│                                                     │
│  📝 Protein focus                                   │
│  🔥 2100 kcal                                       │
│                                                     │
│  💧 Hydration: 2.5L fluids, 1500mg sodium          │
│                                                     │
│  ✅ Recovery nutrition                              │
│     Maintain adequate protein intake                │
│     Support overall health and wellness             │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 **Visual Design System**

### **Color Coding by Training Type**
- **Exercise Days**: Green accents (`emerald-500`, `emerald-50`)
- **Rest Days**: Gray accents (`slate-500`, `slate-50`)
- **Race Days**: Red accents (`red-500`, `red-50`)
- **Today**: Amber highlights (`amber-500`)

### **Training Intensity Indicators**
- **High Intensity**: Bold text, enhanced colors
- **Moderate Intensity**: Standard text, normal colors
- **Low Intensity**: Light text, muted colors
- **Recovery**: Soft colors, recovery-focused messaging

### **Phase Progression Visuals**
- **Base Phase**: Blue theme (`blue-500`)
- **Build Phase**: Green theme (`emerald-500`)
- **Peak Phase**: Orange theme (`orange-500`)
- **Taper Phase**: Purple theme (`purple-500`)
- **Race Phase**: Red theme (`red-500`)

---

## 📋 **Training Information Display**

### **Training Activity Details**
```typescript
interface TrainingDisplay {
  // Activity type identification
  type: 'gym' | 'run' | 'stairs' | 'rest' | 'race';

  // Activity description
  title: string;           // "Stairs 40–45 min + Gym Lower"
  description: string;     // "Carbs pre/post gym"

  // Training metrics
  duration?: string;       // "45–60 min"
  intensity?: string;      // "Z2", "Tempo", "Easy"
  load?: string;          // "Heavy", "Moderate", "Light"

  // Equipment and notes
  equipment?: string[];    // ["Poles", "Pack", "Running shoes"]
  notes?: string;          // "Run-walk method Z2"

  // Nutrition alignment
  calories: number;
  nutritionFocus: string;
}
```

### **Weekly Summary Information**
```typescript
interface WeekSummary {
  weekNumber: number;      // 5
  weekLabel: string;       // "W5 (Sep 22–28)"
  phase: TrainingPhase;    // "build"
  summary: string;         // "Continued build with poles introduction"

  // Weekly statistics
  totalDays: number;       // 7
  trainingDays: number;    // 5
  restDays: number;        // 2
  totalVolume: string;     // "15-18 hours"

  // Progress tracking
  percentComplete: number; // 31
  weeksRemaining: number;  // 11
  raceDate: string;        // "2025-12-01"
}
```

---

## 🔄 **Component Interactions**

### **TrainingPlanView Props**
```typescript
interface TrainingPlanViewProps {
  plan: TrainingPlan;
  selectedDate?: string;
  expandedWeeks?: Set<string>;
  isExpanded?: boolean;
}
```

### **TrainingWeek Props**
```typescript
interface TrainingWeekProps {
  week: Week;
  plan: TrainingPlan;
  selectedDate?: string;
  isExpanded?: boolean;
  showDetails?: boolean;
}
```

### **TrainingDay Props**
```typescript
interface TrainingDayProps {
  day: Day;
  isSelected?: boolean;
  isToday?: boolean;
  showNutrition?: boolean;
  compact?: boolean;
}
```

---

## 🎯 **Display Logic**

### **Week Expansion Logic**
```typescript
const shouldExpandWeek = (week: Week, props) => {
  // Always expand if explicitly set
  if (props.isExpanded) return true;

  // Expand if week contains selected date
  if (props.selectedDate) {
    return week.rows.some(day => day.date === props.selectedDate);
  }

  // Expand if week contains today's date
  const today = new Date().toISOString().split('T')[0];
  return week.rows.some(day => day.date === today);

  // Default: collapse
  return false;
};
```

### **Training Type Classification**
```typescript
const classifyTraining = (training: string): TrainingType => {
  if (training.toLowerCase().includes('off')) return 'rest';
  if (training.toLowerCase().includes('gym')) return 'gym';
  if (training.toLowerCase().includes('stairs')) return 'stairs';
  if (training.toLowerCase().includes('run') || training.toLowerCase().includes('z2')) return 'run';
  if (training.toLowerCase().includes('stage') || training.toLowerCase().includes('race')) return 'race';

  return 'other';
};
```

### **Nutrition Display Logic**
```typescript
const getNutritionDisplay = (day: Day) => {
  const isExercise = day.isExercise;

  return {
    calories: isExercise ? 2300 : 2100,
    focus: day.food || (isExercise ? 'Training fuel' : 'Recovery nutrition'),
    emoji: isExercise ? '🏃' : '🧘',
    colorScheme: isExercise ? 'emerald' : 'slate'
  };
};
```

---

## 📱 **Responsive Behavior**

### **Mobile Display**
- Compact training cards
- Essential information only
- Stacked layout
- Touch-friendly interactions

### **Tablet Display**
- Medium-sized cards
- More detailed information
- Balanced information density
- Side-by-side elements where appropriate

### **Desktop Display**
- Full-sized training cards
- Complete information display
- Multi-column layouts
- Enhanced visual hierarchy

---

## 🎨 **Visual States**

### **Expanded Week State**
- Full training details visible
- All daily cards displayed
- Complete nutrition information
- Weekly summary and progress

### **Collapsed Week State**
- Week header only
- Summary information
- Key statistics
- Expand/collapse indicator

### **Selected Day State**
- Highlighted training card
- Enhanced visual emphasis
- Scroll into view automatically
- Current focus indication

### **Today Highlight**
- Special today indicator
- Amber accent colors
- Enhanced visibility
- Current date emphasis

---

## 📊 **Progress Tracking**

### **Weekly Progress Indicators**
- **Completion Percentage**: `31% complete`
- **Weeks Remaining**: `11 weeks to race`
- **Training Load**: Weekly volume summary
- **Phase Progress**: Current training phase status

### **Training Phase Visualization**
```typescript
const getPhaseStyling = (phase: TrainingPhase) => {
  const phaseStyles = {
    base: {
      color: 'blue',
      label: 'Base Building',
      description: 'Foundation and conditioning'
    },
    build: {
      color: 'emerald',
      label: 'Build Phase',
      description: 'Volume and intensity increase'
    },
    peak: {
      color: 'orange',
      label: 'Peak Phase',
      description: 'Maximum training load'
    },
    taper: {
      color: 'purple',
      label: 'Taper Phase',
      description: 'Race preparation and recovery'
    },
    race: {
      color: 'red',
      label: 'Race Phase',
      description: 'Competition execution'
    }
  };

  return phaseStyles[phase] || phaseStyles.base;
};
```

---

## 🔗 **Integration Points**

### **Calendar Integration**
- Receives selected date from calendar
- Auto-expands week containing selected date
- Syncs with calendar color-coding
- Provides detailed view of calendar days

### **Nutrition Integration**
- Displays nutrition requirements for each day
- Aligns with training intensity
- Shows calorie targets and macros
- Provides fueling guidance

### **Progress Integration**
- Tracks overall training progress
- Shows phase completion
- Displays race countdown
- Provides training load context

---

## ✅ **Quality Assurance**

### **Data Display Verification**
- [ ] All training days show complete information
- [ ] Week summaries accurate
- [ ] Progress calculations correct
- [ ] Phase classifications match training
- [ ] Nutrition data aligns with training load

### **Visual Consistency**
- [ ] Color-coding matches training types
- [ ] Typography hierarchy maintained
- [ ] Responsive layouts work correctly
- [ ] Progress indicators accurate
- [ ] Phase styling consistent

### **Interaction Verification**
- [ ] Week expansion/collapse works
- [ ] Selected date highlighting
- [ ] Today date identification
- [ ] Scroll behavior smooth
- [ ] No layout breaks

---

## 📝 **Usage Examples**

### **Standard Weekly Display**
```vue
<TrainingPlanView
  :plan="trainingPlan"
  :selected-date="selectedDate"
  :expanded-weeks="expandedWeeks"
/>
```

### **Single Week Display**
```vue
<TrainingWeek
  :week="currentWeek"
  :plan="trainingPlan"
  :is-expanded="true"
  :show-details="true"
/>
```

### **Compact Training Day**
```vue
<TrainingDay
  :day="trainingDay"
  :is-selected="day.date === selectedDate"
  :is-today="day.date === today"
  :compact="true"
/>
```

---

**Component Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
