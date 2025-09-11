# Prisma Database Implementation

This directory contains the Prisma ORM implementation for RaceDay, providing a modern database layer that supports both SQLite (development) and Supabase PostgreSQL (production).

## 🚀 Overview

The Prisma implementation provides:

- **Type-safe database queries** with auto-generated TypeScript types
- **Database migrations** using Prisma Migrate
- **Seamless switching** between SQLite (dev) and Supabase (prod)
- **Full CRUD operations** for training plans, nutrition data, and grocery lists
- **Data seeding** from existing JSON files

## 📁 Structure

```
api/prisma/
├── schema.prisma      # Database schema definition
├── client.js          # Prisma client configuration
├── seed.js           # Database seeding script
├── dev.db            # SQLite database file (development)
├── migrations/       # Database migration files
└── README.md         # This documentation
```

## 🗄️ Database Models

### TrainingPlan

```prisma
model TrainingPlan {
  id          String   @id
  title       String
  subtitle    String?
  raceDate    String?
  startDate   String?
  endDate     String?
  description String?
  weeks       Json     // Complex nested structure
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### NutritionData

```prisma
model NutritionData {
  id           String   @id @default(cuid())
  dateKey      String   @unique // YYYY-MM-DD format
  totalCalories Int?
  totalProtein Float?
  totalCarbs   Float?
  totalFats    Float?
  meals        Json     // Complex nested structure
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### GroceryList

```prisma
model GroceryList {
  id        String   @id @default(cuid())
  weekId    String   @unique // W0, W1, W2, etc.
  categories Json    // Array of grocery categories
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ Usage

### Development Setup

1. **Initialize database:**

   ```bash
   npm run db:init
   ```

2. **Generate Prisma client:**

   ```bash
   npm run db:generate
   ```

3. **Run migrations:**

   ```bash
   npm run db:migrate
   ```

4. **Seed database:**
   ```bash
   npm run db:seed
   ```

### Production Setup (Supabase)

1. **Update schema.prisma:**

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Set environment variables:**

   ```bash
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

## 📊 Available Scripts

```bash
# Database operations
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations (development)
npm run db:push        # Push schema changes (development)
npm run db:seed        # Seed database with data
npm run db:studio      # Open Prisma Studio
npm run db:reset       # Reset database
npm run db:init        # Initialize database and seed

# Prisma shortcuts
npm run prisma:dev     # Run migrations (development)
npm run prisma:studio  # Open Prisma Studio
npm run prisma:generate # Generate Prisma client
```

## 🔧 API Integration

The API routes have been updated to use Prisma:

### Training Plans

```javascript
// Get all training plans
const plans = await prisma.trainingPlan.findMany({
  orderBy: { updatedAt: 'desc' }
})

// Get specific plan
const plan = await prisma.trainingPlan.findUnique({
  where: { id: planId }
})
```

### Nutrition Data

```javascript
// Get all nutrition data
const nutrition = await prisma.nutritionData.findMany({
  orderBy: { dateKey: 'asc' }
})

// Get nutrition for specific date
const dailyNutrition = await prisma.nutritionData.findUnique({
  where: { dateKey: date }
})
```

### Grocery Lists

```javascript
// Get all grocery lists
const groceries = await prisma.groceryList.findMany({
  orderBy: { weekId: 'asc' }
})

// Get grocery list for specific week
const weekGroceries = await prisma.groceryList.findUnique({
  where: { weekId: weekId }
})
```

## 🔄 Data Migration

### From JSON to Database

The seeding script automatically migrates data from:

- `app/data/el-cruce-plan.json` → TrainingPlan table
- `app/data/nutrition-plan.json` → NutritionData table
- `app/data/grocery-lists.json` → GroceryList table

### Production Deployment

When deploying to production:

1. **Create Supabase project**
2. **Update DATABASE_URL** in environment
3. **Run migrations** on production database
4. **Seed data** if needed
5. **Update schema.prisma** provider to "postgresql"

## 🎯 Benefits

### Type Safety

- Auto-generated TypeScript types
- Compile-time query validation
- IntelliSense support

### Developer Experience

- Prisma Studio for database browsing
- Migration tracking and rollback
- Automatic schema synchronization

### Production Ready

- Connection pooling
- Query optimization
- Production-grade PostgreSQL support

### Flexibility

- Easy switching between databases
- JSON fields for complex data structures
- Extensible schema design

## 🚨 Important Notes

### SQLite vs PostgreSQL

- **SQLite**: File-based, perfect for development
- **PostgreSQL**: Production-ready, scalable

### JSON Fields

Complex nested structures (weeks, meals, categories) are stored as JSON for:

- Flexibility in data structure
- Easy querying and indexing
- Compatibility with existing frontend

### Environment Variables

```env
# Development (SQLite)
DATABASE_URL="file:./dev.db"

# Production (Supabase)
DATABASE_URL="postgresql://user:pass@host:port/db"
```

## 🐛 Troubleshooting

### Common Issues

1. **Migration errors:**

   ```bash
   npm run db:reset  # Reset and re-run migrations
   ```

2. **Type errors:**

   ```bash
   npm run db:generate  # Regenerate Prisma client
   ```

3. **Connection issues:**
   - Check DATABASE_URL
   - Verify database credentials
   - Ensure database is running

### Prisma Studio

```bash
npm run db:studio
```

Opens a web interface for browsing and editing database data.

## 📈 Performance

- **Connection pooling** in production
- **Query optimization** via Prisma's query engine
- **Automatic indexing** on unique fields
- **Efficient JSON operations**

## 🔮 Future Enhancements

- **Real-time subscriptions** with Supabase
- **Advanced querying** with Prisma's fluent API
- **Database optimization** and indexing
- **Backup and restore** functionality
- **Multi-tenant support**

---

## 🚀 Deployment to Vercel

### Prerequisites

1. **Supabase Account**: Create a Supabase project at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Vercel CLI**: Install with `npm i -g vercel`

### Step 1: Prepare Supabase Database

1. Create a new Supabase project
2. Go to Settings → Database → Connection string
3. Copy the connection string (use the "URI" version)
4. Note down your Supabase URL and anon key from Settings → API

### Step 2: Deploy to Vercel

1. **Prepare deployment:**

   ```bash
   npm run deploy:prepare
   ```

2. **Deploy to Vercel:**

   ```bash
   vercel --prod
   ```

3. **Set environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add environment variables:
     ```
     DATABASE_URL=postgresql://[your-supabase-connection-string]
     VITE_SUPABASE_URL=https://[your-project-id].supabase.co
     VITE_SUPABASE_ANON_KEY=[your-anon-key]
     ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Step 3: Seed Production Database (Optional)

If you want to populate the production database with sample data:

```bash
npx prisma db seed
```

### Environment Variables

**For Development:**

```env
DATABASE_URL="file:./api/prisma/dev.db"
```

**For Production:**

```env
DATABASE_URL="postgresql://username:password@host:port/database?pgbouncer=true&connection_limit=1"
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

### Database Schema Switching

The application automatically switches between SQLite (development) and PostgreSQL (production) based on the `DATABASE_URL`:

- **SQLite URLs** (development): Start with `file:`
- **PostgreSQL URLs** (production): Start with `postgresql:` or `postgres:`

### Troubleshooting

**Common Issues:**

1. **Build fails:**

   ```bash
   npm run deploy:prepare
   # Check for any errors in the build process
   ```

2. **Database connection fails:**
   - Verify `DATABASE_URL` is correct
   - Ensure Supabase database is accessible
   - Check firewall settings

3. **Migrations fail:**

   ```bash
   npx prisma migrate resolve --applied [migration-id]
   ```

4. **API routes not working:**
   - Check Vercel function logs
   - Verify environment variables are set
   - Ensure database is accessible from Vercel

### Vercel Configuration

The `vercel.json` file is configured for:

- ✅ Serverless API functions
- ✅ Static asset serving
- ✅ SPA routing
- ✅ CORS headers
- ✅ Proper caching headers

### Database Management

**Development:**

```bash
npm run db:setup:dev    # Setup SQLite database
npm run db:studio       # Open Prisma Studio
npm run db:seed         # Seed with sample data
```

**Production:**

```bash
npm run db:setup:prod   # Switch to PostgreSQL schema
npx prisma migrate deploy  # Run migrations
npx prisma db seed         # Seed production data
```

### Performance Optimization

- **Connection pooling**: Enabled for production PostgreSQL
- **Query optimization**: Prisma's query engine handles optimization
- **Caching**: Static assets cached for 1 year
- **CDN**: Vercel automatically serves assets via CDN

---

**Status**: ✅ Vercel deployment ready
**Database**: ✅ SQLite (dev) + PostgreSQL (prod)
**API**: ✅ Serverless functions configured
**Build**: ✅ Automated deployment preparation

**Overall Status**: ✅ Prisma implementation complete and tested
**Database**: ✅ SQLite (dev) + Supabase (prod) ready
**API Integration**: ✅ All routes updated and working
**Migrations**: ✅ Automated migration system
**Seeding**: ✅ Data migration from JSON files
**Deployment**: ✅ Vercel-ready with serverless functions
