# 🧭 Main Application Behaviors

## 🎯 **Application Overview**

**RaceDay** is a comprehensive static web application designed for ultra-endurance athletes preparing for events like El Cruce de los Andes. The application provides a complete visual training and nutrition planning experience with no interactive elements, serving as a static reference throughout an athlete's training cycle.

### **Core Architecture**
- **Static Data Display**: No dynamic state changes or API calls
- **Component-Based**: Modular Vue 3 Composition API architecture
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type-Safe**: Full TypeScript implementation
- **Performance Optimized**: Fast loading and efficient rendering

---

## 🔒 **Static Behavior Requirements**

### **Application State Management**
- **Zero Reactivity**: No reactive data updates
- **Pre-configured Data**: All information embedded in application
- **No User Input**: Read-only interface throughout
- **Static Navigation**: Single-page application structure
- **No API Dependencies**: Self-contained data and functionality

### **User Experience Guidelines**
- **Information Density**: Optimized for reference and planning
- **Visual Hierarchy**: Clear information organization
- **Accessibility**: Screen reader friendly and keyboard navigation ready
- **Performance**: Fast initial load and smooth scrolling
- **Mobile Optimization**: Touch-friendly on all devices

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

### **Component Hierarchy**
```
App.vue
├── Header (RaceDay branding, race date)
├── Main Layout (Grid system)
│   ├── Sidebar (Left side)
│   │   ├── Today's Focus (Top priority - dynamic daily focus with top-right intensity badges)
│   │   ├── CalendarView (All months)
│   │   └── GroceryList (Weekly shopping)
│   └── Main Content (Right side)
│       └── TrainingPlanView (All weeks visible - no scroll, single header)
└── Footer (Progress indicators)
```

---

## 📊 **Data Flow Architecture**

### **Static Data Sources**
```typescript
// Training plan data (16 weeks)
const trainingPlan = {
  id: 'el-cruce-2025',
  title: 'El Cruce — Minimal Day-by-Day Plan',
  weeks: [/* W0 through W14 + Race */],
  startDate: '2025-08-19',
  endDate: '2025-12-03'
};

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

### **Data Processing Pipeline**
1. **Raw Training Data** → Weeks W0-W14 + Race
2. **Calendar Processing** → Month-by-month display
3. **Nutrition Calculation** → Per-day requirements
4. **Grocery Alignment** → Weekly shopping lists
5. **Visual Rendering** → Color-coded display

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

**Application Version**: 1.0
**Last Updated**: December 2024
**Author**: RaceDay Development Team
