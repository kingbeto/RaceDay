<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <!-- Enhanced Header -->
    <header class="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div class="max-w-full mx-auto px-6 lg:px-12">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <!-- Brand -->
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    RaceDay
                  </h1>
                  <p class="text-sm text-slate-600 font-medium">
                    {{ currentPlan?.subtitle || 'Plan, track, and fuel your athletic goals' }}
                  </p>
                </div>
              </div>
              
              <!-- Race Date Badge -->
              <div v-if="currentPlan" class="hidden md:flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl">
                <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-semibold text-amber-900">Race: {{ formatDate(currentPlan.raceDate) }}</span>
              </div>
            </div>
            
            <!-- Controls -->
            <div class="hidden lg:flex items-center space-x-6">
              <!-- Nutrition Info -->
              <div class="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl">
                <div class="flex items-center space-x-2">
                  <span class="text-emerald-600">🍽️</span>
                  <span class="text-sm font-medium text-emerald-900">Training: ~2,500 kcal | Rest: ~2,100 kcal</span>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex items-center bg-slate-100/80 rounded-xl p-1 space-x-1">
                <BaseButton variant="ghost" size="sm" @click="expandAll" class="px-4 py-2">Expand all</BaseButton>
                <BaseButton variant="ghost" size="sm" @click="collapseAll" class="px-4 py-2">Collapse all</BaseButton>
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
            
            <!-- Enhanced Calendar Section -->
            <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg font-bold text-slate-900">Training Calendar</h2>
                    <p class="text-sm text-slate-600 font-medium">
                      {{ currentPlan ? 'Aug 18 → Dec 1, 2025 (Race)' : 'Select a training plan' }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <CalendarView 
                  v-if="currentPlan"
                  :training-plan="currentPlan"
                  :selected-date="selectedDate"
                  @date-select="onDateSelect"
                  :compact="true"
                />
                <div v-else class="text-center py-12 text-slate-500">
                  <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p class="text-sm font-medium">Load a training plan to view calendar</p>
                </div>
              </div>
            </div>

            <!-- Enhanced Shopping List Section -->
            <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-emerald-50 via-white to-green-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 7m0 6v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13v-2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Shopping Lists</h3>
                    <p class="text-sm text-slate-600 font-medium">Weekly nutrition planning</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div class="relative">
                    <select
                      v-model="selectedShoppingWeek"
                      class="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    >
                      <option value="">Select training week...</option>
                      <option value="W0">W0 - Kick-off Week</option>
                      <option value="W11">W11 - B2B Weekend</option>
                      <option value="W13">W13 - Stage Simulation</option>
                      <option value="W14">W14 - Taper Week</option>
                      <option value="RACE">RACE - Race Week</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </div>
                  <BaseButton 
                    variant="primary" 
                    size="md" 
                    class="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-lg shadow-emerald-200/50"
                    @click="onGroceryClick(selectedShoppingWeek)"
                    :disabled="!selectedShoppingWeek"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    View Shopping List
                  </BaseButton>
                </div>
              </div>
            </div>

            <!-- Enhanced Today's Focus -->
            <div v-if="selectedDayData" class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-amber-50 via-white to-orange-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Today's Focus</h3>
                    <p class="text-sm text-slate-600 font-medium">{{ formatSelectedDate(selectedDate) }}</p>
                  </div>
                </div>
              </div>
              <div class="p-6 space-y-6">
                <div class="bg-slate-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Training
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">{{ selectedDayData.training }}</p>
                </div>
                <div class="bg-emerald-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Nutrition Focus
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">{{ selectedDayData.food }}</p>
                </div>
                <BaseButton 
                  variant="primary" 
                  size="md" 
                  class="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-lg shadow-emerald-200/50"
                  @click="onNutritionClick(selectedDate)"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  View Meal Plan
                </BaseButton>
              </div>
            </div>

          </div>
        </aside>

        <!-- Enhanced Main Content: Training Plan (2/3 width) -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-100/50">
            
            <!-- Enhanced Training Plan Header -->
            <div class="p-8 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/20">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-slate-900">{{ currentPlan?.title || 'Training Plan' }}</h2>
                    <p class="text-slate-600 font-medium">
                      {{ currentPlan ? 'Weekly schedule and progression' : 'Load a plan to get started' }}
                    </p>
                  </div>
                </div>
                <div class="hidden md:flex items-center space-x-4">
                  <div class="px-4 py-2 bg-slate-100/60 rounded-xl">
                    <span class="text-sm font-medium text-slate-600">
                      Today: {{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Enhanced Training Plan Content (scrollable) -->
            <div class="min-h-96 p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
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

    <!-- Lazy-loaded Modals -->
    <Suspense>
      <NutritionModal
        v-if="showNutritionModal"
        v-model:show="showNutritionModal"
        :date="selectedNutritionDate"
      />
      <template #fallback>
        <div v-if="showNutritionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6">
            <LoadingSpinner message="Loading nutrition details..." />
          </div>
        </div>
      </template>
    </Suspense>

    <Suspense>
      <WeeklyMealsModal
        v-if="showingWeeklyMeals"
        :show="showingWeeklyMeals"
        :week-data="selectedWeekMealsData"
        @close="closeWeeklyMealsModal"
      />
      <template #fallback>
        <div v-if="showingWeeklyMeals" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6">
            <LoadingSpinner message="Loading weekly meals..." />
          </div>
        </div>
      </template>
    </Suspense>

    <!-- Global Tooltip -->
    <GlobalTooltip />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrainingStore, useNutritionStore, useGroceryStore } from '@/stores'
import CalendarView from '@/components/calendar/CalendarView.vue'
import TrainingPlanView from '@/components/training/TrainingPlanView.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import GlobalTooltip from '@/components/ui/GlobalTooltip.vue'
import { useWeeklyMeals } from '@/composables/useWeeklyMeals'
import type { Week } from '@/types'

// Lazy-loaded components
const NutritionModal = defineAsyncComponent(() => import('@/components/nutrition/NutritionModal.vue'))
const WeeklyMealsModal = defineAsyncComponent(() => import('@/components/nutrition/WeeklyMealsModal.vue'))

const trainingStore = useTrainingStore()
const nutritionStore = useNutritionStore()
const groceryStore = useGroceryStore()

const { currentPlan, selectedDate, isLoading, error } = storeToRefs(trainingStore)

const showNutritionModal = ref(false)
const selectedNutritionDate = ref<string | null>(null)
const selectedShoppingWeek = ref<string>('')
const expandedWeeks = ref<Set<string>>(new Set())

// Auto-expand current week on load (specs requirement)
const initializeExpandedWeeks = () => {
  if (!currentPlan.value) return

  const today = new Date().toISOString().slice(0, 10)

  // Find the week containing today's date
  const currentWeek = currentPlan.value.weeks.find(week => {
    return today >= week.start && today <= week.end
  })

  if (currentWeek) {
    // Select today if present, otherwise first day of the current week
    const todayInWeek = currentWeek.rows?.find(row => row.date === today)?.date
    const firstDayOfWeek = currentWeek.rows?.[0]?.date
    if (!selectedDate.value) {
      trainingStore.setSelectedDate(todayInWeek || firstDayOfWeek || null)
    }
    expandedWeeks.value = new Set([currentWeek.id])
  } else {
    // Fallback to first week if today is not within plan dates
    if (currentPlan.value.weeks.length > 0) {
      const firstWeek = currentPlan.value.weeks[0]
      const firstDay = firstWeek.rows?.[0]?.date
      if (!selectedDate.value) {
        trainingStore.setSelectedDate(firstDay || null)
      }
      expandedWeeks.value = new Set([firstWeek.id])
    }
  }
}

// Weekly meals functionality
const {
  showingWeeklyMeals,
  selectedWeekMealsData,
  showWeeklyMealsModal,
  closeWeeklyMealsModal
} = useWeeklyMeals()

// Get data for selected day - optimized with caching
const selectedDayData = computed(() => {
  if (!selectedDate.value || !currentPlan.value) return null

  // Use cached computation when possible
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

const onDateSelect = async (date: string) => {
  trainingStore.setSelectedDate(date)
  
  // Auto-expand week containing selected date (works for any month)
  if (currentPlan.value) {
    const containingWeek = currentPlan.value.weeks.find(week => {
      return date >= week.start && date <= week.end
    })
    
    if (containingWeek) {
      // Always ensure the week is expanded when a date is selected
      const newExpanded = new Set(expandedWeeks.value)
      newExpanded.add(containingWeek.id)
      expandedWeeks.value = newExpanded
      
      // Scroll to the selected date in the training plan
      await scrollToSelectedDate(date)
    }
  }
}

// Enhanced scroll function with spec-compliant behavior
const scrollToSelectedDate = async (dateString: string) => {
  // Directly attempt scroll without delay
  
  const dayRow = document.querySelector(`#d-${dateString}`)
  if (dayRow) {
    // Smooth scroll to center (spec requirement)
    dayRow.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
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
  const next = new Set(expandedWeeks.value)
  if (next.has(weekId)) {
    next.delete(weekId)
  } else {
    next.add(weekId)
  }
  expandedWeeks.value = next
}

const expandAll = () => {
  if (currentPlan.value) {
    const next = new Set<string>()
    currentPlan.value.weeks.forEach(week => next.add(week.id))
    expandedWeeks.value = next
  }
}

const collapseAll = () => {
  expandedWeeks.value = new Set()
}

const loadPlan = async () => {
  // Load training data first (critical for initial render)
  await trainingStore.loadPlan()

  // Initialize auto-expanded weeks after plan loads (specs requirement)
  initializeExpandedWeeks()

  // Ensure the containing week is opened and selected after initialization (no timing effects)
  if (currentPlan.value) {
    const today = new Date().toISOString().slice(0, 10)
    const candidateDate = selectedDate.value || today
    // If selected date not yet set and today not in plan, fallback to first day
    const isTodayInPlan = currentPlan.value.weeks.some(w => w.rows?.some(r => r.date === today))
    const fallbackFirst = currentPlan.value.weeks[0]?.rows?.[0]?.date || null
    const dateToOpen = candidateDate && (candidateDate === today ? (isTodayInPlan ? today : fallbackFirst) : candidateDate)
    if (dateToOpen) {
      autoOpenCurrentWeek(dateToOpen, currentPlan.value)
    }
  }

  // Load nutrition and grocery data (non-blocking, no timeout)
  Promise.all([
    nutritionStore.loadNutritionData(),
    groceryStore.loadGroceryData()
  ]).catch((error) => {
    console.warn('Failed to load secondary data:', error)
  })
}

onMounted(() => {
  loadPlan()
})

// Optimized watcher for plan loading - only run when plan actually changes
watch(currentPlan, (newPlan, oldPlan) => {
  // Skip if plan hasn't actually changed or if date is already selected
  if (!newPlan || newPlan === oldPlan || selectedDate.value) return

  const today = new Date().toISOString().slice(0, 10)

  // Use more efficient date checking
  const todayExists = newPlan.weeks.some(week =>
    week.rows?.some(row => row.date === today)
  )

  if (todayExists) {
    trainingStore.setSelectedDate(today)
    autoOpenCurrentWeek(today, newPlan)
  } else {
    // Find next date more efficiently
    const nextDate = newPlan.weeks
      .flatMap(week => week.rows || [])
      .map(row => row.date)
      .filter(date => date >= today)
      .sort()[0] ||
      newPlan.weeks[0]?.rows?.[0]?.date

    if (nextDate) {
      trainingStore.setSelectedDate(nextDate)
      autoOpenCurrentWeek(nextDate, newPlan)
    }
  }
}, { immediate: true })

watch(selectedDate, (newDate, oldDate) => {
  // Skip if date hasn't actually changed
  if (!newDate || newDate === oldDate || !currentPlan.value) return

  const today = new Date().toISOString().slice(0, 10)
  if (newDate === today) {
    initializeExpandedWeeks()
  } else {
    autoOpenCurrentWeek(newDate, currentPlan.value)
  }
})

// Auto-open the week containing the selected date
const autoOpenCurrentWeek = (dateString: string, plan: any) => {
  const containingWeek = plan.weeks.find((week: any) => {
    return dateString >= week.start && dateString <= week.end
  })
  
  if (containingWeek) {
    const newExpanded = new Set(expandedWeeks.value)
    newExpanded.add(containingWeek.id)
    expandedWeeks.value = newExpanded
    
    // Immediately scroll to the selected date
    scrollToSelectedDate(dateString)
  }
}
</script>
