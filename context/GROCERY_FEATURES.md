# RaceDay Grocery Features

Intelligent grocery list management with weekly planning, category organization, and training-specific shopping recommendations.

## 🛒 **Grocery System Architecture**

### **Data Structure**

```typescript
interface GroceryList {
  id: string
  weekId: string // W0, W1, W2, etc.
  categories: GroceryCategory[]
  totalItems: number
  estimatedCost?: number
  lastUpdated: string
}

interface GroceryCategory {
  name: string
  items: GroceryItem[]
  priority: 'high' | 'medium' | 'low'
  estimatedCost?: number
}

interface GroceryItem {
  id: string
  name: string
  quantity: string
  unit: string
  estimated_price?: number
  category: string
  isChecked?: boolean
  isEssential: boolean
  nutritionalPurpose?: string
  alternatives?: string[]
}
```

### **Weekly Planning System**

```typescript
const generateWeeklyGroceryList = (trainingWeek: TrainingWeek, nutritionPlan: NutritionData[]) => {
  const requiredIngredients = extractIngredientsFromMeals(nutritionPlan)
  const trainingSpecificNeeds = analyzeTrainingRequirements(trainingWeek)

  return {
    essentialItems: prioritizeEssentialIngredients(requiredIngredients),
    supplementaryItems: addTrainingSupplements(trainingSpecificNeeds),
    seasonalRecommendations: getSeasonalArgentineIngredients(),
    budgetOptimizations: findBulkBuyingOpportunities(requiredIngredients)
  }
}
```

## 🗂️ **Category Organization System**

### **Smart Categorization**

```typescript
const GROCERY_CATEGORIES = {
  proteins: {
    name: 'Proteins & Dairy',
    icon: '🥩',
    priority: 'high',
    examples: ['Beef', 'Chicken', 'Fish', 'Eggs', 'Greek yogurt', 'Cottage cheese'],
    storeSection: 'Meat & Dairy'
  },
  carbohydrates: {
    name: 'Carbohydrates & Grains',
    icon: '🌾',
    priority: 'high',
    examples: ['Quinoa', 'Brown rice', 'Oats', 'Sweet potatoes', 'Whole wheat pasta'],
    storeSection: 'Grains & Produce'
  },
  vegetables: {
    name: 'Fresh Vegetables',
    icon: '🥬',
    priority: 'high',
    examples: ['Spinach', 'Broccoli', 'Bell peppers', 'Tomatoes', 'Onions'],
    storeSection: 'Produce'
  },
  fruits: {
    name: 'Fresh Fruits',
    icon: '🍌',
    priority: 'medium',
    examples: ['Bananas', 'Berries', 'Oranges', 'Apples', 'Avocados'],
    storeSection: 'Produce'
  },
  fats: {
    name: 'Healthy Fats',
    icon: '🥑',
    priority: 'medium',
    examples: ['Olive oil', 'Nuts', 'Seeds', 'Coconut oil', 'Nut butters'],
    storeSection: 'Oils & Condiments'
  },
  supplements: {
    name: 'Sports Supplements',
    icon: '💊',
    priority: 'low',
    examples: ['Protein powder', 'Electrolytes', 'Vitamins', 'Recovery drinks'],
    storeSection: 'Health & Supplements'
  }
}
```

### **Dynamic Category Prioritization**

```vue
<!-- components/grocery/CategoryList.vue -->
<script setup lang="ts">
const prioritizedCategories = computed(() => {
  return groceryCategories.value.sort((a, b) => {
    // Sort by priority, then by completion status
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }

    // Incomplete categories first
    const aComplete = a.items.every(item => item.isChecked)
    const bComplete = b.items.every(item => item.isChecked)

    if (aComplete !== bComplete) {
      return aComplete ? 1 : -1
    }

    return a.name.localeCompare(b.name)
  })
})
</script>
```

## ✅ **Interactive Shopping Experience**

### **Smart Checklist Interface**

