# 🏃‍♂️ RaceDay Application Behavior Specification

## Overview

This document outlines the comprehensive behaviors and interactions of the RaceDay training and nutrition planning application. RaceDay is designed for managing multi-day race training programs with integrated nutrition planning and grocery management.

## Application Architecture

### Core Components Structure
```
RaceDay App
├── HomePage.vue              # Main dashboard with 3-column layout
│   ├── CalendarView.vue      # Left sidebar: Training calendar
│   ├── TrainingPlanView.vue  # Main content: Weekly training schedule
│   └── Shopping/Grocery      # Right sidebar: Smart grocery lists
│
├── NutritionModal.vue        # Detailed meal planning modal
├── WeeklyMealsModal.vue      # Print-ready weekly meal tables
└── GlobalTooltip.vue         # System-wide tooltip management
```

### State Management Architecture
```javascript
// Pinia Stores (Reactive State)
TrainingStore    // Training plan data, selections, expansions
NutritionStore   // Meal planning, macros, recipes
GroceryStore     // Shopping lists, ingredients, categories

// Composables (Business Logic)
useCalendar      // Calendar data, date utilities, navigation
useWeeklyMeals   // Meal table management, printing
useTooltips      // Training explanations, UI feedback
useTrainingData  // Training plan processing, validation
```

## User Interaction Flows

### 1. Primary User Journey

#### Initial Load Flow
```javascript
1. App loads → Load training plan data
2. Auto-select today's date (if within plan range)
3. Auto-expand current week containing today
4. Scroll to today's training row
5. Load nutrition and grocery data
6. Display dashboard with calendar, training, and shopping
```

#### Calendar-Driven Navigation
```javascript
User clicks calendar date:
1. Visual feedback (yellow border, amber background)
2. Auto-expand containing month (if collapsed)
3. Auto-expand containing week (if collapsed)
4. Smooth scroll to training day row
5. Update URL/state for bookmarking
6. Load nutrition data for selected date
7. Update "Today's Focus" sidebar
```

### 2. Training Plan Interactions

#### Week Expansion/Collapse
```javascript
Click week summary:
1. Toggle details.open state
2. Animate height transition (300ms)
3. Update expandedWeeks Set in store
4. Maintain scroll position if possible
5. Update visual indicators (arrow rotation)
```

#### Training Day Selection
```javascript
Click training day row:
1. Update selectedDate in training store
2. Apply row highlighting (amber background)
3. Load nutrition modal data
4. Update calendar selection indicator
5. Maintain week expansion state
```

#### Nutrition Modal Flow
```javascript
Click nutrition button:
1. Extract date from clicked element
2. Load nutrition data for date
3. Show loading spinner during fetch
4. Display modal with meal details
5. Handle modal close (ESC, overlay click)
6. Reset modal state on close
```

### 3. Grocery Management Flow

#### Week Selection for Shopping
```javascript
Select training week:
1. Identify week boundaries
2. Load grocery data for week
3. Filter by training intensity
4. Display categorized shopping list
5. Enable print functionality
6. Update shopping cart state
```

### 4. Print Functionality

#### Weekly Meal Table Print
```javascript
Click "📋 Meals" button:
1. Generate weekly meal table
2. Open print-optimized modal
3. Apply print-specific CSS
4. Handle browser print dialog
5. Maintain table formatting in print
```

#### Grocery List Print
```javascript
Click "View Shopping List":
1. Format grocery data for printing
2. Apply print-optimized layout
3. Include week information
4. Handle print dialog
5. Reset to web view after printing
```

## Data Management Behaviors

### Training Plan Data Flow
```javascript
// Data Loading Sequence
1. Load el-cruce-plan.json
2. Parse training weeks and days
3. Build dateMap for fast lookups
4. Initialize calendar months
5. Set up week expansions
6. Load nutrition data
7. Load grocery data
8. Initialize UI state
```

### Nutrition Data Integration
```javascript
// Meal Planning Logic
For each training day:
- Exercise day: ~2300 calories (higher protein/carb)
- Rest day: ~2100 calories (balanced macros)
- Race day: Special fueling strategy
- Load authentic Argentine recipes
- Calculate macro breakdowns
- Handle meal timing (Desayuno, Almuerzo, Merienda, Cena)
```

### Grocery List Generation
```javascript
// Shopping List Logic
Based on training intensity:
- Light weeks: Standard grocery items
- Build weeks: Increased protein/carb items
- Peak weeks: Race fuel items
- Taper weeks: Recovery nutrition
- Race week: Specialized provisions
```

## Responsive Design Behaviors

