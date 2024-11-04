import mongoose from "mongoose";

// Define the User schema for the MongoDB database
export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String, // User's name
    },
    email: {
      type: String, // User's email
      required: true, // Email is required
    },
    password: {
      type: String, // User's password
      required: true, // Password is required
    },
  },
  { versionKey: false, timestamps: true } // Disable version key and enable timestamps
);

// Create the User model from the schema
export const userModel = mongoose.model("Users", UserSchema);
