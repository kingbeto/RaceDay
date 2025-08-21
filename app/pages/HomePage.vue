<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                RaceDay
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ currentPlan?.subtitle || 'Plan, track, and fuel your athletic goals' }}
                <span v-if="currentPlan" class="ml-4">
                  <strong>Race:</strong> {{ formatDate(currentPlan.raceDate) }}
                </span>
              </p>
            </div>
            <div class="hidden lg:flex items-center gap-4">
              <div class="text-sm text-gray-600">
                🍽️ Nutrition: High-protein focus. Training days: ~2,500 kcal | Rest days: ~2,100 kcal
              </div>
              <div class="flex gap-2">
                <BaseButton variant="outline" size="sm" @click="expandAll">Expand all</BaseButton>
                <BaseButton variant="outline" size="sm" @click="collapseAll">Collapse all</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        
        <!-- Left Sidebar: Calendar & Shopping -->
        <aside class="lg:col-span-4 mb-8 lg:mb-0">
          <div class="sticky top-24 space-y-6">
            
            <!-- Calendar Section -->
            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100">
                <h2 class="font-semibold text-gray-900">Training Calendar</h2>
                <p class="text-xs text-gray-500 mt-1">
                  {{ currentPlan ? 'Aug 18 → Dec 1, 2025 (Race)' : 'Select a training plan' }}
                </p>
              </div>
              <div class="p-4 max-h-96 overflow-y-auto">
                <CalendarView 
                  v-if="currentPlan"
                  :training-plan="currentPlan"
                  :selected-date="selectedDate"
                  @date-select="onDateSelect"
                  :compact="true"
                />
                <div v-else class="text-center py-8 text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm">Load a training plan to view calendar</p>
                </div>
              </div>
            </div>

            <!-- Shopping List Section -->
            <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
                <h3 class="font-semibold text-gray-900 flex items-center">
                  <span class="mr-2">🛒</span>
                  Shopping Lists
                </h3>
              </div>
              <div class="p-4">
                <div class="space-y-3">
                  <select
                    v-model="selectedShoppingWeek"
                    class="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select training week...</option>
                    <option value="W0">W0 - Kick-off Week</option>
                    <option value="W11">W11 - B2B Weekend</option>
                    <option value="W13">W13 - Stage Simulation</option>
                    <option value="W14">W14 - Taper Week</option>
                    <option value="RACE">RACE - Race Week</option>
                  </select>
                  <BaseButton 
                    variant="outline" 
                    size="sm" 
                    class="w-full"
                    @click="onGroceryClick(selectedShoppingWeek)"
                    :disabled="!selectedShoppingWeek"
                  >
                    <span class="mr-2">🖨️</span>
                    View Shopping List
                  </BaseButton>
                </div>
              </div>
            </div>

            <!-- Today's Focus (if date selected) -->
            <div v-if="selectedDayData" class="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div class="p-4 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-amber-100">
                <h3 class="font-semibold text-gray-900">Today's Focus</h3>
                <p class="text-xs text-gray-500 mt-1">{{ formatSelectedDate(selectedDate) }}</p>
              </div>
              <div class="p-4">
                <div class="space-y-3 text-sm">
                  <div>
                    <label class="block text-gray-600 font-medium mb-1">Training:</label>
                    <p class="text-gray-900">{{ selectedDayData.training }}</p>
                  </div>
                  <div>
                    <label class="block text-gray-600 font-medium mb-1">Nutrition Focus:</label>
                    <p class="text-gray-900">{{ selectedDayData.food }}</p>
                  </div>
                  <BaseButton 
                    variant="primary" 
                    size="sm" 
                    class="w-full"
                    @click="onNutritionClick(selectedDate)"
                  >
                    <span class="mr-2">📋</span>
                    View Meal Plan
                  </BaseButton>
                </div>
              </div>
            </div>

          </div>
        </aside>

        <!-- Main Content: Training Plan -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            
            <!-- Training Plan Header -->
            <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-900">Training Plan</h2>
                  <p class="text-sm text-gray-600 mt-1">
                    {{ currentPlan ? 'Weekly schedule and progression' : 'Load a plan to get started' }}
                  </p>
                </div>
                <div class="text-xs text-gray-500">
                  Today: {{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                </div>
              </div>
            </div>

            <!-- Training Plan Content -->
            <div class="min-h-96">
              <LoadingSpinner v-if="isLoading" message="Loading training plan..." />
              
              <div v-else-if="error" class="text-center py-12">
                <div class="text-red-400 mb-4">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-gray-600 mb-4">{{ error }}</p>
                <BaseButton @click="loadPlan">Try again</BaseButton>
              </div>

              <div v-else-if="!currentPlan" class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Welcome to RaceDay</h3>
                <p class="text-gray-600 mb-4">Your comprehensive training and nutrition planner</p>
                <BaseButton @click="loadPlan">Load Training Plan</BaseButton>
              </div>

              <TrainingPlanView 
                v-else
                :plan="currentPlan"
                :selected-date="selectedDate"
                :expanded-weeks="expandedWeeks"
                @date-select="onDateSelect"
                @nutrition-click="onNutritionClick"
                @grocery-click="onGroceryClick"
                @weekly-meals-click="onWeeklyMealsClick"
                @toggle-expand="toggleWeekExpansion"
              />
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Modals -->
    <NutritionModal 
      v-model:show="showNutritionModal"
      :date="selectedNutritionDate"
    />

    <WeeklyMealsModal
      :show="showingWeeklyMeals"
      :week-data="selectedWeekMealsData"
      @close="closeWeeklyMealsModal"
    />

    <!-- Global Tooltip -->
    <GlobalTooltip />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrainingStore, useNutritionStore, useGroceryStore } from '@/stores'
import CalendarView from '@/components/calendar/CalendarView.vue'
import TrainingPlanView from '@/components/training/TrainingPlanView.vue'
import NutritionModal from '@/components/nutrition/NutritionModal.vue'
import WeeklyMealsModal from '@/components/nutrition/WeeklyMealsModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import GlobalTooltip from '@/components/ui/GlobalTooltip.vue'
import { useWeeklyMeals } from '@/composables/useWeeklyMeals'
import type { Week } from '@/types'

const trainingStore = useTrainingStore()
const nutritionStore = useNutritionStore()
const groceryStore = useGroceryStore()

const { currentPlan, selectedDate, isLoading, error } = storeToRefs(trainingStore)

const showNutritionModal = ref(false)
const selectedNutritionDate = ref<string | null>(null)
const selectedShoppingWeek = ref<string>('')
const expandedWeeks = ref<Set<string>>(new Set())

// Weekly meals functionality
const {
  showingWeeklyMeals,
  selectedWeekMealsData,
  showWeeklyMealsModal,
  closeWeeklyMealsModal
} = useWeeklyMeals()

// Get data for selected day
const selectedDayData = computed(() => {
  if (!selectedDate.value) return null
  return trainingStore.getDayByDate(selectedDate.value)
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatSelectedDate = (dateString: string | null): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  })
}

