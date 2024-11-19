import axios from "axios";

class UserApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };

    this.URL = import.meta.env.VITE_URL;
  }

  userSignup = async (userData) => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.post(`${this.URL}/user/add`, userData, options);
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ UserApis ~ userSignup= ~ error:", error);
    }
  };

  userSignin = async (userData) => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.post(
        `${this.URL}/user/signin`,
        userData,
        options
      );
      // JWT.decode();
      console.log("🚀 ~ UserApis ~ userSignin= ~ resp.data:", resp.data);
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ UserApis ~ userSignin= ~ error:", error);
    }
  };
}

export default new UserApis();
