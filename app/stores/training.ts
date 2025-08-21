import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { TrainingPlan, TrainingDay } from '@/types'

export const useTrainingStore = defineStore('training', () => {
  const currentPlan = ref<TrainingPlan | null>(null)
  const selectedDate = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadPlan = async (planId?: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      // For now, load from JSON file
      const response = await fetch('/data/el-cruce-plan.json')
      if (!response.ok) {
        throw new Error('Failed to load training plan')
      }
      
      const data = await response.json()
      currentPlan.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load training plan'
      console.error('Error loading training plan:', err)
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

  const setSelectedDate = (date: string | null) => {
    selectedDate.value = date
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    currentPlan: readonly(currentPlan),
    selectedDate,
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    getDayByDate,
    getWeekByDate,
    getAllTrainingDays,
    raceDays,
    exerciseDays,
    
    // Actions
    loadPlan,
    setSelectedDate,
    clearError
  }
})
