<template>
  <BaseCard 
    :id="`week-${week.id}`"
    class="transition-all duration-300"
    :class="{ 'ring-2 ring-primary-500': hasSelectedDate }"
    :data-week-start="week.start"
    :data-week-end="week.end"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            @click="$emit('toggle-expand', week.id)"
            class="flex items-center gap-2 hover:text-primary-600 transition-colors"
            :data-week-toggle="week.id"
          >
            <svg 
              :class="['w-5 h-5 transition-transform duration-200', { 'rotate-90': isExpanded }]"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <h3 class="text-lg font-semibold text-gray-900">{{ week.label }}</h3>
          </button>
          
          <span :class="phaseClasses">{{ phaseText }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <BaseButton
            variant="outline"
            size="sm"
            @click="$emit('weekly-meals-click')"
            title="View weekly meal table"
          >
            📋 Meals
          </BaseButton>
          <BaseButton
            variant="outline"
            size="sm"
            @click="$emit('grocery-click')"
          >
            🛒 Lista
          </BaseButton>
        </div>
      </div>
      
      <div class="mt-2 text-sm text-gray-600">
        <p>{{ formatDateRange(week.start, week.end) }}</p>
        <p class="mt-1">{{ week.summary }}</p>
      </div>
    </template>

    <!-- Expanded content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isExpanded" class="overflow-hidden">
        <!-- Training table with proper design (specs requirement) -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Table header with gradient background (specs requirement) -->
            <thead>
              <tr class="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-gray-200">
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden sm:table-cell">Day</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Training</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden lg:table-cell">Focus</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Nutrition</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="day in week.rows"
                :key="day.date"
                :id="`d-${day.date}`"
                :class="[
                  'hover:bg-gray-50 transition-colors duration-150 cursor-pointer',
                  {
                    'border-l-4 border-amber-400 bg-amber-50': day.date === selectedDate,
                    'bg-white': day.date !== selectedDate
                  }
                ]"
                @click="$emit('date-select', day.date)"
              >
                <!-- Date -->
                <td class="px-4 py-3">
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900">
                      {{ formatDayDate(day.date) }}
                    </span>
                    <!-- Exercise indicator dot -->
                    <div
                      v-if="day.isExercise"
                      class="ml-2 w-2 h-2 bg-emerald-500 rounded-full"
                      title="Exercise day"
                    ></div>
                  </div>
                </td>
                
                <!-- Day (hidden on small screens) -->
                <td class="px-4 py-3 hidden sm:table-cell">
                  <span class="text-sm text-gray-600">{{ getDayName(day.date) }}</span>
                </td>
                
                <!-- Training -->
                <td class="px-4 py-3">
                  <div class="text-sm text-gray-900">
                    {{ day.training || 'Off' }}
                  </div>
                </td>
                
                <!-- Focus (hidden on small screens) -->
                <td class="px-4 py-3 hidden lg:table-cell">
                  <div class="text-sm text-gray-600">
                    {{ day.focus || day.food || '-' }}
                  </div>
                </td>
                
                <!-- Nutrition button -->
                <td class="px-4 py-3 text-center">
                  <button
                    @click.stop="$emit('nutrition-click', day.date)"
                    class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors duration-150"
                    title="View meals"
                  >
                    📋
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Week } from '@/types'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import TrainingDay from './TrainingDay.vue'

interface Props {
  week: Week
  selectedDate: string | null
  isExpanded: boolean
}

interface Emits {
  (e: 'toggle-expand', weekId: string): void
  (e: 'date-select', date: string): void
  (e: 'nutrition-click', date: string): void
  (e: 'grocery-click'): void
  (e: 'weekly-meals-click'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const hasSelectedDate = computed(() => {
  return props.week.rows.some(row => row.date === props.selectedDate)
})

const phaseClasses = computed(() => {
  const base = 'px-2 py-1 text-xs font-medium rounded-full'
  
  switch (props.week.phase) {
    case 'base':
      return `${base} bg-blue-100 text-blue-800`
    case 'build':
      return `${base} bg-green-100 text-green-800`
    case 'peak':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'taper':
      return `${base} bg-purple-100 text-purple-800`
    case 'race':
      return `${base} bg-red-100 text-red-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
})

const phaseText = computed(() => {
  switch (props.week.phase) {
    case 'base':
      return 'Base'
    case 'build':
      return 'Construcción'
    case 'peak':
      return 'Pico'
    case 'taper':
      return 'Descarga'
    case 'race':
      return 'Carrera'
    default:
      return 'General'
  }
})

const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  }
  
  if (startDate.getFullYear() !== endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('es-ES', { ...options, year: 'numeric' })} - ${endDate.toLocaleDateString('es-ES', { ...options, year: 'numeric' })}`
  }
  
  return `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`
}

const formatDayDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

const getDayName = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}
</script>
