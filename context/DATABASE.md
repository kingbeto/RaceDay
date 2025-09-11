# RaceDay Database Architecture

Prisma ORM-based database layer with multi-environment support and type-safe operations.

## 🗃️ **Database Models**

### **TrainingPlan Model**

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
  @@map("training_plans")
}
```

**Data Structure:**

- Stores complete training plans with weekly breakdown
- JSON field contains weeks array with daily training data
- Each week has phases: 'base', 'build', 'peak', 'taper', 'race'

### **NutritionData Model**

```prisma
model NutritionData {
  id           String   @id @default(cuid())
  dateKey      String   @unique // YYYY-MM-DD format
  totalCalories Int?
  totalProtein Float?
  totalCarbs   Float?
  totalFats    Float?
  meals        Json     // Complex meal structure
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@map("nutrition_data")
}
```

**Data Structure:**

- Daily nutrition plans indexed by date
- JSON meals field contains array of meal objects
- Each meal has name, calories, and dishes array

### **GroceryList Model**

```prisma
model GroceryList {
  id        String   @id @default(cuid())
  weekId    String   @unique // Format: W0, W1, W2, etc.
  categories Json    // Array of grocery categories
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("grocery_lists")
}
```

**Data Structure:**

- Weekly grocery lists organized by training week
- JSON categories field contains categorized shopping items

## 🛠️ **Database Configuration**

### **Multi-Environment Setup**

**Development (SQLite):**

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:../../database/raceday.db"
}
```

**Production (PostgreSQL):**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### **Schema Management**

- **`schema.prisma`**: Current active schema
- **`schema.dev.prisma`**: SQLite configuration
- **`schema.postgres.prisma`**: PostgreSQL configuration
- **Switching**: Automated via npm scripts

### **Prisma Client Setup**

```javascript
// api/prisma/client.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis
const prismaConfig = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
}

// Serverless optimization
if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  prismaConfig.datasources = {
    db: { url: process.env.DATABASE_URL }
  }
}

const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

## 🔄 **Migration Strategy**

### **Development Workflow**

```bash
npm run db:setup:dev     # Copy dev schema and setup database
npm run db:migrate       # Create and apply new migration
npm run db:seed          # Seed with sample data
npm run db:studio        # Open database GUI
```

### **Production Workflow**

```bash
npm run db:setup:prod    # Copy production schema
npm run db:migrate:prod  # Deploy migrations
```

### **Migration Files**

- Located in `/api/prisma/migrations/`
- Auto-generated based on schema changes
- Include both SQL and metadata

## 📊 **Data Seeding**

### **Seed Script** (`/api/prisma/seed.js`)

```javascript
import prisma from './client.js'
import fs from 'fs'

// Load data from centralized source
const trainingData = JSON.parse(fs.readFileSync('../../data/el-cruce-plan.json'))
const nutritionData = JSON.parse(fs.readFileSync('../../data/nutrition-plan.json'))
const groceryData = JSON.parse(fs.readFileSync('../../data/grocery-lists.json'))

// Seed functions for each model
```

### **Sample Data Sources**

- **Training**: `/data/el-cruce-plan.json`
- **Nutrition**: `/data/nutrition-plan.json`
- **Groceries**: `/data/grocery-lists.json`

## ⚡ **Performance Optimizations**

### **Connection Pooling**

- Singleton pattern prevents multiple Prisma instances
- Global variable caching in development
- Serverless-optimized configuration

### **Query Optimization**

- Selective field selection where possible
- Proper indexing on frequently queried fields
- JSON field queries for complex nested data

### **Caching Strategy**

- Application-level caching in Pinia stores
- Database query result caching (future: Redis)
- Static data fallback for performance

## 🔐 **Security & Validation**

### **Input Sanitization**

- Prisma provides built-in SQL injection protection
- Type validation through TypeScript interfaces
- JSON schema validation for complex fields

### **Access Control**

- Currently no user authentication (single-user app)
- Future: Row-level security for multi-user scenarios
- API-level authorization in Express routes

## 📈 **Scaling Considerations**

### **Current Limitations**

- Single database instance
- No read replicas
- Limited concurrent connections in SQLite

### **Future Scaling**

- **Read Replicas**: For read-heavy workloads
- **Sharding**: By user or date ranges
- **Connection Pooling**: Enhanced pool management
- **Caching Layer**: Redis for query results

## 🛠️ **Development Tools**

### **Prisma Studio**

```bash
npm run db:studio
```

- Visual database browser
- Real-time data editing
- Query performance analysis

### **Database Reset**

```bash
npm run db:reset        # Reset and re-seed database
```

### **Schema Validation**

```bash
npx prisma validate     # Validate schema syntax
npx prisma format       # Format schema file
```

This database architecture provides type safety, performance, and scalability while maintaining development efficiency.
