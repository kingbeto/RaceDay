// Simplified training store - no state management behaviors
import { ref, computed, readonly } from 'vue'
import type { TrainingPlan, TrainingDay } from '@/types'

const currentPlan = ref<TrainingPlan | null>(null)

// Static function to get the training plan
const getTrainingPlan = (): TrainingPlan | null => {
  return currentPlan.value
}

// Load plan synchronously from static data
const loadPlan = () => {
  try {
    // For now, return null since we're removing dynamic loading
    // In a real app, this would load from static data
    currentPlan.value = null
  } catch (err) {
    console.error('Error loading training plan:', err)
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
    // Static data
    currentPlan: readonly(currentPlan),
    today,

    // Getters
    getDayByDate,
    getWeekByDate,
    getAllTrainingDays,
    raceDays,
    exerciseDays,

    // Static functions
    loadPlan,
    getTrainingPlan
  }
}
