<template>
  <!-- Static RaceDay Application - No Interactive Behaviors -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <!-- Static Header -->
    <header
      class="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm"
    >
      <div class="max-w-full mx-auto px-6 lg:px-12">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <!-- Brand -->
              <div class="flex items-center space-x-4">
                <div
                  class="w-[72px] h-[72px] rounded-2xl flex items-center justify-center overflow-hidden"
                >
                  <img :src="logoSrc" alt="RaceDay Logo" class="w-[60px] h-[60px] object-contain" />
                </div>
                <div>
                  <h1
                    class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                  >
                    RaceDay
                  </h1>
                  <p class="text-sm text-slate-600 font-medium">
                    Static training and nutrition display
                  </p>
                </div>
              </div>

              <!-- Race Date Badge -->
              <div
                class="hidden md:flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl"
              >
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span class="text-sm font-semibold text-amber-900">Race: December 1, 2025</span>
              </div>
            </div>

            <!-- Static Info Display -->
            <div class="hidden lg:flex items-center space-x-6">
              <!-- Nutrition Info -->
              <div
                class="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl"
              >
                <div class="flex items-center space-x-2">
                  <span class="text-emerald-600">🍽️</span>
                  <span class="text-sm font-medium text-emerald-900"
                    >Training: ~2,500 kcal | Rest: ~2,100 kcal</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-full mx-auto px-6 lg:px-12 py-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-12">
        <!-- Left Sidebar: Calendar & Shopping (1/3 width) -->
        <aside class="lg:col-span-4 mb-12 lg:mb-0">
          <div class="sticky top-32 space-y-8">
            <!-- Static Today's Focus - Moved to top for prominence -->
            <div
              class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50"
            >
              <div
                class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-amber-50 via-white to-orange-50/30"
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Today's Focus</h3>
                    <p class="text-sm text-slate-600 font-medium">{{ todayFormatted }}</p>
                  </div>
                </div>
              </div>
              <div class="p-6 space-y-6">
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-sm font-bold text-slate-900 flex items-center">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Training
                    </h4>
                    <div class="flex items-center gap-2">
                      <span
                        :class="`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                          trainingIntensity.color === 'red'
                            ? 'bg-red-500'
                            : trainingIntensity.color === 'orange'
                              ? 'bg-orange-500'
                              : trainingIntensity.color === 'blue'
                                ? 'bg-blue-500'
                                : 'bg-green-500'
                        }`"
                      >
                        {{ trainingIntensity.label }}
                      </span>
                      <span class="text-xs text-slate-600 font-medium">
                        {{ todaysTraining?.isExercise ? 'Exercise Day' : 'Rest Day' }}
                      </span>
                    </div>
                  </div>
                  <p class="text-sm text-slate-700 leading-relaxed">
                    {{ todaysTraining?.training || 'No training scheduled' }}
                  </p>
                </div>
                <div class="bg-emerald-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Nutrition Focus
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">{{ nutritionFocus }}</p>
                  <div class="mt-2 text-xs text-slate-600">
                    <span class="font-medium">Calories:</span>
                    {{
                      todaysTraining?.calories || (todaysTraining?.isExercise ? 2300 : 2100)
                    }}
                    kcal
                  </div>
                </div>
                <div class="text-xs text-slate-600 font-medium">📋 Meal plan details available</div>
              </div>
            </div>

            <!-- Calendar Section with Controls -->
            <div
              class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50"
            >
              <div
                class="p-4 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/30"
              >
                <div class="flex items-center justify-between">
                  <!-- Left side: Title and info -->
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 class="text-base font-semibold text-slate-900">Training Calendar</h2>
                      <p class="text-xs text-slate-600 font-medium">Aug 18 → Dec 1, 2025 (Race)</p>
                    </div>
                  </div>

                  <!-- Right side: Month Navigation -->
                  <div class="flex items-center gap-2">
                    <!-- Previous Month -->
                    <button
                      @click="navigateCalendar(-1)"
                      class="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-md transition-colors duration-200"
                      title="Previous Month"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <!-- Current Month Button -->
                    <button
                      @click="goToCurrentMonth"
                      class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm transition-all duration-200"
                      title="Go to Current Month"
                    >
                      Today
                    </button>

                    <!-- Next Month -->
                    <button
                      @click="navigateCalendar(1)"
                      class="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 rounded-md transition-colors duration-200"
                      title="Next Month"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <CalendarView
                  :training-plan="sampleTrainingPlan"
                  :selected-date="'2025-01-15'"
                  :compact="true"
                  :hovered-date="hoveredDate"
                  :initial-month-index="calendarMonthIndex"
                  @date-hover="handleCalendarHover"
                  @date-leave="handleCalendarLeave"
                  @month-changed="handleMonthChanged"
                />
              </div>
            </div>

            <!-- Static Shopping List Section -->
            <div
              class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50"
            >
              <div
                class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-emerald-50 via-white to-green-50/30"
              >
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 7m0 6v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13v-2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Shopping Lists</h3>
                    <p class="text-sm text-slate-600 font-medium">Weekly nutrition planning</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <GroceryList />
              </div>
            </div>
          </div>
        </aside>

        <!-- Static Main Content: Training Plan (2/3 width) -->
        <div class="lg:col-span-8">
          <div
            class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-100/50"
          >
            <!-- Static Training Plan Content -->
            <div class="min-h-96 p-8">
              <!-- Loading State -->
              <div v-if="isLoading" class="flex items-center justify-center min-h-96">
                <div class="text-center">
                  <div
                    class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"
                  ></div>
                  <p class="text-slate-600 font-medium">Loading training plan...</p>
                </div>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="flex items-center justify-center min-h-96">
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <p class="text-red-600 font-medium mb-2">Failed to load training plan</p>
                  <p class="text-slate-500 text-sm">{{ error }}</p>
                  <button
                    @click="loadTrainingPlan"
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>

              <!-- Training Plan Content -->
              <div v-else-if="sampleTrainingPlan">
                <TrainingPlanView
                  :plan="sampleTrainingPlan"
                  :selected-date="'2025-01-15'"
                  :is-expanded="true"
                  :hovered-date="hoveredDate"
                />
              </div>

              <!-- No Data State -->
              <div v-else class="flex items-center justify-center min-h-96">
                <div class="text-center">
                  <div
                    class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      class="w-6 h-6 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p class="text-slate-500 font-medium">No training plan available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- No modals or interactive elements - static display only -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import CalendarView from '@/components/calendar/CalendarView.vue'
import TrainingPlanView from '@/components/training/TrainingPlanView.vue'
import GroceryList from '@/components/grocery/GroceryList.vue'
import { useTrainingStore } from '@/stores/training'
import type { TrainingPlan } from '@/types'

// Logo placeholder - in a real app, this would be the actual logo import
const logoSrc = '/assets/images/raceday.svg'

// Use training store for data management
const trainingStore = useTrainingStore()
const { currentPlan: trainingPlan, isLoading, error } = trainingStore

// Shared reactive state for hover interactions between calendar and training plan
const hoveredDate = ref<string | null>(null)

// Calendar navigation state
const calendarMonthIndex = ref(0)

// Hover event handlers for calendar-training plan interaction
const handleCalendarHover = (date: string) => {
  hoveredDate.value = date
}

const handleCalendarLeave = () => {
  hoveredDate.value = null
}

// Calendar navigation handlers
const navigateCalendar = (direction: number) => {
  if (direction === -1 && calendarMonthIndex.value > 0) {
    calendarMonthIndex.value--
  } else if (
    direction === 1 &&
    calendarMonthIndex.value < (sampleTrainingPlan.value?.weeks.length || 0) - 1
  ) {
    calendarMonthIndex.value++
  }
}

const goToCurrentMonth = () => {
  // Reset to first month (current month logic is handled in CalendarView)
  calendarMonthIndex.value = 0
}

const handleMonthChanged = (newIndex: number) => {
  calendarMonthIndex.value = newIndex
}

// Load training plan using store
const loadTrainingPlan = async () => {
  await trainingStore.loadPlan()
}

// Load data on component mount
onMounted(() => {
  loadTrainingPlan()
})

// Computed property to provide sampleTrainingPlan for backward compatibility
const sampleTrainingPlan = computed(() => trainingPlan.value)

// Get today's date dynamically
const todayDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0] // YYYY-MM-DD format
})

// Get today's date formatted for display
const todayFormatted = computed(() => {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Find today's training data
const todaysTraining = computed(() => {
  if (!trainingPlan.value) return null

  const todayStr = todayDate.value

  for (const week of trainingPlan.value.weeks) {
    const todayTraining = week.rows.find(row => row.date === todayStr)
    if (todayTraining) {
      return todayTraining
    }
  }

  // If no training found for today, return a default rest day
  return {
    date: todayStr,
    day: 'Today',
    training: 'Rest Day - Recovery and preparation',
    food: 'Balanced nutrition with adequate protein',
    isExercise: false,
    isRaceDay: false,
    intensity: 'off',
    calories: 2100
  }
})

// Classify training intensity based on the new intensity field
const trainingIntensity = computed(() => {
  if (!todaysTraining.value) {
    return { level: 'off', label: 'OFF', color: 'green' }
  }

  const intensity = todaysTraining.value.intensity

  switch (intensity) {
    case 'high':
      return { level: 'high', label: 'HIGH', color: 'orange' }
    case 'moderate':
      return { level: 'moderate', label: 'MODERATE', color: 'blue' }
    case 'off':
      return { level: 'off', label: 'OFF', color: 'green' }
    default:
      return { level: 'off', label: 'OFF', color: 'green' }
  }
})

// Get nutrition focus based on training
const nutritionFocus = computed(() => {
  if (!todaysTraining.value || !todaysTraining.value.isExercise) {
    return 'Recovery nutrition with adequate protein and balanced carbs for maintenance.'
  }

  const intensity = trainingIntensity.value.level

  switch (intensity) {
    case 'high':
      return 'High-intensity fueling: 50-70g carbs/hour, sodium replacement, quality protein.'
    case 'moderate':
      return 'Moderate fueling: 40-60g carbs/hour, maintain hydration, balanced intake.'
    case 'off':
      return 'Light fueling: 30-40g carbs/hour, focus on whole foods and recovery.'
    default:
      return 'Balanced nutrition with adequate protein and complex carbohydrates.'
  }
})
</script>
