# 🏃‍♂️ RaceDay - Training & Nutrition Planner

A modern, full-stack application designed for managing multi-day race training programs, nutrition plans, and logistics. Built specifically for **El Cruce de los Andes** but adaptable for any endurance race training.

![RaceDay](https://img.shields.io/badge/RaceDay-v1.0.0-success?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-Database-2D3748?style=for-the-badge&logo=prisma)

## 🎯 **Core Features**

- **📅 Interactive Training Calendar** - Full calendar view with training phases and daily activities
- **🍽️ Nutrition Management** - Detailed meal planning with macro tracking and Argentine cuisine focus
- **🛒 Smart Grocery Lists** - Automatically generated shopping lists organized by training weeks
- **📊 Progress Tracking** - Visual indicators for training intensity and nutrition compliance
- **🖨️ Print-Friendly** - Export weekly meal plans and grocery lists for offline use
- **📱 Mobile Responsive** - Optimized for all devices with modern UI/UX

## 🛠️ **Technology Stack**

- **Frontend**: Vue.js 3 + TypeScript + Tailwind CSS + Pinia
- **Backend**: Express.js + Prisma ORM + SQLite/PostgreSQL
- **Development**: Vite + ESLint + Prettier + Vitest
- **Deployment**: Vercel-ready with environment-based configuration

## 🚀 **Quick Start**

### **Prerequisites**

- **Node.js 20.x** and npm
- Git for version control

### **Installation**

1. **Clone and install:**

   ```bash
   git clone https://github.com/your-org/raceday.git
   cd raceday
   npm install
   ```

2. **Set up database:**

   ```bash
   npm run db:setup:dev
   ```

3. **Start development servers:**

   ```bash
   npm run dev:full
   ```

4. **Access the application:**
   - **Frontend**: http://localhost:5173
   - **API**: http://localhost:3001
   - **Health Check**: http://localhost:3001/health

### **Available Scripts**

```bash
# Development
npm run dev:full      # Start both frontend and backend
npm run dev           # Frontend only (localhost:5173)
npm run server:dev    # Backend only (localhost:3001)

# Database
npm run db:setup:dev  # Setup SQLite for development
npm run db:studio     # Open Prisma Studio (database GUI)
npm run db:seed       # Seed database with sample data

# Production
npm run build         # Build complete application
npm start            # Start production server

# Code Quality
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run test          # Run tests
```

## 🏗️ **Project Structure**

```
raceday/
├── api/                  # Express.js backend
│   ├── routes/           # API endpoints
│   ├── utils/            # Utilities (response handling)
│   └── prisma/           # Database config & migrations
├── app/                  # Vue.js frontend
│   ├── components/       # Vue components
│   ├── stores/           # Pinia state management
│   ├── services/         # API services
│   └── types/            # TypeScript interfaces
├── data/                 # Centralized data source
├── context/              # Technical documentation (for AI agents)
├── tests/                # Test suites
└── [config files...]    # ESLint, Prettier, etc.
```

## 📊 **API Endpoints**

All endpoints return standardized JSON responses:

- `GET /api/training-plans` - Complete training plan data
- `GET /api/nutrition?date=YYYY-MM-DD` - Daily nutrition data
- `GET /api/groceries?weekId=W1` - Weekly grocery lists
- `GET /health` - Server health check

## 🎨 **Customization**

- **Training Plans**: Edit data in `/data/el-cruce-plan.json`
- **Nutrition Plans**: Modify `/data/nutrition-plan.json`
- **Styling**: Update Tailwind config in `/app/tailwind.config.cjs`
- **API Behavior**: Customize routes in `/api/routes/`

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test: `npm run test && npm run lint`
4. Commit: `git commit -m 'feat: add amazing feature'`
5. Push and create Pull Request

**Development Guidelines:**

- Use TypeScript throughout
- Follow Vue 3 Composition API patterns
- Write tests for new features
- Use conventional commit messages
- Run `npm run format` before committing

## 🔧 **Development Setup**

**Prerequisites:**

- Node.js 20.x (check with `node --version`)
- npm 8.x or higher

**Environment Setup:**

1. The project includes `.nvmrc` for Node version management
2. ESLint and Prettier are pre-configured
3. Database migrations run automatically with `db:setup:dev`
4. Hot reload enabled for both frontend and backend

**Common Tasks:**

- **Add new API endpoint**: Create route in `/api/routes/`
- **Add Vue component**: Place in appropriate `/app/components/` subdirectory
- **Database changes**: Update `/api/prisma/schema.prisma` and run `npm run db:migrate`
- **Add tests**: Place in `/tests/` directory

## 📄 **License & Version**

This project is licensed under the MIT License.

**Version History:**

- **v1.0.0** (2025-01-11): Full-stack architecture with Express.js API, Prisma database, standardized responses, and improved project structure
- **v0.9.0** (2024-09-10): Initial Vue.js frontend with JSON data storage

---

**Built with ❤️ for endurance athletes and training enthusiasts**

_For detailed technical documentation and AI agent contextualization, see `/context/` directory_
