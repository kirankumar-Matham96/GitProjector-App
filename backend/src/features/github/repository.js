import { Octokit } from "octokit"; // Import Octokit for GitHub API integration
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file"; // Import the plugin for creating or updating text files
import { header } from "express-validator";
import { CustomError } from "../../utils/customError.js";
// import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device"; // Import OAuth device authentication strategy

export class GithubRepository {
  #userName; // Private variable to store the user's GitHub username
  octokit; // Octokit instance for making API requests

  /**
   * Authenticates the GitHub API client using a personal access token
   * @function #authenticate
   * @param {string} token - GitHub access token
   * @throws {CustomError} Throws an error if the access token is missing
   */
  #authenticate = (
    token = process.env.GITHUB_TOKEN
    // clientId = process.env.CLIENT_ID
  ) => {
    try {
      if (!token) {
        throw new CustomError("GitHub access token required", 400); // Throw error if token is not provided
      }

      // if (!clientId) {
      //   throw new CustomError("GitHub access token required", 400);
      // }

      // Setting up a plugin to octokit
      const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({
        userAgent: "Kiran Git Projector", // Set user agent for requests
      });

      this.octokit = new MyOctokit({
        // oauth client id approach (not suitable for this project)
        // authStrategy: createOAuthDeviceAuth,
        // auth: {
        //   clientType: "oauth-app",
        //   clientId: clientId,
        //   scopes: ["public_repo"],
        //   onVerification(verification) {
        //     console.log("Open %s", verification.verification_uri);
        //     console.log("Enter code: %s", verification.user_code);
        //   },
        // },
        auth: token, // Set authentication token
      });
    } catch (error) {
      throw error; // Pass the error to the next middleware for centralized error handling
    }
  };

  /**
   * Sets the GitHub username of the logged-in user
   * @function #setUserName
   * @param {string} loggedInUserName - The logged-in user's GitHub username
   */
  #setUserName = (loggedInUserName) => {
    this.#userName = loggedInUserName; // Store the username
  };

  /**
   * Retrieves the GitHub username of the logged-in user
   * @function #getUserName
   * @returns {string} The logged-in user's GitHub username
   */
  #getUserName = () => {
    return this.#userName; // Return the stored username
  };

  #decryptFileContent = (encryptedContent) => {
    return Buffer.from(encryptedContent, "base64").toString();
  };

  /**
   * Retrieves and decrypts the content of the README file for a given repository
   * @async
   * @function #getReadmeFielContentAndDecrypt
   * @param {string} repoName - The name of the repository
   * @returns {Promise<{ content: string, sha: string, name: string }>} The README file content and metadata
   */
  getReadmeFileContentAndDecrypt = async (repoName) => {
    try {
      const { data: readme } = await this.octokit.request(
        "GET /repos/{owner}/{repo}/readme",
        {
          owner: this.#getUserName(), // Use the logged-in user's username as owner
          repo: repoName, // Use the provided repository name
          headers: {
            "X-GitHub-Api-Version": "2022-11-28", // Set the GitHub API version
          },
        }
      );

      const content = this.#decryptFileContent(readme.content); // Decrypt the README content
      return { content, sha: readme.sha, name: readme.name }; // Return the content and metadata
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logs the user in using the provided GitHub token
   * @async
   * @function login
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  signin = async (token) => {
    try {
      this.#authenticate(token); // Authenticate the user
      const { data: user } = await this.octokit.request("GET /user"); // Fetch user data
      this.#setUserName(user.login); // Set the logged-in user's GitHub username
      return user.login;
    } catch (error) {
      throw error; // Pass the error to the next middleware
    }
  };

  getRepos = async () => {
    try {
      const allRepos = await this.octokit.paginate("GET /user/repos", {
        per_page: 10,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28", // Set the GitHub API version
        },
      });

      return allRepos;
    } catch (error) {
      throw error; // Pass the error to the next middleware
    }
  };

  getSingleRepo = async (repoName) => {
    try {
      const repo = await this.octokit.request("GET /repos/{owner}/{repo}", {
        owner: this.#getUserName(), // Use the logged-in user's username as owner
        repo: repoName, // Use the provided repository name
        headers: {
          accept: "application/vnd.github+json", // Set accept header for GitHub API
          "X-GitHub-Api-Version": "2022-11-28", // Set the GitHub API version
        },
      });

      return repo; // Send the repository data
    } catch (error) {
      throw error; // Pass the error to the next middleware
    }
  };

  getLanguages = async (repoName) => {
    try {
      const languages = await this.octokit.request(
        "GET /repos/{owner}/{repo}/languages",
        {
          owner: this.#getUserName(), // Use the logged-in user's username as owner
          repo: repoName, // Use the provided repository name
          headers: {
            "X-GitHub-Api-Version": "2022-11-28", // Set the GitHub API version
          },
        }
      );
      return languages.data;
    } catch (error) {
      throw error; // Pass the error to the next middleware
    }
  };

  /* get the repo content */
  getRepoContents = async (repoName, path = "") => {
    try {
      const contents = await this.octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: this.#getUserName(),
          repo: repoName,
          path,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (contents.data.type === "file") {
        contents.data.content = this.#decryptFileContent(contents.data.content);
      }

      return contents.data;
    } catch (error) {
      throw error;
    }
  };

  // get the issues
  getIssues = async (repoName) => {
    try {
      const issues = await this.octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: this.#getUserName(),
          repo: repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      return issues.data;
    } catch (error) {
      throw error;
    }
  };
}
