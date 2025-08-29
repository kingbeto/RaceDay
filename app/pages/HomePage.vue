<template>
  <!-- Static RaceDay Application - No Interactive Behaviors -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
    <!-- Static Header -->
    <header class="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div class="max-w-full mx-auto px-6 lg:px-12">
        <div class="py-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-6">
              <!-- Brand -->
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    RaceDay
                  </h1>
                  <p class="text-sm text-slate-600 font-medium">
                    Static training and nutrition display
                  </p>
                </div>
              </div>

              <!-- Race Date Badge -->
              <div class="hidden md:flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span class="text-sm font-semibold text-amber-900">Race: December 1, 2025</span>
              </div>
            </div>

            <!-- Static Info Display -->
            <div class="hidden lg:flex items-center space-x-6">
              <!-- Nutrition Info -->
              <div class="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl">
                <div class="flex items-center space-x-2">
                  <span class="text-emerald-600">🍽️</span>
                  <span class="text-sm font-medium text-emerald-900">Training: ~2,500 kcal | Rest: ~2,100 kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-full mx-auto px-6 lg:px-12 py-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-12">

        <!-- Left Sidebar: Calendar & Shopping (1/3 width) -->
        <aside class="lg:col-span-4 mb-12 lg:mb-0">
          <div class="sticky top-32 space-y-8">

            <!-- Static Calendar Section -->
            <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg font-bold text-slate-900">Training Calendar</h2>
                    <p class="text-sm text-slate-600 font-medium">
                      Aug 18 → Dec 1, 2025 (Race)
                    </p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <CalendarView
                  :training-plan="sampleTrainingPlan"
                  :selected-date="'2025-01-15'"
                  :compact="true"
                />
              </div>
            </div>

            <!-- Static Shopping List Section -->
            <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-emerald-50 via-white to-green-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 7m0 6v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13v-2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Shopping Lists</h3>
                    <p class="text-sm text-slate-600 font-medium">Weekly nutrition planning</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <GroceryList />
              </div>
            </div>

            <!-- Static Today's Focus -->
            <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-lg shadow-slate-100/50">
              <div class="p-6 border-b border-slate-200/60 bg-gradient-to-r from-amber-50 via-white to-orange-50/30">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-slate-900">Today's Focus</h3>
                    <p class="text-sm text-slate-600 font-medium">January 15, 2025</p>
                  </div>
                </div>
              </div>
              <div class="p-6 space-y-6">
                <div class="bg-slate-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Training
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">Long Z2 - Steady aerobic pace. Nose breathing, can hold conversation. Build fat-burning efficiency.</p>
                </div>
                <div class="bg-emerald-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Nutrition Focus
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">High carbohydrate intake for endurance training. Focus on complex carbs and adequate hydration.</p>
                </div>
                <div class="text-xs text-slate-600 font-medium">
                  📋 Meal plan details available
                </div>
              </div>
            </div>

          </div>
        </aside>

        <!-- Static Main Content: Training Plan (2/3 width) -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-100/50">

            <!-- Static Training Plan Header -->
            <div class="p-8 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 via-white to-blue-50/20">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-slate-900">El Cruce de los Andes Training Plan</h2>
                    <p class="text-slate-600 font-medium">
                      Weekly schedule and progression
                    </p>
                  </div>
                </div>
                <div class="hidden md:flex items-center space-x-4">
                  <div class="px-4 py-2 bg-slate-100/60 rounded-xl">
                    <span class="text-sm font-medium text-slate-600">
                      Today: Jan 15, 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Static Training Plan Content -->
            <div class="min-h-96 p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <TrainingPlanView
                :plan="sampleTrainingPlan"
                :selected-date="'2025-01-15'"
                :is-expanded="true"
              />
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- No modals or interactive elements - static display only -->
  </div>
</template>

<script setup lang="ts">
import CalendarView from '@/components/calendar/CalendarView.vue'
import TrainingPlanView from '@/components/training/TrainingPlanView.vue'
import GroceryList from '@/components/grocery/GroceryList.vue'

// Static sample training plan data
const sampleTrainingPlan = {
  id: 'el-cruce-plan',
  title: 'El Cruce de los Andes Training Plan',
  subtitle: 'Comprehensive ultra-endurance training program',
  raceDate: '2025-12-01',
  startDate: '2025-08-18',
  endDate: '2025-12-01',
  description: '16-week training plan for the El Cruce de los Andes ultra-endurance race',
  weeks: [
    {
      id: 'W1',
      label: 'Semana 1 - Preparación Base',
      start: '2025-08-18',
      end: '2025-08-24',
      summary: 'Introducción al entrenamiento base y acondicionamiento general',
      phase: 'base',
      rows: [
        { date: '2025-08-18', day: 'Lunes', training: 'Gym Lower - Squat/hinge focus', food: 'High protein recovery meal', isExercise: true, isRaceDay: false, calories: 2300 },
        { date: '2025-08-19', day: 'Martes', training: 'Easy Z2 - 60 min conversational pace', food: 'Balanced carb + protein', isExercise: true, isRaceDay: false, calories: 2100 },
        { date: '2025-08-20', day: 'Miércoles', training: 'Gym Upper/Core - Push/pull focus', food: 'Anti-inflammatory foods', isExercise: true, isRaceDay: false, calories: 2300 },
        { date: '2025-08-21', day: 'Jueves', training: 'Recovery - Light mobility', food: 'Hydration focus', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-22', day: 'Viernes', training: 'Tempo - 45 min sustained effort', food: 'Pre-workout fueling', isExercise: true, isRaceDay: false, calories: 2300 },
        { date: '2025-08-23', day: 'Sábado', training: 'Long Z2 - 90 min endurance base', food: 'During-exercise nutrition', isExercise: true, isRaceDay: false, calories: 2300 },
        { date: '2025-08-24', day: 'Domingo', training: 'Off - Complete rest', food: 'Recovery nutrition', isExercise: false, isRaceDay: false, calories: 2100 }
      ]
    }
  ]
}
</script>
