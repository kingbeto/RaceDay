# RaceDay API Endpoints

Comprehensive REST API documentation with standardized response patterns and error handling.

## 🌐 **API Architecture**

### **Base Configuration**

```javascript
// server.js
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-domain.com/api'
  : 'http://localhost:3001/api'

// Standardized response format
{
  "success": boolean,
  "data": any,
  "message"?: string,
  "error"?: string,
  "code"?: string
}
```

### **Error Handling Strategy**

```javascript
// api/utils/response.js
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export const errorResponse = (message, statusCode = 500, code = null) => {
  return {
    response: { success: false, error: message, ...(code && { code }) },
    statusCode
  }
}
```

## 🏋️ **Training Plans API**

### **GET /api/training-plans**

Retrieves complete training plan data with weekly breakdown.

**Request:**

```http
GET /api/training-plans
Accept: application/json
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "el-cruce-2024",
    "title": "El Cruce de los Andes Training Plan",
    "subtitle": "16-week endurance training program",
    "raceDate": "2024-02-15",
    "startDate": "2023-10-23",
    "endDate": "2024-02-15",
    "description": "Comprehensive training plan for El Cruce de los Andes",
    "weeks": [
      {
        "id": "W0",
        "label": "Week 1: Base Building",
        "start": "2023-10-23",
        "end": "2023-10-29",
        "summary": "Foundation week focusing on aerobic base",
        "phase": "base",
        "rows": [
          {
            "date": "2023-10-23",
            "day": "Monday",
            "training": "Rest day - light stretching and mobility work",
            "food": "Balanced nutrition with adequate protein for recovery",
            "isExercise": false,
            "isRaceDay": false,
            "intensity": "off",
            "calories": 2000
          }
        ]
      }
    ]
  },
  "message": "Training plan retrieved successfully"
}
```

**Error Responses:**

```json
{
  "success": false,
  "error": "Training plan not found",
  "code": "PLAN_NOT_FOUND"
}
```

## 🍽️ **Nutrition API**

### **GET /api/nutrition**

Retrieves nutrition data with optional date filtering.

**Request:**

```http
GET /api/nutrition?date=2023-10-23
Accept: application/json
```

**Query Parameters:**

- `date` (optional): YYYY-MM-DD format for specific date

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "nutrition_20231023",
    "dateKey": "2023-10-23",
    "totalCalories": 2200,
    "totalProtein": 120,
    "totalCarbs": 275,
    "totalFats": 85,
    "meals": [
      {
        "name": "Breakfast",
        "calories": 450,
        "dishes": [
          {
            "name": "Oatmeal with Berries",
            "quantity": "1 bowl",
            "calories": 280,
            "protein": 8,
            "carbs": 54,
            "fats": 5,
            "ingredients": ["Rolled oats", "Mixed berries", "Honey", "Chia seeds"]
          },
          {
            "name": "Greek Yogurt",
            "quantity": "150g",
            "calories": 170,
            "protein": 15,
            "carbs": 12,
            "fats": 8,
            "ingredients": ["Greek yogurt", "Vanilla extract"]
          }
        ]
      }
    ]
  },
  "message": "Nutrition data for 2023-10-23"
}
```

### **GET /api/nutrition/generate**

Generates nutrition data for a specific date based on training requirements.

**Request:**

```http
GET /api/nutrition/generate?date=2023-10-23&intensity=high
Accept: application/json
```

**Query Parameters:**

- `date` (required): YYYY-MM-DD format
- `intensity` (optional): high | moderate | low | off
- `calories` (optional): Target calorie count

**Response:**

```json
{
  "success": true,
  "data": {
    "dateKey": "2023-10-23",
    "totalCalories": 2800,
    "totalProtein": 140,
    "totalCarbs": 350,
    "totalFats": 95,
    "meals": [
      {
        "name": "Pre-Training",
        "calories": 400,
        "dishes": [
          {
            "name": "Banana with Almond Butter",
            "quantity": "1 medium banana + 2 tbsp",
            "calories": 400,
            "protein": 8,
            "carbs": 45,
            "fats": 18,
            "ingredients": ["Banana", "Almond butter", "Honey"]
          }
        ]
      }
    ]
  },
  "message": "Generated nutrition plan for high intensity training day"
}
```

## 🛒 **Grocery Lists API**

### **GET /api/groceries**

Retrieves grocery lists with optional week filtering.

**Request:**

```http
GET /api/groceries?weekId=W0
Accept: application/json
```

**Query Parameters:**

- `weekId` (optional): Week identifier (W0, W1, W2, etc.)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "name": "Proteins & Dairy",
      "items": [
        {
          "name": "Chicken breast",
          "quantity": "1kg",
          "unit": "kg",
          "estimated_price": 12.5,
          "category": "proteins",
          "isEssential": true,
          "nutritionalPurpose": "High-quality protein for muscle recovery",
          "alternatives": ["Chicken thighs", "Turkey breast"]
        },
        {
          "name": "Greek yogurt",
          "quantity": "1kg",
          "unit": "kg",
          "estimated_price": 8.0,
          "category": "proteins",
          "isEssential": true,
          "nutritionalPurpose": "Protein and probiotics for recovery",
          "alternatives": ["Regular yogurt", "Cottage cheese"]
        }
      ]
    }
  ],
  "message": "Grocery list for week W0"
}
```

