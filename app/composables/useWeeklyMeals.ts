// Simplified weekly meals composable - no interactive behaviors
import type { Week, DailyNutrition } from '@/types'

export function useWeeklyMeals() {
  // Static data generation function
  const generateWeeklyMealsHTML = (
    week: Week,
    getMealsForDate: (date: string) => DailyNutrition['meals']
  ): string => {
    const data = {
      weekLabel: week.label,
      days: week.rows.map(row => ({
        date: row.date,
        day: row.day,
        meals: getMealsForDate(row.date)
      }))
    }

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
          ${data.days
            .map(
              day => `
            <tr>
              <td>
                <div style="font-weight: bold;">${day.day}</div>
                <div style="font-size: 0.8em; color: #666;">
                  ${new Date(day.date + 'T00:00:00').toLocaleDateString('es-AR', { month: 'short', day: 'numeric' })}
                </div>
              </td>
              ${day.meals
                .map(
                  meal => `
                <td>
                  <div style="font-weight: bold; margin-bottom: 4px;">${meal.name}</div>
                  ${
                    meal.dishes
                      ?.map(
                        dish => `
                    <div style="margin-bottom: 2px; font-size: 0.9em;">
                      <div style="font-weight: 500;">${dish.name}</div>
                      <div style="color: #666; font-size: 0.85em;">${dish.ingredients}</div>
                    </div>
                  `
                      )
                      .join('') || ''
                  }
                  <div style="color: #0066cc; font-size: 0.8em; margin-top: 4px;">${meal.calories} kcal</div>
                </td>
              `
                )
                .join('')}
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `
  }

  return {
    generateWeeklyMealsHTML
  }
}
