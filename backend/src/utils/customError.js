/**
 * CustomError class that extends the built-in Error class.
 *
 * This class provides a way to create error instances with a specific status code and 
 * custom error messages. It captures the stack trace to help identify where the error occurred.
 */
export class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code associated with the error.
   */
  constructor(message, statusCode = 500) {
    // passes the unique message to the super class "Error"
    super(message);
    // sets the status code
    this.statusCode = statusCode;
    // to provide a name for the error when it is thrown
    this.name = this.constructor.name;
    // to trace where the error occurred
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Retrieves the stack trace of the error.
   *
   * @returns {string} - The stack trace of the error.
   */
  getStackTrace = () => {
    return this.stack;
  };
}
