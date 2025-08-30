# 📋 RaceDay Application - Complete Consolidated Requirements

## 🎯 **Application Overview**

**RaceDay** is a comprehensive training and nutrition planning application for ultra-endurance athletes preparing for events like El Cruce de los Andes. The application provides athletes with a complete interactive overview of their 18-week training plan, including detailed daily schedules, nutrition guidance, and grocery planning.

### **Core Purpose**
- Display complete 18-week training plan with collapsible weekly details
- Provide visual calendar with color-coded training intensity levels
- Show nutrition requirements with chevron-based intensity indicators
- Enable bulk expand/collapse of all training weeks
- Serve as an interactive reference for athletes throughout their training cycle

---

## 🎮 **Interactive Behavior Requirements**

### **Application State**
- **ENHANCED INTERACTIVITY** - Individual week toggle buttons + bulk controls
- **BULK CONTROLS** - Expand All / Collapse All buttons for convenience
- **INDIVIDUAL TOGGLES** - Clickable chevron icons on each week header
- **AUTO-EXPANSION** - Current week automatically expands on page load
- **AUTO-SCROLL** - Smooth scroll to current week position
- **DYNAMIC DATA LOADING** - Real-time JSON data fetching with error handling

### **User Experience**
- **Enhanced Interactivity** - Individual week toggles + bulk controls + dynamic loading
- **Smart Defaults** - Current week expanded, others collapsed
- **Visual Feedback** - Smooth transitions, hover effects, loading states
- **Dynamic Data** - Real-time JSON loading with error handling and retry
- **Simplified UI** - Clean color scheme with strategic green accents
- **Responsive Design** - Optimized for all screen sizes

---

## 📅 **Calendar & Training Intensity System**

### **Heroicon-Based Intensity Indicators**
- **🔴 ⬆️⬆️ (ChevronDoubleUp)** - Race Days & High intensity - Maximum effort
- **🟠 ⬆️⬆️ (ChevronDoubleUp)** - High intensity (Tempo, Threshold, Hard)
- **🔵 ⬆️ (ChevronUp)** - Moderate intensity (Z2, Gym, Endurance)
- **🟢 ⬆️ (ChevronUp)** - Easy intensity (Light, Recovery)
- **⚫ ➖ (Minus)** - Off/Recovery days

### **Color-Coding System**
- **🔴 Red Theme** - Race Days (`isRaceDay: true`) - Maximum intensity
- **🟠 Orange Theme** - High Intensity - Tempo, threshold training
- **🔵 Blue Theme** - Moderate Intensity - Z2, endurance training
- **🟢 Green Theme** - Easy Intensity - Light, recovery sessions
- **⚫ Gray Theme** - Off Days - Rest, mobility, complete recovery
- **🟡 Amber** - Today indicator (current date highlight)

### **Application Scope**
- **ALL MONTHS** - Color-coding applies to every month in the 16-week plan
- **ALL WEEKS** - Every training week displays proper chevron indicators
- **COLLAPSIBLE WEEKS** - Weeks can expand/collapse individually or all at once
- **INDIVIDUAL TOGGLES** - Clickable chevron icons on each week header
- **AUTO-EXPANSION** - Current week automatically expands on page load
- **BULK CONTROLS** - Expand All / Collapse All buttons for convenience
- **DYNAMIC LOADING** - Real-time JSON data fetching with error handling

---

## 🏋️ **Training Plan Structure**

### **Plan Overview**
- **16-Week Program** - W0 through W14 plus Race week
- **Ultra-Endurance Focus** - El Cruce de los Andes preparation
- **Progressive Phases**:
  - **Base Phase** (W0-W3) - Foundation building and assessment
  - **Build Phase** (W4-W10) - Volume increase and intensity development
  - **Peak Phase** (W11-W13) - Maximum performance development
  - **Taper Phase** (W14) - Race preparation and recovery
  - **Race Phase** (RACE) - Competition execution
- **Enhanced Data Structure** - Added `intensity` field for all training days
- **Dynamic Loading** - Real-time JSON data fetching with error handling

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

## 🎨 **UI/UX Enhancements - Comprehensive Update**

### **Enhanced Table Design**
- **Row Borders** - Clear visual separation between all training table rows
- **Border Styling** - Subtle outer border + visible row separators
- **Hover Effects** - Smooth background color changes on row hover
- **Clean Layout** - Improved spacing and visual hierarchy

### **Simplified Color Scheme**
- **Removed Intensity Colors** - Eliminated complex row background colorings
- **Strategic Green Accents** - Green for training days, badges, and text
- **Current Date Highlighting** - Only today's row highlighted in yellow
- **Default UI Colors** - Rest of interface uses clean default styling

### **Interactive Elements**
- **Individual Week Toggles** - Clickable chevron icons on each week header
- **Right-Aligned Toggle** - Toggle button positioned on the right side
- **Smooth Transitions** - Animated expand/collapse with proper timing
- **Smart Toggle Logic** - Intelligent handling of individual vs bulk operations

### **Enhanced Data Management**
- **Dynamic JSON Loading** - Real-time data fetching from `/data/el-cruce-plan.json`
- **Loading States** - Professional loading spinner during data fetch
- **Error Handling** - Comprehensive error display with retry functionality
- **Reactive Updates** - Proper Vue reactivity for all data changes

### **Training Day Indicators**
- **Green Badges** - Training days display green badges instead of emerald
- **Green Training Text** - Training column text is green for exercise days
- **Green Activity Dots** - Green dots for training day indicators
- **Simplified Rest Days** - Rest days use default gray styling

### **Improved Information Display**
- **Removed Duplicate Dates** - Eliminated redundant date ranges below week titles
- **Clean Week Headers** - Streamlined week title and phase information
- **Better Visual Balance** - Improved layout with toggle button positioning
- **Enhanced Readability** - Cleaner typography and spacing

### **Component Architecture Updates**
- **Event-Driven Communication** - Proper Vue event system for toggle functionality
- **Type Safety** - Updated TypeScript interfaces for new data structure
- **Performance Optimized** - Efficient rendering and state management
- **Maintainable Code** - Clean separation of concerns and reusable logic

### **Data Structure Enhancements**
- **Intensity Field** - Added `intensity` classification to all training days
- **Consistent Classification** - High/Moderate/Off intensity levels applied
- **Backward Compatibility** - Maintains compatibility with existing functionality
- **Future-Proof** - Extensible structure for additional enhancements

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

**Document Version**: 2.0
**Last Updated**: January 2025
**Author**: RaceDay Development Team
**Major Updates**: Dynamic JSON loading, individual week toggles, enhanced table borders, simplified color scheme, comprehensive UI/UX improvements
