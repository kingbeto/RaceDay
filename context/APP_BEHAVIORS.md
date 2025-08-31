# 🧭 Main Application Behaviors

## 🎯 **Application Overview**

**RaceDay** is a comprehensive interactive web application designed for ultra-endurance athletes preparing for events like El Cruce de los Andes. The application provides a complete training and nutrition planning experience with enhanced interactivity, dynamic data loading, and intuitive user controls throughout an athlete's training cycle.

### **Enhanced Architecture**
- **Dynamic Data Loading**: Real-time JSON fetching with error handling
- **Component-Based**: Modular Vue 3 Composition API architecture
- **Interactive Elements**: Individual week toggles + bulk controls
- **Type-Safe**: Full TypeScript implementation with updated interfaces
- **Performance Optimized**: Fast loading with reactive data management

---

## 🎮 **Enhanced Interactive Behavior Requirements**

### **Application State Management**
- **Dynamic Data Loading**: Real-time JSON fetching with reactive updates
- **Interactive Controls**: Week toggles, expand/collapse functionality
- **Smart State Management**: Intelligent handling of individual vs bulk operations
- **Error Recovery**: Comprehensive error handling with retry mechanisms
- **Reactive Architecture**: Proper Vue reactivity for all state changes

### **Enhanced User Experience Guidelines**
- **Intuitive Interactions**: Clear visual feedback for all clickable elements
- **Information Density**: Optimized for both reference and active planning
- **Visual Hierarchy**: Clean design with strategic green accents
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **Performance**: Fast initial load with smooth animations and transitions
- **Mobile Optimization**: Touch-friendly with responsive design

---

## 🏗️ **Application Structure**

### **Main Layout Components**
```
┌─────────────────────────────────────────────────────┐
│  🏔️ RaceDay - Training & Nutrition Planner          │
│  Dec 1, 2025 • 16-Week Plan • El Cruce de los Andes │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─ Calendar ──────────┐  ┌─ Training Details ──┐   │
│  │  Aug Sep Oct Nov Dec │  │  Week 5 (Sep 22)    │   │
│  │  🟢🟢⚫🟢⚫🟢🟢⚫     │  │  Mon: Gym Lower       │   │
│  │  🟢⚫🟢⚫⚫🟢🟢⚫     │  │  Tue: Stairs + Gym    │   │
│  │  🟢🟢⚫🟢🟢🟢⚫🟢     │  │  Wed: Z2 Run          │   │
│  │  [Months continue]   │  │  [Days continue]    │   │
│  └─────────────────────┘  └─────────────────────┘   │
│                                                     │
│  ┌─ Nutrition Guide ───┐  ┌─ Grocery List ──────┐   │
│  │  🍽️ Daily Nutrition │  │  🛒 Week 5 Shopping │   │
│  │  2,300 calories     │  │  🥬 Produce          │   │
│  │  Protein: 130g      │  │  🍖 Proteins         │   │
│  │  Carbs: 320g        │  │  🌾 Grains           │   │
│  │  Fats: 80g          │  │  [Categories...]     │   │
│  └─────────────────────┘  └─────────────────────┘   │
│                                                     │
│  📊 Progress: 31% • Build Phase • 11 weeks to race  │
└─────────────────────────────────────────────────────┘
```

### **Enhanced Component Hierarchy**
```
App.vue
├── Header (RaceDay SVG logo, race date, nutrition info)
├── Main Layout (Grid system)
│   ├── Sidebar (Left side)
│   │   ├── Today's Focus (Dynamic daily focus with green training indicators)
│   │   ├── CalendarView (Month-by-month navigation)
│   │   │   ├── Previous/Next month buttons
│   │   │   ├── "Today" button for current month
│   │   │   ├── Single month view for focused browsing
│   │   │   └── Smooth animated month transitions
│   │   └── GroceryList (Weekly shopping with category organization)
│   └── Main Content (Right side)
│       ├── Expand/Collapse All Buttons (Bulk week control)
│       └── TrainingPlanView (Interactive weeks with individual toggles)
│           ├── 16 weeks (W0-W14 + RACE) with enhanced visual design
│           ├── Individual toggle icons, enhanced borders, and green indicators
│           ├── Dynamic JSON loading with error handling and retry
│           └── Auto-scroll to current week on load
└── Footer (Progress indicators)
```

