<template>
  <!-- Static week display - no interactions -->
  <div
    :id="`week-${week.id}`"
    class="rounded-xl border border-slate-200/60 bg-white shadow-md shadow-slate-100/40"
    :class="{ 'ring-2 ring-amber-400/60 shadow-lg shadow-amber-100/40': hasSelectedDate }"
  >
    <!-- Week header - static -->
    <div
      class="p-4 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 rounded-t-xl border-b border-slate-200/60"
    >
      <div class="flex items-center justify-between">
        <!-- Week identifier with dot indicator -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <!-- Static gradient dot indicator -->
            <div
              class="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 shadow"
            ></div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 leading-tight">{{ week.label }}</h3>
              <p class="text-xs text-slate-600 font-medium leading-snug">{{ week.summary }}</p>
            </div>
          </div>

          <span :class="phaseClasses">{{ phaseText }}</span>
        </div>

        <!-- Static info display with toggle button -->
        <div class="flex items-center gap-2">
          <!-- Day counter badge -->
          <span
            class="hidden sm:inline text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
          >
            {{ week.rows?.length || 7 }} days
          </span>
          <!-- Toggle button -->
          <button
            @click="toggleWeek"
            class="flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors duration-200 group"
            :aria-label="props.isExpanded ? 'Collapse week' : 'Expand week'"
          >
            <ChevronDownIcon
              v-if="!props.isExpanded"
              class="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors duration-200"
            />
            <ChevronUpIcon
              v-else
              class="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors duration-200"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Collapsible training content -->
    <Transition
      name="week-content"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-screen opacity-100"
      leave-from-class="max-h-screen opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="props.isExpanded" class="p-4 pt-0">
        <table
          class="w-full border-separate border-spacing-0 bg-slate-50/30 rounded-lg overflow-hidden border border-slate-200/50"
        >
          <!-- Enhanced table header -->
          <thead>
            <tr class="bg-gradient-to-r from-slate-100 via-white to-blue-50/40">
              <th
                class="px-3 py-3 text-center text-xs font-semibold text-slate-800 first:rounded-tl-lg w-10"
              >
                Type
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-800">Date</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-slate-800 hidden sm:table-cell"
              >
                Day
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-slate-800">Training</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-slate-800 hidden lg:table-cell"
              >
                Focus
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-slate-800 last:rounded-tr-lg"
              >
                Nutrition
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="day in week.rows"
              :key="day.date"
              :id="`d-${day.date}`"
              :class="getRowClasses(day)"
              class="border-b border-slate-200/80 hover:bg-slate-50/50 transition-colors duration-150 last:border-b-0"
            >
              <!-- Type Column - Training Intensity Indicator -->
              <td class="px-3 py-3 text-center w-10">
                <div class="flex justify-center">
                  <div
                    :class="getTypeIconClasses(day)"
                    class="w-7 h-5 rounded-full flex items-center justify-center"
                  >
                    <component
                      :is="getTrainingIntensity(day).icon"
                      class="w-3.5 h-3.5"
                      :title="getTrainingIntensity(day).description"
                    />
                  </div>
                </div>
              </td>

              <!-- Date Column -->
              <td class="px-4 py-3 w-24">
                <div class="flex flex-col">
                  <span :class="getDateTextClasses(day)" class="font-semibold text-xs">
                    {{ formatDayDate(day.date) }}
                  </span>
                  <span class="text-[10px] text-slate-500 font-medium">
                    {{ getDayName(day.date) }}
                  </span>
                </div>
              </td>

              <!-- Day Badge -->
              <td class="px-4 py-3 hidden sm:table-cell w-20">
                <span
                  :class="getDayBadgeClasses(day)"
                  class="px-2.5 py-0.5 rounded-md text-[10px] font-bold"
                >
                  {{ getDayAbbr(day.date) }}
                </span>
              </td>

              <!-- Training Column -->
              <td class="px-4 py-3">
                <div class="flex items-start space-x-2">
                  <!-- Activity dot indicator -->
                  <div
                    :class="getActivityDotClasses(day)"
                    class="w-2.5 h-2.5 rounded-full mt-1 shadow-sm"
                  ></div>
                  <div class="flex-1">
                    <div
                      :class="getTrainingTextClasses(day)"
                      class="leading-snug font-medium text-sm"
                      :title="getTrainingExplanation(day.training)"
                    >
                      {{ day.training || 'Off day' }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Focus Column -->
              <td class="px-4 py-3 hidden lg:table-cell">
                <div class="text-xs text-slate-600 leading-snug font-medium">
                  {{ day.food || '-' }}
                </div>
              </td>

              <!-- Nutrition Column -->
              <td class="px-4 py-3 w-32">
                <div class="flex flex-col items-center space-y-1.5">
                  <!-- Static nutrition display -->
                  <div
                    class="inline-flex items-center justify-center w-7 h-7 text-blue-600 bg-blue-50 rounded-md border border-blue-200"
                  >
                    <span class="text-[13px]">📋</span>
                  </div>
                  <!-- Calorie display -->
                  <span
                    class="text-[10px] text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded"
                  >
                    ~{{ getCaloriesForDay(day) }} kcal
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Week } from '@/types'
import {
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MinusIcon
} from '@heroicons/vue/24/outline'

