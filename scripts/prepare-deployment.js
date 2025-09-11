#!/usr/bin/env node

/**
 * RaceDay Deployment Preparation Script
 * Prepares the application for Vercel deployment
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

console.log('🚀 Preparing RaceDay for deployment...\n')

try {
  // Step 1: Switch to production schema
  console.log('📋 Step 1: Switching to PostgreSQL schema...')
  execSync('cp api/prisma/schema.postgres.prisma api/prisma/schema.prisma', {
    cwd: rootDir,
    stdio: 'inherit'
  })

  // Step 2: Generate Prisma client for production
  console.log('🔧 Step 2: Generating Prisma client...')
  execSync('npm run db:generate', {
    cwd: rootDir,
    stdio: 'inherit'
  })

  // Step 3: Build the application
  console.log('🏗️  Step 3: Building application...')
  execSync('npm run build', {
    cwd: rootDir,
    stdio: 'inherit'
  })

  // Step 4: Verify build output
  console.log('✅ Step 4: Verifying build output...')
  const distExists = fs.existsSync(path.join(rootDir, 'dist'))
  const apiExists = fs.existsSync(path.join(rootDir, 'dist', 'api'))

  if (!distExists) {
    throw new Error('Build failed: dist directory not found')
  }

  if (!apiExists) {
    throw new Error('Build failed: API directory not found in dist')
  }

  console.log('📦 Build verification successful!')
  console.log('📁 Build output structure:')
  console.log('  ├── dist/')
  console.log('  │   ├── index.html')
  console.log('  │   ├── assets/')
  console.log('  │   ├── api/')
  console.log('  │   │   ├── training-plans.js')
  console.log('  │   │   ├── nutrition.js')
  console.log('  │   │   ├── groceries.js')
  console.log('  │   │   └── health.js')
  console.log('  │   ├── data/')
  console.log('  │   └── public/')

  console.log('\n🎉 Deployment preparation complete!')
  console.log('\n📋 Next steps:')
  console.log('1. Set DATABASE_URL environment variable in Vercel')
  console.log('2. Run database migrations: npx prisma migrate deploy')
  console.log('3. Deploy to Vercel: vercel --prod')
} catch (error) {
  console.error('❌ Deployment preparation failed:', error.message)
  process.exit(1)
}
