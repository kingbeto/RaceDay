<template>
  <Teleport to="body">
    <div
      v-if="tooltip.show"
      class="fixed z-50 px-3 py-2 text-xs rounded-md bg-slate-900 text-white shadow-lg max-w-xs pointer-events-none"
      :style="{
        left: tooltip.x + 'px',
        top: tooltip.y + 'px'
      }"
    >
      {{ tooltip.text }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useTooltips } from '@/composables/useTooltips'

const { tooltip } = useTooltips()
</script>
