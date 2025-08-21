<template>
  <BaseModal
    :show="show"
    :title="`Nutrición - ${formatDate(date)}`"
    size="xl"
    @update:show="$emit('update:show', $event)"
  >
    <div v-if="nutritionData" class="space-y-6">
      <!-- Macro summary -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <div class="text-2xl font-bold text-orange-600">{{ nutritionData.totalCalories }}</div>
          <div class="text-sm text-gray-600">Calorías</div>
        </div>
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ nutritionData.totalProtein }}g</div>
          <div class="text-sm text-gray-600">Proteínas</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ nutritionData.totalCarbs }}g</div>
          <div class="text-sm text-gray-600">Carbohidratos</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{{ nutritionData.totalFats }}g</div>
          <div class="text-sm text-gray-600">Grasas</div>
        </div>
      </div>

      <!-- Meals -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">Comidas del día</h3>
        
        <div class="grid gap-4">
          <MealCard
            v-for="meal in nutritionData.meals"
            :key="meal.name"
            :meal="meal"
          />
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="text-gray-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p class="text-gray-600">No hay datos de nutrición para este día</p>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="outline" @click="$emit('update:show', false)">
        Cerrar
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DailyNutrition } from '@/types'
import { useNutritionStore, useTrainingStore } from '@/stores'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import MealCard from './MealCard.vue'

interface Props {
  show: boolean
  date: string | null
}

interface Emits {
  (e: 'update:show', value: boolean): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const nutritionStore = useNutritionStore()
const trainingStore = useTrainingStore()

const nutritionData = computed((): DailyNutrition | null => {
  if (!props.date) return null
  
  const day = trainingStore.getDayByDate(props.date)
  return nutritionStore.getOrGenerateNutrition(props.date, day?.isExercise ?? true)
})

const formatDate = (dateString: string | null): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>
