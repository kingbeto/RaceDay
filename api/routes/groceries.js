import express from 'express'
import prisma, { dbUtils } from '../prisma/client.js'
import { asyncHandler, sendSuccess, sendError } from '../utils/response.js'

const router = express.Router()

// GET /api/groceries
router.get(
  '/groceries',
  asyncHandler(async (req, res) => {
    const { weekId, basic } = req.query

    // Use selective field queries to optimize data transfer
    const selectFields =
      basic === 'true'
        ? dbUtils.selectFields.groceryList.basic
        : dbUtils.selectFields.groceryList.full

    if (weekId) {
      // Return grocery list for specific week with optimized query
      const groceryRecord = await prisma.groceryList.findUnique({
        where: { weekId },
        select: selectFields
      })

      if (groceryRecord) {
        const response = basic === 'true' ? groceryRecord : groceryRecord.categories
        sendSuccess(res, response, `Grocery list for week ${weekId}`)
      } else {
        sendError(res, `No grocery list found for week ${weekId}`, 404, 'GROCERY_NOT_FOUND')
      }
    } else {
      // Return all grocery data with pagination
      const limit = parseInt(req.query.limit) || 20
      const offset = parseInt(req.query.offset) || 0

      const groceryRecords = await prisma.groceryList.findMany({
        select: selectFields,
        orderBy: {
          weekId: 'asc'
        },
        take: limit,
        skip: offset
      })

      const groceryData = groceryRecords.reduce((acc, record) => {
        acc[record.weekId] = basic === 'true' ? record : record.categories
        return acc
      }, {})

      sendSuccess(res, groceryData, `Retrieved ${groceryRecords.length} grocery lists`)
    }
  })
)

export default router
