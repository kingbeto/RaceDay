# 🍽️ MealCard Component - Complete Specifications

## 🎯 **Component Overview**

The **MealCard** component is a core UI element in the RaceDay application responsible for displaying nutrition information and meal planning details for individual training days. It provides athletes with clear, organized nutrition guidance that aligns with their daily training requirements.

### **Primary Purpose**
- Display daily nutrition requirements based on training load
- Provide structured meal planning guidance
- Show calorie targets and macronutrient information
- Support training-specific fueling strategies

---

## 📊 **Data Structure**

### **Component Props**
```typescript
interface MealCardProps {
  // Day information
  day: {
    date: string;
    day: string;
    training: string;
    food: string;
    isExercise: boolean;
    isRaceDay?: boolean;
    calories?: number;
  };

  // Training context
  isTrainingDay?: boolean;
  trainingIntensity?: 'low' | 'moderate' | 'high' | 'maximum';

  // Display options
  compact?: boolean;
  showDetails?: boolean;
}
```

### **Nutrition Data Requirements**
```typescript
interface NutritionInfo {
  calories: number;
  protein: {
    grams: number;
    percentage: number;
  };
  carbs: {
    grams: number;
    percentage: number;
  };
  fats: {
    grams: number;
    percentage: number;
  };
  hydration: {
    liters: number;
    sodiumMg: number;
  };
}
```

---

## 🎨 **Visual Design**

### **Card Structure**
```
┌─────────────────────────────────────────┐
│  🍽️  Daily Nutrition Guide              │
├─────────────────────────────────────────┤
│  📅  [Date] - [Day Name]                │
│                                         │
│  🏃  [Training Description]             │
│                                         │
│  📊  Nutrition Targets:                 │
│      • Calories: [X] kcal               │
│      • Protein: [X]g ([X]%)             │
│      • Carbs: [X]g ([X]%)               │
│      • Fats: [X]g ([X]%)                │
│                                         │
│  💧  Hydration:                         │
│      • [X]L fluids                      │
│      • [X]mg sodium                     │
│                                         │
│  📝  Key Guidelines:                    │
│      • [Guideline 1]                    │
│      • [Guideline 2]                    │
│      • [Guideline 3]                    │
└─────────────────────────────────────────┘
```

### **Color Coding**
- **Exercise Days**: Green accent colors (`emerald-500`, `emerald-50`)
- **Rest Days**: Gray accent colors (`slate-500`, `slate-50`)
- **Race Days**: Red accent colors (`red-500`, `red-50`)

### **Typography Hierarchy**
- **Header**: Bold, 18px - "Daily Nutrition Guide"
- **Date/Training**: Medium, 16px
- **Labels**: Semibold, 14px - "Nutrition Targets:", "Key Guidelines:"
- **Data**: Regular, 14px - Values and percentages
- **Guidelines**: Regular, 13px - Bullet points

---

## 🏗️ **Component Behavior**

### **Static Display Mode**
- **No Interactions** - Read-only information display
- **No Click Handlers** - All buttons removed
- **No Dynamic Updates** - Static data presentation
- **No Form Inputs** - Pre-configured information only

