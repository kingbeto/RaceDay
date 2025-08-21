<template>
  <div v-if="!compact" class="space-y-4">
    <BaseCard title="Training Calendar" class="sticky top-4">
      <div class="space-y-4">
        <!-- Month navigation -->
        <div class="flex items-center justify-between">
          <button
            @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h3 class="text-lg font-semibold text-gray-900 capitalize">
            {{ currentMonthName }}
          </h3>
          
          <button
            @click="nextMonth"
            class="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Calendar grid -->
        <div class="grid grid-cols-7 gap-1 text-center">
          <!-- Day headers -->
          <div
            v-for="day in dayHeaders"
            :key="day"
            class="p-2 text-xs font-medium text-gray-500 uppercase"
          >
            {{ day }}
          </div>

          <!-- Calendar days -->
          <CalendarDay
            v-for="day in currentMonthDays"
            :key="`${day.date}`"
            :day="day"
            @click="selectDate"
          />
        </div>

        <!-- Legend -->
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-primary-100 border border-primary-300 rounded"></div>
            <span class="text-gray-600">Training day</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
            <span class="text-gray-600">Race day</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-blue-500 rounded"></div>
            <span class="text-gray-600">Selected</span>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
  
  <!-- Compact mode for sidebar -->
  <div v-else class="space-y-4">
    <!-- Month navigation -->
    <div class="flex items-center justify-between">
      <button
        @click="previousMonth"
        class="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h3 class="text-sm font-medium text-gray-900 capitalize">
        {{ currentMonthName }}
      </h3>
      
      <button
        @click="nextMonth"
        class="p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Compact calendar grid -->
    <div class="grid grid-cols-7 gap-0.5 text-center">
      <!-- Day headers -->
      <div
        v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
        :key="day"
        class="text-xs font-medium text-gray-500 py-1"
      >
        {{ day }}
      </div>

      <!-- Calendar days -->
      <CalendarDay
        v-for="day in currentMonthDays"
        :key="`${day.date}`"
        :day="day"
        :compact="true"
        @click="selectDate"
      />
    </div>

    <!-- Compact legend -->
    <div class="space-y-1 text-xs">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-green-200 rounded-full"></div>
        <span class="text-gray-600">Exercise</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
        <span class="text-gray-600">Off</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
        <span class="text-gray-600">Today</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue'
import type { TrainingPlan, CalendarDay as CalendarDayType } from '@/types'
import { useCalendar } from '@/composables'
import BaseCard from '@/components/ui/BaseCard.vue'
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

const currentMonthIndex = ref(0)

const {
  months,
  formatDate,
  getWeekNumber
} = useCalendar(toRef(props, 'trainingPlan'))

const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const currentMonth = computed(() => {
  return months.value[currentMonthIndex.value] || null
})

const currentMonthName = computed(() => {
  return currentMonth.value?.name || ''
})

const currentMonthDays = computed((): CalendarDayType[] => {
  if (!currentMonth.value) return []
  
  return currentMonth.value.days.map(day => ({
    ...day,
    isSelected: day.date === props.selectedDate
  }))
})

const selectDate = (date: string) => {
  emit('date-select', date)
}

const previousMonth = () => {
  if (currentMonthIndex.value > 0) {
    currentMonthIndex.value--
  }
}

const nextMonth = () => {
  if (currentMonthIndex.value < months.value.length - 1) {
    currentMonthIndex.value++
  }
}

// Auto-navigate to month containing selected date
watch(() => props.selectedDate, (newDate) => {
  if (newDate && months.value.length > 0) {
    const monthIndex = months.value.findIndex(month =>
      month.days.some(day => day.date === newDate && day.isCurrentMonth)
    )
    
    if (monthIndex >= 0) {
      currentMonthIndex.value = monthIndex
    }
  }
})

// Initialize to first month when training plan loads
watch(() => props.trainingPlan, (newPlan) => {
  if (newPlan && months.value.length > 0) {
    currentMonthIndex.value = 0
  }
}, { immediate: true })
</script>
