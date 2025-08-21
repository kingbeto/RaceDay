<template>
  <button
    type="button"
    :class="[
      'relative p-2 text-sm rounded-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      dayClasses
    ]"
    @click="$emit('click', day.date)"
  >
    <!-- Day number -->
    <span :class="textClasses">{{ day.day }}</span>
    
    <!-- Training indicator -->
    <div v-if="day.hasTraining" :class="indicatorClasses"></div>
    
    <!-- Race day indicator -->
    <div 
      v-if="day.trainingDay?.isRaceDay" 
      class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types'

interface Props {
  day: CalendarDay
  compact?: boolean
}

interface Emits {
  (e: 'click', date: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const dayClasses = computed(() => {
  const base = props.compact 
    ? 'relative flex items-center justify-center min-h-[1.5rem] w-full text-xs rounded-sm' 
    : 'relative flex flex-col items-center justify-center min-h-[2.5rem] w-full'
  
  if (!props.day.isCurrentMonth) {
    return `${base} text-gray-300 cursor-not-allowed`
  }
  
  if (props.day.isSelected) {
    return `${base} bg-blue-500 text-white shadow-md`
  }
  
  if (props.day.isToday) {
    return `${base} bg-primary-100 text-primary-900 ring-1 ring-primary-500`
  }
  
  if (props.day.hasTraining) {
    if (props.day.trainingDay?.isRaceDay) {
      return `${base} bg-red-50 text-red-900 ${props.compact ? 'border border-red-200' : 'border border-red-200'} hover:bg-red-100`
    }
    if (props.day.trainingDay?.isExercise) {
      return `${base} bg-green-50 text-green-900 ${props.compact ? 'border border-green-200' : 'border border-green-200'} hover:bg-green-100`
    }
    return `${base} bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100`
  }
  
  return `${base} text-gray-900 hover:bg-gray-50`
})

const textClasses = computed(() => {
  return props.day.isCurrentMonth ? 'font-medium' : 'font-normal'
})

const indicatorClasses = computed(() => {
  const base = 'absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full'
  
  if (!props.day.hasTraining || !props.day.isCurrentMonth) {
    return `${base} opacity-0`
  }
  
  if (props.day.trainingDay?.isRaceDay) {
    return `${base} bg-red-500`
  }
  
  if (props.day.trainingDay?.isExercise) {
    return `${base} bg-primary-500`
  }
  
  return `${base} bg-gray-500`
})
</script>
