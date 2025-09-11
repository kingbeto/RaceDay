import type { DailyNutrition } from '@/types'

export const useNutrition = () => {
  const generateNutritionForDate = (date: string, isExercise: boolean): DailyNutrition => {
    // Generate fallback nutrition data for missing days
    // Focus on Argentine cuisine with proper calorie/macro targets
    const baseCalories = isExercise ? 2200 : 1900
    const protein = Math.round((baseCalories * 0.3) / 4) // 30% of calories from protein
    const carbs = Math.round((baseCalories * 0.45) / 4) // 45% of calories from carbs
    const fats = Math.round((baseCalories * 0.25) / 9) // 25% of calories from fats

    const argentineMeals = {
      exercise: {
        breakfast: {
          name: 'Desayuno energético',
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: 'Tostadas con palta y huevo',
              ingredients: 'Pan integral, palta, huevo, tomate',
              preparation: 'Tostar pan, machacar palta, freír huevo'
            },
            {
              name: 'Mate cocido con leche',
              ingredients: 'Mate cocido, leche descremada',
              preparation: 'Preparar mate cocido y agregar leche'
            }
          ]
        },
        lunch: {
          name: 'Almuerzo completo',
          calories: Math.round(baseCalories * 0.35),
          dishes: [
            {
              name: 'Milanesa de pollo al horno',
              ingredients: 'Pechuga de pollo, pan rallado, huevo, verduras',
              preparation: 'Empanar pollo, hornear con verduras'
            },
            {
              name: 'Ensalada mixta',
              ingredients: 'Lechuga, tomate, cebolla, aceite de oliva',
              preparation: 'Cortar verduras y aliñar'
            }
          ]
        },
        snack: {
          name: 'Merienda',
          calories: Math.round(baseCalories * 0.15),
          dishes: [
            {
              name: 'Yogur con granola',
              ingredients: 'Yogur natural, granola casera, frutas',
              preparation: 'Mezclar yogur con granola y fruta'
            }
          ]
        },
        dinner: {
          name: 'Cena ligera',
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: 'Pescado a la plancha',
              ingredients: 'Pescado blanco, verduras al vapor',
              preparation: 'Cocinar pescado a la plancha con verduras'
            }
          ]
        }
      },
      rest: {
        breakfast: {
          name: 'Desayuno liviano',
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: 'Avena con frutas',
              ingredients: 'Avena, leche de almendras, banana, miel',
              preparation: 'Cocinar avena y agregar frutas'
            }
          ]
        },
        lunch: {
          name: 'Almuerzo ligero',
          calories: Math.round(baseCalories * 0.35),
          dishes: [
            {
              name: 'Ensalada de atún',
              ingredients: 'Atún, lechuga, tomate, huevo duro',
              preparation: 'Mezclar ingredientes y aliñar'
            }
          ]
        },
        snack: {
          name: 'Merienda',
          calories: Math.round(baseCalories * 0.15),
          dishes: [
            {
              name: 'Fruta con nueces',
              ingredients: 'Manzana, nueces, queso blanco',
              preparation: 'Cortar fruta y acompañar'
            }
          ]
        },
        dinner: {
          name: 'Cena',
          calories: Math.round(baseCalories * 0.25),
          dishes: [
            {
              name: 'Tortilla de verduras',
              ingredients: 'Huevos, espinaca, cebolla, queso',
              preparation: 'Batir huevos, agregar verduras y cocinar'
            }
          ]
        }
      }
    }

    const mealType = isExercise ? 'exercise' : 'rest'
    const meals = argentineMeals[mealType]

    return {
      totalCalories: baseCalories,
      totalProtein: protein,
      totalCarbs: carbs,
      totalFats: fats,
      meals: [meals.breakfast, meals.lunch, meals.snack, meals.dinner]
    }
  }

  const calculateMacroPercentages = (nutrition: DailyNutrition) => {
    const { totalCalories, totalProtein, totalCarbs, totalFats } = nutrition

    return {
      proteinPercent: Math.round(((totalProtein * 4) / totalCalories) * 100),
      carbsPercent: Math.round(((totalCarbs * 4) / totalCalories) * 100),
      fatsPercent: Math.round(((totalFats * 9) / totalCalories) * 100)
    }
  }

  const formatMacros = (nutrition: DailyNutrition) => {
    const percentages = calculateMacroPercentages(nutrition)

    return {
      calories: `${nutrition.totalCalories} kcal`,
      protein: `${nutrition.totalProtein}g (${percentages.proteinPercent}%)`,
      carbs: `${nutrition.totalCarbs}g (${percentages.carbsPercent}%)`,
      fats: `${nutrition.totalFats}g (${percentages.fatsPercent}%)`
    }
  }

  return {
    generateNutritionForDate,
    calculateMacroPercentages,
    formatMacros
  }
}
