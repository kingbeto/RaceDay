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
      </div>
    </div>

    <!-- Weekly Schedule and Progression Title -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Weekly Schedule and Progression</h2>
      <p class="text-slate-600 text-sm">18-week comprehensive training program with structured progression</p>
    </div>

    <!-- Training weeks - current week expanded, others collapsed -->
    <div class="space-y-8">
      <TrainingWeek
        v-for="week in plan?.weeks"
        :key="week.id"
        :week="week"
        :selected-date="selectedDate"
        :is-expanded="isWeekExpanded(week.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { TrainingPlan } from '@/types'
import TrainingWeek from './TrainingWeek.vue'

interface Props {
  plan: TrainingPlan | null
  selectedDate: string | null
  expandedWeeks?: Set<string>
}

const props = defineProps<Props>()

// Track which week is expanded
const expandedWeekId = ref<string | null>(null)

// Get today's date in YYYY-MM-DD format
const todayDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Find the current week based on today's date
const currentWeekId = computed(() => {
  if (!props.plan?.weeks) return null

  for (const week of props.plan.weeks) {
    const weekStart = new Date(week.start)
    const weekEnd = new Date(week.end)
    const today = new Date(todayDate.value)

    if (today >= weekStart && today <= weekEnd) {
      return week.id
    }
  }

  return null
})

// Determine if a week should be expanded
const isWeekExpanded = (weekId: string) => {
  return expandedWeekId.value === weekId
}

// Expand the current week after component mounts
onMounted(() => {
  if (currentWeekId.value) {
    expandedWeekId.value = currentWeekId.value
  }
})

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
