# RaceDay Training Features

Comprehensive guide to training calendar and plan management features in the RaceDay application.

## 🏃‍♂️ **Training Plan Architecture**

### **Data Structure**

```typescript
interface TrainingPlan {
  id: string
  title: string
  subtitle: string
  raceDate: string
  startDate: string
  endDate: string
  description: string
  weeks: TrainingWeek[]
}

interface TrainingWeek {
  id: string
  label: string
  start: string
  end: string
  summary: string
  phase: 'base' | 'build' | 'peak' | 'taper' | 'race'
  rows: TrainingDay[]
}

interface TrainingDay {
  date: string
  day: string
  training: string
  food: string
  isExercise: boolean
  isRaceDay: boolean
  intensity: 'high' | 'moderate' | 'low' | 'off'
  calories?: number
}
```

### **Training Phases**

- **Base Phase**: Foundation building with moderate intensity
- **Build Phase**: Increased volume and intensity
- **Peak Phase**: Maximum training load
- **Taper Phase**: Recovery before race
- **Race Phase**: Competition period

## 📅 **Calendar Features**

### **Interactive Calendar Component**

```vue
<!-- components/calendar/CalendarView.vue -->
<script setup lang="ts">
const props = defineProps<{
  trainingPlan: TrainingPlan
  selectedDate: string
  compact?: boolean
  hoveredDate?: string | null
  initialMonthIndex?: number
}>()

const emit = defineEmits<{
  'date-hover': [date: string]
  'date-leave': []
  'month-changed': [index: number]
}>()
</script>
```

### **Calendar Behaviors**

- **Date Selection**: Click to select specific training day
- **Hover Effects**: Preview training details on hover
- **Month Navigation**: Navigate between training months
- **Phase Visualization**: Color-coded training phases
- **Today Highlighting**: Current date emphasis
- **Responsive Layout**: Mobile-optimized calendar grid

### **Training Intensity Indicators**

```css
/* Visual intensity coding */
.intensity-high {
  background-color: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}

.intensity-moderate {
  background-color: #dbeafe;
  border-color: #93c5fd;
  color: #1e40af;
}

.intensity-low {
  background-color: #d1fae5;
  border-color: #6ee7b7;
  color: #065f46;
}

.intensity-off {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}
```

## 🏋️ **Training Plan Display**

### **TrainingPlanView Component**

```vue
<!-- components/training/TrainingPlanView.vue -->
<script setup lang="ts">
const props = defineProps<{
  plan: TrainingPlan
  selectedDate: string
  isExpanded: boolean
  hoveredDate?: string | null
}>()

// Computed properties for training data
const currentWeek = computed(() => {
  return plan.weeks.find(week => week.rows.some(day => day.date === selectedDate))
})

const trainingPhaseColor = computed(() => {
  const phase = currentWeek.value?.phase || 'base'
  return PHASE_COLOR_MAP[phase]
})
</script>
```

### **Weekly Training Organization**

- **Week Headers**: Phase indicators with date ranges
- **Daily Breakdown**: Individual training session details
- **Exercise Descriptions**: Detailed workout instructions
- **Nutrition Integration**: Linked meal planning
- **Progress Tracking**: Completion status indicators

### **Training Day Details**

```typescript
// Training day information display
const formatTrainingDay = (day: TrainingDay) => ({
  date: formatDate(day.date),
  dayOfWeek: getDayOfWeek(day.date),
  workout: day.training || 'Rest Day',
  intensity: day.intensity,
  isToday: isToday(day.date),
  isCompleted: getCompletionStatus(day.date),
  nutritionPlan: day.food,
  calorieTarget: day.calories || getDefaultCalories(day.isExercise)
})
```

## 📊 **Training Analytics**

### **Progress Tracking**

- **Completion Status**: Track finished workouts
- **Weekly Progress**: Visual progress indicators
- **Phase Progression**: Movement through training phases
- **Intensity Distribution**: High/moderate/low intensity balance

### **Training Metrics**

```typescript
const trainingMetrics = computed(() => ({
  totalTrainingDays: getAllTrainingDays.value.length,
  completedDays: getCompletedDays.value.length,
  remainingDays: getRemainingDays.value.length,
  currentPhase: getCurrentPhase.value,
  daysUntilRace: getDaysUntilRace.value,
  weeklyIntensityDistribution: getIntensityDistribution.value
}))
```

## 🎯 **Today's Focus Feature**

### **Current Day Highlighting**

