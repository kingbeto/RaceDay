<template>
  <div class="space-y-6">
    <!-- Plan header -->
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">{{ plan?.title }}</h1>
      <p class="text-lg text-gray-600">{{ plan?.subtitle }}</p>
      <p class="text-sm text-gray-500">{{ plan?.description }}</p>
      
      <div v-if="plan" class="flex items-center justify-center gap-6 text-sm text-gray-600 mt-4">
        <div class="flex items-center gap-2">
          <span class="font-medium">Inicio:</span>
          <span>{{ formatDate(plan.startDate) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium">Carrera:</span>
          <span class="text-red-600 font-medium">{{ formatDate(plan.raceDate) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-medium">Fin:</span>
          <span>{{ formatDate(plan.endDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Training weeks -->
    <div class="space-y-4">
              <TrainingWeek
          v-for="week in plan?.weeks"
          :key="week.id"
          :week="week"
          :selected-date="selectedDate"
          :is-expanded="props.expandedWeeks?.has(week.id) || false"
          @toggle-expand="toggleWeekExpansion"
          @date-select="emit('date-select', $event)"
          @nutrition-click="emit('nutrition-click', $event)"
          @grocery-click="emit('grocery-click', week.id)"
          @weekly-meals-click="emit('weekly-meals-click', week)"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { TrainingPlan, Week } from '@/types'
import TrainingWeek from './TrainingWeek.vue'

interface Props {
  plan: TrainingPlan | null
  selectedDate: string | null
  expandedWeeks?: Set<string>
}

interface Emits {
  (e: 'date-select', date: string): void
  (e: 'nutrition-click', date: string): void
  (e: 'grocery-click', weekId: string): void
  (e: 'weekly-meals-click', week: Week): void
  (e: 'toggle-expand', weekId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const toggleWeekExpansion = (weekId: string) => {
  emit('toggle-expand', weekId)
}


</script>
