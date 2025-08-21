import type { TrainingPlan } from '@/types'

export const useTrainingData = () => {
  const loadFromJSON = async (): Promise<TrainingPlan> => {
    const response = await fetch('/data/el-cruce-plan.json')
    if (!response.ok) {
      throw new Error('Failed to load training plan from JSON')
    }
    return response.json()
  }
  
  // Future: Database integration
  const loadFromAPI = async (planId: string): Promise<TrainingPlan> => {
    const response = await fetch(`/api/training-plans/${planId}`)
    if (!response.ok) {
      throw new Error('Failed to load training plan from API')
    }
    const { data } = await response.json()
    return data
  }

  return {
    loadFromJSON,
    loadFromAPI
  }
}
