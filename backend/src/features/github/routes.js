import { Router } from "express"; // Import Router from express
import githubController from "./controller.js"; // Import the GitHub controller
import { get } from "mongoose";

export const gitRouter = Router(); // Create a new router instance

/**
 * Route for getting a specific repository by its name
 * @route GET /
 * @group Repositories - Operations about repositories
 * @param {string} repoName.query.required - The name of the repository
 * @returns {object} 200 - An object containing the repository details
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/", githubController.getRepo); // Route to get a specific repository

/**
 * Route for retrieving all repositories of the logged-in user
 * @route GET /all
 * @group Repositories - Operations about repositories
 * @returns {object} 200 - An array of repositories
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/all", githubController.getAllRepos); // Route to get all repositories

/**
 * Route for logging in a user with a GitHub token
 * @route GET /login
 * @group Authentication - Operations about user authentication
 * @param {string} githubToken.body.required - The GitHub access token
 * @returns {object} 200 - Success message and user info
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/login", githubController.login); // Route for user login

/**
 * Route for retrieving programming languages used in a specific repository
 * @route GET /languages
 * @group Repositories - Operations about repositories
 * @param {string} repoName.body.required - The name of the repository
 * @returns {object} 200 - An object containing languages used in the repository
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/languages", githubController.getRepoLanguages); // Route to get repository languages

/**
 * Route for retrieving the README file content of a specific repository
 * @route GET /readme
 * @group Repositories - Operations about repositories
 * @param {string} repoName.body.required - The name of the repository
 * @returns {object} 200 - An object containing the README content
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/readme", githubController.getReadme); // Route to get README content

/**
 * Route for getting all the issues of a specific repository
 * @route GET /issues
 * @group Repositories - Operations about repositories
 * @param {string} repoName.body.required - The name of the repository
 * @returns {object} 200 - Success message after getting the issues
 * @returns {Error}  400 - Bad request error
 */
gitRouter.get("/issues", githubController.getAllIssues);

/**
 * Route for updating the README file of a specific repository
 * @route PUT /readme
 * @group Repositories - Operations about repositories
 * @param {string} repoName.body.required - The name of the repository
 * @param {string} content.body.required - The new content for the README file
 * @param {string} sha.body.required - The current SHA of the README file
 * @returns {object} 200 - Success message after updating README
 * @returns {Error}  400 - Bad request error
 */
// gitRouter.put("/readme", githubController.updateReadme); // Route to update README content

/**
 * Route for updating the README file with a plugin (currently commented out)
 * @route PUT /readmeWithPlugin
 * @group Repositories - Operations about repositories
 * @param {string} repoName.body.required - The name of the repository
 * @param {string} content.body.required - The new content for the README file
 * @param {string} sha.body.required - The current SHA of the README file
 * @returns {object} 200 - Success message after updating README
 * @returns {Error}  400 - Bad request error
 */
// gitRouter.put("/readmeWithPlugin", githubController.updateReadmeWithPlugin); // Route to update README content with plugin (commented out for future use)
