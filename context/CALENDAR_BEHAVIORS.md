# 📅 Calendar Component Behavior Specification

## Overview

This document outlines the detailed behaviors and interactions of the calendar component in the RaceDay training application. The calendar serves as the primary navigation interface for a training plan application, providing sophisticated visual states and seamless integration with the main training plan.

## Core Architecture

### Component Structure
```
CalendarView.vue          # Main calendar container with month management
├── CalendarDay.vue       # Individual date cells with visual states
├── useCalendar.ts        # Composable for data management and utilities
└── TrainingPlanView.vue  # Main training plan display (integrated)
```

### Data Flow
1. **Training Plan Data** → `useCalendar` composable → **CalendarView**
2. **Date Selection** → CalendarView → **TrainingPlanView** (cross-component)
3. **Hover Events** → CalendarDay → **TrainingPlanView** (highlighting)

## Visual States & Priority System

### 1. State Priority Order (Highest to Lowest)

#### 🥇 **Selected State** (User Interaction)
- **Visual**: `border-2 border-amber-400` (thick yellow border)
- **Behavior**: Remains highlighted until different date is clicked
- **Priority**: Overrides all other visual states
- **Trigger**: Click event on any calendar date

#### 🥈 **Today Marker** (Temporal Indicator)
- **Visual**: `text-amber-900 font-semibold` + 8px amber dot (`bg-amber-400`)
- **Position**: Dot positioned absolutely in top-right corner
- **Behavior**: Automatically identified using `new Date().toISOString().slice(0,10)`
- **Persistence**: Remains distinct regardless of selection state

#### 🥉 **Exercise/Off States** (Data-Driven)
- **Exercise Days**: `bg-emerald-50 text-emerald-800` (light green theme)
- **Rest Days**: `bg-slate-50 text-slate-700` (light gray theme)
- **Data Source**: `isExercise: true/false` flag in JSON data
- **Behavior**: Color applied based on data lookup, not text parsing

#### 🏅 **Past Dates** (Temporal Context)
- **Visual**: `opacity-60` (40% transparency)
- **Calculation**: `new Date(date) < new Date(new Date().toDateString())`
- **Behavior**: Provides temporal context without affecting functionality
- **Interaction**: Fully clickable and hoverable

#### 🏅 **Hover State** (Immediate Feedback)
- **Visual**: `hover:border-slate-200` (light gray border)
- **Transition**: Smooth 150ms transition
- **Trigger**: Mouse enter/leave events
- **Behavior**: Temporary visual feedback

### 2. Race Day Integration
- **Special State**: Red theme (`bg-red-50 text-red-900`)
- **Indicator**: Red dot in top-left corner
- **Priority**: Integrated with exercise/off state system
- **Data**: `isRaceDay: true` flag

## Interactive Behaviors

### Click Events

#### Date Selection Flow
```javascript
1. User clicks calendar date
2. Emit 'date-select' event with date string
3. Auto-expand month if collapsed
4. Wait 100ms for month expansion animation
5. Scroll to training plan section
6. Auto-expand week if collapsed
7. Scroll to specific day row (smooth, center)
8. Highlight selected date with yellow border
```

#### Auto-Expansion Logic
- **Month Expansion**: If target month is collapsed → expand it
- **Week Expansion**: If target week is collapsed → expand it
- **Timing**: 100ms delay for smooth animations
- **Scope**: Works for any month/week combination

### Hover Events

#### Cross-Component Highlighting
```javascript
// On mouse enter:
1. Set hoverDate state to current date
2. Call highlightPlanForDate(dateString)
3. Find plan row: #d-{dateString}
4. Add: bg-amber-50 transition-all duration-200
5. Find containing week with data-week-start/end
6. Add: ring-2 ring-amber-300 ring-opacity-50

// On mouse leave:
1. Reset hoverDate to null
2. Call clearPlanHighlights()
3. Remove all temporary highlighting classes
4. Reset transform effects
```

#### Tooltip System
- **Content**: `getEntryForDate()?.training` or fallback messages
- **Display**: Browser native `title` attribute
- **Examples**:
  - "Long Z2 75–90 min"
  - "Off day - rest and recovery"
  - "Gym: Upper body strength"
  - "No entry"

## Scroll Synchronization

### Automatic Scrolling Behavior
```javascript
scrollToTrainingPlan(dateString) {
  // Step 1: Find and expand containing week
  const week = findWeekByDate(dateString)
  if (week.collapsed) {
    week.open = true
    await delay(100) // Allow expansion animation
  }

  // Step 2: Scroll to specific day row
  const dayRow = document.querySelector(#d-{dateString})
  dayRow.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}
```

### Week Detection Algorithm
- **Selector**: `[data-week-start]` and `[data-week-end]`
- **Comparison**: `dateString >= start && dateString <= end`
- **Edge Cases**: Handles dates at week boundaries correctly

