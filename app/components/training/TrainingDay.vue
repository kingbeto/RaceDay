<template>
  <!-- Static training day display - no interactions -->
  <div
    :class="[
      'relative p-4 rounded-lg border',
      dayClasses
    ]"
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
        <div :class="trainingTextClasses" :title="getTrainingExplanation(day.training)">
          {{ day.training }}
        </div>
      </div>

      <!-- Nutrition column -->
      <div class="md:col-span-1">
        <div class="text-sm font-medium text-gray-700 mb-1">Alimentación</div>
        <div class="text-sm text-gray-600">{{ day.food }}</div>
        <div class="text-xs text-slate-600 font-medium mt-1">
          📋 Detalles disponibles
        </div>
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

interface Props {
  day: TrainingDay
  isSelected: boolean
}

const props = defineProps<Props>()

// Static styling - no interactions
const dayClasses = computed(() => {
  const base = 'border-2'

  if (props.isSelected) {
    return `${base} border-blue-500 bg-blue-50 shadow-lg`
  }

  // Simplified styling - default UI colors
  return `${base} border-gray-200 bg-gray-50`
})

const trainingTextClasses = computed(() => {
  if (props.day.isRaceDay) {
    return 'text-sm text-red-700 font-bold'
  }

  if (props.day.isExercise) {
    return 'text-sm text-green-700 font-medium'
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

// Training explanations for tooltips
const getTrainingExplanation = (training: string): string => {
  if (!training) return ''

  const explanations: Record<string, string> = {
    'Stairs': 'Repeats or continuous climbing. Tall posture, short steps, strong arms. Build aerobic power + leg strength.',
    'Run‑walk': 'Alternate short jogs with short walks to keep Z2. Build aerobic base without stress.',
    'Long Z2': 'Steady aerobic pace. Nose breathing, can hold conversation. Build fat-burning efficiency.',
    'Gym Lower': 'Squat/hinge, step-ups, lunges, calves. Focus on form and controlled movement.',
    'Gym Upper': 'Push/pull, core, stabilization. Complement running with strength balance.',
    'Recovery': 'Easy movement, stretching, massage. Active rest to enhance adaptation.',
    'Tempo': 'Comfortably hard pace. Slightly breathless but sustainable. Lactate threshold training.',
    'Track': 'Structured speed work. Intervals with rest. Build neuromuscular power and speed.',
    'Fartlek': 'Play with pace. Random speed bursts during run. Fun way to build speed endurance.',
    'Hills': 'Uphill repeats or rolling terrain. Build power, strength, and mental toughness.',
    'Peak': 'Race-pace efforts. Practice goal pace and race fueling strategies.',
    'Brick': 'Back-to-back activities. Practice transitions and race-day logistics.',
    'Time trial': 'Solo race effort. Test fitness and practice pacing strategies.',
    'Shakeout': 'Short, easy movement. Prepare legs for hard effort or race day.',
    'Off': 'Complete rest or gentle movement. Recovery is when adaptation happens.'
  }

  // Find matching explanation
  for (const [key, explanation] of Object.entries(explanations)) {
    if (training.toLowerCase().includes(key.toLowerCase())) {
      return explanation
    }
  }

  return training
}
</script>
