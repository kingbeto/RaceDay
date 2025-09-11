import { ref, computed, type Ref } from 'vue'
import type { TrainingPlan, CalendarMonth, CalendarDay } from '@/types'

export const useCalendar = (trainingPlan: Ref<TrainingPlan | null>) => {
  const selectedDate = ref<string | null>(null)
  const currentMonth = ref(new Date())

  // Fast lookup map for date data (specs requirement)
  const dateMap = computed((): Record<string, any> => {
    if (!trainingPlan.value) return {}

    const map: Record<string, any> = {}
    const plan = trainingPlan.value

    for (const week of plan.weeks) {
      for (const day of week.rows) {
        map[day.date] = {
          training: day.training,
          isExercise: day.isExercise,
          calories: day.calories || (day.isExercise ? 2300 : 2100),
          isRaceDay: day.isRaceDay || false
        }
      }
    }

    return map
  })

  const months = computed((): CalendarMonth[] => {
    if (!trainingPlan.value) return []

    const plan = trainingPlan.value
    const startDate = new Date(plan.startDate)
    const endDate = new Date(plan.endDate)

    const monthsArray: CalendarMonth[] = []
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1)

    while (current <= endDate) {
      const month = buildMonth(current, plan)
      monthsArray.push(month)
      current.setMonth(current.getMonth() + 1)
    }

    return monthsArray
  })

  const buildMonth = (date: Date, plan: TrainingPlan): CalendarMonth => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const today = new Date()

    // Get first day of month and calculate starting day of week
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDayOfWeek = firstDay.getDay()

    const days: CalendarDay[] = []

    // Add previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayDate = new Date(year, month - 1, prevMonthLastDay - i)
      days.push(createCalendarDay(dayDate, false, today, plan))
    }

    // Add current month's days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayDate = new Date(year, month, day)
      days.push(createCalendarDay(dayDate, true, today, plan))
    }

    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const dayDate = new Date(year, month + 1, day)
      days.push(createCalendarDay(dayDate, false, today, plan))
    }

    return {
      name: firstDay.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      year,
      month,
      days
    }
  }

  const createCalendarDay = (
    date: Date,
    isCurrentMonth: boolean,
    today: Date,
    plan: TrainingPlan
  ): CalendarDay => {
    const dateString = date.toISOString().split('T')[0]
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate.value === dateString

    // Find training day for this date
    let trainingDay = null
    let hasTraining = false

    for (const week of plan.weeks) {
      const day = week.rows.find(row => row.date === dateString)
      if (day) {
        trainingDay = day
        hasTraining = true
        break
      }
    }

    return {
      date: dateString,
      day: date.getDate(),
      isCurrentMonth,
      isToday,
      isSelected,
      hasTraining,
      trainingDay
    }
  }

  // No interactive functions - static data only

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getWeekNumber = (dateString: string): number => {
    if (!trainingPlan.value) return 0

    const weekIndex = trainingPlan.value.weeks.findIndex(week =>
      week.rows.some(row => row.date === dateString)
    )

    return weekIndex >= 0 ? weekIndex + 1 : 0
  }

  // Fast lookup function for date data (specs requirement)
  const getEntryForDate = (dateString: string): any => {
    return dateMap.value[dateString] || null
  }

  return {
    selectedDate,
    currentMonth,
    months,
    dateMap,
    formatDate,
    getWeekNumber,
    getEntryForDate
  }
}
