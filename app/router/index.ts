// Simplified router - no navigation behaviors
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'RaceDay - Static Display'
    }
  }
  // All other routes removed - static display only
]

const router = createRouter({
  history: createWebHistory(),
  routes
  // Removed scroll behavior and navigation guards
})

// Simple title setting
document.title = 'RaceDay - Static Display'

export default router
