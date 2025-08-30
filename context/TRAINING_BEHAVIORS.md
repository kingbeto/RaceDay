# 🏋️ Training Plan Display Behaviors

## 🎯 **Component Overview**

The **TrainingPlanView** and **TrainingWeek** components provide the detailed training schedule display with advanced interactivity, showing day-by-day training activities, nutrition guidance, and weekly progression through the 18-week training plan.

### **Primary Functions**
- Display complete weekly training schedules with collapsible weeks
- Show daily training activities with chevron intensity indicators
- Provide nutrition guidance for each day with visual highlighting
- Track training phase progression with color-coded phases
- Display rest and recovery days with distinct visual styling
- Bulk expand/collapse all training weeks with control buttons

---

## 📊 **Weekly Structure Display**

### **Week Display Layout (Collapsible)**
```
┌─ ▼ Expand All     ▲ Collapse All ──────────────────┐
│                                                         │
│  ┌─ W5 (Sep 22–28) - Continued build ──────────────┐   │
│  │  Build Phase • Week 5 of 18                      │   │
│  │                                                 │   │
│  │  Type │ Date │ Day │ Training │ Focus │ Nutrition│   │
│  │  ─────┼──────┼─────┼─────────┼───────┼──────────│   │
│  │   »»  │ Sep 22│ Mon │ Tempo   │ Pre...│ 📋 2300 │   │
│  │   »   │ Sep 23│ Tue │ Stairs  │ Carbs │ 📋 2300 │   │
│  │   ZZZ │ Sep 24│ Wed │ Off     │ Rest  │ 📋 2100 │   │
│  │                                                 │   │
│  │  Progress: 28% complete • Race: Dec 1, 2025     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ W6 (Sep 29–Oct 5) - Peak Phase ─────────────────┐   │
│  │  [Collapsed - click to expand]                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Heroicon Legend:**
- **⬆️⬆️** Race Day & High intensity (ChevronDoubleUp)
- **⬆️** Moderate & Easy intensity (ChevronUp)
- **➖** Off/Recovery days (Minus)

### **Daily Training Card Structure**
```
┌─ Monday, September 22 (Off Day) ────────────────────┐
│  Type: ➖ │ Date: Sep 22 │ Day: Mon               │
│  ─────────────────────────────────────────────────  │
│  🏃 Training: Off + mobility                        │
│  📝 Focus: Protein focus                           │
│  📋 Nutrition: ~2100 kcal                          │
│                                                     │
│  [Background: Light gray • Left border: Gray]      │
└─────────────────────────────────────────────────────┘
```

### **High Intensity Training Example**
```
┌─ Tuesday, September 23 (High Intensity) ────────────┐
│  Type: ⬆️⬆️ │ Date: Sep 23 │ Day: Tue            │
│  ─────────────────────────────────────────────────  │
│  🏃 Training: Tempo - 45 min sustained effort      │
│  📝 Focus: Pre-workout fueling                     │
│  📋 Nutrition: ~2300 kcal                          │
│                                                     │
│  [Background: Light orange • Left border: Orange]  │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 **Visual Design System**

### **Simplified Color Coding System**
- **Training Days**: Green accents (`green-500`, `green-100`) - All exercise days
- **Current Date**: Amber highlight (`amber-500`, `amber-50`) - Today's row only
- **Rest Days**: Default UI colors (`slate-500`, `slate-100`) - Clean, minimal styling
- **Default Theme**: Consistent gray/blue theme for all non-training elements
- **Today**: Amber highlights (`amber-500`) - Current day indicator

### **Enhanced Visual Design System**
- **Table Borders**: Clear row separation with subtle outer borders and hover effects
- **Training Indicators**: Green badges, dots, and text for all exercise days
- **Current Date**: Exclusive yellow highlighting for today's row only
- **Simplified Colors**: Clean, minimal color scheme with strategic green accents
- **Responsive Design**: Optimized layout for all screen sizes
- **Interactive Elements**: Smooth transitions and hover states

### **Enhanced Interactive Features**

#### **Individual Week Toggles**
- **Toggle Icons**: Clickable chevron icons on each week header (right side)
- **Smart Positioning**: Toggle buttons positioned for optimal usability
- **Visual States**: Clear up/down chevron indicators for expand/collapse
- **Event Handling**: Proper Vue event system for state management

#### **Collapsible Week Behavior**
- **Default State**: Only current week expanded, others collapsed
- **Auto-Expansion**: Current week automatically expands on page load
- **Auto-Scroll**: Smooth scroll to current week position
- **Transition Effects**: Smooth expand/collapse animations (300ms)

#### **Bulk Control Buttons**
- **Expand All**: Blue button with down arrow - expands all 16 weeks
- **Collapse All**: Gray button with up arrow - collapses all weeks
- **Smart States**: Buttons disable when action is inappropriate
- **Visual Feedback**: Hover effects and proper button states

#### **Dynamic Data Loading**
- **Real-time Fetching**: JSON data loaded from `/data/el-cruce-plan.json`
- **Loading States**: Professional spinner during data fetch
- **Error Handling**: Comprehensive error display with retry functionality
- **Reactive Updates**: Proper Vue reactivity for all data changes

### **Component Interaction Logic**
```typescript
// Expand/collapse logic
const isWeekExpanded = (weekId: string) => {
  return allExpanded.value || expandedWeekId.value === weekId
}

const expandAllWeeks = () => {
  allExpanded.value = true
  expandedWeekId.value = null
}

const collapseAllWeeks = () => {
  allExpanded.value = false
  expandedWeekId.value = null
}
```

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

**Component Version**: 2.0
**Last Updated**: January 2025
**Author**: RaceDay Development Team
**Key Updates**: Dynamic loading, individual toggles, enhanced borders, simplified color scheme
