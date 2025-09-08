import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
  } finally {
    await prisma.$disconnect()
  }
}
