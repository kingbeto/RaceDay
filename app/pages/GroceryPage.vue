<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Listas de Compras</h1>
      <p class="text-gray-600">Gestión de ingredientes y suministros por semana de entrenamiento</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Week selector -->
        <BaseCard title="Seleccionar Semana">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Semana de entrenamiento</label
              >
              <select
                v-model="selectedWeekId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Seleccionar semana...</option>
                <option v-for="weekId in availableWeeks" :key="weekId" :value="weekId">
                  {{ getWeekLabel(weekId) }}
                </option>
              </select>
            </div>
            <div class="flex items-end gap-2">
              <BaseButton
                v-if="selectedWeekId && groceryData.length > 0"
                @click="printGroceries"
                variant="outline"
              >
                🖨️ Imprimir
              </BaseButton>
              <BaseButton
                v-if="selectedWeekId && groceryData.length > 0"
                @click="exportGroceries"
                variant="outline"
              >
                📱 Exportar
              </BaseButton>
            </div>
          </div>
        </BaseCard>

        <!-- Grocery categories -->
        <div v-if="selectedWeekId && groceryData.length > 0" class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
              Lista para {{ getWeekLabel(selectedWeekId) }}
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">
                {{ checkedItemsCount }} / {{ totalItemsCount }} completados
              </span>
              <div class="w-24 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${progressPercentage}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div class="grid gap-4">
            <BaseCard
              v-for="category in groceryData"
              :key="category.name"
              :title="category.name"
              class="transition-shadow hover:shadow-md"
            >
              <div class="space-y-2">
                <div
                  v-for="(item, index) in getItemsList(category.items)"
                  :key="index"
                  class="flex items-start gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <input
                    v-model="checkedItems[`${category.name}-${index}`]"
                    type="checkbox"
                    :id="`${category.name}-${index}`"
                    class="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    :for="`${category.name}-${index}`"
                    :class="[
                      'flex-1 cursor-pointer transition-all duration-200',
                      checkedItems[`${category.name}-${index}`]
                        ? 'line-through text-gray-500'
                        : 'text-gray-900 hover:text-primary-600'
                    ]"
                  >
                    {{ item.trim() }}
                  </label>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Empty state -->
        <BaseCard v-else-if="selectedWeekId" title="Sin Lista">
          <div class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
                />
              </svg>
            </div>
            <p class="text-gray-600">No hay lista de compras disponible para esta semana.</p>
          </div>
        </BaseCard>

        <!-- Initial state -->
        <BaseCard v-else title="Comenzar">
          <div class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">Selecciona una semana para ver su lista de compras.</p>
            <p class="text-sm text-gray-500">
              Las listas están organizadas por categorías para facilitar las compras.
            </p>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Quick actions -->
        <BaseCard title="Acciones Rápidas">
          <div class="space-y-3">
            <BaseButton @click="goToCurrentWeek" variant="outline" size="sm" class="w-full">
              📅 Semana Actual
            </BaseButton>
            <BaseButton @click="clearAllChecked" variant="outline" size="sm" class="w-full">
              🔄 Limpiar Lista
            </BaseButton>
            <BaseButton
              v-if="selectedWeekId"
              @click="toggleAllChecked"
              variant="outline"
              size="sm"
              class="w-full"
            >
              {{ allChecked ? '☐' : '☑️' }} {{ allChecked ? 'Desmarcar' : 'Marcar' }} Todo
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Shopping tips -->
        <BaseCard title="Tips de Compras">
          <div class="space-y-3 text-sm text-gray-600">
            <div class="p-3 bg-blue-50 rounded-lg">
              <h5 class="font-medium text-blue-900 mb-1">🛒 Planificación</h5>
              <p>Compra los ingredientes frescos 1-2 días antes de usarlos.</p>
            </div>
            <div class="p-3 bg-green-50 rounded-lg">
              <h5 class="font-medium text-green-900 mb-1">❄️ Conservación</h5>
              <p>Congela las proteínas que no uses inmediatamente.</p>
            </div>
            <div class="p-3 bg-yellow-50 rounded-lg">
              <h5 class="font-medium text-yellow-900 mb-1">📱 Lista Digital</h5>
              <p>Usa la función de exportar para llevarte la lista al móvil.</p>
            </div>
          </div>
        </BaseCard>

        <!-- Summary -->
        <BaseCard v-if="selectedWeekId && groceryData.length > 0" title="Resumen">
          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Categorías</span>
              <span class="font-medium">{{ groceryData.length }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Total items</span>
              <span class="font-medium">{{ totalItemsCount }}</span>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-2">
              <span class="text-gray-600">Progreso</span>
              <span class="font-medium">{{ Math.round(progressPercentage) }}%</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGroceryStore, useTrainingStore } from '@/stores'
