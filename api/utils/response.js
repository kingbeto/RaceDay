/**
 * Standardized API response utilities
 */

/**
 * Creates a standardized success response
 * @param {any} data - The response data
 * @param {string} message - Optional success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {object} Standardized response object
 */
export const successResponse = (data, message = null, statusCode = 200) => {
  const response = {
    success: true,
    data,
    ...(message && { message })
  }

  return { response, statusCode }
}

/**
 * Creates a standardized error response
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} code - Optional error code
 * @returns {object} Standardized error response object
 */
export const errorResponse = (error, statusCode = 500, code = null) => {
  const response = {
    success: false,
    error,
    ...(code && { code })
  }

  return { response, statusCode }
}

/**
 * Handles async route operations with consistent error handling
 * @param {Function} fn - Async function to execute
 * @returns {Function} Express middleware function
 */
export const asyncHandler = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      console.error('API Error:', {
        path: req.path,
        method: req.method,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })

      const { response, statusCode } = errorResponse('Internal server error')
      res.status(statusCode).json(response)
    })
  }
}

/**
 * Sends a standardized response
 * @param {object} res - Express response object
 * @param {any} data - Response data
 * @param {string} message - Optional message
 * @param {number} statusCode - HTTP status code
 */
export const sendSuccess = (res, data, message = null, statusCode = 200) => {
  const { response } = successResponse(data, message, statusCode)
  res.status(statusCode).json(response)
}

/**
 * Sends a standardized error response
 * @param {object} res - Express response object
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code
 * @param {string} code - Optional error code
 */
export const sendError = (res, error, statusCode = 500, code = null) => {
  const { response } = errorResponse(error, statusCode, code)
  res.status(statusCode).json(response)
}
