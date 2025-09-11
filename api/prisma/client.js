import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis

// Database URL configuration based on environment
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  // Fallback to development SQLite
  if (process.env.NODE_ENV !== 'production') {
    return 'file:../../database/raceday.db'
  }

  throw new Error('DATABASE_URL environment variable is required in production')
}

// Environment-specific Prisma configuration
const createPrismaConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  const isVercel = process.env.VERCEL === '1'
  const databaseUrl = getDatabaseUrl()

  const config = {
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: isProduction ? ['error'] : ['query', 'error', 'warn']
  }

  // Optimize for serverless/Supabase in production
  if (isProduction || isVercel) {
    config.connectionTimeout = 20000 // 20 seconds
    config.pool = {
      timeout: 20000,
      idleTimeout: 300000 // 5 minutes
    }

    // Add Supabase-specific optimizations
    if (databaseUrl.includes('supabase.co') || databaseUrl.includes('pooler.supabase.com')) {
      config.pool = {
        ...config.pool,
        max: 1, // Single connection for serverless
        min: 0,
        acquireTimeoutMillis: 60000,
        createTimeoutMillis: 60000,
        destroyTimeoutMillis: 5000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200
      }
    }
  }

  return config
}

// Create Prisma client with optimized configuration
const createPrismaClient = () => {
  const config = createPrismaConfig()

  return new PrismaClient({
    ...config,
    errorFormat: 'pretty'
  })
}

// Global instance management
const prisma = globalForPrisma.prisma || createPrismaClient()

// Only cache in development to prevent memory leaks
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown
const cleanup = async () => {
  await prisma.$disconnect()
}

// Handle process termination
if (typeof process !== 'undefined') {
  process.on('beforeExit', cleanup)
  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
}

export default prisma

// Export database utilities for query optimization
export const dbUtils = {
  // Selective field queries to reduce data transfer
  selectFields: {
    trainingPlan: {
      basic: {
        id: true,
        title: true,
        subtitle: true,
        raceDate: true,
        startDate: true,
        endDate: true
      },
      full: {
        id: true,
        title: true,
        subtitle: true,
        raceDate: true,
        startDate: true,
        endDate: true,
        description: true,
        weeks: true,
        updatedAt: true
      }
    },
    nutritionData: {
      basic: {
        id: true,
        dateKey: true,
        totalCalories: true,
        totalProtein: true,
        totalCarbs: true,
        totalFats: true
      },
      full: {
        id: true,
        dateKey: true,
        totalCalories: true,
        totalProtein: true,
        totalCarbs: true,
        totalFats: true,
        meals: true,
        updatedAt: true
      }
    },
    groceryList: {
      basic: {
        id: true,
        weekId: true
      },
      full: {
        id: true,
        weekId: true,
        categories: true,
        updatedAt: true
      }
    }
  },

  // Connection health check
  async isHealthy() {
    try {
      await prisma.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error('Database health check failed:', error)
      return false
    }
  },

  // Get database info
  async getDatabaseInfo() {
    try {
      const result = await prisma.$queryRaw`SELECT version()`
      return result[0]
    } catch (error) {
      return null
    }
  }
}
