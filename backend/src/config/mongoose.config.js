import mongoose from "mongoose"; // Import mongoose for MongoDB object modeling

/**
 * Connects to the MongoDB database
 * @async
 * @function connectToDB
 * @throws {Error} Throws an error if the connection fails
 */
export const connectToDB = async () => {
  try {
    const URL = process.env.DB_URL; // Retrieve the database URL from environment variables
    await mongoose.connect(URL); // Establish a connection to the database
    console.log("Connected to DB"); // Log success message upon successful connection
  } catch (error) {
    console.log(error); // Log any error that occurs during connection
  }
};
