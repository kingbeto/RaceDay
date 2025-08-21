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
      const trainingPlan = JSON.parse(rawData)
      
      res.status(200).json({
        success: true,
        data: trainingPlan
      })
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      })
    }
  } catch (error) {
    console.error('Error in training-plans API:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}
