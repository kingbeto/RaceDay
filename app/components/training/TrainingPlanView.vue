<template>
  <div class="space-y-6">
    <!-- Enhanced plan header -->
    <div class="text-center space-y-6 mb-12">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">{{ plan?.title }}</h1>
        <p class="text-xl text-slate-600 font-medium">{{ plan?.subtitle }}</p>
        <p class="text-slate-500 max-w-2xl mx-auto leading-relaxed">{{ plan?.description }}</p>
      </div>
      
      <div v-if="plan" class="flex items-center justify-center gap-8 text-sm">
        <div class="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
          <span class="font-bold text-slate-700">Start:</span>
          <span class="text-slate-900 font-medium">{{ formatDate(plan.startDate) }}</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/60 rounded-xl">
          <span class="font-bold text-red-700">Race:</span>
          <span class="text-red-900 font-bold">{{ formatDate(plan.raceDate) }}</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
          <span class="font-bold text-slate-700">End:</span>
          <span class="text-slate-900 font-medium">{{ formatDate(plan.endDate) }}</span>
        </div>
      </div>
    </div>

        <!-- Enhanced Training weeks with better spacing -->
    <div class="space-y-8">
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
