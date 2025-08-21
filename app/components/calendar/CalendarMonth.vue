<template>
  <BaseCard :title="month.name" class="w-full">
    <div class="grid grid-cols-7 gap-1">
      <!-- Day headers -->
      <div
        v-for="day in dayHeaders"
        :key="day"
        class="p-2 text-center text-xs font-medium text-gray-500 uppercase"
      >
        {{ day }}
      </div>

      <!-- Calendar days -->
      <CalendarDay
        v-for="day in month.days"
        :key="`${day.date}`"
        :day="{ ...day, isSelected: day.date === selectedDate }"
        @click="$emit('date-select', day.date)"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { CalendarMonth } from '@/types'
import BaseCard from '@/components/ui/BaseCard.vue'
import CalendarDay from './CalendarDay.vue'

interface Props {
  month: CalendarMonth
  selectedDate: string | null
}

interface Emits {
  (e: 'date-select', date: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
</script>
