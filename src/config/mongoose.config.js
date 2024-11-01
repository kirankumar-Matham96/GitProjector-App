import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const URL = process.env.DB_URL;
    await mongoose.connect(URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
