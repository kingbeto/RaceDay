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
└── (migrated from Vercel serverless functions)
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### CORS Configuration

The API is configured with CORS to allow requests from:

- Development: All origins (`*`)
- Production: Only from `FRONTEND_URL` environment variable

## 📊 Data Sources

The API currently reads from JSON files in `/app/data/`:

- `el-cruce-plan.json` - Training plan data
- `nutrition-plan.json` - Nutrition data
- `grocery-lists.json` - Grocery lists by week

## 🔄 Migration from Vercel Serverless

This API has been migrated from Vercel Serverless Functions to Express.js. The migration is complete and the legacy serverless functions have been removed.

### Key Changes

- Route handlers now use Express Router pattern
- CORS and security middleware centralized in main server
- ES6 modules instead of CommonJS
- Centralized error handling
- Health check endpoint added

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
