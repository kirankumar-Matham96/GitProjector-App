import JWT from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token =
      authorization?.split(" ").length === 2
        ? authorization?.split(" ")[1]
        : authorization;

    if (!token) {
      throw new Error("Token required");
    }

    //   validate/verify token
    const isTokenValid = JWT.verify(token, process.env.SECRET_KEY);

    if (!isTokenValid) {
      throw new Error("Invalid token");
    }

    // add user id in request
    req.userId = isTokenValid.id;
    next();
  } catch (error) {
    throw error;
  }
};
