<template>
  <BaseCard title="Lista de Compras">
    <div class="space-y-4">
      <!-- Week selector -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">Seleccionar semana:</label>
        <select
          v-model="selectedWeekId"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Seleccionar semana...</option>
          <option
            v-for="weekId in availableWeeks"
            :key="weekId"
            :value="weekId"
          >
            {{ getWeekLabel(weekId) }}
          </option>
        </select>
      </div>

      <!-- Grocery categories -->
      <div v-if="selectedWeekId && groceryData.length > 0" class="space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-medium text-gray-900">Lista para {{ getWeekLabel(selectedWeekId) }}</h4>
          <BaseButton
            variant="outline"
            size="sm"
            @click="printGroceries"
          >
            🖨️ Imprimir
          </BaseButton>
        </div>

        <div class="space-y-3">
          <GroceryCategory
            v-for="category in groceryData"
            :key="category.name"
            :category="category"
          />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="selectedWeekId" class="text-center py-6">
        <div class="text-gray-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
          </svg>
        </div>
        <p class="text-gray-600">No hay lista de compras para esta semana</p>
      </div>

      <!-- Initial state -->
      <div v-else class="text-center py-6">
        <div class="text-gray-400 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p class="text-gray-600">Selecciona una semana para ver la lista de compras</p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGroceryStore, useTrainingStore } from '@/stores'
import { usePrint } from '@/composables'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import GroceryCategory from './GroceryCategory.vue'

const selectedWeekId = ref<string>('')

const groceryStore = useGroceryStore()
const trainingStore = useTrainingStore()
const { printGroceries: printGroceryList } = usePrint()

const availableWeeks = computed(() => {
  return groceryStore.getAllWeekIds
})

const groceryData = computed(() => {
  return groceryStore.getGroceriesForWeek(selectedWeekId.value)
})

const getWeekLabel = (weekId: string): string => {
  if (!trainingStore.currentPlan) return weekId
  
  const week = trainingStore.currentPlan.weeks.find(w => w.id === weekId)
  return week ? week.label : weekId
}

const printGroceries = () => {
  if (groceryData.value.length > 0) {
    printGroceryList(groceryData.value, getWeekLabel(selectedWeekId.value))
  }
}

// Load grocery data when component mounts
onMounted(() => {
  groceryStore.loadGroceryData()
})
</script>
