import JWT from "jsonwebtoken";
import { CustomError } from "../utils/customError.js";

export const auth = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token =
      authorization?.split(" ").length === 2
        ? authorization?.split(" ")[1]
        : authorization;

    if (!token) {
      throw new CustomError("Token required");
    }

    const isTokenValid = JWT.verify(token, process.env.SECRET_KEY);

    if (!isTokenValid) {
      throw new CustomError("Invalid token");
    }

    req.userId = isTokenValid.id;
    next();
  } catch (error) {
    throw error;
  }
};
