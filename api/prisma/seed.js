import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Seed training plans
    await seedTrainingPlans()

    // Seed nutrition data
    await seedNutritionData()

    // Seed grocery lists
    await seedGroceryLists()

    console.log('✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function seedTrainingPlans() {
  console.log('📋 Seeding training plans...')

  const trainingPlanPath = path.join(__dirname, '../../app/data/el-cruce-plan.json')

  if (!fs.existsSync(trainingPlanPath)) {
    console.log('⚠️ Training plan file not found, skipping...')
    return
  }

  // Read and parse training plan (note: this file uses JS object notation)
  const rawData = fs.readFileSync(trainingPlanPath, 'utf8')
  const trainingPlan = eval('(' + rawData + ')')

  // Upsert training plan
  await prisma.trainingPlan.upsert({
    where: { id: trainingPlan.id },
    update: {
      title: trainingPlan.title,
      subtitle: trainingPlan.subtitle,
      raceDate: trainingPlan.raceDate,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      description: trainingPlan.description,
      weeks: trainingPlan.weeks
    },
    create: {
      id: trainingPlan.id,
      title: trainingPlan.title,
      subtitle: trainingPlan.subtitle,
      raceDate: trainingPlan.raceDate,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      description: trainingPlan.description,
      weeks: trainingPlan.weeks
    }
  })

  console.log(`✅ Seeded training plan: ${trainingPlan.title}`)
}

async function seedNutritionData() {
  console.log('🥗 Seeding nutrition data...')

  const nutritionPath = path.join(__dirname, '../../app/data/nutrition-plan.json')

  if (!fs.existsSync(nutritionPath)) {
    console.log('⚠️ Nutrition data file not found, skipping...')
    return
  }

  const nutritionData = JSON.parse(fs.readFileSync(nutritionPath, 'utf8'))

  let seededCount = 0
  for (const [date, dayData] of Object.entries(nutritionData)) {
    await prisma.nutritionData.upsert({
      where: { dateKey: date },
      update: {
        totalCalories: dayData.totalCalories,
        totalProtein: dayData.totalProtein,
        totalCarbs: dayData.totalCarbs,
        totalFats: dayData.totalFats,
        meals: dayData
      },
      create: {
        dateKey: date,
        totalCalories: dayData.totalCalories,
        totalProtein: dayData.totalProtein,
        totalCarbs: dayData.totalCarbs,
        totalFats: dayData.totalFats,
        meals: dayData
      }
    })
    seededCount++
  }

  console.log(`✅ Seeded ${seededCount} days of nutrition data`)
}

async function seedGroceryLists() {
  console.log('🛒 Seeding grocery lists...')

  const groceryPath = path.join(__dirname, '../../app/data/grocery-lists.json')

  if (!fs.existsSync(groceryPath)) {
    console.log('⚠️ Grocery lists file not found, skipping...')
    return
  }

  const groceryData = JSON.parse(fs.readFileSync(groceryPath, 'utf8'))

  let seededCount = 0
  for (const [weekId, weekData] of Object.entries(groceryData)) {
    await prisma.groceryList.upsert({
      where: { weekId },
      update: {
        categories: weekData
      },
      create: {
        weekId,
        categories: weekData
      }
    })
    seededCount++
  }

  console.log(`✅ Seeded ${seededCount} weeks of grocery lists`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
