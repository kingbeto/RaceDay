import express from 'express'
import prisma from '../prisma/client.js'
import { asyncHandler, sendSuccess, sendError } from '../utils/response.js'

const router = express.Router()

// Nutrition calculation constants
const NUTRITION_CONSTANTS = {
  BASE_CALORIES: 2100,
  PROTEIN_RATIO: 0.3,
  CARBS_RATIO: 0.45,
  FATS_RATIO: 0.25,
  CALORIES_PER_GRAM_PROTEIN: 4,
  CALORIES_PER_GRAM_CARBS: 4,
  CALORIES_PER_GRAM_FATS: 9,
  MEAL_DISTRIBUTION: {
    breakfast: 0.25,
    lunch: 0.35,
    snack: 0.15,
    dinner: 0.25
  }
}

// GET /api/nutrition
router.get(
  '/nutrition',
  asyncHandler(async (req, res) => {
    const { date } = req.query

    if (date) {
      // Return nutrition for specific date
      const nutritionRecord = await prisma.nutritionData.findUnique({
        where: { dateKey: date }
      })

      if (nutritionRecord) {
        sendSuccess(res, nutritionRecord.meals, `Nutrition plan for ${date}`)
      } else {
        // Generate fallback nutrition if not found
        const fallbackNutrition = generateFallbackNutrition(date)
        const response = {
          ...fallbackNutrition,
          generated: true
        }
        sendSuccess(res, response, `Generated fallback nutrition for ${date}`)
      }
    } else {
      // Return all nutrition data
      const nutritionRecords = await prisma.nutritionData.findMany({
        orderBy: {
          dateKey: 'asc'
        }
      })

      const nutritionData = nutritionRecords.reduce((acc, record) => {
        acc[record.dateKey] = record.meals
        return acc
      }, {})

      sendSuccess(res, nutritionData, 'All nutrition data retrieved successfully')
    }
  })
)

function generateFallbackNutrition(date) {
  const {
    BASE_CALORIES,
    PROTEIN_RATIO,
    CARBS_RATIO,
    FATS_RATIO,
    CALORIES_PER_GRAM_PROTEIN,
    CALORIES_PER_GRAM_CARBS,
    CALORIES_PER_GRAM_FATS,
    MEAL_DISTRIBUTION
  } = NUTRITION_CONSTANTS

  const protein = Math.round((BASE_CALORIES * PROTEIN_RATIO) / CALORIES_PER_GRAM_PROTEIN)
  const carbs = Math.round((BASE_CALORIES * CARBS_RATIO) / CALORIES_PER_GRAM_CARBS)
  const fats = Math.round((BASE_CALORIES * FATS_RATIO) / CALORIES_PER_GRAM_FATS)

  return {
    totalCalories: BASE_CALORIES,
    totalProtein: protein,
    totalCarbs: carbs,
    totalFats: fats,
    meals: [
      {
        name: 'Desayuno',
        calories: Math.round(BASE_CALORIES * MEAL_DISTRIBUTION.breakfast),
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
        calories: Math.round(BASE_CALORIES * MEAL_DISTRIBUTION.lunch),
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
        calories: Math.round(BASE_CALORIES * MEAL_DISTRIBUTION.snack),
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
        calories: Math.round(BASE_CALORIES * MEAL_DISTRIBUTION.dinner),
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

export default router
