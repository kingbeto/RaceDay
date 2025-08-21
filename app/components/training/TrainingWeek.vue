<template>
  <BaseCard 
    :id="`week-${week.id}`"
    class="transition-all duration-300"
    :class="{ 'ring-2 ring-primary-500': hasSelectedDate }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            @click="$emit('toggle-expand', week.id)"
            class="flex items-center gap-2 hover:text-primary-600 transition-colors"
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
      <div v-if="isExpanded" class="space-y-3">
        <TrainingDay
          v-for="day in week.rows"
          :key="day.date"
          :day="day"
          :is-selected="day.date === selectedDate"
          @click="$emit('date-select', day.date)"
          @nutrition-click="$emit('nutrition-click', day.date)"
        />
      </div>
    </Transition>
  </BaseCard>
</template>

<script setup lang="ts">
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
</script>
