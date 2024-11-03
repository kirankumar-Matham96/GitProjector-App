import { Octokit } from "octokit";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import { CustomError } from "../../utils/customError.js";

class GithubController {
  #userName;
  octokit;

  #authenticate = (
    token = process.env.GITHUB_TOKEN,
    clientId = process.env.CLIENT_ID
  ) => {
    try {
      // if (!token) {
      //   throw new CustomError("GitHub access token required", 400);
      // }

      if (!clientId) {
        throw new CustomError("GitHub access token required", 400);
      }

      // setting up a plugin to octokit
      const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({
        userAgent: "Kiran Git Projector",
      });

      this.octokit = new MyOctokit({
        authStrategy: createOAuthDeviceAuth,
        auth: {
          clientType: "oauth-app",
          clientId: clientId,
          scopes: ["public_repo"],
          onVerification(verification) {
            // verification example
            // {
            //   device_code: "3584d83530557fdd1f46af8289938c8ef79f9dc5",
            //   user_code: "WDJB-MJHT",
            //   verification_uri: "https://github.com/login/device",
            //   expires_in: 900,
            //   interval: 5,
            // };

            console.log("Open %s", verification.verification_uri);
            console.log("Enter code: %s", verification.user_code);
          },
        },
        // auth: token,
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
      const { githubToken, githubClientId } = req.body;
      this.#authenticate(githubToken, githubClientId);
      const { data: user } = await this.octokit.request("GET /user");
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
      const allRepos = await this.octokit.request("GET /user/repos", {
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
      const repo = await this.octokit.request("GET /repos/{owner}/{repo}", {
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
      const languages = await this.octokit.request(
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
    const { data: readme } = await this.octokit.request(
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

  /* Custom made code used later when needed */
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

      const resp = await this.octokit.request(
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

  #updateContent = (type, oldContent, newContent) => {
    if (type.toLowerCase() === "replace") {
      return newContent;
    }

    return oldContent + newContent;
  };

  updateReadmeWithPlugin = async (req, res, next) => {
    try {
      const {
        repoName,
        newContent,
        commitMessage,
        committerName,
        comitterEmail,
        typeOfUpdate,
      } = req.body;

      const resp = await this.octokit.createOrUpdateTextFile({
        owner: this.#getUserName(),
        repo: repoName,
        path: "readme.md",
        message: commitMessage,
        committer: {
          name: committerName || this.#getUserName(),
          email: comitterEmail || "mathamkirankumar@gmial.com",
        },
        content: ({ content }) =>
          this.#updateContent(typeOfUpdate, content, newContent),
      });
      res
        .status(200)
        .json({ success: true, message: "File upadeted successfully" });
    } catch (error) {
      const { data: issue } = await this.octokit
        .request("POST /repos/{owner}/{repo}/issues", {
          owner: this.#getUserName(),
          repo: repoName,
          // repo: "MyFirstRepo",
          title: "Request to you",
          body: "Some user is asking for the permission to use your app",
        })
        .catch((err) => {
          console.log(
            "🚀 ~ GithubController ~ updateReadmeWithPlugin= ~ err:",
            err
          );
        });
      console.log(
        "🚀 ~ GithubController ~ updateReadmeWithPlugin= ~ issue:",
        issue.html_url
      );
    }
  };
}

export const githubController = new GithubController();