### **Conditional Rendering**
```vue
<template>
  <BaseCard class="nutrition-card">
    <!-- Header with emoji and title -->
    <div class="flex items-center gap-3 mb-4">
      <span class="text-2xl">{{ nutritionEmoji }}</span>
      <h3 class="text-lg font-bold text-gray-900">
        Daily Nutrition Guide
      </h3>
    </div>

    <!-- Date and training info -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-1">
        {{ formatDate(day.date) }} - {{ day.day }}
      </div>
      <div class="text-sm font-medium text-gray-900">
        {{ day.training }}
      </div>
    </div>

    <!-- Nutrition data (conditionally shown) -->
    <div v-if="hasNutritionData" class="space-y-4">
      <!-- Calorie target -->
      <div class="flex justify-between items-center">
        <span class="text-sm font-medium text-gray-700">
          Calories:
        </span>
        <span class="text-sm font-bold text-gray-900">
          {{ nutritionData.calories }} kcal
        </span>
      </div>

      <!-- Macronutrients -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Protein:</span>
          <span class="text-sm text-gray-900">
            {{ nutritionData.protein.grams }}g ({{ nutritionData.protein.percentage }}%)
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Carbs:</span>
          <span class="text-sm text-gray-900">
            {{ nutritionData.carbs.grams }}g ({{ nutritionData.carbs.percentage }}%)
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Fats:</span>
          <span class="text-sm text-gray-900">
            {{ nutritionData.fats.grams }}g ({{ nutritionData.fats.percentage }}%)
          </span>
        </div>
      </div>

      <!-- Hydration -->
      <div class="pt-2 border-t border-gray-200">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">
            Hydration:
          </span>
        </div>
        <div class="text-sm text-gray-600 ml-4">
          {{ nutritionData.hydration.liters }}L fluids, {{ nutritionData.hydration.sodiumMg }}mg sodium
        </div>
      </div>

      <!-- Key guidelines -->
      <div class="pt-2 border-t border-gray-200">
        <div class="text-sm font-medium text-gray-700 mb-2">
          Key Guidelines:
        </div>
        <ul class="text-sm text-gray-600 space-y-1 ml-4">
          <li v-for="guideline in keyGuidelines" :key="guideline">
            • {{ guideline }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Fallback for no nutrition data -->
    <div v-else class="text-sm text-gray-500 italic">
      Nutrition information will be available closer to this training day.
    </div>
  </BaseCard>
</template>
```

---

## 📋 **Nutrition Logic**

### **Calorie Calculation**
```typescript
const calculateCalories = (day: Day): number => {
  if (!day.isExercise) {
    return 2100; // Rest day base
  }

  // Exercise day calculations based on training type
  const trainingType = analyzeTrainingType(day.training);

  switch (trainingType) {
    case 'gym':
      return 2300;
    case 'easy_run':
      return 2400;
    case 'long_run':
      return 2500;
    case 'stairs':
      return 2450;
    case 'maximum':
      return 2600;
    default:
      return 2300;
  }
};
```

### **Macronutrient Distribution**
```typescript
const calculateMacros = (calories: number, isExercise: boolean) => {
  if (!isExercise) {
    // Rest day: Higher protein, moderate carbs
    return {
      protein: { grams: 140, percentage: 27 },
      carbs: { grams: 240, percentage: 46 },
      fats: { grams: 70, percentage: 27 }
    };
  }

  // Exercise day: Balanced with higher carbs
  return {
    protein: { grams: 130, percentage: 22 },
    carbs: { grams: 320, percentage: 52 },
    fats: { grams: 80, percentage: 26 }
  };
};
```

### **Hydration Requirements**
```typescript
const calculateHydration = (trainingIntensity: string) => {
  const baseFluids = 2.5; // Liters
  const baseSodium = 1500; // mg

  switch (trainingIntensity) {
    case 'low':
      return { liters: 2.5, sodiumMg: 1500 };
    case 'moderate':
      return { liters: 3.0, sodiumMg: 2000 };
    case 'high':
      return { liters: 3.5, sodiumMg: 2500 };
    case 'maximum':
      return { liters: 4.0, sodiumMg: 3000 };
    default:
      return { liters: baseFluids, sodiumMg: baseSodium };
  }
};
```

---

## 🎯 **Key Guidelines Generation**

