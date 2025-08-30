<template>
  <div class="space-y-4">
    <!-- Enhanced plan header -->
    <div class="text-center space-y-3 mb-6">
      <div class="space-y-1.5">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">{{ plan?.title }}</h1>
        <p class="text-base text-slate-600 font-medium">{{ plan?.subtitle }}</p>
        <p class="text-slate-500 max-w-2xl mx-auto leading-relaxed text-sm">{{ plan?.description }}</p>
      </div>

      <div v-if="plan" class="flex items-center justify-center gap-4 text-xs">
        <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
          <span class="font-semibold text-slate-700">Start</span>
          <span class="text-slate-900">{{ formatDate(plan.startDate) }}</span>
        </div>
        <div class="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200/60 rounded-lg">
          <span class="font-semibold text-red-700">Race</span>
          <span class="text-red-900 font-semibold">{{ formatDate(plan.raceDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Weekly Schedule and Progression Title -->
    <div class="mb-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
      <div class="text-center sm:text-left">
        <h2 class="text-lg font-semibold text-slate-800">Weekly Schedule and Progression</h2>
        <p class="text-slate-600 text-xs">18-week comprehensive training program with structured progression</p>
      </div>
      <!-- Expand/Collapse All Buttons -->
      <div class="flex items-center justify-center gap-2">
      <button
        @click="expandAllWeeks"
        class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm transition-all duration-200 flex items-center gap-1.5"
        :class="{ 'opacity-50 cursor-not-allowed': allExpanded }"
        :disabled="allExpanded"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
        Expand All
      </button>

      <button
        @click="collapseAllWeeks"
        class="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-md shadow-sm transition-all duration-200 flex items-center gap-1.5"
        :class="{ 'opacity-50 cursor-not-allowed': !allExpanded && !expandedWeekId }"
        :disabled="!allExpanded && !expandedWeekId"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
        Collapse All
      </button>
      </div>
    </div>

    <!-- Training weeks - current week expanded, others collapsed -->
    <div
      class="max-h-[65vh] overflow-y-auto overflow-x-hidden transition-all duration-200"
      :class="shouldHighlightContainer ? 'ring-2 ring-blue-400 ring-opacity-60 shadow-lg shadow-blue-200/50' : ''"
    >
      <div class="space-y-8 pr-2">
        <TrainingWeek
          v-for="week in plan?.weeks"
          :key="week.id"
          :week="week"
          :selected-date="selectedDate"
          :is-expanded="isWeekExpanded(week.id)"
          :hovered-date="props.hoveredDate"
          @toggle="toggleWeek(week.id)"
        />
      </div>
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
  hoveredDate?: string | null
}

const props = defineProps<Props>()

// Track expansion state
const expandedWeekId = ref<string | null>(null)
const allExpanded = ref(false) // Start with all weeks collapsed by default

// Computed properties for hover highlighting
const shouldHighlightContainer = computed(() => {
  return props.hoveredDate && !allExpanded.value && !expandedWeekId.value
})

const getHighlightedRow = computed(() => {
  if (!props.hoveredDate || allExpanded.value) return null

  // Find the week containing the hovered date
  const week = props.plan?.weeks.find(w =>
    w.rows.some(row => row.date === props.hoveredDate)
  )

  if (!week) return null

  // If week is expanded, return the specific row
  if (expandedWeekId.value === week.id) {
    return week.rows.find(row => row.date === props.hoveredDate) || null
  }

  return null
})

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
