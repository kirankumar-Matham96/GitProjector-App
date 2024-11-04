import { body, validationResult } from "express-validator";

class Validations {
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
