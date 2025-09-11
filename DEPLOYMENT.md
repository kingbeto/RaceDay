# RaceDay Vercel Deployment Guide

Deploy RaceDay to Vercel using Express.js as a serverless function.

## 🚀 Quick Deployment

### Prerequisites

1. **Vercel Account**: [Sign up at vercel.com](https://vercel.com)
2. **PostgreSQL Database**: Set up a database with one of these providers:
   - [Supabase](https://supabase.com) (Recommended)
   - [Neon](https://neon.tech)
   - [Railway](https://railway.app)

### Step 1: Database Setup

#### Using Supabase (Recommended)
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy the connection string (URI format)
4. Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`

### Step 2: Deploy to Vercel

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Express.js

2. **Set Environment Variables**:
   ```bash
   DATABASE_URL=postgresql://your_connection_string
   NODE_ENV=production
   ```

3. **Deploy**: Click "Deploy" - Vercel will:
   - Build the frontend with Vite
   - Generate Prisma client
   - Copy static files to `public/`
   - Deploy Express app as serverless function

### Step 3: Database Migration

After deployment:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Link and migrate**:
   ```bash
   vercel link
   vercel env pull .env.production.local
   npx prisma db push
   npx prisma db seed
   ```

## 🏗️ Architecture

### Express on Vercel
- Express app runs as single Vercel Function
- Static files served from `public/` directory
- Database connections handled by Prisma
- API routes: `/api/*`, Health check: `/health`

### File Structure
```
├── server.js          # Express app for local development  
├── api/
│   ├── index.js       # Express app (exported for Vercel)
│   └── routes/        # Express route modules
├── app/               # Vue.js frontend source
├── public/            # Static files served by Vercel
├── data/              # Static JSON data
└── vercel.json        # Vercel configuration
```

## 🔧 Local Development

1. **Setup**:
   ```bash
   npm install
   npm run db:setup:dev  # SQLite for development
   ```

2. **Development**:
   ```bash
   npm run dev:full      # Frontend + Express server
   ```

3. **Build**:
   ```bash
   npm run build         # Prepare for deployment
   ```

## ⚡ Features

- **Single Function**: Entire Express app runs as one function
- **Auto-scaling**: Vercel handles scaling based on traffic
- **Static Serving**: Frontend files served via Edge Network
- **CORS**: Configured for cross-origin requests
- **Database**: Prisma ORM with PostgreSQL
- **Health Checks**: Built-in monitoring endpoints

## 🛠️ Troubleshooting

**Build Fails**: Check build logs in Vercel dashboard
**Database Issues**: Verify `DATABASE_URL` and connection
**CORS Errors**: Check origin configuration in Express app
**404 Errors**: Verify `vercel.json` rewrite rules

## 📊 Monitoring

- **Health**: `https://your-app.vercel.app/health`
- **API**: `https://your-app.vercel.app/api/hello`
- **Logs**: Available in Vercel dashboard

Your Express app is now running as a Vercel Function! 🎉