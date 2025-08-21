<template>
  <div
    :class="[
      'relative p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md',
      dayClasses
    ]"
    @click="$emit('click')"
  >
    <!-- Race day banner -->
    <div 
      v-if="day.isRaceDay" 
      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12"
    >
      🏃‍♂️ CARRERA
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Date column -->
      <div class="md:col-span-1">
        <div class="text-sm font-medium text-gray-900">{{ formatDay(day.date) }}</div>
        <div class="text-xs text-gray-500">{{ day.day }}</div>
        <div v-if="day.calories" class="text-xs text-orange-600 font-medium mt-1">
          {{ day.calories }} kcal
        </div>
      </div>

      <!-- Training column -->
      <div class="md:col-span-1">
        <div class="text-sm font-medium text-gray-700 mb-1">Entrenamiento</div>
        <div 
          :class="trainingTextClasses"
          @mouseenter="onTrainingHover"
          @mouseleave="hideTooltip"
          @mousemove="onTrainingMouseMove"
        >
          {{ day.training }}
        </div>
      </div>

      <!-- Nutrition column -->
      <div class="md:col-span-1">
        <div class="text-sm font-medium text-gray-700 mb-1">Alimentación</div>
        <div class="text-sm text-gray-600">{{ day.food }}</div>
        <button
          @click.stop="$emit('nutrition-click')"
          class="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1 underline"
        >
          Ver detalles →
        </button>
      </div>

      <!-- Notes column -->
      <div class="md:col-span-1">
        <div class="text-sm font-medium text-gray-700 mb-1">Notas</div>
        <div class="text-sm text-gray-600">{{ day.notes }}</div>
      </div>
    </div>

    <!-- Exercise intensity indicator -->
    <div v-if="day.isExercise" class="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-l-lg"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TrainingDay } from '@/types'
import { useTooltips } from '@/composables/useTooltips'

interface Props {
  day: TrainingDay
  isSelected: boolean
}

interface Emits {
  (e: 'click'): void
  (e: 'nutrition-click'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const { showTooltip, hideTooltip, explainActivity } = useTooltips()

const onTrainingHover = (event: MouseEvent) => {
  const explanation = explainActivity(props.day.training)
  showTooltip(explanation, event.clientX, event.clientY)
}

const onTrainingMouseMove = (event: MouseEvent) => {
  const explanation = explainActivity(props.day.training)
  showTooltip(explanation, event.clientX, event.clientY)
}

const dayClasses = computed(() => {
  const base = 'border-2'
  
  if (props.isSelected) {
    return `${base} border-blue-500 bg-blue-50 shadow-lg`
  }
  
  if (props.day.isRaceDay) {
    return `${base} border-red-300 bg-red-50 hover:bg-red-100`
  }
  
  if (props.day.isExercise) {
    return `${base} border-primary-200 bg-primary-25 hover:bg-primary-50`
  }
  
  return `${base} border-gray-200 bg-gray-50 hover:bg-gray-100`
})

const trainingTextClasses = computed(() => {
  if (props.day.isRaceDay) {
    return 'text-sm text-red-700 font-bold'
  }
  
  if (props.day.isExercise) {
    return 'text-sm text-primary-700 font-medium'
  }
  
  return 'text-sm text-gray-600'
})

const formatDay = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>
