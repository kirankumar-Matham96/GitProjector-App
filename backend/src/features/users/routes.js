import { Router } from "express"; // Import Router from express
import userController from "./controller.js"; // Import user controller for handling user-related requests
import { auth } from "../../middlewares/auth.middleware.js"; // Import authentication middleware to protect routes
import { validations } from "../../middlewares/validations.middleware.js"; // Import validation middleware for request data validation

export const userRouter = Router(); // Create a new Router instance

/**
 * Route for adding a new user.
 * Validates the user signup data before passing it to the controller.
 * @route POST /add
 */
userRouter.post("/add", validations.userSignup, userController.registerUser);

/**
 * Route for user sign-in.
 * @route POST /signin
 */
userRouter.post("/signin", userController.userSignin);

/**
 * Route for fetching the authenticated user's details.
 * Protected by authentication middleware.
 * @route GET /
 */
userRouter.get("/", auth, userController.getUserById);

/**
 * Route for updating user details.
 * Protected by authentication middleware and validates the updated user data.
 * @route PUT /update
 */
userRouter.put(
  "/update",
  auth,
  validations.userUpdate,
  userController.updateUserById
);

/**
 * Route for deleting a user.
 * Protected by authentication middleware.
 * @route DELETE /delete
 */
userRouter.delete("/delete", auth, userController.deleteUserById);
