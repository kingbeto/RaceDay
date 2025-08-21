export * from './training'
export * from './nutrition'
export * from './grocery'

export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}
