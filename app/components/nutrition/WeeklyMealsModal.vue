<template>
  <!-- Static weekly meals display - no interactions -->
  <BaseCard class="w-full">
    <!-- Header -->
    <div class="mb-6">
      <h3 class="text-xl leading-6 font-bold text-gray-900">
        🍽️ Weekly Meal Plan: {{ weekData?.weekLabel || 'Semana Actual' }}
      </h3>
    </div>

    <!-- Meals table -->
    <div class="overflow-x-auto">
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
          <tr v-for="day in weekData?.days || sampleDays" :key="day.date">
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
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import type { DailyNutrition } from '@/types'

// Sample data for demonstration
const sampleDays = [
  {
    date: '2024-01-01',
    day: 'Lunes',
    meals: [
      {
        name: 'Desayuno',
        calories: 600,
        dishes: [
          { name: 'Avena con frutas', ingredients: 'Avena, plátano, nueces, miel' }
        ]
      },
      {
        name: 'Almuerzo',
        calories: 800,
        dishes: [
          { name: 'Pollo con vegetales', ingredients: 'Pechuga de pollo, brócoli, quinoa' }
        ]
      },
      {
        name: 'Merienda',
        calories: 400,
        dishes: [
          { name: 'Yogur con frutos secos', ingredients: 'Yogur griego, almendras, miel' }
        ]
      },
      {
        name: 'Cena',
        calories: 500,
        dishes: [
          { name: 'Pescado al horno', ingredients: 'Salmón, verduras al vapor' }
        ]
      }
    ]
  },
  {
    date: '2024-01-02',
    day: 'Martes',
    meals: [
      {
        name: 'Desayuno',
        calories: 550,
        dishes: [
          { name: 'Tostadas integrales', ingredients: 'Pan integral, aguacate, huevo' }
        ]
      },
      {
        name: 'Almuerzo',
        calories: 750,
        dishes: [
          { name: 'Ensalada de quinoa', ingredients: 'Quinoa, vegetales mixtos, aderezo' }
        ]
      },
      {
        name: 'Merienda',
        calories: 350,
        dishes: [
          { name: 'Fruta fresca', ingredients: 'Manzana, pera, nueces' }
        ]
      },
      {
        name: 'Cena',
        calories: 600,
        dishes: [
          { name: 'Pasta integral', ingredients: 'Pasta, salsa de tomate, verduras' }
        ]
      }
    ]
  }
]

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })
}
</script>
