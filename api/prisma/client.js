import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis

// Configure Prisma client based on environment
const prismaConfig = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
}

// Add connection timeout for serverless environments
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  prismaConfig.datasources = {
    db: {
      url: process.env.DATABASE_URL
    }
  }
}

const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
