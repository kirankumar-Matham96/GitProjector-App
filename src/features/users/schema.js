import mongoose from "mongoose";
// import { encrypt } from "../../middlewares/encrypt.middleware.js";

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const userModel = mongoose.model("Users", UserSchema);
