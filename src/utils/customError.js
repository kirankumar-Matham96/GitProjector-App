export class CustomError extends Error {
  constructor(message, statusCode = 500) {
    // passes the unique message to super class "Error"
    super(message);
    // sets the status code
    this.statusCode = statusCode;
    // to provide a name for the error when it is thrown
    this.name = this.constructor.name;
    // to trace where the error occurred
    Error.captureStackTrace(this, this.constructor);
  }

  getStackTrace = () => {
    return this.stack;
  };
}
