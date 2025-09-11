<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Plan de Nutrición</h1>
      <p class="text-gray-600">Gestión completa de la alimentación para el entrenamiento</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Date selector -->
        <BaseCard title="Seleccionar Fecha">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input
                v-model="selectedDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div class="flex items-end">
              <BaseButton v-if="selectedDate" @click="loadNutritionForDate" class="w-full">
                Ver Plan de Nutrición
              </BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Nutrition details -->
        <div v-if="nutritionData" class="space-y-6">
          <!-- Macro summary -->
          <BaseCard title="Resumen de Macronutrientes">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-3xl font-bold text-orange-600">
                  {{ nutritionData.totalCalories }}
                </div>
                <div class="text-sm text-gray-600">Calorías</div>
                <div class="text-xs text-gray-500 mt-1">{{ macroPercentages.calories }}</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600">
                  {{ nutritionData.totalProtein }}g
                </div>
                <div class="text-sm text-gray-600">Proteínas</div>
                <div class="text-xs text-gray-500 mt-1">{{ macroPercentages.protein }}</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-3xl font-bold text-green-600">{{ nutritionData.totalCarbs }}g</div>
                <div class="text-sm text-gray-600">Carbohidratos</div>
                <div class="text-xs text-gray-500 mt-1">{{ macroPercentages.carbs }}</div>
              </div>
              <div class="text-center p-4 bg-yellow-50 rounded-lg">
                <div class="text-3xl font-bold text-yellow-600">{{ nutritionData.totalFats }}g</div>
                <div class="text-sm text-gray-600">Grasas</div>
                <div class="text-xs text-gray-500 mt-1">{{ macroPercentages.fats }}</div>
              </div>
            </div>
          </BaseCard>

          <!-- Meals -->
          <BaseCard title="Comidas del Día">
            <div class="grid gap-6">
              <MealCard v-for="meal in nutritionData.meals" :key="meal.name" :meal="meal" />
            </div>
          </BaseCard>
        </div>

        <!-- Empty state -->
        <BaseCard v-else-if="selectedDate" title="Sin Datos">
          <div class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">No hay datos específicos de nutrición para esta fecha.</p>
            <p class="text-sm text-gray-500">
              Se mostrará un plan nutricional generado automáticamente.
            </p>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Quick actions -->
        <BaseCard title="Acciones Rápidas">
          <div class="space-y-3">
            <BaseButton variant="outline" size="sm" @click="goToToday" class="w-full">
              📅 Ir a Hoy
            </BaseButton>
            <BaseButton
              v-if="nutritionData"
              variant="outline"
              size="sm"
              @click="printNutrition"
              class="w-full"
            >
              🖨️ Imprimir Plan
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Nutrition tips -->
        <BaseCard title="Tips de Nutrición">
          <div class="space-y-3 text-sm text-gray-600">
            <div class="p-3 bg-blue-50 rounded-lg">
              <h5 class="font-medium text-blue-900 mb-1">💧 Hidratación</h5>
              <p>
                Mantén una hidratación constante, especialmente en días de entrenamiento intenso.
              </p>
            </div>
            <div class="p-3 bg-green-50 rounded-lg">
              <h5 class="font-medium text-green-900 mb-1">🥗 Timing</h5>
              <p>Come 2-3 horas antes del entrenamiento y dentro de 30 min después.</p>
            </div>
            <div class="p-3 bg-yellow-50 rounded-lg">
              <h5 class="font-medium text-yellow-900 mb-1">⚡ Recuperación</h5>
              <p>Incluye proteínas y carbohidratos en la comida post-entrenamiento.</p>
            </div>
          </div>
        </BaseCard>

        <!-- Weekly overview -->
        <BaseCard v-if="currentPlan" title="Vista Semanal">
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Días de entrenamiento</span>
              <span class="font-medium">{{ exerciseDaysCount }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Días de descanso</span>
              <span class="font-medium">{{ restDaysCount }}</span>
            </div>
            <div class="flex items-center justify-between text-sm border-t border-gray-200 pt-2">
              <span class="text-gray-600">Calorías promedio</span>
              <span class="font-medium">~2100 kcal</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrainingStore, useNutritionStore } from '@/stores'
import { useNutrition } from '@/composables'
import MealCard from '@/components/nutrition/MealCard.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const trainingStore = useTrainingStore()
const nutritionStore = useNutritionStore()
const { formatMacros } = useNutrition()

const { currentPlan } = storeToRefs(trainingStore)

const selectedDate = ref<string>('')
const nutritionData = ref(null)

const macroPercentages = computed(() => {
  if (!nutritionData.value) return {}
  return formatMacros(nutritionData.value)
})

const exerciseDaysCount = computed(() => {
  if (!currentPlan.value) return 0
  return currentPlan.value.weeks.reduce((count, week) => {
    return count + week.rows.filter(day => day.isExercise).length
  }, 0)
})

const restDaysCount = computed(() => {
  if (!currentPlan.value) return 0
  return currentPlan.value.weeks.reduce((count, week) => {
    return count + week.rows.filter(day => !day.isExercise).length
  }, 0)
})

const loadNutritionForDate = async () => {
  if (!selectedDate.value) return

  const day = trainingStore.getDayByDate(selectedDate.value)
  nutritionData.value = await nutritionStore.getOrGenerateNutrition(
    selectedDate.value,
    day?.isExercise ?? true
  )
}

const goToToday = async () => {
  const today = new Date().toISOString().split('T')[0]
  selectedDate.value = today
  await loadNutritionForDate()
}

const printNutrition = () => {
  // This would open a print-friendly version
  window.print()
}

onMounted(async () => {
  await trainingStore.loadPlan()
  await nutritionStore.loadAllNutrition()

  // Set today as default
  const today = new Date().toISOString().split('T')[0]
  selectedDate.value = today
  await loadNutritionForDate()
})
</script>
