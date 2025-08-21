<template>
  <button
    type="button"
    :class="[
      'relative p-2 text-sm rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
      dayClasses,
      hoverClasses
    ]"
    :title="tooltipText"
    @click="$emit('click', day.date)"
    @mouseenter="$emit('mouseenter', day.date)"
    @mouseleave="$emit('mouseleave')"
  >
    <!-- Day number -->
    <span :class="textClasses">{{ day.day }}</span>
    
    <!-- Today indicator dot (specs requirement) -->
    <div 
      v-if="day.isToday" 
      class="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
      title="Today"
    ></div>
    
    <!-- Training indicator -->
    <div v-if="day.hasTraining" :class="indicatorClasses"></div>
    
    <!-- Race day indicator -->
    <div 
      v-if="day.trainingDay?.isRaceDay" 
      class="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"
      title="Race Day"
    ></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types'

interface Props {
  day: CalendarDay
  compact?: boolean
  hoverDate?: string | null
}

interface Emits {
  (e: 'click', date: string): void
  (e: 'mouseenter', date: string): void
  (e: 'mouseleave'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const dayClasses = computed(() => {
  const base = props.compact 
    ? 'relative flex items-center justify-center min-h-[2rem] w-full text-xs rounded-md transition-all duration-200 hover:scale-105' 
    : 'relative flex flex-col items-center justify-center min-h-[2.5rem] w-full rounded-md transition-all duration-200 hover:scale-105'
  
  // Past dates - reduced opacity but still interactive
  const isPast = new Date(props.day.date) < new Date(new Date().toDateString())
  const opacityClass = isPast ? 'opacity-60' : ''
  
  // Not current month - muted
  if (!props.day.isCurrentMonth) {
    return `${base} text-gray-300 cursor-not-allowed ${opacityClass}`
  }
  
  // Selected date - amber/yellow border (specs requirement)
  if (props.day.isSelected) {
    return `${base} border-2 border-amber-400 bg-white text-gray-900 shadow-md ${opacityClass}`
  }
  
  // Today's date - yellow dot indicator and special styling (specs requirement)
  if (props.day.isToday) {
    return `${base} bg-amber-50 text-amber-900 ring-1 ring-amber-300 font-semibold ${opacityClass}`
  }
  
  // Training day styling based on exercise type (specs requirement)
  if (props.day.hasTraining) {
    if (props.day.trainingDay?.isRaceDay) {
      // Race days - red theme
      return `${base} bg-red-50 text-red-900 border border-red-200 hover:bg-red-100 ${opacityClass}`
    }
    if (props.day.trainingDay?.isExercise) {
      // Exercise days - emerald/green theme (specs requirement)
      return `${base} bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 ${opacityClass}`
    }
    // Off days with notes - slate/gray theme (specs requirement)
    return `${base} bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 ${opacityClass}`
  }
  
  // Default empty days
  return `${base} text-gray-900 hover:bg-gray-50 ${opacityClass}`
})

const textClasses = computed(() => {
  return props.day.isCurrentMonth ? 'font-medium' : 'font-normal'
})

// Hover classes for enhanced interactions (specs requirement)
const hoverClasses = computed(() => {
  const isHovering = props.hoverDate === props.day.date
  
  if (!props.day.isCurrentMonth) return ''
  
  if (isHovering) {
    return 'hover:border-slate-200 hover:shadow-sm'
  }
  
  return 'hover:border-slate-200 hover:shadow-sm'
})

// Tooltip text with training preview (specs requirement)
const tooltipText = computed(() => {
  if (!props.day.isCurrentMonth) return ''
  
  const trainingText = props.day.trainingDay?.training
  
  if (trainingText) {
    return trainingText
  }
  
  if (props.day.trainingDay?.isExercise === false) {
    return 'Off day - rest and recovery'
  }
  
  if (props.day.hasTraining) {
    return 'Training scheduled'
  }
  
  return 'No training data'
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