interface Props {
  week: Week
  selectedDate: string | null
  isExpanded: boolean
  hoveredDate?: string | null
}

interface Emits {
  toggle: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Toggle week expansion
const toggleWeek = () => {
  emit('toggle')
}

// Static data for styling
const today = ref(new Date().toISOString().slice(0, 10))
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const hasSelectedDate = computed(() => {
  return props.week.rows?.some(row => row.date === props.selectedDate) ?? false
})

const phaseClasses = computed(() => {
  const base = 'px-2 py-1 text-xs font-medium rounded-full'

  switch (props.week.phase) {
    case 'base':
      return `${base} bg-blue-100 text-blue-800`
    case 'build':
      return `${base} bg-green-100 text-green-800`
    case 'peak':
      return `${base} bg-yellow-100 text-yellow-800`
    case 'taper':
      return `${base} bg-purple-100 text-purple-800`
    case 'race':
      return `${base} bg-red-100 text-red-800`
    default:
      return `${base} bg-gray-100 text-gray-800`
  }
})

const phaseText = computed(() => {
  switch (props.week.phase) {
    case 'base':
      return 'Base'
    case 'build':
      return 'Construcción'
    case 'peak':
      return 'Pico'
    case 'taper':
      return 'Descarga'
    case 'race':
      return 'Carrera'
    default:
      return 'General'
  }
})

// Date formatting functions
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
})

const dayNameFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

const formatDayDate = (dateString: string): string => {
  return dateFormatter.format(new Date(dateString))
}

const getDayName = (dateString: string): string => {
  return dayNameFormatter.format(new Date(dateString))
}

const getDayAbbr = (dateString: string): string => {
  const date = new Date(dateString)
  return dayNames[date.getDay()]
}

// Enhanced row styling with hover highlighting
const getRowClasses = (day: any) => {
  const isToday = day.date === today.value
  const isHovered = day.date === props.hoveredDate

  const classes = [
    {
      // Today's row gets yellow highlighting
      'bg-amber-50 border-l-4 border-amber-400': isToday,
      // Hovered row gets blue highlighting (only when week is expanded)
      'bg-blue-50 border-l-4 border-blue-400 ring-1 ring-blue-300 ring-opacity-50':
        isHovered && props.isExpanded && !isToday
    }
  ]

  return classes
}

// Date text styling with hover highlighting
const getDateTextClasses = (day: any) => {
  const isToday = day.date === today.value
  const isSelected = day.date === props.selectedDate
  const isHovered = day.date === props.hoveredDate

  if (isToday || isSelected) {
    return 'text-amber-900'
  }

  if (isHovered && props.isExpanded) {
    return 'text-blue-900 font-semibold'
  }

  return 'text-slate-900'
}

// Day badge styling - green for training days
const getDayBadgeClasses = (day: any) => {
  const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full shadow-sm'

  if (day.isExercise) {
    return `${baseClasses} bg-green-500 text-white`
  }
  return `${baseClasses} bg-slate-400 text-white`
}

// Activity dot indicator styling - green for training days
const getActivityDotClasses = (day: any) => {
  if (day.isExercise) {
    return 'bg-green-500 shadow-lg shadow-green-200'
  }
  return 'bg-slate-400 opacity-60'
}

// Training text styling with hover highlighting
const getTrainingTextClasses = (day: any) => {
  const baseClasses = 'text-sm font-medium'
  const isHovered = day.date === props.hoveredDate

  if (isHovered && props.isExpanded) {
    return `${baseClasses} text-blue-700 font-semibold`
  }

  if (day.isExercise) {
    return `${baseClasses} text-green-700`
  }
  return `${baseClasses} text-slate-900`
}

