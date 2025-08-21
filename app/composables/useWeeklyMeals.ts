import { ref } from 'vue'
import type { Week, DailyNutrition } from '@/types'

export function useWeeklyMeals() {
  const showingWeeklyMeals = ref(false)
  const selectedWeekForMeals = ref<string | null>(null)
  const selectedWeekMealsData = ref<{
    weekLabel: string
    days: Array<{
      date: string
      day: string
      meals: DailyNutrition['meals']
    }>
  } | null>(null)

  const showWeeklyMealsModal = (week: Week, getMealsForDate: (date: string) => DailyNutrition['meals']) => {
    selectedWeekForMeals.value = week.id
    selectedWeekMealsData.value = {
      weekLabel: week.label,
      days: week.rows.map(row => ({
        date: row.date,
        day: row.day,
        meals: getMealsForDate(row.date)
      }))
    }
    showingWeeklyMeals.value = true
  }

  const closeWeeklyMealsModal = () => {
    showingWeeklyMeals.value = false
    selectedWeekForMeals.value = null
    selectedWeekMealsData.value = null
  }

  const printWeeklyMeals = () => {
    const content = generateWeeklyMealsPrintContent()
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Weekly Meals - ${selectedWeekMealsData.value?.weekLabel}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; vertical-align: top; }
              th { background-color: #f5f5f5; font-weight: bold; }
              .meal-name { font-weight: bold; margin-bottom: 4px; }
              .dish-item { margin-bottom: 2px; font-size: 0.9em; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>${content}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const generateWeeklyMealsPrintContent = (): string => {
    if (!selectedWeekMealsData.value) return ''

    const data = selectedWeekMealsData.value
    
    return `
      <h1>🍽️ Weekly Meal Plan: ${data.weekLabel}</h1>
      
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Desayuno</th>
            <th>Almuerzo</th>
            <th>Merienda</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          ${data.days.map(day => `
            <tr>
              <td>
                <div style="font-weight: bold;">${day.day}</div>
                <div style="font-size: 0.8em; color: #666;">
                  ${new Date(day.date + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                </div>
              </td>
              ${day.meals.map(meal => `
                <td>
                  <div class="meal-name">${meal.name}</div>
                  ${meal.dishes?.map(dish => `
                    <div class="dish-item">
                      <div style="font-weight: 500;">${dish.name}</div>
                      <div style="color: #666; font-size: 0.85em;">${dish.ingredients}</div>
                    </div>
                  `).join('') || ''}
                  <div style="color: #0066cc; font-size: 0.8em; margin-top: 4px;">${meal.calories} kcal</div>
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
  }

  return {
    showingWeeklyMeals,
    selectedWeekForMeals,
    selectedWeekMealsData,
    showWeeklyMealsModal,
    closeWeeklyMealsModal,
    printWeeklyMeals
  }
}
