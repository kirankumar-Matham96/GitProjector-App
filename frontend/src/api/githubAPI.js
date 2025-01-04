import axios from "axios";

class GithubApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };

    this.URL = import.meta.env.VITE_DEV_URL;
    // this.URL = import.meta.env.VITE_PRODUCTION_URL;
  }

  //   authenticate user with github token
  getGithubAccess = async ({ githubToken, authToken }) => {
    try {
      this.headers["Authorization"] = authToken;
      const options = {
        headers: this.headers,
        data: JSON.stringify(githubToken),
      };
      const resp = await axios.get(`${this.URL}/repos/login`, options);
      return resp.data;
    } catch (error) {
      throw error;
    }
  };

  getAllRepos = async () => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.get(`${this.URL}/repos/all`, options);
      return resp.data;
    } catch (error) {
      throw error;
    }
  };

  getReadme = async (name) => {
    try {
      const options = {
        headers: this.headers,
        params: { repoName: name },
      };
      const resp = await axios.get(`${this.URL}/repos/readme`, options);
      return resp.data;
    } catch (error) {
      if (!error.response.data.success) return null;
      throw error;
    }
  };

  getIssues = async (name) => {
    try {
      const options = {
        headers: this.headers,
        params: { repoName: name },
      };
      const resp = await axios.get(`${this.URL}/repos/issues`, options);
      return resp.data;
    } catch (error) {
      throw error;
    }
  };

  getRepoContents = async (name, path = "") => {
    try {
      const options = {
        headers: this.headers,
        params: { repoName: name, path },
      };

      const resp = await axios.get(`${this.URL}/repos/contents`, options);
      return resp.data;
    } catch (error) {
      throw error;
    }
  };
}

export default new GithubApis();
