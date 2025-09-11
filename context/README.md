# RaceDay Context Documentation

This directory contains comprehensive technical documentation for AI agents to quickly understand and work with the RaceDay application architecture.

## 📚 **Documentation Structure**

### **Architecture Overview**

- **`ARCHITECTURE.md`** - Full-stack architecture, data flow, and system design
- **`PROJECT_STRUCTURE.md`** - File organization and project layout

### **Backend Documentation**

- **`API_ENDPOINTS.md`** - REST API documentation with response patterns
- **`DATABASE.md`** - Prisma models, migrations, and data management

### **Frontend Documentation**

- **`FRONTEND.md`** - Vue.js architecture, components, and state management
- **`UI_COMPONENTS.md`** - Component behaviors and UI/UX patterns

### **Feature Documentation**

- **`TRAINING_FEATURES.md`** - Training calendar and plan management
- **`NUTRITION_FEATURES.md`** - Nutrition planning and meal management
- **`GROCERY_FEATURES.md`** - Grocery list and shopping features

### **Legacy Documentation**

- **`REQUIREMENTS.md`** - Original application requirements and specifications

## 🤖 **For AI Agents**

**Quick Context Setup:**

1. Read `ARCHITECTURE.md` for system overview
2. Read relevant feature docs based on your task
3. Reference `API_ENDPOINTS.md` for backend work or `FRONTEND.md` for frontend work
4. Use component and feature docs for specific implementation details

**Key Information:**

- **Stack**: Vue.js 3 + Express.js + Prisma + SQLite/PostgreSQL
- **Architecture**: Full-stack with API-first approach and fallback strategies
- **State Management**: Pinia stores with API integration and caching
- **Database**: Prisma ORM with multi-environment support
- **API**: Standardized responses with consistent error handling

This documentation is optimized for rapid AI agent contextualization and technical decision making.
