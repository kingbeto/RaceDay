# 🛒 Grocery Planning Behaviors

## 🎯 **Component Overview**

The **GroceryList** and **GroceryCategory** components provide organized shopping lists that align with the weekly training nutrition requirements. These components help athletes efficiently plan and execute their grocery shopping based on training load and nutritional needs.

### **Primary Functions**

- Display weekly shopping lists by category
- Show quantities and specific items needed
- Align groceries with training nutrition requirements
- Provide organized shopping experience
- Track completion status (static display)

---

## 📋 **Shopping List Structure**

### **Weekly Grocery Organization**

```
┌─ Grocery List - Week 5 (Sep 22–28) ──────────────────┐
│  Build Phase • High training volume                    │
│                                                       │
│  🥬 Produce                                           │
│     □ Bananas (6)                                     │
│     □ Berries (200g)                                  │
│     □ Sweet potatoes (1kg)                            │
│     □ Broccoli (400g)                                 │
│                                                       │
│  🍖 Proteins                                          │
│     □ Chicken breast (800g)                           │
│     □ Eggs (12)                                       │
│     □ Greek yogurt (500g)                             │
│     □ Tofu (300g)                                     │
│                                                       │
│  🌾 Grains                                            │
│     □ Brown rice (500g)                               │
│     □ Oats (400g)                                     │
│     □ Whole grain bread (1 loaf)                      │
│     □ Quinoa (300g)                                   │
│                                                       │
│  [Additional categories...]                           │
│                                                       │
│  📊 Nutrition Focus: High carb intake for endurance   │
│  🛒 Total Items: 24 • Estimated Cost: $85-95          │
└───────────────────────────────────────────────────────┘
```

### **Category-Based Organization**

- **Produce**: Fruits, vegetables, fresh items
- **Proteins**: Meat, fish, eggs, dairy, plant proteins
- **Grains**: Rice, bread, pasta, oats, cereals
- **Dairy**: Milk, cheese, yogurt, butter
- **Pantry**: Canned goods, oils, spices, nuts
- **Beverages**: Sports drinks, electrolyte supplements
- **Snacks**: Bars, gels, recovery foods

---

## 🎨 **Visual Design System**

### **Category Color Coding**

- **🥬 Produce**: Green theme (`emerald-500`, `emerald-50`)
- **🍖 Proteins**: Red theme (`red-500`, `red-50`)
- **🌾 Grains**: Yellow theme (`yellow-500`, `yellow-50`)
- **🥛 Dairy**: Blue theme (`blue-500`, `blue-50`)
- **🏪 Pantry**: Purple theme (`purple-500`, `purple-50`)
- **🥤 Beverages**: Cyan theme (`cyan-500`, `cyan-50`)
- **🍪 Snacks**: Orange theme (`orange-500`, `orange-50`)

### **Item Status Indicators**

- **□ Unchecked**: Items still to purchase
- **✓ Checked**: Items purchased (static display)
- **📝 Notes**: Special preparation instructions
- **⚖️ Quantity**: Specific amounts needed

---

## 📊 **Data Structure**

### **Grocery List Schema**

```typescript
interface GroceryList {
  weekId: string // "W5"
  weekLabel: string // "W5 (Sep 22–28)"
  trainingPhase: string // "build"

  // Nutritional context
  nutritionFocus: string // "High carb intake for endurance"
  calorieTarget: number // 2300
  trainingVolume: string // "15-18 hours"

  // Shopping data
  categories: GroceryCategory[]
  totalItems: number
  estimatedCost: {
    min: number // 85
    max: number // 95
    currency: string // "USD"
  }
}
```

### **Category Structure**

```typescript
interface GroceryCategory {
  id: string // "produce"
  name: string // "Produce"
  emoji: string // "🥬"
  color: string // "emerald"

  // Items in category
  items: GroceryItem[]

  // Category stats
  itemCount: number
  completedItems: number
  priority: 'high' | 'medium' | 'low'
}
```

### **Item Structure**

```typescript
interface GroceryItem {
  id: string // "bananas"
  name: string // "Bananas"
  quantity: string // "6"
  unit?: string // "pieces"
  notes?: string // "For post-workout snacks"

  // Status (static)
  completed: boolean // false
  priority: 'high' | 'medium' | 'low'

  // Nutritional context
  nutritionRole?: string // "Potassium source for recovery"
}
```

---

## 🔄 **Component Interactions**

### **GroceryList Props**

```typescript
interface GroceryListProps {
  weekId?: string
  trainingPlan?: TrainingPlan
  showCompleted?: boolean
  compact?: boolean
}
```

### **GroceryCategory Props**

```typescript
interface GroceryCategoryProps {
  category: GroceryCategory
  showCompleted?: boolean
  compact?: boolean
  colorScheme?: string
}
```

### **GroceryItem Props**

```typescript
interface GroceryItemProps {
  item: GroceryItem
  completed?: boolean
  showNotes?: boolean
  compact?: boolean
}
```

---

## 🎯 **Display Logic**

### **Category Priority Logic**

