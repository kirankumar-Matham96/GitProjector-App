/**
 * Middleware to handle errors in the application.
 *
 * This function checks for an error in the request and sends an appropriate
 * response with the error message and status code. If no error exists,
 * it calls the next middleware in the stack.
 *
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - Returns a JSON response containing the error message
 *                     and status code if an error exists.
 */
export const handleError = (err, req, res, next) => {
  if (err) {
    // Set the status code for the error, defaulting to 500
    err.statusCode = err.statusCode || 500;
    
    // Set the error message, defaulting to a generic message
    err.message = err.message || "Internal server error";
    
    // Send the error response
    return res
      .status(err.statusCode)
      .json({ success: false, error: err.message });
  }

  // Call the next middleware if no error exists
  next();
};
