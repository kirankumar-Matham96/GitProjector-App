import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema({
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
  registeredOn: {
    type: Date,
    default: new Date(),
  },
  updatedOn: {
    type: Date,
    default: new Date(),
  },
}).pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const SALT_ROUNDS = process.env.SALT_ROUNDS;
  user.password = bcrypt.hash(user.password, SALT_ROUNDS);
  next();
});

export const userModel = mongoose.model("Users", UserSchema);