---

## 📊 **Data Flow Architecture**

### **Dynamic Data Sources**
```typescript
// Dynamic training plan loading
const loadTrainingPlan = async () => {
  const response = await fetch('/data/el-cruce-plan.json');
  if (!response.ok) throw new Error('Failed to load training plan');
  return response.json();
};

// Enhanced training plan data (16 weeks with intensity field)
const trainingPlan = await loadTrainingPlan();
// Structure: id, title, subtitle, weeks[], startDate, endDate, description
// Each day includes: date, training, food, isExercise, intensity, isRaceDay

// Nutrition profiles
const nutritionProfiles = {
  exercise: { calories: 2300, protein: 130, carbs: 320, fats: 80 },
  rest: { calories: 2100, protein: 140, carbs: 240, fats: 70 }
};

// Grocery categories
const groceryCategories = [
  'produce', 'proteins', 'grains', 'dairy', 'pantry', 'beverages', 'snacks'
];
```

### **Component Communication**
```typescript
// Props-based data flow (no emits/events)
<CalendarView :training-plan="plan" :selected-date="'2025-09-15'" />
<TrainingPlanView :plan="plan" :is-expanded="true" />
<GroceryList :week-id="'W5'" :training-plan="plan" />
```

### **Enhanced Data Processing Pipeline**
1. **Dynamic JSON Loading** → Fetch from `/data/el-cruce-plan.json`
2. **Error Handling** → Retry mechanisms and user feedback
3. **Data Validation** → TypeScript interface validation
4. **Raw Training Data** → Weeks W0-W14 + Race with intensity fields
5. **Calendar Processing** → Month-by-month display with simplified colors
6. **Nutrition Calculation** → Per-day requirements with intensity consideration
7. **Grocery Alignment** → Weekly shopping lists with enhanced categorization
8. **Visual Rendering** → Green indicators, enhanced borders, hover effects

---

## 🎨 **Visual Design System**

### **Color Palette Application**
- **Brand Colors**: Blue to purple gradient for RaceDay branding
- **Training States**: Green for exercise, gray for rest, red for race
- **Phase Indicators**: Different colors for each training phase
- **Status Colors**: Amber for today, blue for selected, gray for past

### **Typography Scale**
- **Headers**: 18px-32px, Bold, Gradient text for branding
- **Subheaders**: 16px-18px, Semibold for section titles
- **Body Text**: 14px-16px, Regular for content
- **Labels/Captions**: 12px-14px, Medium for metadata
- **Small Text**: 11px-13px, Regular for notes

### **Spacing System**
- **Component Padding**: 16px-24px internal spacing
- **Section Margins**: 24px-32px between sections
- **Grid Gaps**: 12px-16px between grid items
- **Card Spacing**: 20px-32px card content padding

---

## 📱 **Responsive Breakpoints**

### **Mobile (320px - 767px)**
- Single column layout
- Compact calendar (7 columns)
- Stacked training cards
- Touch-friendly sizing
- Vertical scrolling

### **Tablet (768px - 1023px)**
- Two-column layout
- Medium calendar display
- Side-by-side elements
- Enhanced readability
- Balanced information density

### **Desktop (1024px+)**
- Full three-section layout
- Large calendar display
- Multi-column training view
- Maximum information display
- Optimal visual hierarchy

---

## 🔄 **Component Lifecycle**

### **Application Initialization**
```typescript
// 1. Load static training data
const trainingPlan = loadTrainingPlan();

// 2. Initialize calendar data
const calendarData = processCalendarData(trainingPlan);

// 3. Set up nutrition profiles
const nutritionData = calculateNutritionProfiles(trainingPlan);

// 4. Generate grocery lists
const groceryData = generateGroceryLists(trainingPlan);

// 5. Render application
renderApp({
  trainingPlan,
  calendarData,
  nutritionData,
  groceryData
});
```

