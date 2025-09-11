<template>
  <!-- Static nutrition display - no interactions -->
  <BaseCard class="w-full">
    <div v-if="nutritionData" class="space-y-8">
      <!-- Header with date and calorie target -->
      <div class="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
        <h2 class="text-xl font-bold text-blue-900 mb-2">{{ formatDate(date) }}</h2>
        <div class="flex items-center justify-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <span class="font-medium text-blue-700">Objetivo:</span>
            <span class="text-blue-900">{{ nutritionData.totalCalories }} kcal</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium text-blue-700">Tipo:</span>
            <span class="text-blue-900">{{ dayType }}</span>
          </div>
        </div>
      </div>

      <!-- Macro summary -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div class="text-2xl font-bold text-orange-600">{{ nutritionData.totalCalories }}</div>
          <div class="text-sm text-orange-700 font-medium">Calorías</div>
        </div>
        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div class="text-2xl font-bold text-blue-600">{{ nutritionData.totalProtein }}g</div>
          <div class="text-sm text-blue-700 font-medium">Proteínas</div>
          <div class="text-xs text-blue-600 mt-1">{{ proteinPercentage }}%</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="text-2xl font-bold text-green-600">{{ nutritionData.totalCarbs }}g</div>
          <div class="text-sm text-green-700 font-medium">Carbohidratos</div>
          <div class="text-xs text-green-600 mt-1">{{ carbsPercentage }}%</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div class="text-2xl font-bold text-yellow-600">{{ nutritionData.totalFats }}g</div>
          <div class="text-sm text-yellow-700 font-medium">Grasas</div>
          <div class="text-xs text-yellow-600 mt-1">{{ fatsPercentage }}%</div>
        </div>
      </div>

      <!-- Four Meals Structure (specs requirement) -->
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Comidas del Día</h3>
        </div>

        <!-- Four meals grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Desayuno -->
          <div class="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
            <div class="bg-amber-100 px-4 py-3 border-b border-amber-200">
              <h4 class="font-semibold text-amber-900 flex items-center">
                <span class="mr-2">🌅</span>
                Desayuno
              </h4>
            </div>
            <div class="p-4">
              <MealCard v-if="desayuno" :meal="desayuno" :compact="true" />
              <div v-else class="text-center py-4 text-amber-700">
                <p class="text-sm">No hay desayuno planificado</p>
              </div>
            </div>
          </div>

          <!-- Almuerzo -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
            <div class="bg-blue-100 px-4 py-3 border-b border-blue-200">
              <h4 class="font-semibold text-blue-900 flex items-center">
                <span class="mr-2">☀️</span>
                Almuerzo
              </h4>
            </div>
            <div class="p-4">
              <MealCard v-if="almuerzo" :meal="almuerzo" :compact="true" />
              <div v-else class="text-center py-4 text-blue-700">
                <p class="text-sm">No hay almuerzo planificado</p>
              </div>
            </div>
          </div>

          <!-- Merienda -->
          <div class="bg-green-50 border border-green-200 rounded-lg overflow-hidden">
            <div class="bg-green-100 px-4 py-3 border-b border-green-200">
              <h4 class="font-semibold text-green-900 flex items-center">
                <span class="mr-2">🍃</span>
                Merienda
              </h4>
            </div>
            <div class="p-4">
              <MealCard v-if="merienda" :meal="merienda" :compact="true" />
              <div v-else class="text-center py-4 text-green-700">
                <p class="text-sm">No hay merienda planificada</p>
              </div>
            </div>
          </div>

          <!-- Cena -->
          <div class="bg-purple-50 border border-purple-200 rounded-lg overflow-hidden">
            <div class="bg-purple-100 px-4 py-3 border-b border-purple-200">
              <h4 class="font-semibold text-purple-900 flex items-center">
                <span class="mr-2">🌙</span>
                Cena
              </h4>
            </div>
            <div class="p-4">
              <MealCard v-if="cena" :meal="cena" :compact="true" />
              <div v-else class="text-center py-4 text-purple-700">
                <p class="text-sm">No hay cena planificada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nutrition Notes -->
      <div v-if="nutritionNotes" class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 class="font-semibold text-gray-900 mb-2">Notas Nutricionales</h4>
        <p class="text-sm text-gray-700">{{ nutritionNotes }}</p>
      </div>
    </div>

    <div v-else class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="text-gray-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p class="text-gray-600">No hay datos de nutrición para este día</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import MealCard from './MealCard.vue'
import type { DailyNutrition } from '@/types'

interface Props {
  date: string | null
}

const props = defineProps<Props>()

// Static nutrition data for demonstration
const nutritionData: DailyNutrition = {
  totalCalories: 2300,
  totalProtein: 120,
  totalCarbs: 250,
  totalFats: 85,
  meals: [
    {
      name: 'Desayuno',
      calories: 600,
      dishes: [
        {
          name: 'Avena con frutas',
          ingredients: 'Avena, plátano, nueces, miel',
          preparation: 'Cocinar avena, añadir frutas y nueces'
        }
      ]
    },
    {
      name: 'Almuerzo',
      calories: 800,
      dishes: [
        {
          name: 'Pollo con vegetales',
          ingredients: 'Pechuga de pollo, brócoli, quinoa, aceite de oliva',
          preparation: 'Cocinar pollo a la plancha, hervir vegetales'
        }
      ]
    },
    {
      name: 'Merienda',
      calories: 400,
      dishes: [
        {
          name: 'Yogur con frutos secos',
          ingredients: 'Yogur griego, almendras, miel',
          preparation: 'Mezclar todos los ingredientes'
        }
      ]
    },
    {
      name: 'Cena',
      calories: 500,
      dishes: [
        {
          name: 'Pescado al horno',
          ingredients: 'Salmón, verduras al vapor, limón',
          preparation: 'Hornear pescado con verduras'
        }
      ]
    }
  ]
}

// Four meals structure
const desayuno =
  nutritionData.meals.find(meal => meal.name.toLowerCase().includes('desayuno')) || null
const almuerzo =
  nutritionData.meals.find(meal => meal.name.toLowerCase().includes('almuerzo')) || null
const merienda =
  nutritionData.meals.find(meal => meal.name.toLowerCase().includes('merienda')) || null
const cena = nutritionData.meals.find(meal => meal.name.toLowerCase().includes('cena')) || null

// Macro percentages
const proteinPercentage = Math.round(
  ((nutritionData.totalProtein * 4) / nutritionData.totalCalories) * 100
)
const carbsPercentage = Math.round(
  ((nutritionData.totalCarbs * 4) / nutritionData.totalCalories) * 100
)
const fatsPercentage = Math.round(
  ((nutritionData.totalFats * 9) / nutritionData.totalCalories) * 100
)

// Static day type
const dayType = 'Día de Entrenamiento'

// Static nutrition notes
const nutritionNotes =
  'Mantener hidratación y consumir carbohidratos complejos para el entrenamiento'

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Fecha no especificada'

  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
