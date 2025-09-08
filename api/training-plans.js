import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    const trainingPlans = await prisma.trainingPlan.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    if (!trainingPlans || trainingPlans.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No training plans found'
      })
    }

    // Return the first (and currently only) training plan
    const trainingPlan = trainingPlans[0]

    // Reconstruct the full training plan object as expected by the frontend
    const fullPlan = {
      id: trainingPlan.id,
      title: trainingPlan.title,
      subtitle: trainingPlan.subtitle,
      raceDate: trainingPlan.raceDate,
      startDate: trainingPlan.startDate,
      endDate: trainingPlan.endDate,
      description: trainingPlan.description,
      weeks: trainingPlan.weeks
    }

    res.status(200).json({
      success: true,
      data: fullPlan
    })
  } catch (error) {
    console.error('Error in training-plans API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  } finally {
    await prisma.$disconnect()
  }
}
