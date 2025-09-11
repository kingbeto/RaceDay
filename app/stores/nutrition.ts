import { ref, computed, readonly } from 'vue'
import type { DailyNutrition, MacroTargets } from '@/types'
import { apiService } from '@/services/api'

// Cache for nutrition data
const nutritionCache = ref<Map<string, DailyNutrition>>(new Map())
const isLoading = ref(false)
const error = ref<string | null>(null)

const generateFallbackNutrition = (date: string, isExercise: boolean): DailyNutrition => {
  // Generate fallback nutrition data for missing days
  const baseCalories = isExercise ? 2200 : 1900
  const protein = Math.round((baseCalories * 0.3) / 4) // 30% of calories from protein
  const carbs = Math.round((baseCalories * 0.45) / 4) // 45% of calories from carbs
  const fats = Math.round((baseCalories * 0.25) / 9) // 25% of calories from fats

  return {
    totalCalories: baseCalories,
    totalProtein: protein,
    totalCarbs: carbs,
    totalFats: fats,
    meals: [
      {
        name: 'Desayuno',
        calories: Math.round(baseCalories * 0.25),
        dishes: [
          {
            name: 'Desayuno balanceado',
            ingredients: 'Avena, frutas, proteína',
            preparation: 'Combinación equilibrada de macronutrientes'
          }
        ]
      },
      {
        name: 'Almuerzo',
        calories: Math.round(baseCalories * 0.35),
        dishes: [
          {
            name: 'Almuerzo completo',
            ingredients: 'Proteína magra, carbohidratos complejos, vegetales',
            preparation: 'Comida principal balanceada'
          }
        ]
      },
      {
        name: 'Merienda',
        calories: Math.round(baseCalories * 0.15),
        dishes: [
          {
            name: 'Snack saludable',
            ingredients: 'Fruta, yogur o frutos secos',
            preparation: 'Merienda nutritiva'
          }
        ]
      },
      {
        name: 'Cena',
        calories: Math.round(baseCalories * 0.25),
        dishes: [
          {
            name: 'Cena ligera',
            ingredients: 'Proteína ligera, vegetales',
            preparation: 'Cena fácil de digerir'
          }
        ]
      }
    ]
  }
}

const getOrGenerateNutrition = async (
  date: string,
  isExercise: boolean = true
): Promise<DailyNutrition> => {
  // Check cache first
  if (nutritionCache.value.has(date)) {
    return nutritionCache.value.get(date)!
  }

  try {
    isLoading.value = true
    error.value = null

    // Try to get from API
    const apiData = await apiService.getNutritionByDate(date)

    // Check if the response indicates generated data
    let nutritionData: DailyNutrition
    if (apiData && typeof apiData === 'object' && 'generated' in apiData) {
      // API returned generated fallback data
      nutritionData = apiData as DailyNutrition
    } else if (apiData && 'meals' in apiData) {
      // API returned actual nutrition data
      nutritionData = apiData as DailyNutrition
    } else {
      // No data from API, generate locally
      nutritionData = generateFallbackNutrition(date, isExercise)
    }

    // Cache the result
    nutritionCache.value.set(date, nutritionData)
    return nutritionData
  } catch (err) {
    console.warn(`Failed to load nutrition from API for ${date}:`, err)
    error.value = err instanceof Error ? err.message : 'Failed to load nutrition data'

    // Fall back to local generation
    const fallbackData = generateFallbackNutrition(date, isExercise)
    nutritionCache.value.set(date, fallbackData)
    return fallbackData
  } finally {
    isLoading.value = false
  }
}

const loadAllNutrition = async (): Promise<Record<string, DailyNutrition>> => {
  try {
    isLoading.value = true
    error.value = null

    const allData = await apiService.getAllNutrition()

    // Update cache with all data
    if (allData && typeof allData === 'object') {
      Object.entries(allData).forEach(([date, nutrition]) => {
        nutritionCache.value.set(date, nutrition as DailyNutrition)
      })
    }

    return allData as Record<string, DailyNutrition>
  } catch (err) {
    console.error('Failed to load all nutrition data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load nutrition data'
    return {}
  } finally {
    isLoading.value = false
  }
}

const getMacroTargets = (isExercise: boolean): MacroTargets => {
  const calories = isExercise ? 2200 : 1900
  return {
    calories,
    protein: Math.round((calories * 0.3) / 4),
    carbs: Math.round((calories * 0.45) / 4),
    fats: Math.round((calories * 0.25) / 9)
  }
}

export const useNutritionStore = () => {
  return {
    // State
    isLoading: readonly(isLoading),
    error: readonly(error),
    nutritionCache: readonly(nutritionCache),

    // Actions
    getOrGenerateNutrition,
    loadAllNutrition,
    getMacroTargets,

    // Utilities
    generateFallbackNutrition
  }
}
