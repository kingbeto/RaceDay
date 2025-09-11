import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

// Import route modules
import trainingPlansRoutes from './api/routes/training-plans.js'
import nutritionRoutes from './api/routes/nutrition.js'
import groceriesRoutes from './api/routes/groceries.js'
import helloRoutes from './api/routes/hello.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
)

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173']
        : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    optionsSuccessStatus: 200
  })
)

app.use(morgan('combined'))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve static files from the app directory
app.use(express.static(path.join(__dirname, 'app')))

// Handle preflight OPTIONS requests
app.options('*', cors())

// API Routes
app.use('/api', trainingPlansRoutes)
app.use('/api', nutritionRoutes)
app.use('/api', groceriesRoutes)
app.use('/api', helloRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// SPA fallback - serve index.html for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 RaceDay API server running on port ${PORT}`)
  console.log(`📊 Health check available at http://localhost:${PORT}/health`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
