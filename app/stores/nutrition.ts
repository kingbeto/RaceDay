import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { NutritionPlan, DailyNutrition, MacroTargets } from '@/types'

export const useNutritionStore = defineStore('nutrition', () => {
  const nutritionData = ref<NutritionPlan>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadNutritionData = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Import the JSON file directly
      const nutritionModule = await import('@/data/nutrition-plan.json')
      nutritionData.value = nutritionModule.default
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load nutrition data'
      console.error('Error loading nutrition data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getNutritionForDate = computed(() => (date: string): DailyNutrition | null => {
    return nutritionData.value[date] || null
  })

  const generateFallbackNutrition = (date: string, isExercise: boolean): DailyNutrition => {
    // Generate fallback nutrition data for missing days
    const baseCalories = isExercise ? 2200 : 1900
    const protein = Math.round(baseCalories * 0.3 / 4) // 30% of calories from protein
    const carbs = Math.round(baseCalories * 0.45 / 4) // 45% of calories from carbs
    const fats = Math.round(baseCalories * 0.25 / 9) // 25% of calories from fats

    return {
      totalCalories: baseCalories,
      totalProtein: protein,
      totalCarbs: carbs,
      totalFats: fats,
      meals: [
        {
          name: "Desayuno",
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: "Desayuno balanceado",
              ingredients: "Avena, frutas, proteína",
              preparation: "Combinación equilibrada de macronutrientes"
            }
          ]
        },
        {
          name: "Almuerzo",
          calories: Math.round(baseCalories * 0.35),
          dishes: [
            {
              name: "Almuerzo completo",
              ingredients: "Proteína magra, carbohidratos complejos, vegetales",
              preparation: "Comida principal balanceada"
            }
          ]
        },
        {
          name: "Merienda",
          calories: Math.round(baseCalories * 0.15),
          dishes: [
            {
              name: "Snack saludable",
              ingredients: "Fruta, yogur o frutos secos",
              preparation: "Merienda nutritiva"
            }
          ]
        },
        {
          name: "Cena",
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: "Cena ligera",
              ingredients: "Proteína ligera, vegetales",
              preparation: "Cena fácil de digerir"
            }
          ]
        }
      ]
    }
  }

  const getOrGenerateNutrition = computed(() => (date: string, isExercise: boolean = true): DailyNutrition => {
    const existing = getNutritionForDate.value(date)
    if (existing) return existing
    
    return generateFallbackNutrition(date, isExercise)
  })

  const getMacroTargets = computed(() => (isExercise: boolean): MacroTargets => {
    const calories = isExercise ? 2200 : 1900
    return {
      calories,
      protein: Math.round(calories * 0.3 / 4),
      carbs: Math.round(calories * 0.45 / 4),
      fats: Math.round(calories * 0.25 / 9)
    }
  })

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    nutritionData: readonly(nutritionData),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    getNutritionForDate,
    getOrGenerateNutrition,
    getMacroTargets,
    
    // Actions
    loadNutritionData,
    clearError
  }
})
