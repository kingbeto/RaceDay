# 📋 RaceDay Application - Complete Consolidated Requirements

## 🎯 **Application Overview**

**RaceDay** is a comprehensive static training and nutrition planning application for ultra-endurance athletes preparing for events like El Cruce de los Andes. The application provides athletes with a complete visual overview of their 16-week training plan, including detailed daily schedules, nutrition guidance, and grocery planning.

### **Core Purpose**
- Display complete 16-week training plan with daily details
- Provide visual calendar with color-coded training vs rest days
- Show nutrition requirements and grocery lists
- Serve as a static reference for athletes throughout their training cycle

---

## 🔒 **Static Behavior Requirements**

### **Application State**
- **NO INTERACTIVE BEHAVIORS** - All user interactions removed
- **STATIC DATA DISPLAY ONLY** - No dynamic state changes
- **NO FORM INPUTS** - All data is pre-configured
- **NO NAVIGATION** - Single-page application
- **NO API CALLS** - All data embedded in application

### **User Experience**
- **Read-Only Interface** - Pure information display
- **No Click Handlers** - All buttons and links removed
- **No Hover Effects** - Static visual presentation
- **No Modals/Dialogs** - All content visible on page
- **No State Management** - No reactive data updates

---

## 📅 **Calendar Color-Coding System**

### **Color Scheme**
- **🟢 Green (emerald-50)** - Exercise/Training Days (`isExercise: true`)
- **⚫ Gray (slate-50)** - Rest/Off Days (`isExercise: false`)
- **🔴 Red (red-50)** - Race Days (`isRaceDay: true`)
- **🟡 Amber** - Today indicator (current date highlight)

### **Application Scope**
- **ALL MONTHS** - Color-coding applies to every month in the training plan
- **ALL WEEKS** - Every training week displays proper color-coding
- **FUTURE MONTHS** - September, October, November, December all properly colored
- **HISTORICAL DATA** - Past months maintain color-coding for reference

### **Visual Indicators**
- **Background Colors** - Day backgrounds show training type
- **Dot Indicators** - Small colored dots show activity type
- **Legend** - Color legend explains the coding system
- **Tooltips** - Hover information (if hover enabled) shows training details

---

## 🏋️ **Training Plan Structure**

### **Plan Overview**
- **16-Week Program** - W0 through W14 plus Race week
- **Ultra-Endurance Focus** - El Cruce de los Andes preparation
- **Progressive Phases**:
  - **Base Phase** (W0-W3) - Foundation building
  - **Build Phase** (W4-W10) - Volume increase
  - **Peak Phase** (W11-W13) - Maximum training
  - **Taper Phase** (W14) - Race preparation
  - **Race Phase** (RACE) - Competition execution

### **Weekly Structure**
- **7-Day Weeks** - Monday through Sunday format
- **Daily Details**:
  - Training activity description
  - Duration and intensity
  - Nutrition requirements
  - Equipment needs (pack, poles, etc.)
  - Recovery focus areas

### **Training Types**
- **Gym Sessions** - Lower body, upper body, core work
- **Stair Climbing** - Building vertical endurance
- **Z2 Run-Walk** - Conversational pace endurance
- **Long Sessions** - Extended duration training
- **Recovery Days** - Mobility and light activity
- **Off Days** - Complete rest

---

## 🍽️ **Nutrition System**

### **Daily Nutrition Tracking**
- **Calorie Targets** - Exercise days: ~2,300-2,500 kcal, Rest days: ~2,100 kcal
- **Macronutrient Focus** - Protein, carbs, hydration
- **Timing Guidelines** - Pre/post workout nutrition
- **Hydration Requirements** - Sodium and fluid intake

### **Meal Planning**
- **Structured Meals** - Breakfast, lunch, dinner, snacks
- **Training-Specific** - Fueling around workout timing
- **Recovery Focus** - Post-workout protein and carbs
- **Grocery Integration** - Shopping lists match meal plans

---

## 🛒 **Grocery Planning**

### **Weekly Shopping Lists**
- **Organized by Category** - Produce, proteins, grains, etc.
- **Training-Week Specific** - Matches weekly training load
- **Quantity Specifications** - Exact amounts needed
- **Nutritional Focus** - Supports training and recovery needs

### **List Structure**
- **Category Organization** - Logical grouping of items
- **Check-off Format** - Visual completion tracking (static)
- **Nutrition Alignment** - Matches meal plan requirements

