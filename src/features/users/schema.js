import mongoose from "mongoose";
// import { encrypt } from "../../middlewares/encrypt.middleware.js";

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
    immutable: true,
  },
  updatedOn: {
    type: Date,
    default: new Date(),
  },
});
// .pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   user.password = encrypt(user.password);
//   next();
// });

// UserSchema.pre("findByIdAndUpdate", function (next) {
//   this.set({ updatedOn: new Date() });
//   if (!user.isModified("password")) return next();
//   this.set({ password: encrypt(this.password) });
//   next();
// });

export const userModel = mongoose.model("Users", UserSchema);
