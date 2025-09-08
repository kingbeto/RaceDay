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
    const { weekId } = req.query

    if (weekId) {
      // Return grocery list for specific week
      const groceryRecord = await prisma.groceryList.findUnique({
        where: { weekId }
      })

      if (groceryRecord) {
        res.status(200).json({
          success: true,
          data: groceryRecord.categories
        })
      } else {
        res.status(404).json({
          success: false,
          error: `No grocery list found for week ${weekId}`
        })
      }
    } else {
      // Return all grocery data
      const groceryRecords = await prisma.groceryList.findMany({
        orderBy: {
          weekId: 'asc'
        }
      })

      const groceryData = {}
      groceryRecords.forEach(record => {
        groceryData[record.weekId] = record.categories
      })

      res.status(200).json({
        success: true,
        data: groceryData
      })
    }
  } catch (error) {
    console.error('Error in groceries API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  } finally {
    await prisma.$disconnect()
  }
}