## State Management

### Reactive State Variables
```javascript
{
  todayStr: '2025-08-19',           // Current date (ISO format)
  selectedDate: '2025-08-20',       // User-selected date
  hoverDate: '2025-08-21',          // Currently hovered date
  expandedMonths: Set([0, 1, 2]),  // Expanded month indices
  dateMap: {                        // Fast lookup cache
    '2025-08-19': {
      training: 'Off day',
      isExercise: false,
      calories: 2100
    }
  }
}
```

### Data Lookup Performance
- **Primary**: `dateMap[dateString]` (O(1) lookup)
- **Fallback**: `getEntryForDate(dateString)` function
- **Cache Strategy**: Computed property with reactive updates

## Responsive Behavior

### Mobile Adaptations
- **Touch Targets**: Minimum 44px tap targets maintained
- **Hover States**: Disabled on touch devices via CSS media queries
- **Scrolling**: Native touch scrolling for month containers
- **Layout**: Calendar moves below main content on narrow screens

### Tablet Considerations
- **Spacing**: Increased padding for finger navigation
- **Font Sizes**: Slightly larger text for readability
- **Interaction**: Hybrid mouse/touch support with proper event handling

## Performance Optimizations

### Efficient Rendering
- **Template Loops**: Alpine.js `x-for` with proper `:key` attributes
- **Conditional Classes**: `:class` bindings for dynamic styling
- **Event Delegation**: Minimal event listeners through Vue directives
- **Virtual Scrolling**: Not needed (reasonable dataset size)

### Memory Management
- **State Cleanup**: Proper null assignment on component destruction
- **Event Cleanup**: Automatic cleanup through Vue lifecycle
- **DOM References**: No direct DOM manipulation, all through reactive state
- **Debouncing**: Rapid interactions handled gracefully

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through calendar dates
- **Focus Indicators**: Clear visual focus states with `focus:ring-2`
- **Enter/Space**: Activate date selection
- **Arrow Keys**: Month navigation (future enhancement)

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for date buttons
- **Live Regions**: Dynamic content announcements
- **Semantic HTML**: Proper `<button>` elements for interactions
- **Alt Text**: Meaningful descriptions for visual indicators

### Color Accessibility
- **Contrast Ratios**: All color combinations meet WCAG AA standards
- **Pattern Support**: Visual indicators beyond color (dots, borders)
- **High Contrast**: Compatible with system high contrast modes
- **Color Blindness**: Multiple visual cues for state indication

## Error Handling & Edge Cases

### Missing Data Scenarios
- **Empty Training Data**: Shows "No entry" in tooltips
- **Missing Dates**: Graceful fallback to default styling
- **Invalid Dates**: Proper date validation and error boundaries
- **Network Errors**: Cached data with offline capability

### Boundary Conditions
- **Month Transitions**: Proper handling of month-end dates
- **Leap Years**: Correct day calculations for February 29
- **Timezone Issues**: UTC-based calculations prevent shifts
- **Date Range Limits**: Proper handling of plan start/end boundaries

### User Interaction Conflicts
- **Rapid Clicking**: Debounced to prevent multiple rapid selections
- **Simultaneous Hover/Click**: Click takes precedence over hover states
- **Touch vs Mouse**: Proper event handling for hybrid devices
- **Multi-Touch**: Single-touch interaction model maintained

## Integration Patterns

### Training Plan Synchronization
```javascript
// When calendar date is selected:
1. Update selectedDate in training store
2. Find corresponding week and expand if needed
3. Scroll to specific training day row
4. Apply visual selection indicators
5. Update URL/state for bookmarking
```

### Nutrition Modal Integration
```javascript
// When training day is clicked:
1. Extract date from clicked element
2. Load nutrition data for that date
3. Open nutrition modal with pre-populated data
4. Handle loading states and error conditions
```

### Grocery List Coordination
```javascript
// When week is selected for groceries:
1. Identify week boundaries from training plan
2. Load corresponding grocery data
3. Filter items by training intensity
4. Display organized shopping list
```

## Future Enhancement Considerations

### Advanced Features
- **Date Range Selection**: Multi-date selection for planning
- **Recurring Events**: Pattern-based training schedules
- **Calendar Sharing**: Export/import functionality
- **Offline Synchronization**: PWA capabilities

### Performance Improvements
- **Virtual Scrolling**: For very large training plans
- **Lazy Loading**: On-demand data fetching
- **Web Workers**: Heavy computation off main thread
- **Service Workers**: Advanced caching strategies

### Accessibility Enhancements
- **Voice Commands**: Speech-to-text navigation
- **Gesture Support**: Advanced touch interactions
- **Screen Reader Optimization**: Custom ARIA implementations
- **Keyboard Shortcuts**: Power user functionality

This specification ensures consistent, predictable, and accessible behavior across all calendar interactions while maintaining high performance and usability standards.