### **GET /api/groceries/all**

Retrieves all grocery lists for complete planning.

**Response:**

```json
{
  "success": true,
  "data": {
    "W0": { "categories": [...] },
    "W1": { "categories": [...] },
    "W2": { "categories": [...] }
  },
  "message": "All grocery lists retrieved"
}
```

## 🔧 **Utility Endpoints**

### **GET /api/hello**

Health check endpoint for API status verification.

**Request:**

```http
GET /api/hello
Accept: application/json
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "RaceDay API is running!",
    "timestamp": "2023-10-23T10:30:00Z",
    "version": "1.0.0",
    "environment": "development"
  }
}
```

### **GET /api/status**

Comprehensive system status including database connectivity.

**Response:**

```json
{
  "success": true,
  "data": {
    "api": "healthy",
    "database": "connected",
    "lastUpdate": "2023-10-23T10:30:00Z",
    "recordCounts": {
      "trainingPlans": 1,
      "nutritionData": 112,
      "groceryLists": 16
    }
  }
}
```

## 📊 **Response Standards**

### **Success Response Format**

```typescript
interface SuccessResponse<T> {
  success: true
  data: T
  message?: string
}
```

### **Error Response Format**

```typescript
interface ErrorResponse {
  success: false
  error: string
  code?: string
  details?: any
}
```

### **HTTP Status Codes**

- `200` - Success with data
- `201` - Created successfully
- `400` - Bad request / Invalid parameters
- `404` - Resource not found
- `500` - Internal server error

## 🔐 **Security Headers**

### **CORS Configuration**

```javascript
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, 'http://localhost:5173']
        : ['http://localhost:5173', 'http://127.0.0.1:5173', '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
    optionsSuccessStatus: 200
  })
)
```

### **Security Headers (Helmet.js)**

```javascript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:']
      }
    }
  })
)
```

## 🚀 **Performance Considerations**

### **Caching Strategy**

```javascript
// In-memory caching for frequently requested data
const cache = new Map()

const getCachedData = (key, fetchFunction, ttl = 300000) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data
  }

  const data = fetchFunction()
  cache.set(key, { data, timestamp: Date.now() })
  return data
}
```

### **Database Query Optimization**

```javascript
// Selective field queries
const getTrainingPlan = async () => {
  return await prisma.trainingPlan.findFirst({
    select: {
      id: true,
      title: true,
      weeks: true
      // Exclude unnecessary fields
    }
  })
}
```

## 📈 **API Metrics & Monitoring**

### **Request Logging**

```javascript
// Morgan middleware for request logging
app.use(
  morgan('combined', {
    stream: {
      write: message => logger.info(message.trim())
    }
  })
)
```

### **Performance Tracking**

- Response time monitoring
- Database query performance
- Error rate tracking
- Memory usage monitoring

This API provides robust, standardized endpoints with comprehensive error handling and performance optimization for the RaceDay application.
