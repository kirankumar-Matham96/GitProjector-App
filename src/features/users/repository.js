import bcrypt from "bcrypt";
import { userModel } from "./schema.js";

class UserRepository {
  addUser = async (user) => {
    try {
      const newUser = await userModel(user);
      const userCreated = await newUser.save();
      const userData = {
        id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        subscribed: userCreated.registeredOn,
        updated: userCreated.updatedOn,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  };

  signIn = async ({ email, password }) => {
    try {
      email, password;

      const userFound = await userModel.findOne({ email });

      if (!userFound) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userFound.password
      );

      if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
      }

      const userData = {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        subscribed: userFound.registeredOn,
        updated: userFound.updatedOn,
      };
      return userData;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (userId) => {
    try {
            
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (userId, userData) => {
    try {
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (userId) => {
    try {
    } catch (error) {
      throw error;
    }
  };
}

export default new UserRepository();
