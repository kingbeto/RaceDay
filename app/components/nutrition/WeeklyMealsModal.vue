<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 overflow-y-auto"
      @keydown.escape="$emit('close')"
    >
      <!-- Backdrop -->
      <div 
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <div 
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          @click="$emit('close')"
        ></div>

        <!-- Modal -->
        <div class="inline-block w-full max-w-6xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl leading-6 font-bold text-gray-900">
              Weekly Meals: {{ weekData?.weekLabel || '' }}
            </h3>
            <div class="flex space-x-2">
              <button 
                @click="printWeeklyMeals"
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                🖨️ Print Table
              </button>
              <button 
                @click="$emit('close')" 
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>

          <!-- Print Content -->
          <div id="weekly-meals-print-content">
            <h1 class="text-lg font-bold mb-4">
              🍽️ Weekly Meal Plan: {{ weekData?.weekLabel || '' }}
            </h1>
            
            <table class="w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-3 py-2 text-left font-bold">Day</th>
                  <th class="border border-gray-300 px-3 py-2 text-left font-bold">Desayuno</th>
                  <th class="border border-gray-300 px-3 py-2 text-left font-bold">Almuerzo</th>
                  <th class="border border-gray-300 px-3 py-2 text-left font-bold">Merienda</th>
                  <th class="border border-gray-300 px-3 py-2 text-left font-bold">Cena</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="day in weekData?.days || []" :key="day.date">
                  <td class="border border-gray-300 px-3 py-3 font-semibold">
                    <div>{{ day.day }}</div>
                    <div class="text-xs text-gray-500">
                      {{ formatDate(day.date) }}
                    </div>
                  </td>
                  <td 
                    v-for="(meal, mealIndex) in day.meals" 
                    :key="day.date + '-' + mealIndex"
                    class="border border-gray-300 px-3 py-3 align-top"
                  >
                    <div class="text-sm font-semibold mb-2">{{ meal.name }}</div>
                    <div v-for="dish in meal.dishes || []" :key="dish.name" class="text-xs mb-1">
                      <div class="font-medium">{{ dish.name }}</div>
                      <div class="text-gray-600">{{ dish.ingredients }}</div>
                    </div>
                    <div class="text-xs text-blue-600 mt-1">{{ meal.calories }} kcal</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { DailyNutrition } from '@/types'

interface Props {
  show: boolean
  weekData: {
    weekLabel: string
    days: Array<{
      date: string
      day: string
      meals: DailyNutrition['meals']
    }>
  } | null
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })
}

const printWeeklyMeals = () => {
  const content = document.getElementById('weekly-meals-print-content')?.innerHTML
  if (!content) return

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>Weekly Meals</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .meal-name { font-weight: bold; margin-bottom: 4px; }
          .dish-item { margin-bottom: 2px; font-size: 0.9em; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>${content}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
}
</script>
