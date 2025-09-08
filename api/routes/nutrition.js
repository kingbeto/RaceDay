import express from 'express'
import prisma from '../prisma/client.js'

const router = express.Router()

// GET /api/nutrition
router.get('/nutrition', async (req, res) => {
  try {
    const { date } = req.query

    if (date) {
      // Return nutrition for specific date
      const nutritionRecord = await prisma.nutritionData.findUnique({
        where: { dateKey: date }
      })

      if (nutritionRecord) {
        res.status(200).json({
          success: true,
          data: nutritionRecord.meals
        })
      } else {
        // Generate fallback nutrition if not found
        const fallbackNutrition = generateFallbackNutrition(date)
        res.status(200).json({
          success: true,
          data: fallbackNutrition,
          generated: true
        })
      }
    } else {
      // Return all nutrition data
      const nutritionRecords = await prisma.nutritionData.findMany({
        orderBy: {
          dateKey: 'asc'
        }
      })

      const nutritionData = {}
      nutritionRecords.forEach(record => {
        nutritionData[record.dateKey] = record.meals
      })

      res.status(200).json({
        success: true,
        data: nutritionData
      })
    }
  } catch (error) {
    console.error('Error in nutrition API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

function generateFallbackNutrition(date) {
  // Simple fallback nutrition generation
  const baseCalories = 2100
  const protein = Math.round(baseCalories * 0.3 / 4)
  const carbs = Math.round(baseCalories * 0.45 / 4)
  const fats = Math.round(baseCalories * 0.25 / 9)

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

export default router
