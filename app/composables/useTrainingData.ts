import type { TrainingPlan } from '@/types'
import { apiService } from '@/services/api'

export const useTrainingData = () => {
  const loadFromJSON = async (): Promise<TrainingPlan> => {
    const response = await fetch('/data/el-cruce-plan.json')
    if (!response.ok) {
      throw new Error('Failed to load training plan from JSON')
    }
    return response.json()
  }

  // Load from API backend
  const loadFromAPI = async (): Promise<TrainingPlan> => {
    try {
      const data = await apiService.getTrainingPlans()
      return data as TrainingPlan
    } catch (error) {
      console.error('Failed to load training plan from API:', error)
      throw new Error('Failed to load training plan from API')
    }
  }

  // Load with fallback strategy
  const loadTrainingPlan = async (): Promise<TrainingPlan> => {
    try {
      // Try API first
      return await loadFromAPI()
    } catch (apiError) {
      console.warn('API failed, falling back to JSON:', apiError)
      try {
        // Fallback to JSON
        return await loadFromJSON()
      } catch (jsonError) {
        console.error('Both API and JSON loading failed:', { apiError, jsonError })
        throw new Error('Failed to load training plan from both API and JSON sources')
      }
    }
  }

  return {
    loadFromJSON,
    loadFromAPI,
    loadTrainingPlan
  }
}
