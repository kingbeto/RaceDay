<template>
  <!-- Static calendar view - no interactions -->
  <div class="max-h-[calc(100vh - 2rem)] overflow-y-auto">
    <div class="space-y-4">

      <!-- All months expanded - static display -->
      <div
        v-for="month in months"
        :key="month.name"
        class="border border-gray-200 rounded-lg overflow-hidden"
      >
        <!-- Month header - static -->
        <div class="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200 flex items-center">
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
import { ref, toRef } from 'vue'
import type { TrainingPlan } from '@/types'
import { useCalendar } from '@/composables'
import CalendarDay from './CalendarDay.vue'

interface Props {
  trainingPlan: TrainingPlan | null
  selectedDate: string | null
  compact?: boolean
}

const props = defineProps<Props>()

// Static data for today
const todayStr = ref<string>(new Date().toISOString().slice(0, 10))

// Get calendar data from composable
const {
  months,
  dateMap,
  getEntryForDate
} = useCalendar(toRef(props, 'trainingPlan'))

const dayHeaders = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] // Spanish day headers
</script>
