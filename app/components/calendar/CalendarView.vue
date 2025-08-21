<template>
  <!-- Compact mode for sidebar (main implementation) -->
  <div class="sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
    <div class="space-y-4">
      
      <!-- Collapsible months structure (specs requirement) -->
      <div
        v-for="(month, monthIndex) in months"
        :key="month.name"
        class="border border-gray-200 rounded-lg overflow-hidden"
      >
        <!-- Month header with expand/collapse -->
        <button
          @click="toggleMonth(monthIndex)"
          class="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200 hover:from-slate-100 hover:to-slate-200 transition-all duration-200 flex items-center justify-between"
        >
          <span class="font-semibold text-gray-900">{{ month.name }}</span>
          <svg 
            :class="['w-4 h-4 transition-transform duration-200', { 'rotate-180': expandedMonths.has(monthIndex) }]"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Month content (collapsible) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="expandedMonths.has(monthIndex)" class="p-4 bg-white">
            
            <!-- Day headers -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div
                v-for="day in dayHeaders"
                :key="day"
                class="text-xs font-medium text-gray-500 text-center py-1"
              >
                {{ day }}
              </div>
            </div>

            <!-- Calendar grid for this month -->
            <div class="grid grid-cols-7 gap-1">
              <CalendarDay
                v-for="day in month.days"
                :key="`${day.date}`"
                :day="{
                  ...day,
                  isSelected: day.date === selectedDate,
                  isToday: day.date === todayStr
                }"
                :compact="true"
                :hover-date="hoverDate"
                @click="handleDateClick"
                @mouseenter="handleDateHover"
                @mouseleave="handleDateLeave"
              />
            </div>
          </div>
        </Transition>
      </div>

      <!-- Enhanced legend with proper colors (specs requirement) -->
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <h4 class="font-medium text-gray-900 mb-3 text-sm">Legend</h4>
        <div class="space-y-2 text-xs">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-emerald-50 border border-emerald-200 rounded"></div>
            <span class="text-gray-600">Exercise Days</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-slate-50 border border-slate-200 rounded"></div>
            <span class="text-gray-600">Rest Days</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-amber-400 rounded-full"></div>
            <span class="text-gray-600">Today</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 border-2 border-amber-400 bg-white rounded"></div>
            <span class="text-gray-600">Selected</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-gray-300 rounded opacity-60"></div>
            <span class="text-gray-600">Past Dates</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef, nextTick } from 'vue'
import type { TrainingPlan, CalendarDay as CalendarDayType } from '@/types'
import { useCalendar } from '@/composables'
import CalendarDay from './CalendarDay.vue'

interface Props {
  trainingPlan: TrainingPlan | null
  selectedDate: string | null
  compact?: boolean
}

