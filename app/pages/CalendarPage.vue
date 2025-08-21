<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Calendario de Entrenamiento</h1>
      <p class="text-gray-600">Vista completa del plan de entrenamiento El Cruce de los Andes</p>
    </div>

    <LoadingSpinner v-if="isLoading" message="Cargando calendario..." />
    
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-400 mb-4">
        <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-gray-600 mb-4">{{ error }}</p>
      <BaseButton @click="loadPlan">Intentar de nuevo</BaseButton>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Calendar Grid -->
      <div class="lg:col-span-3">
        <div class="grid gap-6">
          <CalendarMonth
            v-for="month in months"
            :key="`${month.year}-${month.month}`"
            :month="month"
            :selected-date="selectedDate"
            @date-select="onDateSelect"
          />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Selected day info -->
        <BaseCard v-if="selectedDay" title="Día Seleccionado">
          <div class="space-y-3">
            <div>
              <h4 class="font-medium text-gray-900">{{ formatDate(selectedDay.date) }}</h4>
              <p class="text-sm text-gray-600">{{ selectedDay.day }}</p>
            </div>
            
            <div>
              <h5 class="text-sm font-medium text-gray-700 mb-1">Entrenamiento</h5>
              <p class="text-sm text-gray-600">{{ selectedDay.training }}</p>
            </div>
            
            <div>
              <h5 class="text-sm font-medium text-gray-700 mb-1">Alimentación</h5>
              <p class="text-sm text-gray-600">{{ selectedDay.food }}</p>
            </div>
            
            <div>
              <h5 class="text-sm font-medium text-gray-700 mb-1">Notas</h5>
              <p class="text-sm text-gray-600">{{ selectedDay.notes }}</p>
            </div>

            <div class="pt-3 border-t border-gray-200">
              <BaseButton
                variant="outline"
                size="sm"
                @click="onNutritionClick(selectedDay.date)"
                class="w-full"
              >
                Ver detalles de nutrición
              </BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Legend -->
        <BaseCard title="Leyenda">
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-primary-100 border border-primary-300 rounded"></div>
              <span class="text-gray-600">Día de entrenamiento</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span class="text-gray-600">Día de carrera</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <span class="text-gray-600">Día seleccionado</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
              <span class="text-gray-600">Día de descanso</span>
            </div>
          </div>
        </BaseCard>

        <!-- Week phases -->
        <BaseCard title="Fases de Entrenamiento">
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Base</span>
              <span class="text-gray-600">Construcción de base aeróbica</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Construcción</span>
              <span class="text-gray-600">Incremento de intensidad</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pico</span>
              <span class="text-gray-600">Máxima carga de entrenamiento</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Descarga</span>
              <span class="text-gray-600">Reducción antes de la carrera</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Carrera</span>
              <span class="text-gray-600">Días de competencia</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Nutrition Modal -->
    <NutritionModal 
      v-model:show="showNutritionModal"
      :date="selectedNutritionDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrainingStore, useNutritionStore } from '@/stores'
import { useCalendar } from '@/composables'
import CalendarMonth from '@/components/calendar/CalendarMonth.vue'
import NutritionModal from '@/components/nutrition/NutritionModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const trainingStore = useTrainingStore()
const nutritionStore = useNutritionStore()

const { currentPlan, selectedDate, isLoading, error } = storeToRefs(trainingStore)

const showNutritionModal = ref(false)
const selectedNutritionDate = ref<string | null>(null)

const { months, formatDate } = useCalendar(currentPlan)

const selectedDay = computed(() => {
  if (!selectedDate.value) return null
  return trainingStore.getDayByDate(selectedDate.value)
})

const onDateSelect = (date: string) => {
  trainingStore.setSelectedDate(date)
}

const onNutritionClick = (date: string) => {
  selectedNutritionDate.value = date
  showNutritionModal.value = true
}

const loadPlan = async () => {
  await trainingStore.loadPlan()
  await nutritionStore.loadNutritionData()
}

onMounted(() => {
  loadPlan()
})
</script>
