// Simplified performance composable - no monitoring behaviors
import { ref, readonly } from 'vue'

export const usePerformance = () => {
  const metrics = ref({
    initialLoadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  })

  // No-op functions - no performance monitoring
  const measureInitialLoad = () => {
    // No monitoring
  }

  const logMetrics = () => {
    // No logging
  }

  return {
    metrics: readonly(metrics),
    measureInitialLoad,
    logMetrics
  }
}