```typescript
const getCategoryPriority = (category: GroceryCategory, week: Week) => {
  // High priority for training fuel categories
  if (category.id === 'grains' && hasHighCarbTraining(week)) {
    return 'high'
  }

  if (category.id === 'proteins' && hasStrengthTraining(week)) {
    return 'high'
  }

  // Medium priority for staple items
  if (['produce', 'dairy', 'pantry'].includes(category.id)) {
    return 'medium'
  }

  // Low priority for specialty items
  return 'low'
}
```

### **Item Sorting Logic**

```typescript
const sortGroceryItems = (items: GroceryItem[]) => {
  return items.sort((a, b) => {
    // Priority first (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Then by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }

    // Finally alphabetical
    return a.name.localeCompare(b.name)
  })
}
```

### **Nutrition-Aligned Logic**

```typescript
const alignGroceriesWithNutrition = (week: Week) => {
  const nutritionNeeds = analyzeWeeklyNutrition(week)

  return {
    highCarbItems: nutritionNeeds.carbs > 300 ? ['oats', 'rice', 'bread'] : [],
    highProteinItems: nutritionNeeds.protein > 120 ? ['chicken', 'eggs', 'yogurt'] : [],
    recoveryItems: hasHardSessions(week) ? ['bananas', 'chocolate milk'] : [],
    electrolyteItems: hasLongSessions(week) ? ['sports drink', 'salt'] : []
  }
}
```

---

## 📱 **Responsive Behavior**

### **Mobile Display**

- Compact category headers
- Stacked item lists
- Touch-friendly checkboxes (static)
- Essential information only
- Vertical scrolling

### **Tablet Display**

- Medium-sized layouts
- Side-by-side categories where appropriate
- More detailed item information
- Better use of screen space
- Enhanced readability

### **Desktop Display**

- Full-width category layouts
- Multi-column item displays
- Complete item details
- Enhanced visual hierarchy
- Optimal information density

---

## 🎨 **Visual States**

### **Category States**

- **Expanded**: Full item list visible
- **Collapsed**: Category header only
- **High Priority**: Enhanced visual emphasis
- **Completed**: Muted appearance

### **Item States**

- **Pending**: Standard appearance
- **Completed**: Strikethrough text (static)
- **High Priority**: Bold text, accent colors
- **With Notes**: Note indicator icon

### **Week Context**

- **High Volume**: Enhanced carb/protein categories
- **Recovery Focus**: Emphasized recovery foods
- **Taper Phase**: Reduced quantities
- **Race Week**: Specialized fueling items

---

## 📊 **Nutrition Alignment**

### **Training-Based Grocery Planning**

```typescript
const generateGroceryList = (week: Week, nutritionProfile: NutritionProfile) => {
  const trainingAnalysis = analyzeTrainingWeek(week)

  return {
    // High-intensity sessions need more carbs
    carbFocus: trainingAnalysis.hasLongRuns ? 'high' : 'normal',

    // Strength sessions need more protein
    proteinFocus: trainingAnalysis.hasGymSessions ? 'high' : 'normal',

    // Long sessions need electrolytes
    electrolyteFocus: trainingAnalysis.totalDuration > 15 ? 'high' : 'normal',

    // Recovery needs for hard days
    recoveryFocus: trainingAnalysis.hasMaxEffort ? 'high' : 'normal'
  }
}
```

### **Weekly Nutrition Targets**

- **Exercise Days**: 2,300-2,500 calories
- **Rest Days**: 2,100 calories
- **High Carb Weeks**: +20% carbohydrate items
- **High Protein Weeks**: +15% protein items
- **Recovery Weeks**: Enhanced anti-inflammatory foods

---

## 🔗 **Integration Points**

### **Training Plan Integration**

- Receives weekly training data
- Aligns with specific training activities
- Adjusts quantities based on training load
- Updates based on training phase

### **Nutrition Integration**

- Matches grocery items to nutrition requirements
- Supports meal planning with available ingredients
- Provides shopping guidance for fueling strategies
- Aligns with calorie and macro targets

### **Calendar Integration**

- Syncs with weekly planning cycles
- Provides context for training weeks
- Supports seasonal food planning
- Aligns with training phase changes

---

## ✅ **Quality Assurance**

### **Data Accuracy**

- [ ] All quantities match nutrition requirements
- [ ] Items align with training activities
- [ ] Categories properly organized
- [ ] No missing essential items
- [ ] Quantities appropriate for week duration

### **Visual Consistency**

- [ ] Color-coding matches category themes
- [ ] Typography hierarchy maintained
- [ ] Responsive layouts work correctly
- [ ] Item status indicators clear
- [ ] Category organization logical

### **Nutrition Alignment**

- [ ] Grocery items support nutrition targets
- [ ] Training-specific items included
- [ ] Recovery foods for hard sessions
- [ ] Electrolytes for long sessions
- [ ] Seasonal and fresh options prioritized

---

## 📝 **Usage Examples**

### **Standard Weekly List**

```vue
<GroceryList :week-id="currentWeekId" :training-plan="trainingPlan" :show-completed="false" />
```

### **Compact Shopping List**

```vue
<GroceryList :week-id="currentWeekId" :compact="true" :show-completed="false" />
```

### **Category-Specific Display**

```vue
<GroceryCategory :category="proteinCategory" :color-scheme="'red'" :show-completed="true" />
```

---

**Component Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
