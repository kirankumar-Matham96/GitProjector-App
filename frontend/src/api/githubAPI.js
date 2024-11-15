import axios from "axios";

class GithubApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };

    this.URL = import.meta.env.VITE_URL;
  }

  //   authenticate user with github token
  getGithhubAccess = async ({ githubToken, authToken }) => {
    try {
      this.headers["Authorization"] = authToken;
      const options = {
        headers: this.headers,
        data: JSON.stringify(githubToken),
      };
      const resp = await axios.get(`${this.URL}/repos/login`, options);
      console.log(
        "🚀 ~ GithubApis ~ getGithhubAccess= ~ resp.data:",
        resp.data
      );
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ GithubApis ~ getGithhubAccess= ~ error:", error);
    }
  };

  getAllRepos = async () => {
    try {
      const options = {
        headers: this.headers,
      };

      console.log("🚀 ~ GithubApis ~ getAllRepos= ~ options:", options);

      const resp = await axios.get(`${this.URL}/repos/all`, options);

      console.log("🚀 ~ GithubApis ~ getAllRepos= ~ resp:", resp);
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ GithubApis ~ getAllRepos= ~ error:", error);
    }
  };
}

export default new GithubApis();
