import {
  buildCreateSlice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import githubApis from "../api/githubAPI";

const getAllRepos = createAsyncThunk(
  "github/getAllRepos",
  async (args, thunkApi) => {
    try {
      const resp = await githubApis.getAllRepos();
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ getAllRepos ~ error:", error);
    }
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("github/getAllRepos", (state, action) => {
      // code here
    });
  },
});
