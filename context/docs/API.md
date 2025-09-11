# RaceDay API

Express.js backend for the RaceDay training and nutrition application.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# From the project root
npm install
```

### Running the Server

#### Development

```bash
npm run server:dev
```

Starts the server with nodemon for auto-reload on changes.

#### Production

```bash
npm run server:prod
# or
npm start
```

Starts the server in production mode.

The server will run on `http://localhost:3001` by default.

## 📋 API Endpoints

### Health Check

- **GET** `/health` - Server health status
- **GET** `/api/hello` - API information and available endpoints

### Training Plans

- **GET** `/api/training-plans` - Get complete training plan data

### Nutrition

- **GET** `/api/nutrition` - Get all nutrition data
- **GET** `/api/nutrition?date=YYYY-MM-DD` - Get nutrition for specific date

### Groceries

- **GET** `/api/groceries` - Get all grocery lists
- **GET** `/api/groceries?weekId=W1` - Get grocery list for specific week

## 🏗️ Project Structure

```
api/
├── routes/                 # Express route handlers
│   ├── training-plans.js   # Training plan routes
│   ├── nutrition.js        # Nutrition routes
│   ├── groceries.js        # Grocery list routes
│   └── hello.js            # Health check routes
├── utils/                  # Shared utilities
│   └── response.js         # Standardized response handling
├── prisma/                 # Database configuration
│   ├── client.js           # Prisma client setup
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.js             # Database seeding
└── (migrated from Vercel serverless functions)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
DATABASE_URL="file:./database/raceday.db"  # SQLite for development
# DATABASE_URL="postgresql://..."          # PostgreSQL for production
```

### CORS Configuration

The API is configured with CORS to allow requests from:

- Development: All origins (`*`)
- Production: Only from `FRONTEND_URL` environment variable

## 📊 Data Sources

The API uses **Prisma ORM** with support for multiple databases:

- **Development**: SQLite database (`/database/raceday.db`)
- **Production**: PostgreSQL (via `DATABASE_URL` environment variable)

### Database Models

- `TrainingPlan` - Complete training plans with weekly structure
- `NutritionData` - Daily nutrition plans and meal data
- `GroceryList` - Weekly grocery lists with categorized items

### Legacy Data Migration

Previously read from JSON files in `/app/data/` (now migrated to database):

- `el-cruce-plan.json` → `TrainingPlan` model
- `nutrition-plan.json` → `NutritionData` model
- `grocery-lists.json` → `GroceryList` model

## 🏗️ Architecture & Technical Decisions

### Response Standardization (2025-01-10)

Implemented consistent API response structure across all endpoints:

**Utilities Added:**

- `/api/utils/response.js` - Centralized response handling utilities

**Standard Response Format:**

```json
{
  "success": true,
  "data": {},
  "message": "Optional success message"
}
```

**Standard Error Format:**

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Key Improvements:**

- **Async Error Handling**: `asyncHandler` wrapper prevents uncaught promise rejections
- **Consistent Logging**: Structured error logs with request context
- **Error Codes**: Machine-readable error identification
- **Response Utilities**: `sendSuccess()` and `sendError()` helper functions

### Code Quality Improvements

- **Constants Extraction**: Magic numbers moved to configurable constants (nutrition calculations)
- **Functional Programming**: Manual object building replaced with `Array.reduce()`
- **Better Documentation**: TODO comments added for future enhancements

### Database Integration

- **Prisma ORM**: Type-safe database operations
- **Multi-environment**: SQLite (dev) → PostgreSQL (prod)
- **Connection Optimization**: Singleton pattern prevents multiple Prisma instances
- **Serverless Support**: Conditional configuration for Vercel deployment

## 🔄 Migration from Vercel Serverless

This API has been migrated from Vercel Serverless Functions to Express.js. The migration is complete and the legacy serverless functions have been removed.

### Key Changes

- Route handlers now use Express Router pattern
- CORS and security middleware centralized in main server
- ES6 modules instead of CommonJS
- Centralized error handling with standardized responses
- Health check endpoint added
- Database migration from JSON files to Prisma ORM

## 🚀 Deployment

### Local Development

```bash
npm run server:dev
```

### Production Deployment

The Express server can be deployed to any Node.js hosting service like:

- Heroku
- Railway
- Render
- DigitalOcean App Platform
- AWS EC2/EB
- Google Cloud Run

Example deployment commands:

```bash
# Build the frontend
npm run build

# Start production server
npm start
```

## 🔧 Outstanding Recommendations

### Security & Validation

- [ ] **Input Validation**: Implement request parameter validation (joi/yup)
- [ ] **Rate Limiting**: Add rate limiting middleware (express-rate-limit)
- [ ] **Authentication**: Implement API authentication/authorization
- [ ] **CORS Configuration**: Properly configure CORS for production

### Performance

- [ ] **Caching**: Implement Redis caching for database queries
- [ ] **Pagination**: Add pagination to `findMany()` operations
- [ ] **Connection Pooling**: Optimize Prisma connection pooling for serverless

### Code Quality

- [ ] **TypeScript Migration**: Migrate from JavaScript to TypeScript
- [ ] **Request Validation**: Add input sanitization and validation
- [ ] **API Documentation**: Generate OpenAPI/Swagger documentation

### Monitoring

- [ ] **Health Checks**: Enhance health endpoint with database connectivity
- [ ] **Metrics**: Add application metrics and monitoring
- [ ] **Logging**: Implement structured logging with correlation IDs
