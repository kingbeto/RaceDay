const fs = require('fs')
const path = require('path')

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const { date } = req.query
      
      // Load nutrition data from JSON file
      const dataPath = path.join(process.cwd(), 'app', 'data', 'nutrition-plan.json')
      
      if (!fs.existsSync(dataPath)) {
        return res.status(404).json({
          success: false,
          error: 'Nutrition data not found'
        })
      }
      
      const rawData = fs.readFileSync(dataPath, 'utf8')
      const nutritionData = JSON.parse(rawData)
      
      if (date) {
        // Return nutrition for specific date
        const dailyNutrition = nutritionData[date]
        
        if (dailyNutrition) {
          res.status(200).json({
            success: true,
            data: dailyNutrition
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
        res.status(200).json({
          success: true,
          data: nutritionData
        })
      }
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      })
    }
  } catch (error) {
    console.error('Error in nutrition API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}

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
