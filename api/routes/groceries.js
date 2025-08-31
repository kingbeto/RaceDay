import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// GET /api/groceries
router.get('/groceries', async (req, res) => {
  try {
    const { weekId } = req.query

    // Load grocery data from JSON file
    const dataPath = path.join(process.cwd(), 'app', 'data', 'grocery-lists.json')

    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({
        success: false,
        error: 'Grocery data not found'
      })
    }

    const rawData = fs.readFileSync(dataPath, 'utf8')
    const groceryData = JSON.parse(rawData)

    if (weekId) {
      // Return grocery list for specific week
      const weekGroceries = groceryData[weekId]

      if (weekGroceries) {
        res.status(200).json({
          success: true,
          data: weekGroceries
        })
      } else {
        res.status(404).json({
          success: false,
          error: `No grocery list found for week ${weekId}`
        })
      }
    } else {
      // Return all grocery data
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
  }
})

export default router
