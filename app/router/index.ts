import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Plan de Entrenamiento'
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/pages/CalendarPage.vue'),
    meta: {
      title: 'Calendario'
    }
  },
  {
    path: '/nutrition',
    name: 'Nutrition',
    component: () => import('@/pages/NutritionPage.vue'),
    meta: {
      title: 'Nutrición'
    }
  },
  {
    path: '/grocery',
    name: 'Grocery',
    component: () => import('@/pages/GroceryPage.vue'),
    meta: {
      title: 'Lista de Compras'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title
router.beforeEach((to, from, next) => {
  const title = to.meta?.title as string
  document.title = title ? `${title} - RaceDay` : 'RaceDay'
  next()
})

export default router