const onDateSelect = (date: string) => {
  trainingStore.setSelectedDate(date)
  
  // Auto-expand the week containing this date
  if (currentPlan.value) {
    const week = currentPlan.value.weeks.find(w => 
      w.rows.some(row => row.date === date)
    )
    if (week) {
      expandedWeeks.value.add(week.id)
    }
  }
}

const onNutritionClick = (date: string | null) => {
  if (!date) return
  selectedNutritionDate.value = date
  showNutritionModal.value = true
}

const onGroceryClick = (weekId: string) => {
  selectedShoppingWeek.value = weekId
  console.log('Grocery clicked for week:', weekId)
}

const onWeeklyMealsClick = (week: Week) => {
  const getMealsForDate = (date: string) => {
    return nutritionStore.getNutritionForDate(date)?.meals || []
  }
  showWeeklyMealsModal(week, getMealsForDate)
}

const toggleWeekExpansion = (weekId: string) => {
  if (expandedWeeks.value.has(weekId)) {
    expandedWeeks.value.delete(weekId)
  } else {
    expandedWeeks.value.add(weekId)
  }
}

const expandAll = () => {
  if (currentPlan.value) {
    currentPlan.value.weeks.forEach(week => {
      expandedWeeks.value.add(week.id)
    })
  }
}

const collapseAll = () => {
  expandedWeeks.value.clear()
}

const loadPlan = async () => {
  await Promise.all([
    trainingStore.loadPlan(),
    nutritionStore.loadNutritionData(),
    groceryStore.loadGroceryData()
  ])
  
  // Expand first week by default
  if (currentPlan.value && currentPlan.value.weeks.length > 0) {
    expandedWeeks.value.add(currentPlan.value.weeks[0].id)
  }
}

onMounted(() => {
  loadPlan()
})
</script>