---

## 🏗️ **Component Architecture**

### **Main Components**

#### **CalendarView**
- Displays complete training calendar
- Color-codes all months and weeks
- Shows training schedule visually
- Provides month-by-month breakdown

#### **TrainingPlanView**
- Shows detailed weekly training
- Displays daily activities
- Nutrition requirements per day
- Phase progression tracking

#### **CalendarDay**
- Individual day representation
- Color-coded by training type
- Training information display
- Today highlighting

#### **MealCard**
- Nutrition information display
- Calorie and macro tracking
- Meal timing guidance
- Training-specific requirements

#### **GroceryList**
- Weekly shopping organization
- Category-based grouping
- Quantity specifications
- Training load alignment

### **UI Components**
- **BaseCard** - Consistent card styling
- **BaseButton** - Static button display (no functionality)
- **LoadingSpinner** - Static loading states
- **GlobalTooltip** - Information display (static)

---

## 📊 **Data Structure Requirements**

### **Training Plan Schema**
```typescript
interface TrainingPlan {
  id: string;
  title: string;
  subtitle: string;
  raceDate: string;
  startDate: string;
  endDate: string;
  description: string;
  weeks: Week[];
}

interface Week {
  id: string;
  label: string;
  start: string;
  end: string;
  summary: string;
  phase: 'base' | 'build' | 'peak' | 'taper' | 'race';
  rows: Day[];
}

interface Day {
  date: string;
  day: string;
  training: string;
  food: string;
  isExercise: boolean;
  isRaceDay?: boolean;
  calories?: number;
}
```

### **Calendar Data Requirements**
- **Date Range** - Complete coverage from start to end date
- **Exercise Classification** - Clear isExercise flags for all days
- **Race Day Marking** - Special designation for race days
- **Consistent Formatting** - Standardized date and time formats

---

## 🎨 **Visual Design System**

### **Color Palette**
- **Primary Green**: `#10b981` (emerald-500) - Training days
- **Rest Gray**: `#64748b` (slate-500) - Rest days
- **Race Red**: `#ef4444` (red-500) - Race days
- **Today Amber**: `#f59e0b` (amber-500) - Current date
- **Background**: Gradient from slate-50 to blue-50

### **Typography**
- **Headers**: Bold, gradient text for branding
- **Body**: Medium weight for readability
- **Labels**: Semibold for emphasis
- **Data**: Regular weight for information

### **Layout**
- **Grid System**: 12-column responsive grid
- **Card Design**: Rounded corners, subtle shadows
- **Spacing**: Consistent padding and margins
- **Breakpoints**: Mobile-first responsive design

---

## 🔧 **Technical Implementation**

### **Framework & Libraries**
- **Vue 3** - Composition API
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

### **Architecture**
- **Static Data** - No API dependencies
- **Component-Based** - Modular Vue components
- **Composable Functions** - Reusable logic hooks
- **Type Safety** - Full TypeScript coverage

### **Build Requirements**
- **Zero Errors** - Clean compilation
- **Optimized Bundle** - Minimal file sizes
- **Fast Loading** - Optimized assets
- **Cross-browser** - Modern browser support

---

## ✅ **Quality Assurance**

### **Functionality Verification**
- [ ] All calendar days properly color-coded
- [ ] Training plan displays complete 16 weeks
- [ ] Nutrition information shows for all days
- [ ] Grocery lists match training weeks
- [ ] No interactive elements present
- [ ] All tooltips and hover states removed

### **Visual Verification**
- [ ] Color-coding consistent across all months
- [ ] Typography hierarchy maintained
- [ ] Responsive design works on all screen sizes
- [ ] Loading states properly displayed
- [ ] No broken layouts or spacing issues

### **Data Integrity**
- [ ] All training days have complete information
- [ ] Nutrition data matches training load
- [ ] Grocery lists align with meal plans
- [ ] Date ranges cover complete training period

---

## 📝 **Maintenance Guidelines**

### **Documentation Updates**
- Update this document when new features added
- Maintain component-specific behavior docs
- Keep data structure documentation current
- Update visual design system as needed

### **Code Changes**
- Preserve static behavior requirements
- Maintain color-coding consistency
- Keep data structures intact
- Ensure no interactive elements reintroduced

### **Testing Requirements**
- Verify all months display correctly
- Test color-coding across date ranges
- Confirm responsive design integrity
- Validate data accuracy and completeness

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
