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

    <!-- Expand/Collapse All Buttons -->
    <div class="mb-6 flex items-center justify-center gap-4">
      <button
        @click="expandAllWeeks"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': allExpanded }"
        :disabled="allExpanded"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
        Expand All
      </button>

      <button
        @click="collapseAllWeeks"
        class="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        :class="{ 'opacity-50 cursor-not-allowed': !allExpanded && !expandedWeekId }"
        :disabled="!allExpanded && !expandedWeekId"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
        Collapse All
      </button>
    </div>

    <!-- Training weeks - current week expanded, others collapsed -->
    <div class="space-y-8">
      <TrainingWeek
        v-for="week in plan?.weeks"
        :key="week.id"
        :week="week"
        :selected-date="selectedDate"
        :is-expanded="isWeekExpanded(week.id)"
        @toggle="toggleWeek(week.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import type { TrainingPlan } from '@/types'
import TrainingWeek from './TrainingWeek.vue'

interface Props {
  plan: TrainingPlan | null
  selectedDate: string | null
  expandedWeeks?: Set<string>
}

const props = defineProps<Props>()

// Track expansion state
const expandedWeekId = ref<string | null>(null)
const allExpanded = ref(false) // Start with all weeks collapsed by default

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
  return allExpanded.value || expandedWeekId.value === weekId
}

// Expand all weeks
const expandAllWeeks = () => {
  allExpanded.value = true
  expandedWeekId.value = null
}

// Collapse all weeks
const collapseAllWeeks = () => {
  allExpanded.value = false
  expandedWeekId.value = null
}

// Toggle individual week
const toggleWeek = (weekId: string) => {
  if (allExpanded.value) {
    // If all are expanded, collapse all and expand only this week
    allExpanded.value = false
    expandedWeekId.value = weekId
  } else if (expandedWeekId.value === weekId) {
    // If this week is expanded, collapse it
    expandedWeekId.value = null
  } else {
    // Expand this week
    expandedWeekId.value = weekId
  }
}

// Expand the current week after component mounts and scroll to it
onMounted(async () => {
  if (currentWeekId.value && !allExpanded.value) {
    expandedWeekId.value = currentWeekId.value

    // Wait for the DOM to update after expansion
    await nextTick()

    // Scroll to the current week
    const currentWeekElement = document.getElementById(`week-${currentWeekId.value}`)
    if (currentWeekElement) {
      currentWeekElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
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