interface Emits {
  (e: 'date-select', date: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// State management (specs requirement)
const expandedMonths = ref<Set<number>>(new Set())
const hoverDate = ref<string | null>(null)
const todayStr = ref<string>(new Date().toISOString().slice(0, 10))

const {
  months,
  formatDate,
  getWeekNumber
} = useCalendar(toRef(props, 'trainingPlan'))

const dayHeaders = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] // Spanish day headers

// Initialize expanded months - current month expanded by default (specs requirement)
watch(months, (newMonths) => {
  if (newMonths.length > 0) {
    const today = new Date()
    const currentMonthIndex = newMonths.findIndex(month => {
      const monthDate = new Date(month.name + ' 1, 2025')
      return monthDate.getMonth() === today.getMonth()
    })
    
    if (currentMonthIndex >= 0) {
      expandedMonths.value = new Set([currentMonthIndex])
    } else {
      // Fallback to first month if current month not found
      expandedMonths.value = new Set([0])
    }
  }
}, { immediate: true })

// Month toggle behavior (specs requirement)
const toggleMonth = (monthIndex: number) => {
  const newExpanded = new Set(expandedMonths.value)
  if (newExpanded.has(monthIndex)) {
    newExpanded.delete(monthIndex)
  } else {
    newExpanded.add(monthIndex)
  }
  expandedMonths.value = newExpanded
}

// Enhanced date click handler with scroll synchronization (specs requirement)
const handleDateClick = async (date: string) => {
  emit('date-select', date)
  
  // Auto-expand month containing selected date if collapsed
  const monthIndex = months.value.findIndex(month =>
    month.days.some(day => day.date === date && day.isCurrentMonth)
  )
  
  if (monthIndex >= 0 && !expandedMonths.value.has(monthIndex)) {
    const newExpanded = new Set(expandedMonths.value)
    newExpanded.add(monthIndex)
    expandedMonths.value = newExpanded
    
    // Wait for month expansion animation before scrolling
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // Scroll to training plan section and highlight row
  scrollToTrainingPlan(date)
}

// Hover interactions for cross-component integration (specs requirement)
const handleDateHover = (date: string) => {
  hoverDate.value = date
  highlightPlanForDate(date)
}

const handleDateLeave = () => {
  hoverDate.value = null
  clearPlanHighlights()
}

// Cross-component integration functions (specs requirement)
const highlightPlanForDate = (dateString: string) => {
  // Clear previous highlights
  clearPlanHighlights()
  
  // Find and highlight the corresponding training plan row
  const planRow = document.querySelector(`#d-${dateString}`)
  if (planRow) {
    planRow.classList.add('bg-amber-50', 'ring-1', 'ring-amber-200')
  }
  
  // Also highlight the week containing this date
  const weekElement = document.querySelector(`[data-week-contains="${dateString}"]`)
  if (weekElement) {
    weekElement.classList.add('ring-1', 'ring-amber-300')
  }
}

const clearPlanHighlights = () => {
  // Remove all temporary highlights from training plan
  const highlightedRows = document.querySelectorAll('.bg-amber-50')
  highlightedRows.forEach(row => {
    row.classList.remove('bg-amber-50', 'ring-1', 'ring-amber-200', 'ring-amber-300')
  })
}

// Scroll synchronization (specs requirement)
const scrollToTrainingPlan = async (dateString: string) => {
  // First, try to open the week containing this date
  const weekElement = document.querySelector(`[data-week-start]`)
  if (weekElement) {
    // Check if the date falls within any week's range
    const allWeeks = document.querySelectorAll('[data-week-start]')
    for (const week of allWeeks) {
      const startDate = week.getAttribute('data-week-start')
      const endDate = week.getAttribute('data-week-end')
      
      if (startDate && endDate && dateString >= startDate && dateString <= endDate) {
        // Expand this week if it's collapsed
        const expandButton = week.querySelector('[data-week-toggle]')
        if (expandButton && !week.querySelector('.expanded')) {
          (expandButton as HTMLElement).click()
          await new Promise(resolve => setTimeout(resolve, 300)) // Wait for expansion
        }
        break
      }
    }
  }
  
  // Then scroll to the specific day row
  await nextTick()
  const dayRow = document.querySelector(`#d-${dateString}`)
  if (dayRow) {
    dayRow.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}

// Auto-navigate to month containing selected date (specs requirement)
watch(() => props.selectedDate, (newDate) => {
  if (newDate && months.value.length > 0) {
    const monthIndex = months.value.findIndex(month =>
      month.days.some(day => day.date === newDate && day.isCurrentMonth)
    )
    
    if (monthIndex >= 0) {
      // Ensure the month containing the selected date is expanded
      const newExpanded = new Set(expandedMonths.value)
      newExpanded.add(monthIndex)
      expandedMonths.value = newExpanded
    }
  }
})

// Cleanup on component unmount
const cleanup = () => {
  clearPlanHighlights()
  hoverDate.value = null
}

// Watch for training plan changes and initialize properly
watch(() => props.trainingPlan, (newPlan) => {
  if (newPlan) {
    // Reset state when new plan loads
    hoverDate.value = null
    clearPlanHighlights()
  }
}, { immediate: true })
</script>
