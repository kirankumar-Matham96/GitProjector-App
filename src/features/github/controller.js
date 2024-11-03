import { Octokit } from "octokit";
import { CustomError } from "../../utils/customError.js";

class GithubController {
  #userName;
  #octokit;

  #authenticate = (token = process.env.GITHUB_TOKEN) => {
    try {
      if (!token) {
        throw new CustomError("GitHub access token required", 400);
      }

      this.#octokit = new Octokit({
        auth: token,
      });
    } catch (error) {
      next(error);
    }
  };

  #setUserName = (loggedInUserName) => {
    this.#userName = loggedInUserName;
  };

  #getUserName = () => {
    return this.#userName;
  };

  login = async (req, res, next) => {
    try {
      this.#authenticate();
      const { data: user } = await this.#octokit.request("GET /user");
      this.#setUserName(user.login);
      res
        .status(200)
        .json({ success: true, message: `User logged in as ${user.login}` });
    } catch (error) {
      next(error);
    }
  };

  getAllRepos = async (req, res, next) => {
    try {
      const allRepos = await this.#octokit.request("GET /user/repos", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      res.status(200).json({ success: true, repos: allRepos.data });
    } catch (error) {
      next(error);
    }
  };

  getRepo = async (req, res, next) => {
    try {
      const { repoName } = req.body;
      const repo = await this.#octokit.request("GET /repos/{owner}/{repo}", {
        owner: this.#getUserName(),
        repo: repoName,
        headers: {
          accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      res
        .status(200)
        .json({ success: true, message: "Repo fetched successfully", repo });
    } catch (error) {
      next(error);
    }
  };

  getRepoLanguages = async (req, res, next) => {
    try {
      const { repoName } = req.body;
      const languages = await this.#octokit.request(
        "GET /repos/{owner}/{repo}/languages",
        {
          owner: this.#getUserName(),
          repo: repoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      res.status(200).json({ success: true, languages: languages.data });
    } catch (error) {
      next(error);
    }
  };

  #getReadmeFielContentAndDecrypt = async (repoName) => {
    const { data: readme } = await this.#octokit.request(
      "GET /repos/{owner}/{repo}/readme",
      {
        owner: this.#getUserName(),
        repo: repoName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const content = Buffer.from(readme.content, "base64").toString();
    return { content, sha: readme.sha, name: readme.name };
  };

  getReadme = async (req, res, next) => {
    try {
      const { repoName } = req.body;
      const { content } = await this.#getReadmeFielContentAndDecrypt(repoName);
      res.status(200).json({ success: true, readme: content });
    } catch (error) {
      next(error);
    }
  };

  updateReadme = async (req, res, next) => {
    try {
      // get the readme file
      const {
        repoName,
        newContent,
        commitMessage,
        committerName,
        comitterEmail,
      } = req.body;

      let { content, sha, name } = await this.#getReadmeFielContentAndDecrypt(
        repoName
      );
      // update the content
      content += newContent;

      // encrypt the content to update
      const updatedContent = Buffer.from(content, "utf8").toString("base64");

      // update the readme

      const resp = await this.#octokit.request(
        "PUT /repos/{owner}/{repo}/contents/{path}",
        {
          owner: this.#getUserName(),
          repo: repoName,
          path: name,
          message: commitMessage,
          committer: {
            name: committerName || this.#getUserName(),
            email: comitterEmail || "mathamkirankumar@gmial.com",
          },
          content: updatedContent,
          sha: sha,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      res
        .status(200)
        .json({ success: true, message: "readme updated successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export const githubController = new GithubController();
