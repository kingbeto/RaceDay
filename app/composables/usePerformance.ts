import { ref, onMounted, readonly } from 'vue'

export const usePerformance = () => {
  const metrics = ref({
    initialLoadTime: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  })

  const startTime = ref(performance.now())

  const measureInitialLoad = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const loadTime = performance.now() - startTime.value
      metrics.value.initialLoadTime = loadTime

      // Log performance metrics in development
      if (import.meta.env.DEV) {
        console.log('🚀 Performance Metrics:')
        console.log(`Initial load time: ${loadTime.toFixed(2)}ms`)
      }
    }
  }

  const observePaintMetrics = () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-paint') {
            metrics.value.firstPaint = entry.startTime
          } else if (entry.name === 'first-contentful-paint') {
            metrics.value.firstContentfulPaint = entry.startTime
          }
        }
      })
      paintObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metrics.value.largestContentfulPaint = lastEntry.startTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        metrics.value.cumulativeLayoutShift = clsValue
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  const logMetrics = () => {
    if (import.meta.env.DEV) {
      console.log('📊 Core Web Vitals:')
      console.log(`First Paint: ${metrics.value.firstPaint.toFixed(2)}ms`)
      console.log(`First Contentful Paint: ${metrics.value.firstContentfulPaint.toFixed(2)}ms`)
      console.log(`Largest Contentful Paint: ${metrics.value.largestContentfulPaint.toFixed(2)}ms`)
      console.log(`Cumulative Layout Shift: ${metrics.value.cumulativeLayoutShift.toFixed(4)}`)
    }
  }

  onMounted(() => {
    measureInitialLoad()
    observePaintMetrics()

    // Log metrics after a short delay to capture all paint events
    setTimeout(logMetrics, 1000)
  })

  return {
    metrics: readonly(metrics),
    measureInitialLoad,
    logMetrics
  }
}