### **Training-Specific Guidelines**
```typescript
const generateGuidelines = (day: Day): string[] => {
  const guidelines: string[] = [];
  const trainingType = analyzeTrainingType(day.training);

  // Base guidelines
  guidelines.push('Focus on whole foods and nutrient density');

  if (day.isExercise) {
    guidelines.push('Time carbohydrate intake around training sessions');

    switch (trainingType) {
      case 'gym':
        guidelines.push('Prioritize post-workout protein for recovery');
        guidelines.push('Include anti-inflammatory foods');
        break;
      case 'easy_run':
        guidelines.push('Maintain steady energy with complex carbs');
        guidelines.push('Stay hydrated throughout the session');
        break;
      case 'long_run':
        guidelines.push('Practice race-day fueling strategies');
        guidelines.push('Include electrolytes for extended sessions');
        break;
      case 'stairs':
        guidelines.push('Fuel for vertical work and recovery');
        guidelines.push('Higher protein intake for muscle repair');
        break;
    }
  } else {
    guidelines.push('Focus on recovery nutrition');
    guidelines.push('Maintain adequate protein intake');
    guidelines.push('Support overall health and wellness');
  }

  if (day.isRaceDay) {
    guidelines.push('Follow race-day nutrition protocol');
    guidelines.push('Practice tested fueling strategy');
    guidelines.push('Focus on familiar, easily digestible foods');
  }

  return guidelines;
};
```

---

## 🔗 **Integration Points**

### **Training Plan Integration**
- Receives day data from TrainingPlanView component
- Aligns nutrition with specific training activities
- Updates based on training intensity and duration
- Maintains consistency with overall meal planning

### **Calendar Integration**
- Provides nutrition context for calendar days
- Supports tooltip information display
- Aligns with color-coding system (green/gray days)
- Provides detailed nutrition info on demand

### **Grocery List Integration**
- Nutrition requirements drive grocery selections
- Calorie and macro targets inform shopping lists
- Training-specific needs reflected in grocery categories
- Meal planning guides grocery organization

---

## 📱 **Responsive Behavior**

### **Mobile Display**
- Compact card layout with essential information
- Stacked nutrient display for small screens
- Touch-friendly spacing and typography
- Optimized for portrait orientation

### **Tablet Display**
- Expanded layout with more detailed information
- Side-by-side nutrient comparisons
- Enhanced visual hierarchy
- Balanced use of available screen space

### **Desktop Display**
- Full detailed layout with all information visible
- Multiple column nutrient display
- Enhanced visual design elements
- Optimized for reading and reference

---

## 🎨 **Visual States**

### **Training Day State**
- Green accent colors (`emerald-50` background)
- Bold nutrient values
- Complete guideline list
- Full nutrition breakdown

### **Rest Day State**
- Gray accent colors (`slate-50` background)
- Recovery-focused guidelines
- Lower calorie targets
- Simplified nutrient display

### **Race Day State**
- Red accent colors (`red-50` background)
- Race-specific guidelines
- Optimized fueling strategy
- Performance-focused information

---

## ✅ **Quality Assurance**

### **Data Validation**
- [ ] All required nutrition fields present
- [ ] Calorie calculations match training load
- [ ] Macronutrient percentages sum to 100%
- [ ] Hydration values appropriate for training
- [ ] Guidelines relevant to training type

### **Visual Verification**
- [ ] Color coding matches training day type
- [ ] Typography hierarchy maintained
- [ ] Responsive layout works across devices
- [ ] Card styling consistent with design system
- [ ] Information density appropriate for screen size

### **Integration Testing**
- [ ] Nutrition data aligns with training plan
- [ ] Grocery lists match nutrition requirements
- [ ] Calendar tooltips show correct information
- [ ] No orphaned or missing nutrition data

---

## 📝 **Usage Examples**

### **Basic Usage**
```vue
<MealCard
  :day="currentDay"
  :is-training-day="currentDay.isExercise"
  :training-intensity="'moderate'"
/>
```

### **Compact Display**
```vue
<MealCard
  :day="currentDay"
  :compact="true"
  :show-details="false"
/>
```

### **Race Day Display**
```vue
<MealCard
  :day="raceDay"
  :is-training-day="true"
  :training-intensity="'maximum'"
/>
```

---

**Component Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
