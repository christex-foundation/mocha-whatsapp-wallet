//@ts-check

/**
 * Create a validation error
 * @param {string} message - The error message
 * @returns {Error} A validation error object
 */
export function createValidationError(message) {
  const error = new Error(message);
  error.name = 'ValidationError';
  return error;
}

/**
 * Create a database error
 * @param {string} message - The error message
 * @returns {Error} A database error object
 */
export function createDatabaseError(message) {
  const error = new Error(message);
  error.name = 'DatabaseError';
  return error;
}

/**
 * Create a not found error
 * @param {string} message - The error message
 * @returns {Error} A not found error object
 */
export function createNotFoundError(message) {
  const error = new Error(message);
  error.name = 'NotFoundError';
  return error;
}
