import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// GET /api/training-plans
router.get('/training-plans', async (req, res) => {
  try {
    // For now, return JSON data from the app/data directory
    // In the future, this would query Supabase database
    const dataPath = path.join(process.cwd(), 'app', 'data', 'el-cruce-plan.json')

    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({
        success: false,
        error: 'Training plan not found'
      })
    }

    const rawData = fs.readFileSync(dataPath, 'utf8')
    // Parse as JavaScript object since the file uses JS object notation
    const trainingPlan = eval('(' + rawData + ')')

    res.status(200).json({
      success: true,
      data: trainingPlan
    })
  } catch (error) {
    console.error('Error in training-plans API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
})

export default router
