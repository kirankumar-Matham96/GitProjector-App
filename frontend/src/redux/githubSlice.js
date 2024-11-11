import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import githubApis from "../api/githubAPI";

export const githubLogin = createAsyncThunk(
  "github/githubLogin",
  async ({ gitToken, authToken }, thunkApi) => {
    console.log("🚀 ~ gitToken, authToken:", gitToken, " & ", authToken);
    try {
      const resp = await githubApis.getGithhubAccess({
        githubToken: gitToken,
        authToken,
      });
      console.log("🚀 ~ githubLogin ~ resp.data:", resp.data);
    } catch (error) {
      console.log("🚀 ~ githubLogin ~ error:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);
export const getAllRepos = createAsyncThunk(
  "github/getAllRepos",
  async (args, thunkApi) => {
    try {
      const resp = await githubApis.getAllRepos();
      return resp.data;
    } catch (error) {
      console.log("🚀 ~ getAllRepos ~ error:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  accessToken: "",
  userId: "",
  repos: [],
  filteredRepos: [],
  isLoading: false,
  isError: false,
  error: null,
};

const githubSlice = createSlice({
  name: "github",
  initialState: INITIAL_STATE,
  reducers: {
    sortByDate: (state, action) => {},
    searchFilter: (state, action) => {},
    facetFilter: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRepos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllRepos.fulfilled, (state, action) => {
        state.repos = action.payload.repos;
        console.log(
          "🚀 ~ .addCase ~ fulfilled ~ action.payload:",
          action.payload
        );
        console.log(
          "🚀 ~ .addCase ~ fulfilled ~ action.payload.repos:",
          action.payload.repos
        );
        state.isLoading = false;
      })
      .addCase(getAllRepos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(
          "🚀 ~ .addCase ~ rejected ~ action.payload:",
          action.payload
        );
        state.isError = true;
      });
  },
});

export default githubSlice.reducer;

export const githubSelector = (state) => state.github;
