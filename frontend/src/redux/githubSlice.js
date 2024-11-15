import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import githubApis from "../api/githubAPI";

export const githubLogin = createAsyncThunk(
  "github/githubLogin",
  async ({ gitToken, authToken }, thunkApi) => {
    try {
      const resp = await githubApis.getGithhubAccess({
        githubToken: gitToken,
        authToken,
      });
      return resp.data;
    } catch (error) {
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
      .addCase(githubLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(githubLogin.fulfilled, (state, action) => {
        state.userId = action.payload.loggedInAs;
        state.isLoading = false;
      })
      .addCase(githubLogin.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllRepos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllRepos.fulfilled, (state, action) => {
        state.repos = action.payload.repos;
        state.isLoading = false;
      })
      .addCase(getAllRepos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isError = true;
      });
  },
});

export default githubSlice.reducer;

export const githubSelector = (state) => state.github;