### Desktop Layout (≥1024px)
```
┌─────────────────┬──────────────────────┬─────────────────┐
│                 │                      │                 │
│   Calendar      │   Training Plan      │   Shopping      │
│   Sidebar       │   Main Content       │   Sidebar       │
│   (4 columns)   │   (8 columns)        │   (4 columns)   │
│                 │                      │                 │
└─────────────────┴──────────────────────┴─────────────────┘
```

### Tablet Layout (768px - 1023px)
```
┌─────────────────┬──────────────────────┐
│                 │                      │
│   Calendar      │   Training Plan      │
│   (5 columns)   │   (11 columns)       │
│                 │                      │
├─────────────────┴──────────────────────┤
│   Shopping Sidebar (full width)        │
└────────────────────────────────────────┘
```

### Mobile Layout (<768px)
```
┌────────────────────────────────────────┐
│   Header with Race Date Badge          │
├────────────────────────────────────────┤
│   Calendar (full width, collapsible)   │
├────────────────────────────────────────┤
│   Training Plan (full width)           │
├────────────────────────────────────────┤
│   Shopping (full width, collapsible)   │
└────────────────────────────────────────┘
```

## Performance Optimization Behaviors

### Lazy Loading Strategy
```javascript
// Component Loading
- Calendar: Load immediately (critical)
- Training weeks: Load on demand
- Nutrition modals: Load when opened
- Grocery lists: Load when week selected
- Print views: Load when print requested
```

### Caching Strategy
```javascript
// Data Persistence
- Training plan: Cache in memory + localStorage
- Nutrition data: Cache per date
- Grocery data: Cache per week
- User preferences: Persist across sessions
- Print settings: Remember user choices
```

### Memory Management
```javascript
// Cleanup Behaviors
- Close modals: Clear modal data
- Navigate away: Clear unused data
- Week collapse: Remove expanded content
- Component unmount: Clear event listeners
- Memory warnings: Aggressive cleanup
```

## Error Handling Behaviors

### Network Error Recovery
```javascript
// Graceful Degradation
1. Network fails → Show cached data
2. Cache empty → Show skeleton loading
3. Partial data → Show available content
4. Complete failure → Show error page with retry
5. Recovery → Refresh data automatically
```

### Data Validation
```javascript
// Input Validation
- Date ranges: Validate within plan bounds
- Nutrition data: Check macro calculations
- Grocery items: Validate quantities
- Training data: Verify exercise flags
- Print data: Ensure formatting integrity
```

### User Input Handling
```javascript
// Form Validation
- Required fields: Prevent submission
- Date inputs: Validate format and range
- Number inputs: Check min/max values
- Text inputs: Sanitize and validate length
- File uploads: Check size and type
```

## Accessibility Behaviors

### Keyboard Navigation
```javascript
// Focus Management
- Tab order: Logical progression through UI
- Enter/Space: Activate interactive elements
- Escape: Close modals and menus
- Arrow keys: Navigate calendars and lists
- Focus indicators: High-contrast visual feedback
```

### Screen Reader Support
```javascript
// ARIA Implementation
- Labels: Descriptive aria-labels for buttons
- Live regions: Announce dynamic content
- Roles: Proper semantic roles for components
- Descriptions: Detailed aria-describedby
- States: Dynamic aria-expanded/aria-selected
```

### Touch Interface
```javascript
// Mobile Interactions
- Touch targets: Minimum 44px size
- Swipe gestures: Navigate between weeks
- Long press: Context menus
- Pinch zoom: Scale calendar view
- Drag and drop: Reorder grocery items
```

## Print Optimization Behaviors

### Print Media Queries
```css
/* Print Styles */
@media print {
  .no-print { display: none; }
  .print-break { page-break-before: always; }
  .print-table { font-size: 12pt; }
  .print-header { background: white !important; }
}
```

### Print Content Preparation
```javascript
// Print Data Formatting
1. Extract relevant data for printing
2. Format tables for print layout
3. Add page headers/footers
4. Optimize font sizes and spacing
5. Handle page breaks intelligently
6. Include print-specific instructions
```

## Future Enhancement Behaviors

### Advanced Features
```javascript
// Planned Behaviors
- Offline mode: Service worker caching
- Push notifications: Training reminders
- GPS tracking: Route logging
- Social features: Plan sharing
- AI recommendations: Smart suggestions
```

### Scalability Considerations
```javascript
// Performance Scaling
- Large plans: Virtual scrolling
- Many users: Database integration
- Complex data: Optimized queries
- Mobile users: Progressive Web App
- Global users: Internationalization
```

This comprehensive behavior specification ensures consistent, predictable, and accessible user experiences across all RaceDay application interactions while maintaining high performance and scalability standards.
