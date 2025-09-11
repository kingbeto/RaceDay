# RaceDay Project Structure

This document outlines the current project structure and organization principles.

## 📁 **Current Structure (v1.0.0)**

```
raceday/
├── .github/                 # GitHub configuration (future)
├── api/                     # Backend Express.js API
│   ├── routes/              # API route handlers
│   │   ├── training-plans.js
│   │   ├── nutrition.js
│   │   ├── groceries.js
│   │   └── hello.js
│   ├── utils/               # Shared utilities
│   │   └── response.js      # Standardized API responses
│   └── prisma/              # Database configuration
│       ├── client.js        # Prisma client setup
│       ├── schema.prisma    # Current database schema
│       ├── schema.dev.prisma    # SQLite variant
│       ├── schema.postgres.prisma  # PostgreSQL variant
│       ├── migrations/      # Database migrations
│       └── seed.js          # Database seeding
├── app/                     # Frontend Vue.js application
│   ├── components/          # Vue components
│   │   ├── calendar/        # Calendar-specific components
│   │   ├── training/        # Training plan components
│   │   ├── nutrition/       # Nutrition management
│   │   ├── grocery/         # Grocery list components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Base UI components
│   ├── composables/         # Reusable logic hooks
│   ├── pages/               # Route-level components
│   ├── router/              # Vue Router configuration
│   ├── services/            # API services
│   │   └── api.ts           # Centralized API client
│   ├── stores/              # Pinia state management
│   │   ├── training.ts      # Training plan store
│   │   ├── nutrition.ts     # Nutrition data store
│   │   └── grocery.ts       # Grocery list store
│   ├── types/               # TypeScript interfaces
│   ├── data/                # Static data files (fallback)
│   ├── public/              # Public static assets
│   ├── dist/                # Build output
│   ├── .env.development     # Frontend environment config
│   ├── .env.production      # Production environment config
│   ├── index.html           # HTML entry point
│   ├── main.js              # Vue app entry
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.cjs  # Tailwind CSS config
│   └── postcss.config.cjs   # PostCSS config
├── data/                    # Centralized data source
│   ├── el-cruce-plan.json   # Training plan data
│   ├── nutrition-plan.json  # Nutrition data
│   ├── grocery-lists.json   # Grocery lists
│   └── health.json          # Health check data
├── docs/                    # Project documentation
│   ├── API.md               # API documentation
│   ├── PROJECT_STRUCTURE.md # This file
│   ├── REQUIREMENTS.md      # Application requirements
│   ├── APP_BEHAVIORS.md     # Application behaviors
│   ├── CALENDAR_BEHAVIORS.md # Calendar component docs
│   ├── TRAINING_BEHAVIORS.md # Training component docs
│   ├── GROCERY_BEHAVIORS.md  # Grocery component docs
│   └── MEALCARD.md          # Meal card component docs
├── public/                  # Root public assets
├── scripts/                 # Build and deployment scripts
├── tests/                   # Test suites
│   ├── setup.ts             # Test setup
│   └── api.test.ts          # API tests
├── dist/                    # Production build output
├── .env.local               # Local environment variables
├── .env.production          # Production environment variables
├── .editorconfig            # Editor configuration
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier configuration
├── .nvmrc                   # Node version specification
├── nodemon.json             # Nodemon configuration
├── vitest.config.ts         # Testing configuration
├── server.js                # Express server entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment config
├── LICENSE                  # MIT License
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Development guidelines
└── README.md                # Project overview
```

## 🏗️ **Architecture Principles**

### **1. Separation of Concerns**

- **Frontend (`/app/`)**: Vue.js SPA with TypeScript
- **Backend (`/api/`)**: Express.js REST API with Prisma
- **Data (`/data/`)**: Centralized data source
- **Documentation (`/docs/`)**: Technical documentation

### **2. Configuration Management**

- **Single Source**: One configuration file per type
- **Environment-Specific**: Separate configs for dev/prod
- **No Duplication**: Eliminated duplicate config files

### **3. State Management**

- **Pinia Stores**: Reactive state management
- **API Integration**: Stores call backend endpoints
- **Fallback Strategy**: Graceful degradation to static data
- **Caching**: Client-side caching for performance

### **4. Component Organization**

- **Feature-Based**: Components grouped by domain
- **Reusable UI**: Base components in `/ui/`
- **Page Components**: Route-level components in `/pages/`
- **Layout Components**: Structural components in `/layout/`

## 🔄 **Data Flow Architecture**

```
Frontend Request → API Service → Express Route → Prisma → Database
                ↓
             Pinia Store → Vue Component → User Interface
                ↓
           (Fallback to Static Data if API fails)
```

### **Frontend Data Flow**

1. **User Interaction** → Component
2. **Component** → Pinia Store
3. **Store** → API Service
4. **API Service** → Backend API
5. **Response** → Store → Component → UI

### **Backend Data Flow**

1. **API Request** → Express Route
2. **Route Handler** → Prisma Client
3. **Prisma** → Database Query
4. **Response** → Standardized Format
5. **JSON Response** → Frontend

## 📦 **Build Process**

### **Development**

```bash
npm run dev:full    # Both frontend and backend
npm run server:dev  # Backend only (localhost:3001)
npm run dev         # Frontend only (localhost:5173)
```

### **Production Build**

```bash
npm run build       # Complete build pipeline
├── prebuild        # Prepare directories and copy data
├── build:frontend  # Vite build (app/dist/)
└── build:api       # Prisma generate + API copy (dist/)
```

### **Database Management**

```bash
npm run db:setup:dev   # SQLite for development
npm run db:setup:prod  # PostgreSQL for production
npm run db:migrate     # Run migrations
npm run db:seed        # Seed with sample data
```

## 🧪 **Testing Strategy**

### **Frontend Testing**

- **Unit Tests**: Component testing with Vitest
- **Integration Tests**: Store and API integration
- **E2E Tests**: User workflow testing (future)

### **Backend Testing**

- **API Tests**: Route handler testing
- **Database Tests**: Prisma model testing
- **Integration Tests**: Full request/response cycle

## 🚀 **Deployment Strategy**

### **Development**

- **Frontend**: Vite dev server (localhost:5173)
- **Backend**: Express with nodemon (localhost:3001)
- **Database**: SQLite file-based

### **Production**

- **Frontend**: Static build served by Express
- **Backend**: Express server with Prisma
- **Database**: PostgreSQL with connection pooling

## 📈 **Scalability Considerations**

### **Current Limitations**

- Single-server deployment
- File-based SQLite in development
- No horizontal scaling

### **Future Improvements**

- Microservices architecture
- Database clustering
- CDN for static assets
- Load balancing
- Caching layer (Redis)

## 🔧 **Development Tools**

### **Code Quality**

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Vitest**: Testing framework

### **Development Experience**

- **Nodemon**: Auto-restart server
- **Vite**: Fast frontend builds
- **Prisma Studio**: Database GUI
- **Concurrently**: Run multiple processes

This structure provides a solid foundation for scaling the RaceDay application while maintaining clear separation of concerns and development efficiency.
