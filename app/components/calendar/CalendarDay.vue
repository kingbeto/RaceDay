<template>
  <div
    :class="[
      'relative p-2 text-sm rounded-md cursor-pointer',
      dayClasses
    ]"
    :title="tooltipText"
    @mouseenter="emit('hover')"
    @mouseleave="emit('leave')"
  >
    <!-- Day number -->
    <span :class="textClasses">{{ day.day }}</span>

    <!-- Today indicator dot - spec compliant (8px amber circle in top-right) -->
    <div
      v-if="day.isToday"
      class="absolute right-1 top-1 w-2 h-2 bg-amber-400 rounded-full"
      title="Today"
    ></div>

    <!-- Training indicator -->
    <div v-if="day.hasTraining" :class="indicatorClasses"></div>

    <!-- Race day indicator - integrated with exercise/off states -->
    <div
      v-if="day.trainingDay?.isRaceDay"
      class="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"
      title="Race Day"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalendarDay } from '@/types'

interface Props {
  day: CalendarDay
  compact?: boolean
  dateMap?: Record<string, any>
  getEntryForDate?: (date: string) => any
  isHovered?: boolean
}

interface Emits {
  hover: []
  leave: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dayClasses = computed(() => {
  const base = props.compact
    ? 'relative flex items-center justify-center min-h-[2rem] w-full text-xs rounded-md p-2 text-center border border-transparent transition-all duration-150'
    : 'relative flex flex-col items-center justify-center min-h-[2.5rem] w-full rounded-md p-2 text-center border border-transparent transition-all duration-150'

  // Calculate if date is in the past
  const isPast = new Date(props.day.date) < new Date(new Date().toDateString())
  const opacityClass = isPast && !props.day.isToday ? ' opacity-60' : ''

  // Not current month - muted but still clickable
  if (!props.day.isCurrentMonth) {
    return `${base} text-gray-300 hover:text-gray-400 hover:border-slate-200${opacityClass}`
  }

  // Priority 1: Selected State (highest priority - yellow border)
  if (props.day.isSelected) {
    let selectedClasses = `${base} border-2 border-amber-400${opacityClass}`

    // Add background based on exercise status even when selected
    if (props.day.hasTraining) {
      if (props.day.trainingDay?.isRaceDay) {
        selectedClasses += ' bg-red-50 text-red-900'
      } else if (props.day.trainingDay?.isExercise) {
        selectedClasses += ' bg-emerald-50 text-emerald-800'
      } else {
        selectedClasses += ' bg-slate-50 text-slate-700'
      }
    } else {
      selectedClasses += ' bg-white text-gray-900'
    }

    // Today text styling overrides others
    if (props.day.isToday) {
      selectedClasses += ' text-amber-900 font-semibold'
    }

    return selectedClasses
  }

  // Priority 2: Today Marker (amber text and font weight)
  let classes = base

  if (props.day.isToday) {
    classes += ' text-amber-900 font-semibold'
  }

  // Priority 3: Exercise/Off Color (data-driven background) - Apply to ALL days in training plan
  if (props.day.hasTraining && props.day.trainingDay) {
    if (props.day.trainingDay.isRaceDay) {
      // Race days - red theme
      classes += ' bg-red-50 text-red-900 hover:bg-red-100'
    } else if (props.day.trainingDay.isExercise) {
      // Exercise days - emerald/green theme
      classes += ' bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
    } else {
      // Off days - slate/gray theme
      classes += ' bg-slate-50 text-slate-700 hover:bg-slate-100'
    }
  } else if (props.day.hasTraining) {
    // Days with training data but no detailed trainingDay info - check via dateMap
    const entry = props.getEntryForDate ? props.getEntryForDate(props.day.date) : null
    if (entry) {
      if (entry.isRaceDay) {
        // Race days - red theme
        classes += ' bg-red-50 text-red-900 hover:bg-red-100'
      } else if (entry.isExercise) {
        // Exercise days - emerald/green theme
        classes += ' bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
      } else {
        // Off days - slate/gray theme
        classes += ' bg-slate-50 text-slate-700 hover:bg-slate-100'
      }
    } else {
      // Default for days with training but no data
      classes += ' text-gray-900 hover:bg-gray-50'
    }
  } else {
    // Default empty days (not in training plan)
    classes += ' text-gray-900 hover:bg-gray-50'
  }

  // Priority 4: Past Date (opacity reduction)
  if (opacityClass) {
    classes += opacityClass
  }

  // Priority 5: Hover State (border highlight)
  classes += ' hover:border-slate-200'

  // Priority 6: Calendar-Training Plan Hover Interaction (highest priority)
  if (props.isHovered) {
    classes += ' ring-2 ring-blue-400 ring-opacity-60 shadow-lg shadow-blue-200/50'
  }

  return classes
})

const textClasses = computed(() => {
  return props.day.isCurrentMonth ? 'font-medium' : 'font-normal'
})

// No hover classes - static display only

// Tooltip text with training preview (specs requirement)
const tooltipText = computed(() => {
  if (!props.day.isCurrentMonth) return ''

  // Use getEntryForDate for faster lookup (specs requirement)
  const entry = props.getEntryForDate ? props.getEntryForDate(props.day.date) : null

  if (entry) {
    return entry.training || 'Training scheduled'
  }

  // Fallback to existing trainingDay data
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

  return 'No entry'
})

const indicatorClasses = computed(() => {
  const base = 'absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full'

  if (!props.day.hasTraining || !props.day.isCurrentMonth) {
    return `${base} opacity-0`
  }

  // Check trainingDay first, then fallback to dateMap
  if (props.day.trainingDay?.isRaceDay) {
    return `${base} bg-red-500`
  }

  if (props.day.trainingDay?.isExercise) {
    return `${base} bg-primary-500`
  }

  // Fallback to dateMap for days without detailed trainingDay info
  const entry = props.getEntryForDate ? props.getEntryForDate(props.day.date) : null
  if (entry) {
    if (entry.isRaceDay) {
      return `${base} bg-red-500`
    }

    if (entry.isExercise) {
      return `${base} bg-primary-500`
    }
  }

  return `${base} bg-gray-500`
})
</script>
