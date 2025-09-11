# RaceDay Frontend Architecture

Vue.js 3 frontend with TypeScript, Pinia state management, and API-first architecture with resilient fallback strategies.

## 🏗️ **Frontend Stack**

- **Framework**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with utility-first approach
- **State Management**: Pinia with API integration
- **Routing**: Vue Router with lazy-loaded pages
- **HTTP Client**: Native fetch with centralized API service

## 📁 **Component Architecture**

### **Component Hierarchy**

```
app/
├── pages/                    # Route-level components
│   ├── HomePage.vue          # Main dashboard
│   ├── CalendarPage.vue      # Training calendar view
│   ├── NutritionPage.vue     # Nutrition planning
│   └── GroceryPage.vue       # Grocery list management
├── components/
│   ├── layout/               # Layout components
│   │   ├── AppHeader.vue     # Navigation header
│   │   └── AppSidebar.vue    # Side navigation
│   ├── calendar/             # Calendar-specific components
│   │   ├── CalendarView.vue  # Main calendar component
│   │   └── CalendarDay.vue   # Individual day cell
│   ├── training/             # Training components
│   │   ├── TrainingPlanView.vue  # Training plan display
│   │   └── TrainingWeek.vue      # Weekly view
│   ├── nutrition/            # Nutrition components
│   │   ├── MealCard.vue      # Individual meal display
│   │   └── MacroDisplay.vue  # Macro nutrients
│   ├── grocery/              # Grocery components
│   │   └── GroceryList.vue   # Shopping list
│   └── ui/                   # Base UI components
│       ├── BaseButton.vue
│       ├── BaseCard.vue
│       └── BaseModal.vue
```

## 🗃️ **State Management (Pinia)**

### **Store Architecture**

```javascript
// stores/training.ts
export const useTrainingStore = () => {
  // State
  const currentPlan = ref<TrainingPlan | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const loadPlan = async () => {
    // API call with fallback to static data
  }

  // Getters
  const getDayByDate = computed(() => (date: string) => {
    // Complex computed logic
  })

  return { currentPlan, isLoading, error, loadPlan, getDayByDate }
}
```

### **Store Integration Pattern**

1. **API First**: Primary data source from backend API
2. **Fallback Strategy**: Graceful degradation to static JSON
3. **Caching**: Client-side caching for performance
4. **Error Handling**: User-friendly error states

### **Store Responsibilities**

**Training Store (`stores/training.ts`)**

- Manages complete training plan data
- Provides date-based lookups and filtering
- Handles training phase calculations
- Integrates with `/api/training-plans` endpoint

**Nutrition Store (`stores/nutrition.ts`)**

- Daily nutrition data with smart caching
- Macro nutrient calculations
- Fallback nutrition generation
- Integrates with `/api/nutrition` endpoint

**Grocery Store (`stores/grocery.ts`)**

- Weekly grocery list management
- Shopping item organization by categories
- Progress tracking for completed items
- Integrates with `/api/groceries` endpoint

## 🔄 **API Integration**

### **Centralized API Service**

```typescript
// services/api.ts
class ApiService {
  private baseUrl: string

  async getTrainingPlans() {
    // Standardized API calls with error handling
  }

  async getNutritionByDate(date: string) {
    // Date-specific nutrition data
  }

  async getGroceriesByWeek(weekId: string) {
    // Weekly grocery lists
  }
}

export const apiService = new ApiService()
```

### **Error Handling Strategy**

```typescript
// API → Static Data → Generated Data
const getOrGenerateNutrition = async (date: string) => {
  try {
    return await apiService.getNutritionByDate(date)
  } catch (apiError) {
    try {
      return await loadStaticNutrition(date)
    } catch (staticError) {
      return generateFallbackNutrition(date)
    }
  }
}
```

## 🎨 **UI/UX Patterns**

### **Design System**

- **Colors**: Tailwind CSS custom color palette
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent spacing scale (4px, 8px, 16px, etc.)
- **Components**: Reusable base components with variants

### **Responsive Design**

- **Mobile First**: Tailwind mobile-first breakpoints
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Friendly**: Adequate touch targets (44px minimum)

### **Interactive Elements**

- **Loading States**: Skeleton loaders and spinners
- **Error States**: User-friendly error messages with retry options
- **Success Feedback**: Toast notifications and inline feedback

## 📱 **Component Behaviors**

### **Calendar Component**

- Interactive date selection and navigation
- Training phase color coding
- Hover states for additional information
- Monthly and weekly view modes

### **Training Components**

- Expandable weekly training sections
- Exercise intensity indicators
- Progress tracking visualizations
- Print-friendly formatting

### **Nutrition Components**

- Daily meal planning interface
- Macro nutrient progress bars
- Argentine cuisine-focused meal suggestions
- Calorie target adjustments based on training

### **Grocery Components**

- Checkable shopping list items
- Category-based organization
- Progress tracking for completion
- Export functionality for mobile use

## ⚡ **Performance Optimizations**

### **Code Splitting**

- Route-level lazy loading
- Component-level dynamic imports
- Vendor chunk separation

### **Bundle Optimization**

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['@headlessui/vue'],
          'utils-vendor': ['@vueuse/core']
        }
      }
    }
  }
})
```

### **Runtime Performance**

- Vue 3 reactivity system
- Computed property caching
- Component-level memoization where needed
- Efficient DOM updates with virtual DOM

## 🧪 **Testing Strategy**

### **Component Testing**

```typescript
// tests/components/MealCard.test.ts
import { mount } from '@vue/test-utils'
import MealCard from '@/components/nutrition/MealCard.vue'

describe('MealCard', () => {
  it('renders meal information correctly', () => {
    const meal = { name: 'Breakfast', calories: 400, dishes: [] }
    const wrapper = mount(MealCard, { props: { meal } })
    expect(wrapper.text()).toContain('Breakfast')
  })
})
```

### **Store Testing**

```typescript
// tests/stores/training.test.ts
import { useTrainingStore } from '@/stores/training'

describe('Training Store', () => {
  it('loads training plan from API', async () => {
    const store = useTrainingStore()
    await store.loadPlan()
    expect(store.currentPlan.value).toBeTruthy()
  })
})
```

## 🔧 **Development Tools**

### **Vue DevTools**

- Component hierarchy inspection
- State management debugging
- Performance profiling

### **TypeScript Integration**

- Full type safety across components
- Interface definitions in `/types/`
- IDE autocomplete and error checking

### **Hot Module Replacement**

- Instant component updates
- State preservation during development
- CSS hot reloading

## 🚀 **Build Process**

### **Development Build**

```bash
npm run dev    # Vite dev server with HMR
```

### **Production Build**

```bash
npm run build  # Optimized production bundle
```

### **Build Optimizations**

- Tree shaking for unused code elimination
- Asset optimization and compression
- CSS purging for minimal bundle size
- Service worker for offline capabilities (future)

This frontend architecture provides excellent developer experience while delivering optimal performance and user experience.
