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

    <!-- Training weeks - all expanded -->
    <div class="space-y-8">
      <TrainingWeek
        v-for="week in plan?.weeks"
        :key="week.id"
        :week="week"
        :selected-date="selectedDate"
        :is-expanded="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrainingPlan } from '@/types'
import TrainingWeek from './TrainingWeek.vue'

interface Props {
  plan: TrainingPlan | null
  selectedDate: string | null
  expandedWeeks?: Set<string>
}

const props = defineProps<Props>()

// Static date formatting
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
