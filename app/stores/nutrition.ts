// Simplified nutrition store - no state management behaviors
import { computed } from 'vue'
import type { DailyNutrition, MacroTargets } from '@/types'

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

const getOrGenerateNutrition = (date: string, isExercise: boolean = true): DailyNutrition => {
  // For now, always return generated fallback data
  return generateFallbackNutrition(date, isExercise)
}

const getMacroTargets = (isExercise: boolean): MacroTargets => {
  const calories = isExercise ? 2200 : 1900
  return {
    calories,
    protein: Math.round(calories * 0.3 / 4),
    carbs: Math.round(calories * 0.45 / 4),
    fats: Math.round(calories * 0.25 / 9)
  }
}

export const useNutritionStore = () => {
  return {
    // Static functions
    getOrGenerateNutrition,
    getMacroTargets
  }
}
