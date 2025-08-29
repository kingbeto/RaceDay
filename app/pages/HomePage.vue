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

            <!-- Static Today's Focus - Moved to top for prominence -->
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
                    <p class="text-sm text-slate-600 font-medium">{{ todayFormatted }}</p>
                  </div>
                </div>
              </div>
              <div class="p-6 space-y-6">
                <div class="bg-slate-50 rounded-xl p-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-sm font-bold text-slate-900 flex items-center">
                      <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Training
                    </h4>
                    <div class="flex items-center gap-2">
                      <span :class="`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                        trainingIntensity.color === 'red' ? 'bg-red-500' :
                        trainingIntensity.color === 'orange' ? 'bg-orange-500' :
                        trainingIntensity.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                      }`">
                        {{ trainingIntensity.label }}
                      </span>
                      <span class="text-xs text-slate-600 font-medium">
                        {{ todaysTraining.isExercise ? 'Exercise Day' : 'Rest Day' }}
                      </span>
                    </div>
                  </div>
                  <p class="text-sm text-slate-700 leading-relaxed">{{ todaysTraining.training }}</p>
                </div>
                <div class="bg-emerald-50 rounded-xl p-4">
                  <h4 class="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    Nutrition Focus
                  </h4>
                  <p class="text-sm text-slate-700 leading-relaxed">{{ nutritionFocus }}</p>
                  <div class="mt-2 text-xs text-slate-600">
                    <span class="font-medium">Calories:</span> {{ todaysTraining.calories || (todaysTraining.isExercise ? 2300 : 2100) }} kcal
                  </div>
                </div>
                <div class="text-xs text-slate-600 font-medium">
                  📋 Meal plan details available
                </div>
              </div>
            </div>

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



          </div>
        </aside>

        <!-- Static Main Content: Training Plan (2/3 width) -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-100/50">



            <!-- Static Training Plan Content -->
            <div class="min-h-96 p-8">
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
import { computed } from 'vue'
import CalendarView from '@/components/calendar/CalendarView.vue'
import TrainingPlanView from '@/components/training/TrainingPlanView.vue'
import GroceryList from '@/components/grocery/GroceryList.vue'

// Static sample training plan data
const sampleTrainingPlan = {
  id: 'el-cruce-plan',
  title: 'El Cruce de los Andes Training Plan',
  subtitle: 'Comprehensive ultra-endurance training program',
  raceDate: '2025-12-01',
  startDate: '2025-08-11',
  endDate: '2025-12-01',
  description: '18-week training plan for the El Cruce de los Andes ultra-endurance race',
  weeks: [
    {
      id: 'W0',
      label: 'W0 (Aug 11–17) - Pre-Training Assessment',
      start: '2025-08-11',
      end: '2025-08-17',
      summary: 'Initial assessment, mobility baseline, and light preparation',
      phase: 'preparation',
      rows: [
        { date: '2025-08-11', day: 'Mon', training: 'Off - Rest and assessment', food: 'Balanced nutrition', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-12', day: 'Tue', training: 'Light mobility + walking assessment', food: 'Hydration focus', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-13', day: 'Wed', training: 'Easy 20-30 min walk + mobility', food: 'Protein focus', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-14', day: 'Thu', training: 'Off - Complete rest', food: 'Light carbs', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-15', day: 'Fri', training: 'Light mobility work', food: 'Protein + fluids', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-16', day: 'Sat', training: 'Easy 30-45 min walk', food: 'Balanced intake', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-17', day: 'Sun', training: 'Off - Prepare for training start', food: 'Recovery nutrition', isExercise: false, isRaceDay: false, calories: 2100 }
      ]
    },
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
    },
    {
      id: 'W1-Deload',
      label: 'W1-Deload (Aug 25–31) - Recovery Week',
      start: '2025-08-25',
      end: '2025-08-31',
      summary: 'Recovery and adaptation week after initial base training.',
      phase: 'deload',
      rows: [
        { date: '2025-08-25', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-26', day: 'Tue', training: 'Light mobility + easy walk 20-30 min', food: 'Light carbs', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-27', day: 'Wed', training: 'Active recovery - yoga or light stretching', food: 'Anti-inflammatory foods', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-28', day: 'Thu', training: 'Off - Complete rest', food: 'Balanced nutrition', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-29', day: 'Fri', training: 'Light mobility work', food: 'Hydration focus', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-30', day: 'Sat', training: 'Easy 30-40 min walk', food: 'Protein + fluids', isExercise: false, isRaceDay: false, calories: 2100 },
        { date: '2025-08-31', day: 'Sun', training: 'Off - Prepare for next phase', food: 'Recovery nutrition', isExercise: false, isRaceDay: false, calories: 2100 }
      ]
    },
    {
      id: 'W2',
      label: 'W2 (Sep 1–7)',
      start: '2025-09-01',
      end: '2025-09-07',
      summary: 'Continuing base building with stair tempo.',
      phase: 'base',
      rows: [
        { date: '2025-09-01', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-09-02', day: 'Tue', training: 'Stair tempo 25–35 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-09-03', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Moderate carbs', isExercise: true },
        { date: '2025-09-04', day: 'Thu', training: 'Off or 20–30 min walk', food: 'Light carbs', isExercise: false },
        { date: '2025-09-05', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein + fluids', isExercise: true },
        { date: '2025-09-06', day: 'Sat', training: 'Long Z2 60 min (flat), pack/poles test', food: '50–70 g carbs/h + sodium', isExercise: true },
        { date: '2025-09-07', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W3',
      label: 'W3 (Sep 8–14) — Deload',
      start: '2025-09-08',
      end: '2025-09-14',
      summary: 'Recovery week with reduced intensity.',
      phase: 'base',
      rows: [
        { date: '2025-09-08', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-09-09', day: 'Tue', training: 'Stairs 20–25 min + Gym Lower (lighter)', food: 'Carbs pre/post small', isExercise: true },
        { date: '2025-09-10', day: 'Wed', training: 'Easy 25–30 min run-walk + Gym Upper/Core (lighter)', food: 'Balanced', isExercise: true },
        { date: '2025-09-11', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-09-12', day: 'Fri', training: 'Gym Maintenance (light)', food: 'Protein', isExercise: true },
        { date: '2025-09-13', day: 'Sat', training: 'Long Z2 60 min (cap)', food: '40–60 g carbs/h', isExercise: true },
        { date: '2025-09-14', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W4',
      label: 'W4 (Sep 15–21)',
      start: '2025-09-15',
      end: '2025-09-21',
      summary: 'Progressive build phase with longer sessions.',
      phase: 'build',
      rows: [
        { date: '2025-09-15', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-09-16', day: 'Tue', training: 'Stairs 40–45 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-09-17', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Moderate carbs', isExercise: true },
        { date: '2025-09-18', day: 'Thu', training: 'Off or easy walk', food: 'Light carbs', isExercise: false },
        { date: '2025-09-19', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein + fluids', isExercise: true },
        { date: '2025-09-20', day: 'Sat', training: 'Long Z2 110–120 min, light pack', food: '50–70 g carbs/h + sodium', isExercise: true },
        { date: '2025-09-21', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W5',
      label: 'W5 (Sep 22–28)',
      start: '2025-09-22',
      end: '2025-09-28',
      summary: 'Continued build with poles introduction.',
      phase: 'build',
      rows: [
        { date: '2025-09-22', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-09-23', day: 'Tue', training: 'Stairs 40–45 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-09-24', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Balanced', isExercise: true },
        { date: '2025-09-25', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-09-26', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-09-27', day: 'Sat', training: 'Long Z2 120–130 min, poles', food: '60–80 g carbs/h', isExercise: true },
        { date: '2025-09-28', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W6',
      label: 'W6 (Sep 29–Oct 5)',
      start: '2025-09-29',
      end: '2025-10-05',
      summary: 'Build phase with descent practice.',
      phase: 'build',
      rows: [
        { date: '2025-09-29', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-09-30', day: 'Tue', training: 'Stairs 45 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-10-01', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Moderate carbs', isExercise: true },
        { date: '2025-10-02', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-10-03', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-10-04', day: 'Sat', training: 'Long Z2 130–140 min, include descents', food: '60–80 g carbs/h + sodium', isExercise: true },
        { date: '2025-10-05', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W7',
      label: 'W7 (Oct 6–12) — Deload',
      start: '2025-10-06',
      end: '2025-10-12',
      summary: 'Recovery week with reduced volume.',
      phase: 'build',
      rows: [
        { date: '2025-10-06', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-10-07', day: 'Tue', training: 'Stairs 30–35 min + Gym Lower (lighter)', food: 'Carbs small', isExercise: true },
        { date: '2025-10-08', day: 'Wed', training: 'Easy 25–35 min + Gym Upper/Core (lighter)', food: 'Balanced', isExercise: true },
        { date: '2025-10-09', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-10-10', day: 'Fri', training: 'Gym Maintenance (light)', food: 'Protein', isExercise: true },
        { date: '2025-10-11', day: 'Sat', training: 'Long Z2 90–100 min', food: '40–60 g carbs/h', isExercise: true },
        { date: '2025-10-12', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W8',
      label: 'W8 (Oct 13–19)',
      start: '2025-10-13',
      end: '2025-10-19',
      summary: 'Return to building with longer sessions.',
      phase: 'build',
      rows: [
        { date: '2025-10-13', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-10-14', day: 'Tue', training: 'Stairs 45 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-10-15', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Moderate carbs', isExercise: true },
        { date: '2025-10-16', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-10-17', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-10-18', day: 'Sat', training: 'Long Z2 140–150 min, pack/poles', food: '60–80 g carbs/h + sodium', isExercise: true },
        { date: '2025-10-19', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W9',
      label: 'W9 (Oct 20–26)',
      start: '2025-10-20',
      end: '2025-10-26',
      summary: 'Peak build phase with descent focus.',
      phase: 'build',
      rows: [
        { date: '2025-10-20', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-10-21', day: 'Tue', training: 'Stairs 45–50 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-10-22', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Balanced', isExercise: true },
        { date: '2025-10-23', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-10-24', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-10-25', day: 'Sat', training: 'Long Z2 150–165 min, include descents', food: '60–90 g carbs/h', isExercise: true },
        { date: '2025-10-26', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W10',
      label: 'W10 (Oct 27–Nov 2)',
      start: '2025-10-27',
      end: '2025-11-02',
      summary: 'Maximum volume week before peak phase.',
      phase: 'build',
      rows: [
        { date: '2025-10-27', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-10-28', day: 'Tue', training: 'Stairs 45–50 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-10-29', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Moderate carbs', isExercise: true },
        { date: '2025-10-30', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-10-31', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-11-01', day: 'Sat', training: 'Long Z2 165–180 min, pack/poles', food: '60–90 g carbs/h + sodium', isExercise: true },
        { date: '2025-11-02', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'W11',
      label: 'W11 (Nov 3–9) — B2B Weekend (mandatory)',
      start: '2025-11-03',
      end: '2025-11-09',
      summary: 'Back-to-back weekend training simulation.',
      phase: 'peak',
      rows: [
        { date: '2025-11-03', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-11-04', day: 'Tue', training: 'Stairs 45–50 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-11-05', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Balanced', isExercise: true },
        { date: '2025-11-06', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-11-07', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-11-08', day: 'Sat', training: 'Long Z2 150–165 min', food: '60–90 g carbs/h', isExercise: true },
        { date: '2025-11-09', day: 'Sun', training: 'Z2 run-walk 120–150 min (easy)', food: '60–90 g carbs/h + sodium', isExercise: true }
      ]
    },
    {
      id: 'W12',
      label: 'W12 (Nov 10–16) — B2B Weekend',
      start: '2025-11-10',
      end: '2025-11-16',
      summary: 'Second back-to-back weekend with maximum volume.',
      phase: 'peak',
      rows: [
        { date: '2025-11-10', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-11-11', day: 'Tue', training: 'Stairs 45–55 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-11-12', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Balanced', isExercise: true },
        { date: '2025-11-13', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-11-14', day: 'Fri', training: 'Gym Maintenance/Prehab', food: 'Protein', isExercise: true },
        { date: '2025-11-15', day: 'Sat', training: 'Long Z2 180–195 min, pack/poles', food: '60–90 g carbs/h + sodium', isExercise: true },
        { date: '2025-11-16', day: 'Sun', training: 'Z2 run-walk 120–150 min (easy)', food: '60–90 g carbs/h + sodium', isExercise: true }
      ]
    },
    {
      id: 'W13',
      label: 'W13 (Nov 17–23) — Stage Simulation (3 days)',
      start: '2025-11-17',
      end: '2025-11-23',
      summary: 'Three-day stage race simulation.',
      phase: 'peak',
      rows: [
        { date: '2025-11-17', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-11-18', day: 'Tue', training: 'Stairs 45–55 min + Gym Lower', food: 'Carbs pre/post', isExercise: true },
        { date: '2025-11-19', day: 'Wed', training: 'Easy 35–45 min Z2 run-walk + Gym Upper/Core', food: 'Balanced', isExercise: true },
        { date: '2025-11-20', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-11-21', day: 'Fri', training: 'Stage sim Day 1 — Z2 2h15–2h30 (run-walk)', food: 'Protein', isExercise: true },
        { date: '2025-11-22', day: 'Sat', training: 'Stage sim Day 2 — Z2 3h45–4h (run-walk)', food: '60–90 g carbs/h + sodium', isExercise: true },
        { date: '2025-11-23', day: 'Sun', training: 'Stage sim Day 3 — Z2 2h45–3h (run-walk)', food: 'Small deficit', isExercise: true }
      ]
    },
    {
      id: 'W14',
      label: 'W14 (Nov 24–30) — Deload',
      start: '2025-11-24',
      end: '2025-11-30',
      summary: 'Final taper before race.',
      phase: 'taper',
      rows: [
        { date: '2025-11-24', day: 'Mon', training: 'Off + mobility', food: 'Protein focus', isExercise: false },
        { date: '2025-11-25', day: 'Tue', training: 'Stairs 25–35 min + Gym Lower (light)', food: 'Carbs small', isExercise: true },
        { date: '2025-11-26', day: 'Wed', training: 'Easy 25–35 min + Gym Upper/Core (light)', food: 'Balanced', isExercise: true },
        { date: '2025-11-27', day: 'Thu', training: 'Off', food: 'Veg + protein', isExercise: false },
        { date: '2025-11-28', day: 'Fri', training: 'Gym Maintenance (light)', food: 'Protein', isExercise: true },
        { date: '2025-11-29', day: 'Sat', training: 'Z2 75–90 min', food: '40–60 g carbs/h', isExercise: true },
        { date: '2025-11-30', day: 'Sun', training: 'Off', food: 'Small deficit', isExercise: false }
      ]
    },
    {
      id: 'RACE',
      label: 'Race (Dec 1–3) — Finish-focused',
      start: '2025-12-01',
      end: '2025-12-03',
      summary: '3 days ~30 km/day, strict cutoffs. Keep Z2, protect quads, fuel well.',
      phase: 'race',
      rows: [
        { date: '2025-12-01', day: 'Mon', training: 'Stage Day 1 ~30 km Z2 run-walk; hike ups, jog flats/downs', food: '60–90 g carbs/h + 500–750 ml fluids/h + sodium', isExercise: true, isRaceDay: true },
        { date: '2025-12-02', day: 'Tue', training: 'Stage Day 2 ~30 km Z2 run-walk; manage effort', food: 'Carbs/protein within 30 min post; feet care; sleep', isExercise: true, isRaceDay: true },
        { date: '2025-12-03', day: 'Wed', training: 'Stage Day 3 ~30 km Z2 run-walk; finish strong', food: 'Maintain fueling; protect quads', isExercise: true, isRaceDay: true }
      ]
    }
  ]
}

// Get today's date dynamically
const todayDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0] // YYYY-MM-DD format
})

// Get today's date formatted for display
const todayFormatted = computed(() => {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Find today's training data
const todaysTraining = computed(() => {
  const todayStr = todayDate.value

  for (const week of sampleTrainingPlan.weeks) {
    const todayTraining = week.rows.find(row => row.date === todayStr)
    if (todayTraining) {
      return todayTraining
    }
  }

  // If no training found for today, return a default rest day
  return {
    date: todayStr,
    day: 'Today',
    training: 'Rest Day - Recovery and preparation',
    food: 'Balanced nutrition with adequate protein',
    isExercise: false,
    isRaceDay: false,
    calories: 2100
  }
})

// Classify training intensity
const trainingIntensity = computed(() => {
  const training = todaysTraining.value.training.toLowerCase()

  // Race days are always maximum intensity
  if (todaysTraining.value.isRaceDay) {
    return { level: 'maximum', label: 'RACE DAY', color: 'red' }
  }

  // Check for high-intensity indicators
  if (training.includes('tempo') || training.includes('threshold') ||
      training.includes('hard') || training.includes('intensive') ||
      training.includes('maximum') || training.includes('peak')) {
    return { level: 'high', label: 'HARD', color: 'orange' }
  }

  // Check for moderate-intensity indicators
  if (training.includes('long z2') || training.includes('endurance') ||
      training.includes('moderate') || training.includes('sustained') ||
      training.includes('stair tempo') || training.includes('gym')) {
    return { level: 'moderate', label: 'MODERATE', color: 'blue' }
  }

  // Check for easy/recovery indicators
  if (training.includes('easy') || training.includes('recovery') ||
      training.includes('light') || training.includes('mobility') ||
      training.includes('off') || training.includes('rest')) {
    return { level: 'easy', label: 'EASY', color: 'green' }
  }

  // Default to easy for unknown patterns
  return { level: 'easy', label: 'EASY', color: 'green' }
})

// Get nutrition focus based on training
const nutritionFocus = computed(() => {
  if (!todaysTraining.value.isExercise) {
    return 'Recovery nutrition with adequate protein and balanced carbs for maintenance.'
  }

  const intensity = trainingIntensity.value.level

  switch (intensity) {
    case 'maximum':
      return 'Maximum fueling: 60-90g carbs/hour, electrolyte replacement, protein recovery.'
    case 'high':
      return 'High-intensity fueling: 50-70g carbs/hour, sodium replacement, quality protein.'
    case 'moderate':
      return 'Moderate fueling: 40-60g carbs/hour, maintain hydration, balanced intake.'
    case 'easy':
      return 'Light fueling: 30-40g carbs/hour, focus on whole foods and recovery.'
    default:
      return 'Balanced nutrition with adequate protein and complex carbohydrates.'
  }
})
</script>
