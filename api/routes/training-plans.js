import express from 'express'
import prisma, { dbUtils } from '../prisma/client.js'
import { asyncHandler, sendSuccess, sendError } from '../utils/response.js'

const router = express.Router()

// GET /api/training-plans
router.get(
  '/training-plans',
  asyncHandler(async (req, res) => {
    const { basic } = req.query

    // Use selective field queries to optimize data transfer
    const selectFields =
      basic === 'true'
        ? dbUtils.selectFields.trainingPlan.basic
        : dbUtils.selectFields.trainingPlan.full

    const trainingPlans = await prisma.trainingPlan.findMany({
      select: selectFields,
      orderBy: {
        updatedAt: 'desc'
      },
      take: 1 // Only get the first plan for better performance
    })

    if (!trainingPlans || trainingPlans.length === 0) {
      return sendError(res, 'No training plans found', 404, 'TRAINING_PLANS_NOT_FOUND')
    }

    // Return the first (and currently only) training plan
    const trainingPlan = trainingPlans[0]

    sendSuccess(res, trainingPlan, 'Training plan retrieved successfully')
  })
)

// GET /api/training-plans/health - Database health check
router.get(
  '/training-plans/health',
  asyncHandler(async (req, res) => {
    const isHealthy = await dbUtils.isHealthy()
    const dbInfo = await dbUtils.getDatabaseInfo()

    if (isHealthy) {
      sendSuccess(
        res,
        {
          status: 'healthy',
          database: dbInfo ? 'connected' : 'unknown',
          timestamp: new Date().toISOString()
        },
        'Database connection is healthy'
      )
    } else {
      sendError(res, 'Database connection failed', 503, 'DATABASE_UNHEALTHY')
    }
  })
)

export default router
