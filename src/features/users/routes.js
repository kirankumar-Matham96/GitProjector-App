import { Router } from "express";
import userController from "./controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/add", userController.registerUser);
userRouter.post("/signin", userController.userSignin);
userRouter.get("/", auth, userController.getUserById);
userRouter.put("/update", auth, userController.updateUserById);
userRouter.delete("/delete", auth, userController.deleteUserById);
