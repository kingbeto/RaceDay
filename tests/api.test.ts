import { describe, it, expect, vi } from 'vitest'
import { apiService } from '../app/services/api'

// Mock fetch
global.fetch = vi.fn()

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should make successful API calls', async () => {
    const mockResponse = {
      success: true,
      data: { id: '1', title: 'Test Plan' },
      message: 'Success'
    }

    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })

    const result = await apiService.getTrainingPlans()
    expect(result).toEqual(mockResponse.data)
  })

  it('should handle API errors', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ success: false, error: 'Not found' })
    })

    await expect(apiService.getTrainingPlans()).rejects.toThrow('Not found')
  })
})
