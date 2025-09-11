/**
 * API service for communicating with the RaceDay backend
 */

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// Standard API response types
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface ApiError {
  success: false
  error: string
  code?: string
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Makes an HTTP request to the API
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    try {
      const response = await fetch(url, { ...defaultOptions, ...options })

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        }))
        throw new Error(errorData.error || `Request failed with status ${response.status}`)
      }

      const data: ApiResponse<T> = await response.json()

      if (!data.success) {
        throw new Error((data as any).error || 'API request failed')
      }

      return data.data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  /**
   * GET request
   */
  private async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(endpoint, this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    return this.request<T>(url.pathname + url.search)
  }

  /**
   * POST request
   */
  private async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * PUT request
   */
  private async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  /**
   * DELETE request
   */
  private async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    })
  }

  // Training Plans API
  async getTrainingPlans() {
    return this.get('/api/training-plans')
  }

  // Nutrition API
  async getAllNutrition() {
    return this.get('/api/nutrition')
  }

  async getNutritionByDate(date: string) {
    return this.get('/api/nutrition', { date })
  }

  // Groceries API
  async getAllGroceries() {
    return this.get('/api/groceries')
  }

  async getGroceriesByWeek(weekId: string) {
    return this.get('/api/groceries', { weekId })
  }

  // Health check
  async healthCheck() {
    return this.get('/health')
  }

  // API info
  async getApiInfo() {
    return this.get('/api/hello')
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Export class for testing
export { ApiService }

// Export types
export type { ApiResponse, ApiError }