```vue
<template>
  <div class="todays-focus-card">
    <div class="focus-header">
      <h3 class="text-lg font-bold text-slate-900">Today's Focus</h3>
      <p class="text-sm text-slate-600 font-medium">{{ todayFormatted }}</p>
    </div>

    <div class="training-summary">
      <div class="training-details">
        <h4 class="text-sm font-bold text-slate-900">Training</h4>
        <span class="intensity-badge" :class="intensityClass">
          {{ trainingIntensity.label }}
        </span>
        <p class="training-description">{{ todaysTraining?.training }}</p>
      </div>

      <div class="nutrition-focus">
        <h4 class="text-sm font-bold text-slate-900">Nutrition Focus</h4>
        <p class="nutrition-description">{{ nutritionFocus }}</p>
        <div class="calorie-target">
          <span class="font-medium">Calories:</span>
          {{ todaysTraining?.calories || defaultCalories }} kcal
        </div>
      </div>
    </div>
  </div>
</template>
```

### **Dynamic Training Recommendations**

```typescript
const nutritionFocus = computed(() => {
  if (!todaysTraining.value?.isExercise) {
    return 'Recovery nutrition with adequate protein and balanced carbs for maintenance.'
  }

  switch (trainingIntensity.value.level) {
    case 'high':
      return 'High-intensity fueling: 50-70g carbs/hour, sodium replacement, quality protein.'
    case 'moderate':
      return 'Moderate fueling: 40-60g carbs/hour, maintain hydration, balanced intake.'
    case 'low':
      return 'Light fueling: 30-40g carbs/hour, focus on whole foods and recovery.'
    default:
      return 'Balanced nutrition with adequate protein and complex carbohydrates.'
  }
})
```

## 🖨️ **Print & Export Features**

### **Print-Friendly Layout**

```css
@media print {
  .training-plan-print {
    font-size: 12pt;
    line-height: 1.5;
    color: black;
  }

  .no-print {
    display: none;
  }

  .page-break {
    page-break-before: always;
  }

  .week-section {
    page-break-inside: avoid;
  }
}
```

### **Export Functionality**

```typescript
const exportTrainingPlan = () => {
  const exportData = {
    planTitle: trainingPlan.value.title,
    dateRange: `${trainingPlan.value.startDate} - ${trainingPlan.value.endDate}`,
    weeks: trainingPlan.value.weeks.map(week => ({
      label: week.label,
      phase: week.phase,
      days: week.rows.map(day => ({
        date: day.date,
        workout: day.training,
        intensity: day.intensity,
        nutrition: day.food
      }))
    }))
  }

  // Generate PDF or CSV export
  generateTrainingPlanExport(exportData)
}
```

## 🔄 **Training Plan Management**

### **Data Loading Strategy**

```typescript
// stores/training.ts
export const useTrainingStore = () => {
  const loadPlan = async () => {
    try {
      // Primary: API endpoint
      const plan = await apiService.getTrainingPlans()
      currentPlan.value = plan
    } catch (apiError) {
      try {
        // Fallback: Static JSON
        const plan = await loadStaticTrainingPlan()
        currentPlan.value = plan
      } catch (staticError) {
        // Ultimate fallback: Generate basic plan
        currentPlan.value = generateBasicTrainingPlan()
      }
    }
  }
}
```

### **Real-time Updates**

- **Auto-sync**: Periodic data refresh from API
- **Offline Support**: Fallback to cached/static data
- **Conflict Resolution**: Handle data inconsistencies
- **Progress Persistence**: Save completion status locally

## 📱 **Mobile Training Features**

### **Responsive Calendar**

- **Touch Navigation**: Swipe between months
- **Expandable Days**: Tap to expand training details
- **Quick Actions**: Fast workout completion marking
- **Offline Access**: Cached training data

### **Mobile-Optimized Views**

```vue
<template>
  <div class="mobile-training-view">
    <!-- Compact daily view for mobile -->
    <div v-for="day in currentWeekDays" :key="day.date" class="mobile-day-card">
      <div class="day-header">
        <span class="day-name">{{ day.day }}</span>
        <span class="day-date">{{ formatDate(day.date) }}</span>
      </div>
      <div class="workout-summary">
        <p class="workout-text">{{ day.training }}</p>
        <span class="intensity-indicator" :class="intensityClass(day.intensity)" />
      </div>
    </div>
  </div>
</template>
```

## ⚡ **Performance Optimizations**

### **Lazy Loading**

- **Week Components**: Load visible weeks only
- **Image Assets**: Lazy load training images/videos
- **Data Pagination**: Load training data in chunks

### **Caching Strategy**

```typescript
// Client-side caching for training data
const trainingCache = new Map<string, TrainingPlan>()

const getCachedPlan = (planId: string) => {
  return trainingCache.get(planId) || null
}

const setCachedPlan = (planId: string, plan: TrainingPlan) => {
  trainingCache.set(planId, plan)
}
```

This training feature set provides comprehensive workout planning and tracking capabilities with excellent user experience across all devices.
