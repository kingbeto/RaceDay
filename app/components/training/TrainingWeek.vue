<template>
  <!-- Static week display - no interactions -->
  <div
    :id="`week-${week.id}`"
    class="rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-100/50"
    :class="{ 'ring-2 ring-amber-400/60 shadow-xl shadow-amber-100/40': hasSelectedDate }"
  >
    <!-- Week header - static -->
    <div class="p-8 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 rounded-t-2xl border-b border-slate-200/60">
      <div class="flex items-center justify-between">
        <!-- Week identifier with dot indicator -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <!-- Static gradient dot indicator -->
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 shadow-lg"></div>
            <div>
              <h3 class="text-xl font-bold text-slate-900">{{ week.label }}</h3>
              <p class="text-sm text-slate-600 font-medium leading-relaxed">{{ week.summary }}</p>
            </div>
          </div>

          <span :class="phaseClasses">{{ phaseText }}</span>
        </div>

        <!-- Static info display with toggle button -->
        <div class="flex items-center gap-3">
          <!-- Day counter badge -->
          <span class="hidden sm:inline text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {{ week.rows?.length || 7 }} days
          </span>
          <!-- Toggle button -->
          <button
            @click="toggleWeek"
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200 group"
            :aria-label="props.isExpanded ? 'Collapse week' : 'Expand week'"
          >
            <ChevronDownIcon
              v-if="!props.isExpanded"
              class="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors duration-200"
            />
            <ChevronUpIcon
              v-else
              class="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors duration-200"
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
      <div v-if="props.isExpanded" class="overflow-x-auto p-8 pt-0">
        <table class="w-full border-separate border-spacing-0 bg-slate-50/30 rounded-xl overflow-hidden border border-slate-200/50">
        <!-- Enhanced table header -->
        <thead>
          <tr class="bg-gradient-to-r from-slate-100 via-white to-blue-50/40">
            <th class="px-4 py-4 text-center text-sm font-bold text-slate-800 first:rounded-tl-xl w-12">Type</th>
            <th class="px-6 py-4 text-left text-sm font-bold text-slate-800">Date</th>
            <th class="px-6 py-4 text-left text-sm font-bold text-slate-800 hidden sm:table-cell">Day</th>
            <th class="px-6 py-4 text-left text-sm font-bold text-slate-800">Training</th>
            <th class="px-6 py-4 text-left text-sm font-bold text-slate-800 hidden lg:table-cell">Focus</th>
            <th class="px-6 py-4 text-center text-sm font-bold text-slate-800 last:rounded-tr-xl">Nutrition</th>
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
            <td class="px-4 py-6 text-center w-12">
              <div class="flex justify-center">
                <div :class="getTypeIconClasses(day)" class="w-8 h-6 rounded-full flex items-center justify-center">
                  <component
                    :is="getTrainingIntensity(day).icon"
                    class="w-4 h-4"
                    :title="getTrainingIntensity(day).description"
                  />
                </div>
              </div>
            </td>

            <!-- Date Column -->
            <td class="px-6 py-6 w-24">
              <div class="flex flex-col">
                <span :class="getDateTextClasses(day)" class="font-bold text-sm">
                  {{ formatDayDate(day.date) }}
                </span>
                <span class="text-xs text-slate-500 font-medium">
                  {{ getDayName(day.date) }}
                </span>
              </div>
            </td>

            <!-- Day Badge -->
            <td class="px-6 py-6 hidden sm:table-cell w-20">
              <span :class="getDayBadgeClasses(day)" class="px-3 py-1 rounded-lg text-xs font-bold">
                {{ getDayAbbr(day.date) }}
              </span>
            </td>

            <!-- Training Column -->
            <td class="px-6 py-6">
              <div class="flex items-start space-x-3">
                <!-- Activity dot indicator -->
                <div :class="getActivityDotClasses(day)" class="w-3 h-3 rounded-full mt-1 shadow-sm"></div>
                <div class="flex-1">
                  <div
                    :class="getTrainingTextClasses(day)"
                    class="leading-relaxed font-medium"
                    :title="getTrainingExplanation(day.training)"
                  >
                    {{ day.training || 'Off day' }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Focus Column -->
            <td class="px-6 py-6 hidden lg:table-cell">
              <div class="text-sm text-slate-600 leading-relaxed font-medium">
                {{ day.food || '-' }}
              </div>
            </td>

            <!-- Nutrition Column -->
            <td class="px-6 py-6 w-36">
              <div class="flex flex-col items-center space-y-2">
                <!-- Static nutrition display -->
                <div class="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 rounded-md border border-blue-200">
                  <span class="text-sm">📋</span>
                </div>
                <!-- Calorie display -->
                <span class="text-xs text-slate-600 font-bold bg-slate-100 px-2 py-1 rounded-md">
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

// Simplified row styling - only yellow for today's row
const getRowClasses = (day: any) => {
  const isToday = day.date === today.value

  const classes = [
    {
      // Only today's row gets yellow highlighting
      'bg-amber-50 border-l-4 border-amber-400': isToday
    }
  ]

  return classes
}

// Date text styling
const getDateTextClasses = (day: any) => {
  const isToday = day.date === today.value
  const isSelected = day.date === props.selectedDate

  if (isToday || isSelected) {
    return 'text-amber-900'
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

// Training text styling - green for training days, default for rest
const getTrainingTextClasses = (day: any) => {
  const baseClasses = 'text-sm font-medium'

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
  if (training.includes('tempo') || training.includes('threshold') ||
      training.includes('hard') || training.includes('intensive') ||
      training.includes('maximum') || training.includes('peak')) {
    return {
      level: 'high',
      icon: ChevronDoubleUpIcon,
      color: 'orange',
      description: 'High intensity training'
    }
  }

  // Check for moderate-intensity indicators (single chevron up)
  if (training.includes('long z2') || training.includes('endurance') ||
      training.includes('moderate') || training.includes('sustained') ||
      training.includes('stair tempo') || training.includes('gym')) {
    return {
      level: 'moderate',
      icon: ChevronUpIcon,
      color: 'blue',
      description: 'Moderate intensity training'
    }
  }

  // Check for easy/recovery indicators (single chevron up)
  if (training.includes('easy') || training.includes('recovery') ||
      training.includes('light') || training.includes('mobility')) {
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
