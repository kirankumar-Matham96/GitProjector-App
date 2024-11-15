import "dotenv/config"; // Import environment variables
import express from "express"; // Import Express framework
import cors from "cors"; // Import cors package
import { connectToDB } from "./src/config/mongoose.config.js"; // Import DB connection function
import { userRouter } from "./src/features/users/routes.js"; // Import user routes
import { handleError } from "./src/middlewares/errorHandling.middleware.js"; // Import error handling middleware
import { gitRouter } from "./src/features/github/routes.js"; // Import GitHub routes
import { auth } from "./src/middlewares/auth.middleware.js"; // Import authentication middleware

const app = express(); // Create an instance of Express

/**
 * Middleware to parse JSON and URL-encoded data
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware to use cors
 */
app.use(cors());

/**
 * Set up user-related routes
 * @route {GET} /api/user
 * @route {POST} /api/user
 * @route {PUT} /api/user/:id
 * @route {DELETE} /api/user/:id
 */
app.use("/api/user", userRouter);

/**
 * Set up GitHub-related routes with authentication
 * @route {GET} /api/repos
 * @route {POST} /api/repos
 */
app.use("/api/repos", auth, gitRouter);

/**
 * Middleware for error handling
 * Handles errors thrown in the application
 */
app.use(handleError);

/**
 * Root route for the API
 * @route {GET} /
 * @returns {object} JSON response with success message
 */
app.get(
  "/",
  (req, res) =>
    res
      .status(200) // Respond with a 200 OK status
      .json({ success: true, message: "Welcome to GitProjector API" }) // JSON response message
);

/**
 * Start the server and connect to the database
 * @listens {port} 3000
 */
app.listen(3000, () => {
  console.log("server started and running at: 3000"); // Log server start message
  connectToDB(); // Connect to the database
});
