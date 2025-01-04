import JWT from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";

/**
 * Middleware to authenticate users using JWT tokens.
 *
 * This function checks for a valid JWT in the authorization header and extracts
 * the user ID if the token is valid. If the token is missing or invalid, it
 * throws a CustomError.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {CustomError} If the token is missing or invalid.
 */
export const auth = (req, res, next) => {
  try {
    // Retrieve the authorization header from the request
    const authorization = req.headers["authorization"];

    // Extract the token from the authorization header
    const token = authorization?.split(" ")[1];
    // Check if the token is provided
    if (!token) {
      throw new CustomError("Token required"); // Throw error if no token is found
    }

    // Verify the token using the secret key
    const isTokenValid = JWT.verify(token, process.env.SECRET_KEY);

    // Check if the token is valid
    if (!isTokenValid) {
      throw new CustomError("Invalid token"); // Throw error if the token is invalid
    }

    // Attach the user ID to the request object for further use
    req.userId = isTokenValid.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    throw error; // Pass the error to the error handling middleware
  }
};
