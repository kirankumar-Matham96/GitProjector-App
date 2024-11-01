import userRepository from "./repository.js";
import JWT from "jsonwebtoken";

class UserController {
  registerUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const user = await userRepository.addUser({ name, email, password });
      res
        .status(201)
        .json({ success: true, message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  };

  userSignin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userRepository.signIn({ email, password });

      const token = JWT.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1 day",
        }
      );

      res
        .status(201)
        .json({ success: true, message: "User signed in successfully", token });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await userRepository.getUser(userId);
      res
        .status(200)
        .json({ success: true, message: "User fetched successfully", user });
    } catch (error) {
      next(error);
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      const { userId } = req;
      const { name, email, password } = req.body;
      const user = await userRepository.updateUser(
        (userId, (user = { name, email, password }))
      );
      res
        .status(200)
        .json({ success: true, message: "User updated successfully", user });
    } catch (error) {
      next(error);
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await userRepository.deleteUser(userId);
      console.log(user.ok);
      console.log(user.status);

      response
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