### **Component Mounting Sequence**
1. **App.vue** - Main application container
2. **Header** - Branding and navigation
3. **CalendarView** - Month-by-month calendar
4. **TrainingPlanView** - Weekly training details
5. **GroceryList** - Shopping organization
6. **NutritionCard** - Daily nutrition display

### **Data Binding Strategy**
- **One-way Data Flow**: Props from parent to child components
- **Computed Properties**: Efficient data transformations
- **Static Computations**: Pre-calculated values
- **Memoization**: Cached expensive operations

---

## 🎯 **Performance Optimization**

### **Bundle Optimization**
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Component-based loading
- **Asset Optimization**: Compressed images and fonts
- **CSS Optimization**: Tailwind purging and minification

### **Runtime Performance**
- **Virtual Scrolling**: Efficient large list rendering
- **Lazy Loading**: On-demand component loading
- **Memoization**: Cached computations
- **Efficient Re-renders**: Minimal DOM updates

### **Loading Strategy**
- **Initial Load**: Fast first contentful paint
- **Progressive Enhancement**: Layered content loading
- **Caching Strategy**: Browser caching for assets
- **Offline Capability**: Service worker for caching

---

## ✅ **Quality Assurance Standards**

### **Code Quality**
- [ ] TypeScript strict mode enabled
- [ ] ESLint rules enforced
- [ ] Component prop validation
- [ ] Error boundary implementation
- [ ] Accessibility compliance (WCAG 2.1)

### **Performance Benchmarks**
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay: N/A (static)
- [ ] Bundle size < 500KB gzipped

### **Cross-browser Compatibility**
- [ ] Chrome 90+ support
- [ ] Firefox 88+ support
- [ ] Safari 14+ support
- [ ] Edge 90+ support
- [ ] Mobile Safari support

---

## 📝 **Development Workflow**

### **Build Process**
```bash
# Development
npm run dev        # Vite dev server with HMR
npm run build      # Production build
npm run preview    # Preview production build
npm run type-check # TypeScript validation
```

### **Code Organization**
```
src/
├── components/     # Vue components
│   ├── calendar/   # Calendar components
│   ├── training/   # Training display
│   ├── nutrition/  # Nutrition components
│   └── ui/         # Reusable UI components
├── composables/    # Vue composables
├── data/          # Static data files
├── types/         # TypeScript definitions
└── styles/        # Global styles
```

### **Version Control**
- **Conventional Commits**: Structured commit messages
- **Semantic Versioning**: Version numbering scheme
- **Branch Strategy**: Feature branches with PR reviews
- **Documentation**: Updated with each release

---

## 🔧 **Maintenance Procedures**

### **Data Updates**
1. Update training plan JSON files
2. Regenerate computed data structures
3. Update component prop interfaces
4. Test visual consistency
5. Update documentation

### **Component Changes**
1. Update component interfaces
2. Maintain backward compatibility
3. Update visual design system
4. Test responsive behavior
5. Update documentation

### **Performance Monitoring**
1. Monitor bundle size changes
2. Track loading performance
3. Analyze component render times
4. Optimize based on metrics
5. Update performance budgets

---

## 📚 **Integration Guidelines**

### **Third-party Dependencies**
- **Vue 3**: Core framework (Composition API)
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety and developer experience
- **ESLint**: Code quality and consistency

### **Browser Support Matrix**
| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome  | 90+    | Full          |
| Firefox | 88+    | Full          |
| Safari  | 14+    | Full          |
| Edge    | 90+    | Full          |
| Mobile Safari | 14+ | Full      |

### **Device Compatibility**
- **iOS**: Safari 14+ on iPhone/iPad
- **Android**: Chrome 90+ on Android devices
- **Desktop**: All modern desktop browsers
- **Tablet**: iPad and Android tablets

---

**Application Version**: 2.0
**Last Updated**: January 2025
**Author**: RaceDay Development Team
**Key Enhancements**: Dynamic loading, individual toggles, enhanced borders, simplified color scheme, green training indicators
