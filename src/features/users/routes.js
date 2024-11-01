import { Router } from "express";
import userController from "./controller.js";

export const userRouter = Router();

userRouter.post("/add", userController.registerUser);
userRouter.post("/signin", userController.userSignin);
userRouter.get("/", userController.getUserById);
userRouter.put("/update", userController.updateUserById);
userRouter.delete("/delete", userController.deleteUserById);
