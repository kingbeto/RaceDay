export interface TrainingPlan {
  id: string
  title: string
  subtitle: string
  raceDate: string
  startDate: string
  endDate: string
  description: string
  weeks: Week[]
}

export interface Week {
  id: string
  label: string
  start: string
  end: string
  summary: string
  phase: 'base' | 'build' | 'peak' | 'taper' | 'race'
  rows: TrainingDay[]
}

export interface TrainingDay {
  date: string
  day: string
  training: string
  food: string
  notes: string
  calories?: number
  isExercise: boolean
  isRaceDay?: boolean
}

export interface CalendarMonth {
  name: string
  year: number
  month: number
  days: CalendarDay[]
}

export interface CalendarDay {
  date: string
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasTraining: boolean
  trainingDay?: TrainingDay
}
