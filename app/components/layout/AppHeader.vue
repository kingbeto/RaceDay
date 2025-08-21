<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and title -->
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0">
            <span class="text-2xl">🏃‍♂️</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">RaceDay</h1>
            <p class="text-xs text-gray-500">Training & Nutrition Planner</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              $route.path === '/' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Plan de Entrenamiento
          </router-link>
          
          <router-link
            to="/calendar"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              $route.path === '/calendar' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Calendario
          </router-link>
          
          <router-link
            to="/nutrition"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              $route.path === '/nutrition' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Nutrición
          </router-link>
          
          <router-link
            to="/grocery"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              $route.path === '/grocery' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            ]"
          >
            Compras
          </router-link>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 pb-3">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="link in mobileLinks"
              :key="link.path"
              :to="link.path"
              :class="[
                'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                $route.path === link.path 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              ]"
              @click="showMobileMenu = false"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMobileMenu = ref(false)

const mobileLinks = [
  { name: 'Plan de Entrenamiento', path: '/' },
  { name: 'Calendario', path: '/calendar' },
  { name: 'Nutrición', path: '/nutrition' },
  { name: 'Compras', path: '/grocery' }
]
</script>
