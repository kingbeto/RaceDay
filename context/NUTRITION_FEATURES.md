# RaceDay Nutrition Features

Comprehensive nutrition planning system with macro tracking, Argentine cuisine focus, and training-specific meal recommendations.

## 🍽️ **Nutrition System Architecture**

### **Data Structure**

```typescript
interface NutritionData {
  id: string
  dateKey: string // YYYY-MM-DD format
  totalCalories?: number
  totalProtein?: number
  totalCarbs?: number
  totalFats?: number
  meals: Meal[]
}

interface Meal {
  name: string
  calories: number
  dishes: Dish[]
}

interface Dish {
  name: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
}
```

### **Nutrition Phases**

- **Base Training**: Balanced macronutrient ratios for steady energy
- **Build Phase**: Increased carbohydrate focus for higher training volume
- **Peak Phase**: Strategic carb loading and protein optimization
- **Taper Phase**: Maintaining energy stores while reducing volume
- **Race Day**: Optimized fueling for competition performance

## 📊 **Macro Nutrient Management**

### **Daily Macro Targets**

```typescript
const calculateMacroTargets = (trainingDay: TrainingDay, bodyWeight: number) => {
  const baseTargets = {
    protein: bodyWeight * 1.6, // g per kg body weight
    carbs: bodyWeight * 5, // g per kg for moderate training
    fats: bodyWeight * 1.2 // g per kg body weight
  }

  // Adjust based on training intensity
  if (trainingDay.intensity === 'high') {
    baseTargets.carbs *= 1.4 // 7g/kg for high intensity
    baseTargets.protein *= 1.1 // Slight protein increase
  } else if (trainingDay.intensity === 'low') {
    baseTargets.carbs *= 0.8 // 4g/kg for light days
  }

  return baseTargets
}
```

### **Macro Distribution Display**

```vue
<!-- components/nutrition/MacroDisplay.vue -->
<template>
  <div class="macro-tracking-grid">
    <div v-for="macro in macroBreakdown" :key="macro.name" class="macro-item">
      <div class="macro-header">
        <span class="macro-name">{{ macro.name }}</span>
        <span class="macro-values">{{ macro.current }}g / {{ macro.target }}g</span>
      </div>

      <div class="progress-bar">
        <div
          class="progress-fill"
          :class="macro.colorClass"
          :style="{ width: `${macro.percentage}%` }"
        />
      </div>

      <div class="macro-percentage">
        <span>{{ macro.percentage }}% of target</span>
        <span class="calorie-contribution">({{ macro.calories }} kcal)</span>
      </div>
    </div>
  </div>
</template>
```

## 🌮 **Argentine Cuisine Integration**

### **Local Ingredient Focus**

```typescript
const argentineIngredients = {
  proteins: [
    'Beef (bife de chorizo)',
    'Chicken (pollo)',
    'Fish (pescado)',
    'Eggs (huevos)',
    'Cheese (queso)',
    'Mozzarella',
    'Ricotta'
  ],
  carbohydrates: [
    'Sweet potato (batata)',
    'Quinoa',
    'Brown rice (arroz integral)',
    'Whole wheat pasta (pasta integral)',
    'Oats (avena)',
    'Polenta'
  ],
  vegetables: [
    'Spinach (espinaca)',
    'Chard (acelga)',
    'Tomatoes (tomates)',
    'Bell peppers (morrón)',
    'Onions (cebollas)',
    'Garlic (ajo)'
  ],
  fats: [
    'Olive oil (aceite de oliva)',
    'Avocado (palta)',
    'Nuts (nueces)',
    'Seeds (semillas)',
    'Coconut oil (aceite de coco)'
  ]
}
```

### **Traditional Meal Adaptations**

```typescript
const healthyArgentineMeals = [
  {
    name: 'Empanadas Fitness',
    description: 'Whole wheat empanadas filled with lean beef and vegetables',
    macros: { protein: 25, carbs: 30, fats: 12 },
    calories: 320,
    ingredients: [
      'Whole wheat flour',
      'Lean ground beef',
      'Spinach',
      'Onions',
      'Bell peppers',
      'Olive oil'
    ]
  },
  {
    name: 'Quinoa Milanesa',
    description: 'Baked chicken breast with quinoa crust and sweet potato',
    macros: { protein: 35, carbs: 40, fats: 8 },
    calories: 360,
    ingredients: ['Chicken breast', 'Quinoa flakes', 'Sweet potato', 'Eggs', 'Fresh herbs', 'Lemon']
  }
]
```

## 🏃‍♂️ **Training-Specific Nutrition**

### **Pre-Training Fueling**

```typescript
const preTrainingNutrition = (intensity: string, duration: number) => {
  const recommendations = {
    high: {
      timing: '2-3 hours before',
      carbs: '1-2g per kg body weight',
      foods: ['Oatmeal with banana', 'Sweet potato with honey', 'Quinoa salad'],
      hydration: '500ml water 2 hours before'
    },
    moderate: {
      timing: '1-2 hours before',
      carbs: '0.5-1g per kg body weight',
      foods: ['Toast with jam', 'Banana with peanut butter', 'Small smoothie'],
      hydration: '300ml water 1 hour before'
    },
    low: {
      timing: '30-60 minutes before',
      carbs: '15-30g easily digestible',
      foods: ['Banana', 'Sports drink', 'Energy gel'],
      hydration: '200ml water 30 minutes before'
    }
  }

  return recommendations[intensity] || recommendations.moderate
}
```

