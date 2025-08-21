<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Header with title and controls -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ currentPlan?.title || 'El Cruce — Minimal Day‑by‑Day Plan' }}</h1>
          <p class="text-sm text-gray-600 mt-1">
            {{ currentPlan?.subtitle || 'Goal: finish safely with the absolute minimum effective training' }}
            <span v-if="currentPlan" class="ml-4">
              <strong>Race:</strong> {{ formatDate(currentPlan.raceDate) }}
            </span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm text-gray-600">
            🍽️ Nutrition: 100kg→92kg target. High-protein Argentine meals. Training days: ~2,500 kcal | Rest days: ~2,100 kcal
          </div>
          <div class="flex gap-2">
            <BaseButton variant="outline" size="sm" @click="expandAll">Expand all</BaseButton>
            <BaseButton variant="outline" size="sm" @click="collapseAll">Collapse all</BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main layout with three columns -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left: Calendar -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">Calendar</h2>
          <p class="text-xs text-gray-500 mt-1">Aug 18 → Dec 1, 2025 (Race)</p>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <CalendarView 
            :training-plan="currentPlan"
            :selected-date="selectedDate"
            @date-select="onDateSelect"
            :compact="true"
          />
        </div>
        
        <!-- Shopping List Section -->
        <div class="border-t border-gray-200 p-4">
          <h3 class="font-semibold text-gray-900 mb-3">Shopping List</h3>
          <div class="space-y-2">
            <select
              v-model="selectedShoppingWeek"
              class="w-full text-sm px-2 py-1 border border-gray-300 rounded"
            >
              <option value="">Select month...</option>
              <option value="August 2025">August 2025</option>
              <option value="September 2025">September 2025</option>
              <option value="October 2025">October 2025</option>
              <option value="November 2025">November 2025</option>
              <option value="December 2025">December 2025</option>
            </select>
            <button class="w-full text-xs text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1">
              🛒 Generate shopping list
            </button>
          </div>
        </div>
      </div>

      <!-- Center: Training Plan -->
      <div class="flex-1 flex flex-col">
        <div class="p-4 border-b border-gray-200 bg-white">
          <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900">Weekly rhythm (minimal, flat-city)</h2>
            <div class="text-xs text-gray-500">
              Today: {{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
            </div>
          </div>
          
          <!-- Weekly rhythm summary -->
          <div class="mt-3 grid grid-cols-7 gap-2 text-xs">
            <div><strong>Mon:</strong> Off + 10-15 min mobility</div>
            <div><strong>Tue:</strong> Long 30-90 min (Z2/Z3) + Gym Lower (hard)</div>
            <div><strong>Wed:</strong> Easy 30-45 min Z2 run-walk (flat) + Gym Upper/Core (hard)</div>
            <div><strong>Thu:</strong> Off or 20-30 min easy walk + mobility (Oct→Nov optional steady stairs 30-45 min)</div>
            <div><strong>Fri:</strong> Off + Gym Maintenance/Prehab (moderate)</div>
            <div><strong>Sat:</strong> Long Z2 run-walk (flat or incline walk) — gradually 45 → 210-240 min (peak)</div>
            <div><strong>Sun:</strong> Off — except Nov B2B weekends and stage sim</div>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto">
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

      <!-- Right: Nutrition Rules -->
      <div class="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">Nutrition rules (simple)</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <div class="space-y-4 text-sm">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Training days:</h3>
              <p class="text-gray-600">carbs before/during/after; protein 1.8-2.2 g/kg target BW; hydrate + sodium</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Rest days:</h3>
              <p class="text-gray-600">small calorie deficit; high protein; veg; limit evening starches; hydrate.</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-900 mb-2">Long day fueling:</h3>
              <p class="text-gray-600">60-90 g carbs/h + 500-750 ml fluids/h + 400-800 mg sodium/h. Practice your race products.</p>
            </div>
          </div>

          <!-- Selected day nutrition -->
          <div v-if="selectedDayData" class="mt-6 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium text-gray-900">{{ formatSelectedDate(selectedDate) }}</h3>
              <button 
                @click="onNutritionClick(selectedDate)"
                class="text-xs text-blue-600 hover:text-blue-700"
              >
                + View meals
              </button>
            </div>
            <div class="text-sm space-y-1">
              <div class="flex justify-between">
                <span class="text-gray-600">Focus:</span>
                <span>{{ selectedDayData.food }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Calories:</span>
                <span>~{{ selectedDayData.calories || 2300 }} kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Nutrition Modal -->
    <NutritionModal 
      v-model:show="showNutritionModal"
      :date="selectedNutritionDate"
    />

    <!-- Weekly Meals Modal -->
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
import { useTrainingStore, useNutritionStore } from '@/stores'
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
  await trainingStore.loadPlan()
  await nutritionStore.loadNutritionData()
  
  // Expand first week by default
  if (currentPlan.value && currentPlan.value.weeks.length > 0) {
    expandedWeeks.value.add(currentPlan.value.weeks[0].id)
  }
}

onMounted(() => {
  loadPlan()
})
</script>
