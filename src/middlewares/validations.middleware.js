import { body, validationResult } from "express-validator";

class Validations {
  /**
   * Validates user signup request data.
   *
   * This middleware checks if the user name, email, and password meet the required 
   * validation criteria. If any validation fails, a response is sent with a 400 status
   * and an appropriate error message. Otherwise, it calls the next middleware.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - Returns a JSON response with error messages if validation fails.
   */
  userSignup = async (req, res, next) => {
    try {
      await body("name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("User name is required and min of 3 characters")
        .run(req);

      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is empty or invalid")
        .run(req);

      await body("password")
        .notEmpty()
        .isString()
        .isLength({ min: 8 })
        .withMessage("Password must be min of 8 characters")
        .run(req);

      const validationResults = validationResult(req);
      if (validationResults.array().length > 0) {
        return res
          .status(400)
          .json({ success: false, message: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Validates user update request data.
   *
   * This middleware checks if the user name, email, and password meet the required 
   * validation criteria for updating user information. If any validation fails, a 
   * response is sent with a 400 status and an appropriate error message. Otherwise, 
   * it calls the next middleware.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Object} - Returns a JSON response with error messages if validation fails.
   */
  userUpdate = async (req, res, next) => {
    try {
      await body("name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("User name is required and min of 3 characters")
        .run(req);

      await body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Email is empty or invalid")
        .run(req);

      await body("password")
        .notEmpty()
        .isString()
        .isLength({ min: 8 })
        .withMessage("Password must be min of 8 characters")
        .run(req);

      const validationResults = validationResult(req);
      if (validationResults.array().length > 0) {
        return res
          .status(400)
          .json({ success: false, message: validationResults.array()[0].msg });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const validations = new Validations();
