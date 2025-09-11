<template>
  <!-- Static calendar view - no interactions -->
  <div class="max-h-[calc(100vh - 2rem)] overflow-y-auto">
    <div class="space-y-4">
      <!-- Months display with expand/collapse logic -->
      <div
        v-for="month in months"
        :key="month.name"
        v-show="shouldShowMonth(month.name)"
        class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
        :class="{
          'opacity-100': shouldShowMonth(month.name),
          'opacity-0': !shouldShowMonth(month.name)
        }"
      >
        <!-- Month header - static -->
        <div
          class="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200 flex items-center"
        >
          <span class="font-semibold text-gray-900">{{ month.name }}</span>
        </div>

        <!-- Month content - always visible -->
        <div class="p-4 bg-white">
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
              :date-map="dateMap"
              :get-entry-for-date="getEntryForDate"
              :is-hovered="day.date === hoveredDate"
              @hover="emit('dateHover', day.date)"
              @leave="emit('dateLeave')"
            />
          </div>
        </div>
      </div>

      <!-- Static legend -->
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
import { ref, computed, toRef, watch, onMounted, onUnmounted } from 'vue'
import type { TrainingPlan } from '@/types'
import { useCalendar } from '@/composables'
import CalendarDay from './CalendarDay.vue'

interface Props {
  trainingPlan: TrainingPlan | null
  selectedDate: string | null
  compact?: boolean
  hoveredDate?: string | null
  initialMonthIndex?: number
}

interface Emits {
  dateHover: [date: string]
  dateLeave: []
  monthChanged: [index: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Static data for today - use a fixed date for demo purposes
// Since the training plan is for 2025, we'll simulate being in August 2025
const todayStr = ref<string>('2025-08-30') // Fixed to August 30, 2025 for demo

// Get current month for default expansion
// Find the month in the training plan that contains today's date
const getCurrentMonthInTrainingPlan = () => {
  if (!props.trainingPlan) return null

  const today = new Date()
  const todayString = today.toISOString().slice(0, 10)

  // Find which week contains today
  for (const week of props.trainingPlan.weeks) {
    const todayInWeek = week.rows.find(row => row.date === todayString)
    if (todayInWeek) {
      // Return the month name from this week's start date
      const weekStartDate = new Date(week.start)
      return weekStartDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      })
    }
  }

  // If today is not found, use the current month from the plan's start date
  const planStartDate = new Date(props.trainingPlan.startDate)
  return planStartDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long'
  })
}

const currentMonth = computed(() => getCurrentMonthInTrainingPlan())

// Month navigation state
const currentVisibleMonthIndex = ref(props.initialMonthIndex || 0)
const visibleMonthName = computed(() => {
  if (!months.value.length) return null
  return months.value[currentVisibleMonthIndex.value]?.name || null
})

// Navigation functions
const goToPreviousMonth = () => {
  if (currentVisibleMonthIndex.value > 0) {
    currentVisibleMonthIndex.value--
    emit('monthChanged', currentVisibleMonthIndex.value)
  }
}

const goToNextMonth = () => {
  if (currentVisibleMonthIndex.value < months.value.length - 1) {
    currentVisibleMonthIndex.value++
    emit('monthChanged', currentVisibleMonthIndex.value)
  }
}

const goToCurrentMonth = () => {
  if (!props.trainingPlan) return

  const targetMonthName = currentMonth.value
  const targetIndex = months.value.findIndex(month => month.name === targetMonthName)
  if (targetIndex >= 0) {
    currentVisibleMonthIndex.value = targetIndex
    emit('monthChanged', currentVisibleMonthIndex.value)
  }
}

// Get calendar data from composable
const { months, dateMap, getEntryForDate } = useCalendar(toRef(props, 'trainingPlan'))

const dayHeaders = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] // Spanish day headers

// Watch for changes to initialMonthIndex prop
watch(
  () => props.initialMonthIndex,
  newIndex => {
    if (newIndex !== undefined && newIndex !== currentVisibleMonthIndex.value) {
      currentVisibleMonthIndex.value = newIndex
    }
  }
)

// Listen for custom navigation events
const handleNavigation = (event: CustomEvent) => {
  if (event.detail?.direction === -1) {
    goToPreviousMonth()
  } else if (event.detail?.direction === 1) {
    goToNextMonth()
  }
}

const handleGoToCurrent = () => {
  goToCurrentMonth()
}

// Add event listeners on mount
onMounted(() => {
  window.addEventListener('navigate-calendar', handleNavigation as EventListener)
  window.addEventListener('go-to-current-month', handleGoToCurrent)
})

onUnmounted(() => {
  window.removeEventListener('navigate-calendar', handleNavigation as EventListener)
  window.removeEventListener('go-to-current-month', handleGoToCurrent)
})

// Function to check if month should be visible
const shouldShowMonth = (monthName: string) => {
  return monthName === visibleMonthName.value
}
</script>
