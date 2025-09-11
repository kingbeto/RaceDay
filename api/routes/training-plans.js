import express from 'express'
import prisma from '../prisma/client.js'
import { asyncHandler, sendSuccess, sendError } from '../utils/response.js'

const router = express.Router()

// GET /api/training-plans
router.get(
  '/training-plans',
  asyncHandler(async (req, res) => {
    const trainingPlans = await prisma.trainingPlan.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })

    if (!trainingPlans || trainingPlans.length === 0) {
      return sendError(res, 'No training plans found', 404, 'TRAINING_PLANS_NOT_FOUND')
    }

    // Return the first (and currently only) training plan
    // TODO: In the future, this could support multiple plans or plan selection
    const trainingPlan = trainingPlans[0]

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

    sendSuccess(res, fullPlan, 'Training plan retrieved successfully')
  })
)

export default router
