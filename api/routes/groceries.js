import express from 'express'
import prisma from '../prisma/client.js'
import { asyncHandler, sendSuccess, sendError } from '../utils/response.js'

const router = express.Router()

// GET /api/groceries
router.get(
  '/groceries',
  asyncHandler(async (req, res) => {
    const { weekId } = req.query

    if (weekId) {
      // Return grocery list for specific week
      const groceryRecord = await prisma.groceryList.findUnique({
        where: { weekId }
      })

      if (groceryRecord) {
        sendSuccess(res, groceryRecord.categories, `Grocery list for week ${weekId}`)
      } else {
        sendError(res, `No grocery list found for week ${weekId}`, 404, 'GROCERY_NOT_FOUND')
      }
    } else {
      // Return all grocery data
      const groceryRecords = await prisma.groceryList.findMany({
        orderBy: {
          weekId: 'asc'
        }
      })

      const groceryData = groceryRecords.reduce((acc, record) => {
        acc[record.weekId] = record.categories
        return acc
      }, {})

      sendSuccess(res, groceryData, 'All grocery lists retrieved successfully')
    }
  })
)

export default router
