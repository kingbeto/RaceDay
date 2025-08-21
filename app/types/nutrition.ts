export interface NutritionPlan {
  [date: string]: DailyNutrition
}

export interface DailyNutrition {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFats: number
  meals: Meal[]
}

export interface Meal {
  name: string
  calories: number
  dishes: Dish[]
}

export interface Dish {
  name: string
  ingredients: string
  preparation: string
}

export interface MacroTargets {
  calories: number
  protein: number
  carbs: number
  fats: number
}
