import { ref, computed, readonly } from 'vue'
import type { TrainingPlan, TrainingDay } from '@/types'
import { apiService } from '@/services/api'

const currentPlan = ref<TrainingPlan | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Static function to get the training plan
const getTrainingPlan = (): TrainingPlan | null => {
  return currentPlan.value
}

// Load plan from API
const loadPlan = async () => {
  if (isLoading.value) return

  try {
    isLoading.value = true
    error.value = null

    const plan = await apiService.getTrainingPlans()
    currentPlan.value = plan as TrainingPlan
  } catch (err) {
    console.error('Error loading training plan:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load training plan'
    currentPlan.value = null
  } finally {
    isLoading.value = false
  }
}

const getDayByDate = computed(() => (date: string): TrainingDay | null => {
  if (!currentPlan.value) return null

  for (const week of currentPlan.value.weeks) {
    const day = week.rows.find(row => row.date === date)
    if (day) return day
  }
  return null
})

const getWeekByDate = computed(() => (date: string) => {
  if (!currentPlan.value) return null

  return currentPlan.value.weeks.find(week => {
    return week.rows.some(row => row.date === date)
  })
})

const getAllTrainingDays = computed(() => {
  if (!currentPlan.value) return []

  return currentPlan.value.weeks.flatMap(week => week.rows)
})

const raceDays = computed(() => {
  return getAllTrainingDays.value.filter(day => day.isRaceDay)
})

const exerciseDays = computed(() => {
  return getAllTrainingDays.value.filter(day => day.isExercise)
})

// Static today date for display
const today = ref(new Date().toISOString().split('T')[0])

export const useTrainingStore = () => {
  return {
    // State
    currentPlan: readonly(currentPlan),
    isLoading: readonly(isLoading),
    error: readonly(error),
    today,

    // Getters
    getDayByDate,
    getWeekByDate,
    getAllTrainingDays,
    raceDays,
    exerciseDays,

    // Actions
    loadPlan,
    getTrainingPlan
  }
}
