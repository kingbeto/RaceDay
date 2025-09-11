import express from 'express'
import { sendSuccess } from '../utils/response.js'

const router = express.Router()

// GET /api/hello
router.get('/hello', (req, res) => {
  const apiInfo = {
    message: '¡Hola! Welcome to RaceDay API',
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    endpoints: {
      'GET /api/training-plans': 'Get training plan data',
      'GET /api/nutrition': 'Get nutrition data (optional: ?date=YYYY-MM-DD)',
      'GET /api/groceries': 'Get grocery lists (optional: ?weekId=W1)',
      'GET /health': 'Health check endpoint'
    }
  }

  sendSuccess(res, apiInfo, 'API information retrieved successfully')
})

export default router
