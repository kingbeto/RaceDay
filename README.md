# 🏃‍♂️ RaceDay - Training & Nutrition Planner

A modern, comprehensive Single Page Application (SPA) designed for managing multi-day race training programs, nutrition plans, and logistics. Built specifically for **El Cruce de los Andes** but adaptable for any endurance race training.

![RaceDay](https://img.shields.io/badge/RaceDay-v1.0.0-success?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 **Core Features**

- **📅 Interactive Training Calendar** - Full calendar view with training phases and daily activities
- **🍽️ Nutrition Management** - Detailed meal planning with macro tracking and Argentine cuisine focus
- **🛒 Smart Grocery Lists** - Automatically generated shopping lists organized by training weeks
- **📊 Progress Tracking** - Visual indicators for training intensity and nutrition compliance  
- **🖨️ Print-Friendly** - Export weekly meal plans and grocery lists for offline use
- **📱 Mobile Responsive** - Optimized for all devices with modern UI/UX

## 🛠️ **Technology Stack**

### **Frontend** (`/app` folder)
- **Vue.js 3** with Composition API & TypeScript
- **Vite** for lightning-fast build system and dev server
- **Vue Router** for SPA navigation
- **Pinia** for reactive state management
- **Tailwind CSS** for responsive, utility-first styling
- **VueUse** for powerful composables and utilities

### **Backend** (`/api` folder)
- **Vercel Serverless Functions** (Node.js)
- **Database-ready API endpoints** (ready for Supabase integration)
- **JSON-based data storage** for initial development
- **CORS-enabled** for cross-origin requests

### **Database & Hosting**
- **JSON files** for initial data (`/app/data/`)
- **Supabase** ready for database migration
- **Vercel** deployment with automatic CI/CD
- **Environment variables** for secure configuration

## 📁 **Project Structure**

```
raceday/
├── app/                      # Vue.js frontend source
│   ├── components/           # Reusable Vue components
│   │   ├── calendar/         # Calendar-specific components
│   │   ├── training/         # Training plan components
│   │   ├── nutrition/        # Nutrition management components
│   │   ├── grocery/          # Grocery list components
│   │   ├── layout/           # Layout components (header, sidebar)
│   │   └── ui/               # Base UI components (buttons, modals)
│   ├── composables/          # Reusable logic hooks
│   ├── stores/               # Pinia state stores
│   ├── data/                 # JSON data files
│   │   ├── el-cruce-plan.json     # Training plan data
│   │   ├── nutrition-plan.json    # Nutrition data
│   │   └── grocery-lists.json     # Grocery lists by week
│   ├── types/                # TypeScript interfaces
│   ├── pages/                # Vue Router pages/views
│   ├── router/               # Router configuration
│   ├── assets/               # Static assets
│   ├── vite.config.ts        # Vite configuration
│   ├── tailwind.config.cjs   # Tailwind CSS configuration
│   ├── postcss.config.cjs    # PostCSS configuration
│   └── index.html            # Entry HTML file
│
├── api/                      # Vercel serverless API endpoints
│   ├── training-plans.js     # Training plan API
│   ├── nutrition.js          # Nutrition data API
│   └── groceries.js          # Grocery lists API
│
├── public/                   # Static public assets
├── vercel.json               # Vercel deployment configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/raceday.git
   cd raceday
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env.local file (optional for initial setup)
   echo "VITE_APP_TITLE=RaceDay" > .env.local
   echo "VITE_APP_VERSION=1.0.0" >> .env.local
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 🏗️ **Architecture Overview**

### **Component Structure**
- **Pages** - Route-level components (`HomePage`, `CalendarPage`, etc.)
- **Layout** - App structure components (`AppHeader`, `AppSidebar`)
- **Feature** - Domain-specific components (`TrainingWeek`, `NutritionModal`)
- **UI** - Reusable base components (`BaseButton`, `BaseModal`)

### **State Management**
- **Training Store** - Manages training plan data and user selections
- **Nutrition Store** - Handles meal planning and macro calculations
- **Grocery Store** - Manages shopping lists and ingredients

### **Data Flow**
1. **JSON files** provide initial data structure
2. **Pinia stores** manage reactive state
3. **Composables** provide reusable business logic
4. **API endpoints** ready for database integration

## 📊 **Data Models**

### **Training Plan Structure**
```typescript
interface TrainingPlan {
  id: string
  title: string
  subtitle: string
  raceDate: string
  startDate: string
  endDate: string
  description: string
  weeks: Week[]
}

interface Week {
  id: string
  label: string
  start: string
  end: string
  summary: string
  phase: 'base' | 'build' | 'peak' | 'taper' | 'race'
  rows: TrainingDay[]
}
```

### **Nutrition Data Structure**
```typescript
interface DailyNutrition {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFats: number
  meals: Meal[]
}
```

## 🌐 **Deployment**

### **Vercel Deployment**

1. **Connect to Vercel:**
   ```bash
   npx vercel
   ```

2. **Configure build settings:**
   - Build Command: `cd app && npm run build`
   - Output Directory: `app/dist`
   - Node.js Version: 18.x

3. **Environment Variables (Production):**
   ```
   VITE_SUPABASE_URL=your_production_supabase_url
   VITE_SUPABASE_ANON_KEY=your_production_supabase_key
   VITE_APP_TITLE=RaceDay
   ```

### **API Endpoints**
- `GET /api/training-plans` - Retrieve training plan data
- `GET /api/nutrition?date=YYYY-MM-DD` - Get nutrition for specific date
- `GET /api/groceries?weekId=W1` - Get grocery list for specific week

## 🎨 **Customization**

### **Training Plan Data**
Edit `/app/data/el-cruce-plan.json` to customize:
- Training phases and duration
- Daily activities and descriptions
- Calorie targets and notes

### **Nutrition Plans**
Modify `/app/data/nutrition-plan.json` for:
- Custom meal plans
- Macro nutrient targets
- Cultural cuisine preferences

### **Styling**
- **Colors**: Update `tailwind.config.cjs` for brand colors
- **Fonts**: Modify CSS imports in `index.html`
- **Layout**: Customize components in `/app/components/layout/`

## 🔧 **Development**

### **Adding New Features**
1. Create components in appropriate folders
2. Add TypeScript interfaces in `/app/types/`
3. Implement business logic in composables
4. Update stores for state management
5. Add API endpoints in `/api/` folder

### **Code Standards**
- **TypeScript** throughout for type safety
- **Composition API** for Vue components
- **Conventional Commits** for git messages
- **Component-based** architecture
- **Responsive design** first approach

## 🚦 **Future Enhancements**

### **Database Integration**
- [ ] Supabase database schema migration
- [ ] User authentication and profiles
- [ ] Multi-user training plan sharing
- [ ] Progress tracking and analytics

### **Advanced Features**
- [ ] Offline mode with service workers
- [ ] Push notifications for training reminders
- [ ] Integration with fitness trackers
- [ ] Social features and community sharing
- [ ] AI-powered nutrition recommendations

### **Mobile App**
- [ ] Progressive Web App (PWA) features
- [ ] Native mobile app with Capacitor
- [ ] Camera integration for meal logging
- [ ] GPS tracking for training routes

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **El Cruce de los Andes** race organizers for inspiration
- **Vue.js** team for the amazing framework
- **Tailwind CSS** for beautiful, utility-first styling
- **Vercel** for seamless deployment and hosting

---

**Built with ❤️ for endurance athletes and training enthusiasts**

