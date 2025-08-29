<template>
          <details 
          :id="`week-${week.id}`"
          class="group rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
          :class="{ 'ring-2 ring-amber-400/60 shadow-xl shadow-amber-100/40': hasSelectedDate }"
          :data-week-start="week.start"
          :data-week-end="week.end"
          :open="isExpanded"
          @toggle="handleToggle"
        >
    <summary class="summary-no-marker cursor-pointer p-8 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 rounded-t-2xl hover:from-slate-100 hover:via-white hover:to-blue-100/40 transition-all duration-300 border-b border-slate-200/60">
      <div class="flex items-center justify-between">
        <!-- Week identifier with dot indicator -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <!-- Enhanced gradient dot indicator -->
            <div class="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 shadow-lg"></div>
            <div>
              <h3 class="text-xl font-bold text-slate-900">{{ week.label }}</h3>
              <p class="text-sm text-slate-600 font-medium leading-relaxed">{{ week.summary }}</p>
            </div>
          </div>
          
          <span :class="phaseClasses">{{ phaseText }}</span>
        </div>
        
        <!-- Action buttons -->
        <div class="flex items-center gap-3">
          <!-- Weekly meals button (specs requirement) -->
          <button
            @click.stop="$emit('weekly-meals-click')"
            class="hidden sm:inline-flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150"
            title="View weekly meal table"
          >
            📋
          </button>
          
          <!-- Day counter badge (specs requirement) -->
          <span class="hidden sm:inline text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {{ week.rows?.length || 7 }} days
          </span>
          
          <!-- Collapse indicator (specs requirement) -->
          <svg 
            class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <!-- Date range display -->
      <div class="mt-3 text-sm text-slate-600">
        <p>{{ formatDateRange(week.start, week.end) }}</p>
      </div>
    </summary>

    <!-- Expanded content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isExpanded" class="overflow-hidden">
        <!-- Enhanced training table -->
        <div class="overflow-x-auto p-8 pt-0">
          <table class="w-full border-separate border-spacing-0 bg-slate-50/30 rounded-xl overflow-hidden">
            <!-- Enhanced table header -->
            <thead>
              <tr class="bg-gradient-to-r from-slate-100 via-white to-blue-50/40">
                <th class="px-6 py-4 text-left text-sm font-bold text-slate-800 first:rounded-tl-xl">Date</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-slate-800 hidden sm:table-cell">Day</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-slate-800">Training</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-slate-800 hidden lg:table-cell">Focus</th>
                <th class="px-6 py-4 text-center text-sm font-bold text-slate-800 last:rounded-tr-xl">Nutrition</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/60 bg-white">
              <tr
                v-for="day in week.rows"
                :key="day.date"
                :id="`d-${day.date}`"
                :class="getRowClasses(day)"
                @click="$emit('date-select', day.date)"
              >
                <!-- Enhanced Date Column -->
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
                
                <!-- Enhanced Day Badge -->
                <td class="px-6 py-6 hidden sm:table-cell w-20">
                  <span :class="getDayBadgeClasses(day)" class="px-3 py-1 rounded-lg text-xs font-bold">
                    {{ getDayAbbr(day.date) }}
                  </span>
                </td>
                
                <!-- Enhanced Training Column -->
                <td class="px-6 py-6">
                  <div class="flex items-start space-x-3">
                    <!-- Enhanced activity dot indicator -->
                    <div :class="getActivityDotClasses(day)" class="w-3 h-3 rounded-full mt-1 shadow-sm"></div>
                    <div class="flex-1">
                      <div 
                        :class="getTrainingTextClasses(day)" 
                        class="leading-relaxed font-medium cursor-help hover:text-blue-600 transition-colors duration-200"
                        :title="getTrainingExplanation(day.training)"
                        @mouseenter="showTrainingTooltip($event, day.training)"
                        @mouseleave="hideTooltip"
                      >
                        {{ day.training || 'Off day' }}
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- Enhanced Focus Column -->
                <td class="px-6 py-6 hidden lg:table-cell">
                  <div class="text-sm text-slate-600 leading-relaxed font-medium">
                    {{ day.food || '-' }}
                  </div>
                </td>
                
                <!-- Enhanced Nutrition Column -->
                <td class="px-6 py-6 w-36">
                  <div class="flex flex-col items-center space-y-2">
                    <!-- Enhanced nutrition button -->
                    <button
                      @click.stop="$emit('nutrition-click', day.date)"
                      class="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-all duration-200 border border-blue-200"
                      :title="`View meals for ${formatDayDate(day.date)}`"
                    >
                      <span class="text-sm">📋</span>
                    </button>
                    <!-- Enhanced calorie display -->
                    <span class="text-xs text-slate-600 font-bold bg-slate-100 px-2 py-1 rounded-md">
                      ~{{ getCaloriesForDay(day) }} kcal
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </details>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Week } from '@/types'
import { useTooltips } from '@/composables/useTooltips'
// Removed unused imports since we're using details/summary pattern