// Classify training intensity for icon display
const getTrainingIntensity = (day: any) => {
  if (!day.isExercise) {
    return {
      level: 'off',
      icon: MinusIcon,
      color: 'slate',
      description: 'Rest day'
    }
  }

  const training = day.training?.toLowerCase() || ''

  // Race days are always maximum intensity (double chevron up)
  if (day.isRaceDay) {
    return {
      level: 'maximum',
      icon: ChevronDoubleUpIcon,
      color: 'red',
      description: 'Race day - maximum intensity'
    }
  }

  // Check for high-intensity indicators (double chevron up)
  if (
    training.includes('tempo') ||
    training.includes('threshold') ||
    training.includes('hard') ||
    training.includes('intensive') ||
    training.includes('maximum') ||
    training.includes('peak')
  ) {
    return {
      level: 'high',
      icon: ChevronDoubleUpIcon,
      color: 'orange',
      description: 'High intensity training'
    }
  }

  // Check for moderate-intensity indicators (single chevron up)
  if (
    training.includes('long z2') ||
    training.includes('endurance') ||
    training.includes('moderate') ||
    training.includes('sustained') ||
    training.includes('stair tempo') ||
    training.includes('gym')
  ) {
    return {
      level: 'moderate',
      icon: ChevronUpIcon,
      color: 'blue',
      description: 'Moderate intensity training'
    }
  }

  // Check for easy/recovery indicators (single chevron up)
  if (
    training.includes('easy') ||
    training.includes('recovery') ||
    training.includes('light') ||
    training.includes('mobility')
  ) {
    return {
      level: 'easy',
      icon: ChevronUpIcon,
      color: 'green',
      description: 'Easy/recovery training'
    }
  }

  // Default to moderate for unknown patterns
  return {
    level: 'moderate',
    icon: ChevronUpIcon,
    color: 'blue',
    description: 'Moderate intensity training'
  }
}

// Type icon container styling - green for training days
const getTypeIconClasses = (day: any) => {
  const baseClasses = 'transition-all duration-200 flex items-center justify-center'

  if (day.isExercise) {
    return `${baseClasses} bg-green-100 text-green-600`
  }
  return `${baseClasses} bg-slate-100 text-slate-600`
}

// Calorie calculation
const getCaloriesForDay = (day: any) => {
  if (day.isExercise) {
    return '2300'
  }
  return '2100'
}

// Training explanations for tooltips
const getTrainingExplanation = (training: string | undefined): string => {
  if (!training) return ''

  const explanations: Record<string, string> = {
    Stairs:
      'Repeats or continuous climbing. Tall posture, short steps, strong arms. Build aerobic power + leg strength.',
    'Run‑walk':
      'Alternate short jogs with short walks to keep Z2. Build aerobic base without stress.',
    'Long Z2':
      'Steady aerobic pace. Nose breathing, can hold conversation. Build fat-burning efficiency.',
    'Gym Lower': 'Squat/hinge, step-ups, lunges, calves. Focus on form and controlled movement.',
    'Gym Upper': 'Push/pull, core, stabilization. Complement running with strength balance.',
    Recovery: 'Easy movement, stretching, massage. Active rest to enhance adaptation.',
    Tempo:
      'Comfortably hard pace. Slightly breathless but sustainable. Lactate threshold training.',
    Track: 'Structured speed work. Intervals with rest. Build neuromuscular power and speed.',
    Fartlek: 'Play with pace. Random speed bursts during run. Fun way to build speed endurance.',
    Hills: 'Uphill repeats or rolling terrain. Build power, strength, and mental toughness.',
    Peak: 'Race-pace efforts. Practice goal pace and race fueling strategies.',
    Brick: 'Back-to-back activities. Practice transitions and race-day logistics.',
    'Time trial': 'Solo race effort. Test fitness and practice pacing strategies.',
    Shakeout: 'Short, easy movement. Prepare legs for hard effort or race day.',
    Off: 'Complete rest or gentle movement. Recovery is when adaptation happens.'
  }

  // Find matching explanation
  for (const [key, explanation] of Object.entries(explanations)) {
    if (training.toLowerCase().includes(key.toLowerCase())) {
      return explanation
    }
  }

  // Default explanations for common patterns
  if (training.includes('Z2')) {
    return 'Zone 2 aerobic training. Nose breathing pace, builds fat-burning efficiency.'
  }
  if (training.includes('walk')) {
    return 'Run-walk intervals. Alternate jogging with walking to maintain aerobic zone.'
  }
  if (training.includes('Easy')) {
    return 'Easy conversational pace. Active recovery while maintaining movement patterns.'
  }

  return training
}
</script>

<style scoped>
.week-content-enter-active,
.week-content-leave-active {
  overflow: hidden;
}

.week-content-enter-from,
.week-content-leave-to {
  transform: translateY(-10px);
}
</style>
