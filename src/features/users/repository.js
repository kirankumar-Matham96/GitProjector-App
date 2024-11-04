import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { userModel } from "./schema.js"; // Import user model for database operations
import { encrypt } from "../../middlewares/encrypt.middleware.js"; // Import encryption middleware
import { CustomError } from "../../utils/customError.js"; // Import custom error handling class

class UserRepository {
  /**
   * Adds a new user to the database.
   * @param {object} user - User details to be added
   * @returns {object} - User data including id, name, email, and timestamps
   * @throws {Error} - Throws an error if user creation fails
   */
  addUser = async (user) => {
    try {
      // Password encryption
      user.password = await encrypt(user.password); // Encrypt the user's password
      const newUser = await userModel(user); // Create a new user instance
      const userCreated = await newUser.save(); // Save the new user to the database
      
      // Prepare user data to return
      const userData = {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        subscribed: userCreated.createdAt,
        updated: userCreated.updatedAt,
      };
      return userData; // Return the created user data
    } catch (error) {
      throw error; // Throw the error to be handled by the controller
    }
  };

  /**
   * Signs in a user with email and password.
   * @param {object} credentials - User credentials including email and password
   * @returns {object} - User data including id, name, email, and timestamps
   * @throws {CustomError} - Throws error if user not found or credentials are invalid
   */
  signIn = async ({ email, password }) => {
    try {
      // Validate credentials
      const userFound = await userModel.findOne({ email }); // Find user by email

      if (!userFound) {
        throw new CustomError("User not found", 404); // User not found
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userFound.password // Compare provided password with stored password
      );

      if (!isPasswordMatch) {
        throw new CustomError("Invalid credentials", 403); // Invalid password
      }

      // Prepare user data to return
      const userData = {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        subscribed: userFound.registeredOn,
        updated: userFound.updatedOn,
      };
      return userData; // Return user data
    } catch (error) {
      throw error; // Throw the error to be handled by the controller
    }
  };

  /**
   * Retrieves a user by their ID.
   * @param {string} userId - The ID of the user to retrieve
   * @returns {object} - User data including id, name, email, and timestamps
   * @throws {Error} - Throws an error if user retrieval fails
   */
  getUser = async (userId) => {
    try {
      const user = await userModel.findById(userId); // Find user by ID

      // Prepare user data to return
      const userData = {
        id: userId,
        name: user.name,
        email: user.email,
        subscribedOn: user.registeredOn,
        updatedOn: user.updatedOn,
      };

      return userData; // Return user data
    } catch (error) {
      throw error; // Throw the error to be handled by the controller
    }
  };

  /**
   * Updates a user's details by their ID.
   * @param {string} userId - The ID of the user to update
   * @param {object} userData - New user details to update
   * @returns {object} - Updated user data including id, name, email, and timestamps
   * @throws {Error} - Throws an error if user update fails
   */
  updateUser = async (userId, userData) => {
    try {
      // Password encryption
      userData.password = await encrypt(userData.password); // Encrypt the new password
      const user = await userModel.findByIdAndUpdate(userId, userData, {
        new: true, // Return the updated user
      });

      // Prepare updated user data to return
      const updatedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        registeredOn: user.registeredOn,
        updatedOn: user.updatedOn,
      };

      return updatedUser; // Return updated user data
    } catch (error) {
      throw error; // Throw the error to be handled by the controller
    }
  };

  /**
   * Deletes a user by their ID.
   * @param {string} userId - The ID of the user to delete
   * @returns {object} - The deleted user object
   * @throws {CustomError} - Throws error if user not found
   */
  deleteUser = async (userId) => {
    try {
      const user = await userModel.findByIdAndDelete(userId); // Delete user by ID
      if (!user) {
        throw new CustomError("User not found", 404); // User not found
      }

      return user; // Return the deleted user
    } catch (error) {
      throw error; // Throw the error to be handled by the controller
    }
  };
}

export default new UserRepository(); // Export a new instance of UserRepository