### **Post-Training Recovery**

```vue
<!-- components/nutrition/RecoveryNutrition.vue -->
<script setup lang="ts">
const recoveryWindow = computed(() => {
  return {
    immediate: {
      timeframe: 'Within 30 minutes',
      focus: 'Glycogen replenishment + protein synthesis',
      ratio: '3:1 or 4:1 carbs to protein',
      examples: [
        'Chocolate milk + banana',
        'Recovery smoothie (banana, protein powder, oats)',
        'Greek yogurt with honey and berries'
      ]
    },
    extended: {
      timeframe: '2-4 hours post-exercise',
      focus: 'Complete meal with balanced macros',
      composition: 'Complete proteins + complex carbs + healthy fats',
      examples: [
        'Grilled chicken with quinoa and vegetables',
        'Beef and sweet potato bowl with avocado',
        'Fish with brown rice and steamed vegetables'
      ]
    }
  }
})
</script>
```

## 💧 **Hydration Management**

### **Daily Hydration Goals**

```typescript
const calculateHydrationNeeds = (
  bodyWeight: number,
  trainingIntensity: string,
  climate: 'hot' | 'moderate' | 'cold' = 'moderate'
) => {
  let baseHydration = bodyWeight * 35 // ml per kg body weight

  // Training adjustments
  const trainingMultipliers = {
    high: 1.5,
    moderate: 1.3,
    low: 1.1,
    off: 1.0
  }

  // Climate adjustments
  const climateMultipliers = {
    hot: 1.2,
    moderate: 1.0,
    cold: 0.9
  }

  return baseHydration * trainingMultipliers[trainingIntensity] * climateMultipliers[climate]
}
```

### **Electrolyte Balance**

- **Sodium**: 200-300mg per hour during training
- **Potassium**: Natural sources (banana, coconut water)
- **Magnesium**: Nuts, seeds, leafy greens
- **Calcium**: Dairy products, fortified plant milks

## 📱 **Nutrition Tracking Interface**

### **Daily Nutrition Dashboard**

```vue
<template>
  <div class="nutrition-dashboard">
    <div class="daily-summary">
      <h3>Today's Nutrition</h3>
      <div class="calorie-progress">
        <div class="calorie-ring" :style="calorieRingStyle">
          <div class="calorie-center">
            <span class="current-calories">{{ currentCalories }}</span>
            <span class="target-calories">/ {{ targetCalories }} kcal</span>
          </div>
        </div>
      </div>
    </div>

    <div class="meals-section">
      <div v-for="meal in todaysMeals" :key="meal.name" class="meal-card">
        <MealCard :meal="meal" :show-macros="true" :interactive="true" @expand="handleMealExpand" />
      </div>
    </div>

    <div class="hydration-tracker">
      <HydrationProgress
        :current="currentHydration"
        :target="targetHydration"
        :training-day="todaysTraining"
      />
    </div>
  </div>
</template>
```

### **Meal Planning Tools**

```typescript
// Smart meal suggestions based on training
const generateMealSuggestions = (trainingDay: TrainingDay, preferences: UserPreferences) => {
  const baseMeals = getMealsForPhase(trainingDay.phase)

  return baseMeals
    .filter(meal => matchesPreferences(meal, preferences))
    .map(meal => adjustForTraining(meal, trainingDay))
    .sort((a, b) => calculateNutritionScore(b) - calculateNutritionScore(a))
    .slice(0, 3) // Top 3 suggestions
}
```

## 📊 **Nutrition Analytics**

### **Weekly Nutrition Trends**

```vue
<script setup lang="ts">
const weeklyAnalytics = computed(() => ({
  averageCalories: calculateWeeklyAverage('calories'),
  macroConsistency: analyzeMacroDistribution(),
  hydrationCompliance: calculateHydrationAdherence(),
  nutritionScore: calculateOverallNutritionScore(),
  improvements: generateNutritionRecommendations()
}))
</script>
```

### **Progress Tracking**

- **Macro Adherence**: Weekly compliance to macro targets
- **Meal Timing**: Pre/post-training nutrition timing
- **Hydration Consistency**: Daily hydration goal achievement
- **Energy Balance**: Calorie intake vs. training demands

## 🎯 **Smart Recommendations**

### **AI-Powered Meal Suggestions**

```typescript
const generateSmartRecommendations = async (context: NutritionContext) => {
  const factors = {
    trainingIntensity: context.todaysTraining.intensity,
    timeOfDay: getCurrentTimeOfDay(),
    recentMeals: getRecentMealHistory(),
    macroDeficits: calculateMacroDeficits(),
    preferences: context.userPreferences,
    seasonalIngredients: getSeasonalArgentineIngredients()
  }

  return await nutritionAI.suggest(factors)
}
```

This comprehensive nutrition system provides personalized meal planning with a focus on Argentine cuisine while optimizing performance through training-specific nutrition strategies.