import { usePrint } from '@/composables'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const groceryStore = useGroceryStore()
const trainingStore = useTrainingStore()
const { printGroceries: printGroceryList } = usePrint()

const { currentPlan } = storeToRefs(trainingStore)

const selectedWeekId = ref<string>('')
const checkedItems = ref<Record<string, boolean>>({})

const availableWeeks = computed(() => {
  return groceryStore.getAllWeekIds
})

const groceryData = ref([])

// Load grocery data when week changes
watch(
  selectedWeekId,
  async newWeekId => {
    if (newWeekId) {
      groceryData.value = await groceryStore.getGroceriesForWeek(newWeekId)
    } else {
      groceryData.value = []
    }
    clearAllChecked()
  },
  { immediate: false }
)

const getWeekLabel = (weekId: string): string => {
  if (!currentPlan.value) return weekId

  const week = currentPlan.value.weeks.find(w => w.id === weekId)
  return week ? week.label : weekId
}

const getItemsList = (itemsString: string): string[] => {
  return itemsString.split(',').filter(item => item.trim())
}

const totalItemsCount = computed(() => {
  return groceryData.value.reduce((count, category) => {
    return count + getItemsList(category.items).length
  }, 0)
})

const checkedItemsCount = computed(() => {
  return Object.values(checkedItems.value).filter(Boolean).length
})

const progressPercentage = computed(() => {
  if (totalItemsCount.value === 0) return 0
  return (checkedItemsCount.value / totalItemsCount.value) * 100
})

const allChecked = computed(() => {
  return totalItemsCount.value > 0 && checkedItemsCount.value === totalItemsCount.value
})

const printGroceries = () => {
  if (groceryData.value.length > 0) {
    printGroceryList(groceryData.value, getWeekLabel(selectedWeekId.value))
  }
}

const exportGroceries = () => {
  // Create a simple text format for mobile
  let text = `Lista de Compras - ${getWeekLabel(selectedWeekId.value)}\n\n`

  groceryData.value.forEach(category => {
    text += `${category.name}\n`
    text += '─'.repeat(category.name.length) + '\n'
    getItemsList(category.items).forEach(item => {
      text += `☐ ${item.trim()}\n`
    })
    text += '\n'
  })

  // Create downloadable file
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lista-compras-${selectedWeekId.value}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const goToCurrentWeek = () => {
  if (!currentPlan.value) return

  const today = new Date().toISOString().split('T')[0]
  const currentWeek = currentPlan.value.weeks.find(week =>
    week.rows.some(day => day.date === today)
  )

  if (currentWeek) {
    selectedWeekId.value = currentWeek.id
  }
}

const clearAllChecked = () => {
  checkedItems.value = {}
}

const toggleAllChecked = () => {
  if (allChecked.value) {
    clearAllChecked()
  } else {
    groceryData.value.forEach(category => {
      getItemsList(category.items).forEach((_, index) => {
        checkedItems.value[`${category.name}-${index}`] = true
      })
    })
  }
}

onMounted(async () => {
  await trainingStore.loadPlan()
  await groceryStore.loadAllGroceries()
})
</script>
