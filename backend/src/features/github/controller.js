import { GithubRepository } from "./repository.js";

class GithubController {
  constructor() {
    this.githubRepository = new GithubRepository();
  }

  /**
   * Logs the user in using the provided GitHub token
   * @async
   * @function login
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  login = async (req, res, next) => {
    try {
      // const { githubClientId } = req.body;
      const { githubToken } = req.body; // Extract GitHub token from request body
      const user = await this.githubRepository.signin(githubToken);
      res.status(200).json({
        success: true,
        message: `User logged in as ${user}`,
        loggedInAs: user,
      }); // Send success response
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };

  /**
   * Retrieves all repositories of the logged-in user
   * @async
   * @function getAllRepos
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  getAllRepos = async (req, res, next) => {
    try {
      const repos = await this.githubRepository.getRepos();

      // get languages for each repo
      const reposDataNeeded = await Promise.all(
        repos.map(async (repo) => {
          const repoData = {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            description: repo.description,
            fork: repo.fork,
            created_at: repo.created_at,
            pushed_at: repo.pushed_at,
            topics: repo.topics,
            visibility: repo.visibility,
          };
          const languages = await this.githubRepository.getLanguages(repo.name);
          repoData.languages = languages;
          return repoData;
        })
      );
      res.status(200).json({
        success: true,
        repos: reposDataNeeded,
      }); // Send the list of repositories
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };

  /**
   * Retrieves a specific repository by its name
   * @async
   * @function getRepo
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  getRepo = async (req, res, next) => {
    try {
      const { repoName } = req.body; // Extract the repository name from request body
      const repo = await this.githubRepository.getSingleRepo(repoName);
      res
        .status(200)
        .json({ success: true, message: "Repo fetched successfully", repo }); // Send the repository data
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };

  /**
   * Retrieves the programming languages used in a specific repository
   * @async
   * @function getRepoLanguages
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  getRepoLanguages = async (req, res, next) => {
    try {
      const { repoName } = req.body; // Extract the repository name from request body
      const languages = await this.githubRepository.getLanguages(repoName);
      res.status(200).json({ success: true, languages }); // Send the list of languages used in the repository
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };

  /**
   * Retrieves the README file content for a given repository
   * @async
   * @function getReadme
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next middleware function
   */
  getReadme = async (req, res, next) => {
    try {
      const { repoName } = req.body; // Extract the repository name from request body
      const { content } =
        await this.githubRepository.getReadmeFielContentAndDecrypt(repoName); // Get and decrypt README content
      res.status(200).json({ success: true, readme: content }); // Send the README content
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  };

  // For later reference

  //   /* Custom made code used later when needed */
  //   /**
  //    * Updates the README file with new content
  //    * @async
  //    * @function updateReadme
  //    * @param {object} req - The request object
  //    * @param {object} res - The response object
  //    * @param {function} next - The next middleware function
  //    */
  //   updateReadme = async (req, res, next) => {
  //     try {
  //       const { repoName, content, sha } = req.body; // Extract repository name, content, and SHA from request body
  //       const response = await this.octokit.request(
  //         "PUT /repos/{owner}/{repo}/contents/{path}",
  //         {
  //           owner: this.#getUserName(), // Use the logged-in user's username as owner
  //           repo: repoName, // Use the provided repository name
  //           path: "README.md", // Specify README file path
  //           message: "Updating README", // Commit message
  //           content: Buffer.from(content).toString("base64"), // Convert content to base64 for storage
  //           sha, // Provide the current SHA for updating
  //           headers: {
  //             "X-GitHub-Api-Version": "2022-11-28", // Set the GitHub API version
  //           },
  //         }
  //       );
  //       res.status(200).json({
  //         success: true,
  //         message: "README updated successfully",
  //         response,
  //       }); // Send success response
  //     } catch (error) {
  //       next(error); // Pass the error to the next middleware
  //     }
  //   };
}

export default new GithubController(); // Export the controller for use in other modules