interface Props {
  week: Week
  selectedDate: string | null
  isExpanded: boolean
}

interface Emits {
  (e: 'toggle-expand', weekId: string): void
  (e: 'date-select', date: string): void
  (e: 'nutrition-click', date: string): void
  (e: 'grocery-click'): void
  (e: 'weekly-meals-click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Tooltip system for training explanations
const { showTooltip, hideTooltip } = useTooltips()

const hasSelectedDate = computed(() => {
  return props.week.rows?.some(row => row.date === props.selectedDate) ?? false
})

// Memoized values to avoid recalculation
const today = ref(new Date().toISOString().slice(0, 10))
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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

const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  }
  
  if (startDate.getFullYear() !== endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('es-ES', { ...options, year: 'numeric' })} - ${endDate.toLocaleDateString('es-ES', { ...options, year: 'numeric' })}`
  }
  
  return `${startDate.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`
}

// Memoized date formatting to avoid repeated Date object creation
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

// Handle details toggle event
const handleToggle = () => {
  // Emit the toggle event with the new state
  emit('toggle-expand', props.week.id)
}

// Enhanced row styling with sophisticated state management (specs requirement)
const getRowClasses = (day: any) => {
  const isToday = day.date === today.value
  const isSelected = day.date === props.selectedDate

  return [
    'hover:bg-slate-50 transition-colors duration-150 cursor-pointer',
    {
      // Today's row (active date) - specs requirement
      'bg-amber-50 hover:bg-amber-100': isToday,
      // Selected row (calendar interaction) - specs requirement
      'border-l-4 border-amber-400': isSelected,
      'border-l-4 border-transparent': !isSelected,
      // Default state
      'bg-white': !isToday && !isSelected
    }
  ]
}

// Date text styling based on state (specs requirement)
const getDateTextClasses = (day: any) => {
  const isToday = day.date === today.value
  const isSelected = day.date === props.selectedDate

  if (isToday || isSelected) {
    return 'text-amber-900' // Dark amber for today/selected
  }
  return 'text-slate-900' // Default dark text
}

// Day badge styling (specs requirement)
const getDayBadgeClasses = (day: any) => {
  const baseClasses = 'px-2.5 py-0.5 text-xs font-medium rounded-full'
  
  if (day.isExercise) {
    return `${baseClasses} bg-emerald-100 text-emerald-800`
  }
  return `${baseClasses} bg-slate-100 text-slate-800`
}

// Activity dot indicator styling (specs requirement)
const getActivityDotClasses = (day: any) => {
  if (day.isExercise) {
    return 'bg-emerald-500' // Bright green for exercise days
  }
  return 'bg-slate-400' // Muted gray for off days
}

// Training text styling with emphasis (specs requirement)
const getTrainingTextClasses = (day: any) => {
  const baseClasses = 'text-sm font-medium'
  
  if (day.isExercise) {
    return `${baseClasses} text-emerald-700` // Green emphasis for training
  }
  return `${baseClasses} text-slate-900` // Standard for off days
}

// Calorie calculation for nutrition display (specs requirement)
const getCaloriesForDay = (day: any) => {
  // Exercise days get higher calories, off days get lower
  if (day.isExercise) {
    return '2300'
  }
  return '2100'
}

// Training tooltip handlers
const showTrainingTooltip = (event: MouseEvent, training: string) => {
  if (!training || training === 'Off day') return
  
  const explanation = getTrainingExplanation(training)
  if (explanation && explanation !== training) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    showTooltip(explanation, rect.left, rect.bottom + 8)
  }
}

// Training explanations matching demo.html functionality
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
  
  // Find matching explanation by checking if training text contains any key
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
  
  return training // Return original text if no explanation found
}
</script>

<style scoped>
/* Remove the default disclosure triangle marker */
.summary-no-marker {
  list-style: none;
}

.summary-no-marker::-webkit-details-marker {
  display: none;
}

.summary-no-marker::marker {
  display: none;
}
</style>
