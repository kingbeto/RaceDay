# RaceDay UI Components & Behaviors

Comprehensive guide to UI components, patterns, and interactive behaviors in the RaceDay application.

## 🎨 **Design System**

### **Color Palette**

```css
/* Primary Colors */
--primary-50: #eff6ff --primary-500: #3b82f6 --primary-600: #2563eb --primary-700: #1d4ed8
  /* Semantic Colors */ --success-500: #10b981 --warning-500: #f59e0b --error-500: #ef4444
  --gray-500: #6b7280;
```

### **Typography Scale**

```css
/* Headings */
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

/* Body Text */
.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
```

### **Spacing System**

```css
/* Consistent 8px grid system */
.space-1 {
  margin: 0.25rem;
} /* 4px */
.space-2 {
  margin: 0.5rem;
} /* 8px */
.space-4 {
  margin: 1rem;
} /* 16px */
.space-6 {
  margin: 1.5rem;
} /* 24px */
.space-8 {
  margin: 2rem;
} /* 32px */
```

## 🧩 **Base UI Components**

### **BaseButton Component**

```vue
<template>
  <button :class="buttonClasses" :disabled="disabled || loading" @click="$emit('click')">
    <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
    <slot />
  </button>
</template>
```

**Props & Variants:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean

**Usage:**

```vue
<BaseButton variant="primary" size="lg" @click="handleSubmit">
  Save Training Plan
</BaseButton>
```

### **BaseCard Component**

```vue
<template>
  <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg">
    <div
      v-if="title"
      class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/30"
    >
      <h3 class="text-lg font-bold text-slate-900">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-slate-600 font-medium">{{ subtitle }}</p>
    </div>
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
```

### **BaseModal Component**

```vue
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/50" @click="close" />

      <!-- Modal Content -->
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-xl max-w-lg w-full">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
```

## 📅 **Calendar Components**

### **CalendarView Behavior**

```vue
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

// Interactive behaviors
const handleDateHover = (date: string) => {
  emit('date-hover', date)
}

const handleMonthNavigation = (direction: number) => {
  // Month navigation logic
}
</script>
```

**Key Features:**

- Interactive date selection with hover states
- Month navigation with keyboard shortcuts
- Training phase color coding
- Responsive layout for mobile devices

### **Training Intensity Indicators**

```css
.intensity-high {
  background-color: #ef4444;
} /* Red */
.intensity-moderate {
  background-color: #3b82f6;
} /* Blue */
.intensity-low {
  background-color: #10b981;
} /* Green */
.intensity-off {
  background-color: #6b7280;
} /* Gray */
```

## 🏃‍♂️ **Training Components**

### **TrainingPlanView Behavior**

```vue
<script setup lang="ts">
const props = defineProps<{
  plan: TrainingPlan
  selectedDate: string
  isExpanded: boolean
  hoveredDate?: string | null
}>()

// Reactive training week display
const visibleWeeks = computed(() => {
  return props.plan.weeks.filter(week => {
    // Show only relevant weeks based on current date
  })
})

// Interactive expand/collapse
const toggleWeekExpansion = (weekId: string) => {
  // Week expansion logic
}
</script>
```

**Interactive Elements:**

- Expandable weekly sections with smooth animations
- Exercise details on hover
- Progress indicators for completed workouts
- Print-friendly layout toggling

### **Training Phase Color System**

```typescript
const PHASE_COLORS = {
  base: 'bg-blue-100 text-blue-800 border-blue-200',
  build: 'bg-orange-100 text-orange-800 border-orange-200',
  peak: 'bg-red-100 text-red-800 border-red-200',
  taper: 'bg-green-100 text-green-800 border-green-200',
  race: 'bg-purple-100 text-purple-800 border-purple-200'
}
```

## 🍽️ **Nutrition Components**

### **MealCard Component Behavior**

```vue
<script setup lang="ts">
const props = defineProps<{
  meal: Meal
  showMacros?: boolean
  interactive?: boolean
}>()

// Expandable meal details
const isExpanded = ref(false)

// Macro visualization
const macroPercentages = computed(() => {
  return calculateMacroDistribution(props.meal)
})
</script>
```

**Features:**

- Expandable meal details with ingredient lists
- Macro nutrient progress bars
- Calorie target comparisons
- Argentine cuisine focus with local ingredients

### **Macro Display Patterns**

```vue
<template>
  <div class="macro-display">
    <!-- Protein -->
    <div class="macro-item">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700">Protein</span>
        <span class="text-sm text-gray-500">{{ protein }}g ({{ proteinPercent }}%)</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${proteinPercent}%` }"
        />
      </div>
    </div>
  </div>
</template>
```

## 🛒 **Grocery Components**

### **GroceryList Interactive Behavior**

```vue
<script setup lang="ts">
const checkedItems = ref<Record<string, boolean>>({})

// Progress tracking
const totalItems = computed(() => {
  return groceryCategories.value.reduce(
    (count, category) => count + getItemsList(category.items).length,
    0
  )
})

const completionPercentage = computed(() => {
  const checkedCount = Object.values(checkedItems.value).filter(Boolean).length
  return (checkedCount / totalItems.value) * 100
})

// Interactive behaviors
const toggleItem = (itemId: string) => {
  checkedItems.value[itemId] = !checkedItems.value[itemId]
}

const toggleAllItems = () => {
  // Select/deselect all items
}
</script>
```

**Key Features:**

- Checkable shopping list items with persistence
- Progress visualization
- Category-based organization
- Export functionality for mobile apps

## 📱 **Responsive Behavior Patterns**

### **Mobile-First Breakpoints**

```css
/* Mobile (default) */
@media (min-width: 640px) {
  /* sm: */
}
@media (min-width: 768px) {
  /* md: */
}
@media (min-width: 1024px) {
  /* lg: */
}
@media (min-width: 1280px) {
  /* xl: */
}
```

### **Touch-Friendly Interactions**

```css
/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 8px;
}

/* Touch feedback */
.touch-feedback {
  transition: transform 0.1s ease;
}

.touch-feedback:active {
  transform: scale(0.98);
}
```

## 🔄 **Loading States & Transitions**

### **Skeleton Loaders**

```vue
<template>
  <div v-if="isLoading" class="animate-pulse">
    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>

  <div v-else>
    <!-- Actual content -->
  </div>
</template>
```

### **Transition Animations**

```css
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
```

## 🎯 **Interactive Patterns**

### **Hover States**

```css
/* Card hover effects */
.card-hover {
  transition: all 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### **Focus Management**

```css
/* Accessible focus indicators */
.focus-ring:focus {
  outline: none;
  ring-width: 2px;
  ring-color: #3b82f6;
  ring-offset-width: 2px;
}
```

### **Error States**

```vue
<template>
  <div v-if="error" class="error-state">
    <div class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <div
          class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
        </div>
        <p class="text-red-600 font-medium mb-2">{{ error }}</p>
        <BaseButton variant="outline" @click="retry">Try Again</BaseButton>
      </div>
    </div>
  </div>
</template>
```

This component system provides consistent, accessible, and intuitive user interactions throughout the RaceDay application.
