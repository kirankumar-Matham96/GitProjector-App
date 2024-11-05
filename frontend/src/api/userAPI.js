import axios from "axios";

class UserApis {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  userSignup = async (userData) => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.post(URL, userData, options);
      return resp;
    } catch (error) {
      console.log("🚀 ~ UserApis ~ userSignup= ~ error:", error);
    }
  };

  userSignin = async (userData) => {
    try {
      const options = {
        headers: this.headers,
      };
      const resp = await axios.post(URL, userData, options);
      return resp;
    } catch (error) {
      console.log("🚀 ~ UserApis ~ userSignin= ~ error:", error);
    }
  };
}

export default new UserApis();
