<template>
  <header class="bg-background border-b border-border sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Header Content -->
      <div class="lg:flex lg:items-center lg:justify-between py-6">
        <!-- Left Section - Title and Metadata -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-3 mb-2">
            <!-- Logo and Brand -->
            <button
              @click="resetToToday"
              class="flex items-center gap-3 hover:bg-muted px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              :title="'Reset to today\'s date'"
            >
              <div class="flex-shrink-0">
                <img
                  :src="logoSrc"
                  alt="RaceDay Logo"
                  class="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div>
                <h1
                  class="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200"
                >
                  RaceDay
                </h1>
                <p
                  class="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                >
                  Training & Nutrition Planner
                </p>
              </div>
            </button>
          </div>

          <!-- Page Title and Metadata -->
          <h2
            class="text-2xl/7 font-bold text-foreground sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ currentPageTitle }}
          </h2>

          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-muted-foreground">
              <CalendarDaysIcon
                class="mr-1.5 size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              {{ formatDate(today) }}
            </div>
            <div class="mt-2 flex items-center text-sm text-muted-foreground">
              <TargetIcon class="mr-1.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {{ currentPhase }}
            </div>
            <div class="mt-2 flex items-center text-sm text-muted-foreground">
              <ClockIcon class="mr-1.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              {{ nextTrainingDays }} días hasta próxima sesión
            </div>
          </div>
        </div>

        <!-- Right Section - Action Buttons -->
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
          <!-- Desktop Action Buttons -->
          <span class="hidden sm:block">
            <button
              @click="navigateToCalendar"
              type="button"
              class="inline-flex items-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted transition-colors"
            >
              <CalendarIcon
                class="mr-1.5 -ml-0.5 size-5 text-muted-foreground"
                aria-hidden="true"
              />
              Calendario
            </button>
          </span>

          <span class="ml-3 hidden sm:block">
            <button
              @click="navigateToNutrition"
              type="button"
              class="inline-flex items-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted transition-colors"
            >
              <UtensilsIcon
                class="mr-1.5 -ml-0.5 size-5 text-muted-foreground"
                aria-hidden="true"
              />
              Nutrición
            </button>
          </span>

          <span class="sm:ml-3">
            <button
              @click="resetToToday"
              type="button"
              class="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
            >
              <HomeIcon class="mr-1.5 -ml-0.5 size-5" aria-hidden="true" />
              Hoy
            </button>
          </span>

          <!-- Mobile Dropdown Menu -->
          <Menu as="div" class="relative ml-3 sm:hidden">
            <MenuButton
              class="inline-flex items-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-border hover:bg-muted transition-colors"
            >
              Más
              <ChevronDownIcon
                class="-mr-1 ml-1.5 size-5 text-muted-foreground"
                aria-hidden="true"
              />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <button
                    @click="navigateToCalendar"
                    :class="[
                      active ? 'bg-muted' : '',
                      'block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors'
                    ]"
                  >
                    <CalendarIcon class="mr-2 -ml-1 inline size-4" aria-hidden="true" />
                    Calendario
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="navigateToNutrition"
                    :class="[
                      active ? 'bg-muted' : '',
                      'block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors'
                    ]"
                  >
                    <UtensilsIcon class="mr-2 -ml-1 inline size-4" aria-hidden="true" />
                    Nutrición
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    @click="resetToToday"
                    :class="[
                      active ? 'bg-accent' : '',
                      'block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors'
                    ]"
                  >
                    <HomeIcon class="mr-2 -ml-1 inline size-4" aria-hidden="true" />
                    Ir a Hoy
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>

      <!-- Navigation Links (Desktop) -->
      <nav class="hidden md:flex items-center space-x-6 pb-4">
        <router-link
          to="/"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === '/'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          ]"
        >
          Plan de Entrenamiento
        </router-link>

        <router-link
          to="/calendar"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === '/calendar'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          ]"
        >
          Calendario
        </router-link>

        <router-link
          to="/nutrition"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === '/nutrition'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          ]"
        >
          Nutrición
        </router-link>

        <router-link
          to="/grocery"
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            $route.path === '/grocery'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          ]"
        >
          Compras
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTrainingStore } from '@/stores'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  CalendarDaysIcon,
  TargetIcon,
  ClockIcon,
  CalendarIcon,
  UtensilsIcon,
  HomeIcon,
  ChevronDownIcon
} from '@heroicons/vue/20/solid'
// Using public asset for better Vercel compatibility
const logoSrc = '/raceday-logo.svg'

const router = useRouter()
const route = useRoute()
const trainingStore = useTrainingStore()

// Current page title based on route
const currentPageTitle = computed(() => {
  const path = route.path
  switch (path) {
    case '/':
      return 'Plan de Entrenamiento'
    case '/calendar':
      return 'Calendario de Entrenamiento'
    case '/nutrition':
      return 'Plan Nutricional'
    case '/grocery':
      return 'Lista de Compras'
    default:
      return 'RaceDay - Training & Nutrition Planner'
  }
})

// Current training phase (simplified for now)
const currentPhase = computed(() => {
  // This could be calculated based on the training plan data
  // For now, return a static value
  return 'Fase de Preparación'
})

// Days until next training session
const nextTrainingDays = computed(() => {
  // This could be calculated based on actual training schedule
  // For now, return a sample value
  return Math.floor(Math.random() * 7) + 1 // Random number between 1-7
})

// Today's date
const today = computed(() => trainingStore.today)

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Navigation functions
const navigateToCalendar = () => {
  router.push('/calendar')
}

const navigateToNutrition = () => {
  router.push('/nutrition')
}

const resetToToday = async () => {
  // Reset to today's date using the store method
  const today = trainingStore.today

  // Navigate to home page if not already there (to see the full training plan)
  if (router.currentRoute.value.path !== '/') {
    await router.push('/')
  }

  // Scroll to today's date in the training plan after navigation
  const todayRow = document.querySelector(`#d-${today}`)
  if (todayRow) {
    todayRow.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
}
</script>
