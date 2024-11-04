import userRepository from "./repository.js"; // Import the user repository for database operations
import JWT from "jsonwebtoken"; // Import JSON Web Token for authentication

class UserController {
  /**
   * Registers a new user.
   * @route POST /register
   * @group Users - Operations about user registration
   * @param {string} name.body.required - The name of the user
   * @param {string} email.body.required - The email of the user
   * @param {string} password.body.required - The password of the user
   * @returns {object} 201 - A success message and user details
   * @returns {Error}  400 - Bad request error
   */
  registerUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body; // Destructure user data from request body
      const user = await userRepository.addUser({ name, email, password }); // Add user to repository
      res
        .status(201)
        .json({ success: true, message: "User created successfully", user }); // Send success response
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  };

  /**
   * Signs in a user and generates a JWT token.
   * @route POST /signin
   * @group Users - Operations about user authentication
   * @param {string} email.body.required - The email of the user
   * @param {string} password.body.required - The password of the user
   * @returns {object} 200 - A success message and JWT token
   * @returns {Error}  401 - Unauthorized error if credentials are invalid
   */
  userSignin = async (req, res, next) => {
    try {
      const { email, password } = req.body; // Destructure credentials from request body
      const user = await userRepository.signIn({ email, password }); // Authenticate user

      // Generate JWT token
      const token = JWT.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1 day", // Token expiration time
        }
      );

      res
        .status(200)
        .json({ success: true, message: "User signed in successfully", token }); // Send success response with token
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  };

  /**
   * Retrieves a user by their ID.
   * @route GET /user
   * @group Users - Operations about users
   * @returns {object} 200 - A success message and user details
   * @returns {Error}  404 - User not found error
   */
  getUserById = async (req, res, next) => {
    try {
      const { userId } = req; // Get user ID from request
      const user = await userRepository.getUser(userId); // Fetch user from repository
      res
        .status(200)
        .json({ success: true, message: "User fetched successfully", user }); // Send success response
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  };

  /**
   * Updates a user's details by their ID.
   * @route PUT /user
   * @group Users - Operations about users
   * @param {string} name.body - The new name of the user
   * @param {string} email.body - The new email of the user
   * @param {string} password.body - The new password of the user
   * @returns {object} 200 - A success message and updated user details
   * @returns {Error}  404 - User not found error
   */
  updateUserById = async (req, res, next) => {
    try {
      const { userId } = req; // Get user ID from request
      const { name, email, password } = req.body; // Destructure updated user data from request body

      const user = await userRepository.updateUser(userId, {
        name,
        email,
        password,
      }); // Update user in repository
      res
        .status(200)
        .json({ success: true, message: "User updated successfully", user }); // Send success response
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  };

  /**
   * Deletes a user by their ID.
   * @route DELETE /user
   * @group Users - Operations about users
   * @returns {object} 200 - A success message for deletion
   * @returns {Error}  404 - User not found error
   */
  deleteUserById = async (req, res, next) => {
    try {
      const { userId } = req; // Get user ID from request
      await userRepository.deleteUser(userId); // Delete user from repository
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" }); // Send success response
    } catch (error) {
      next(error); // Pass error to the next middleware
    }
  };
}

export default new UserController(); // Export a new instance of UserController
