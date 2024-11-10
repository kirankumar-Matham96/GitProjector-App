import axios from "axios";

class GithubApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };

    this.URL = import.meta.env.VITE_URL;
  }

  //   authenticate user with github token
  getGithhubAccess = async (data) => {
    try {
      const options = {
        headers: this.headers,
        data: json.stringify(data),
      };
      const resp = await axios.post(`${this.URL}/repos/login`, options);
      console.log("🚀 ~ UserApis ~ getGithhubAccess= ~ resp.data:", resp.data);
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ UserApis ~ getGithhubAccess= ~ error:", error);
    }
  };

  getAllRepos = async () => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.post(`${this.URL}/repos/all`, userData, options);
      console.log("🚀 ~ UserApis ~ getAllRepos= ~ resp.data:", resp.data);
      return resp.data;
    } catch (error) {}
  };
}

export default new GithubApis();