```vue
<!-- components/grocery/GroceryCheckList.vue -->
<template>
  <div class="grocery-checklist">
    <div class="shopping-progress">
      <div class="progress-header">
        <h3>Shopping Progress</h3>
        <span class="completion-badge">{{ completionPercentage }}% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${completionPercentage}%` }" />
      </div>
      <p class="progress-summary">{{ checkedItemsCount }} of {{ totalItems }} items collected</p>
    </div>

    <div class="category-sections">
      <div
        v-for="category in groceryCategories"
        :key="category.name"
        class="category-section"
        :class="{ completed: isCategoryComplete(category) }"
      >
        <div class="category-header" @click="toggleCategory(category.name)">
          <div class="category-info">
            <span class="category-icon">{{ category.icon }}</span>
            <h4 class="category-name">{{ category.name }}</h4>
            <span class="item-count">({{ category.items.length }})</span>
          </div>
          <div class="category-progress">
            <span class="checked-count">{{ getCheckedCount(category) }}</span>
            <ChevronDownIcon
              class="expand-icon"
              :class="{ rotated: expandedCategories[category.name] }"
            />
          </div>
        </div>

        <div v-show="expandedCategories[category.name]" class="category-items">
          <div
            v-for="item in category.items"
            :key="item.id"
            class="grocery-item"
            :class="{
              checked: item.isChecked,
              essential: item.isEssential,
              'alternative-available': item.alternatives?.length > 0
            }"
            @click="toggleItem(item.id)"
          >
            <div class="item-checkbox">
              <CheckIcon v-if="item.isChecked" class="check-icon" />
            </div>

            <div class="item-details">
              <div class="item-main">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">{{ item.quantity }} {{ item.unit }}</span>
              </div>

              <div class="item-meta">
                <span v-if="item.nutritionalPurpose" class="nutritional-purpose">
                  For: {{ item.nutritionalPurpose }}
                </span>
                <span v-if="item.estimated_price" class="estimated-price">
                  ~${{ item.estimated_price }}
                </span>
              </div>

              <div v-if="item.alternatives?.length" class="alternatives">
                <span class="alternatives-label">Alternatives:</span>
                <span class="alternatives-list">{{ item.alternatives.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### **Smart Shopping Features**

```typescript
// Progressive web app features for mobile shopping
const groceryShoppingFeatures = {
  offlineMode: {
    description: 'Access grocery lists without internet',
    implementation: 'Service worker caching + local storage',
    features: ['Cached lists', 'Offline item checking', 'Sync when online']
  },

  locationAware: {
    description: 'Optimize shopping route by store layout',
    implementation: 'Store maps + category positioning',
    features: ['Optimal shopping path', 'Nearby stores', 'Price comparisons']
  },

  voiceInput: {
    description: 'Add items hands-free while cooking',
    implementation: 'Web Speech API integration',
    features: ['Voice item adding', 'Quantity recognition', 'Smart parsing']
  }
}
```

## 🧠 **Intelligent Recommendations**

### **Training-Based Shopping Suggestions**

```typescript
const generateTrainingSpecificRecommendations = (trainingWeek: TrainingWeek) => {
  const recommendations: GroceryRecommendation[] = []

  // High-intensity training week
  if (hasHighIntensityDays(trainingWeek)) {
    recommendations.push({
      category: 'carbohydrates',
      items: ['Extra bananas', 'Energy-dense oats', 'Sweet potatoes'],
      reason: 'Higher carb needs for intense training sessions'
    })

    recommendations.push({
      category: 'supplements',
      items: ['Electrolyte supplements', 'Recovery drinks'],
      reason: 'Enhanced hydration for high-intensity workouts'
    })
  }

  // Recovery week
  if (trainingWeek.phase === 'taper') {
    recommendations.push({
      category: 'proteins',
      items: ['Greek yogurt', 'Lean fish', 'Recovery-focused proteins'],
      reason: 'Quality proteins for recovery and muscle maintenance'
    })
  }

  // Race week
  if (trainingWeek.phase === 'race') {
    recommendations.push({
      category: 'carbohydrates',
      items: ['Easy-digest carbs', 'Race-day fuel', 'Familiar foods'],
      reason: 'Race preparation and carb loading'
    })
  }

  return recommendations
}
```

### **Seasonal Argentine Ingredients**

```typescript
const getSeasonalRecommendations = (month: number) => {
  const argentineSeasons = {
    summer: {
      // Dec, Jan, Feb
      fruits: ['Peaches', 'Plums', 'Grapes', 'Melons', 'Figs'],
      vegetables: ['Tomatoes', 'Corn', 'Zucchini', 'Eggplant'],
      specialties: ['Fresh herbs', 'Watermelon']
    },
    autumn: {
      // Mar, Apr, May
      fruits: ['Apples', 'Pears', 'Oranges', 'Mandarins'],
      vegetables: ['Pumpkin', 'Sweet potatoes', 'Chard', 'Spinach'],
      specialties: ['Nuts', 'Seeds']
    },
    winter: {
      // Jun, Jul, Aug
      fruits: ['Oranges', 'Lemons', 'Grapefruit'],
      vegetables: ['Cabbage', 'Broccoli', 'Cauliflower', 'Leeks'],
      specialties: ['Citrus for vitamin C', 'Root vegetables']
    },
    spring: {
      // Sep, Oct, Nov
      fruits: ['Strawberries', 'Early stone fruits'],
      vegetables: ['Asparagus', 'Lettuce', 'Radishes', 'Peas'],
      specialties: ['Fresh spring greens', 'Early vegetables']
    }
  }

  const season = getArgentineSeason(month)
  return argentineSeasons[season]
}
```

## 💰 **Budget Management**

### **Cost Tracking & Optimization**

```vue
<!-- components/grocery/BudgetTracker.vue -->
<script setup lang="ts">
const budgetAnalysis = computed(() => {
  const estimatedTotal = groceryCategories.value.reduce((total, category) => {
    return (
      total +
      category.items.reduce((catTotal, item) => {
        return catTotal + (item.estimated_price || 0)
      }, 0)
    )
  }, 0)

  const essentialCost = groceryCategories.value.reduce((total, category) => {
    return (
      total +
      category.items
        .filter(item => item.isEssential)
        .reduce((catTotal, item) => catTotal + (item.estimated_price || 0), 0)
    )
  }, 0)

  return {
    estimatedTotal,
    essentialCost,
    optionalCost: estimatedTotal - essentialCost,
    budgetUtilization: (estimatedTotal / weeklyBudget.value) * 100
  }
})
</script>
```

### **Smart Substitutions**

```typescript
const generateSmartSubstitutions = (item: GroceryItem, budget: number) => {
  const substitutions = {
    'Organic chicken breast': {
      alternatives: ['Regular chicken breast', 'Chicken thighs'],
      savings: [2, 4],
      nutritionalImpact: 'Minimal - slightly higher fat in thighs'
    },
    'Imported quinoa': {
      alternatives: ['Local brown rice', 'Oats'],
      savings: [3, 5],
      nutritionalImpact: 'Similar carb content, adjust protein intake'
    },
    'Premium olive oil': {
      alternatives: ['Standard olive oil', 'Sunflower oil'],
      savings: [4, 6],
      nutritionalImpact: 'Minimal for cooking, use premium for dressings'
    }
  }

  return substitutions[item.name] || null
}
```

## 📊 **Shopping Analytics**

### **Shopping Pattern Analysis**

```typescript
const analyzeShoppingPatterns = () => {
  return {
    averageWeeklySpend: calculateAverageSpend(),
    mostPurchasedItems: getMostPurchasedItems(),
    seasonalTrends: analyzeSeasonalSpending(),
    categoryDistribution: getCategorySpendingDistribution(),
    efficiencyMetrics: {
      timeInStore: calculateAverageShoppingTime(),
      itemsPerTrip: calculateAverageItemsPerTrip(),
      forgottenItems: calculateForgottenItemsRate()
    }
  }
}
```

### **Waste Reduction Tracking**

```vue
<script setup lang="ts">
const wasteReductionMetrics = computed(() => ({
  plannedVsUsed: calculateUsageRate(),
  expiredItems: trackExpiredItems(),
  overPurchasing: identifyOverPurchasingPatterns(),
  suggestions: generateWasteReductionTips()
}))
</script>
```

## 📱 **Mobile Shopping Experience**

### **Progressive Web App Features**

```typescript
// Service worker for offline functionality
const offlineGroceryFeatures = {
  cacheStrategy: 'Cache grocery lists and essential data',
  syncStrategy: 'Background sync for checked items',

  features: [
    'Offline list access',
    'Photo capture of receipts',
    'Voice note recording',
    'Barcode scanning for price comparison',
    'Location-based store suggestions'
  ]
}
```

### **Export & Sharing Options**

```typescript
const exportGroceryList = (format: 'pdf' | 'csv' | 'text' | 'shopping-app') => {
  const exportFormats = {
    pdf: () => generatePrintablePDF(),
    csv: () => generateCSVExport(),
    text: () => generateSimpleTextList(),
    'shopping-app': () => generateAppSpecificFormat()
  }

  return exportFormats[format]()
}
```

## 🔄 **Integration Points**

### **Nutrition Plan Integration**

- Automatic ingredient extraction from meal plans
- Quantity calculation based on serving sizes
- Macro-nutrient optimization suggestions
- Alternative ingredient recommendations

### **Training Plan Integration**

- Phase-specific supplement recommendations
- Recovery food emphasis during intense weeks
- Race-preparation special items
- Hydration product suggestions

### **Calendar Sync**

- Shopping reminders based on meal prep schedules
- Market day notifications
- Seasonal produce alerts
- Price tracking and deal notifications

This grocery management system provides intelligent shopping assistance while maintaining focus on nutrition goals and training requirements.
