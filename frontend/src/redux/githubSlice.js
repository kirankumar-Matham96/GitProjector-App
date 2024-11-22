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
      return resp;
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
      return resp;
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
  paginatedRepos: [],
  isLoading: false,
  isError: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  activeFilters: {
    searchTerm: "",
    facets: {},
    sortBy: "dateAsc",
  },
};

const githubSlice = createSlice({
  name: "github",
  initialState: INITIAL_STATE,
  reducers: {
    searchFilter: (state, action) => {
      const searchTerm = action.payload?.toLowerCase().trim();
      state.activeFilters.searchTerm = searchTerm;
      state.filteredRepos = state.repos.filter((repo) => {
        if (repo.name?.toLowerCase().includes(searchTerm)) {
          return repo;
        }
      });
    },
    sortByDate: (state, action) => {
      state.activeFilters.sortBy = action.payload;

      const parseDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 0 : date; // Fallback to epoch time if date is invalid
      };

      const sortOptions = {
        createdDateAsc: (a, b) =>
          parseDate(a.created_at) - parseDate(b.created_at),
        createdDateDesc: (a, b) =>
          parseDate(b.created_at) - parseDate(a.created_at),
        updatedDateAsc: (a, b) =>
          parseDate(a.pushed_at) - parseDate(b.pushed_at),
        updatedDateDesc: (a, b) =>
          parseDate(b.pushed_at) - parseDate(a.pushed_at),
      };

      // Create a new array with sorted results
      const sortedRepos = [...state.filteredRepos].sort(
        sortOptions[state.activeFilters.sortBy] || (() => 0)
      );

      state.filteredRepos = sortedRepos;
      state.paginatedRepos = state.filteredRepos.slice(
        (state.currentPage - 1) * state.perPage,
        (state.currentPage - 1) * state.perPage + state.perPage
      );
    },
    facetFilter: (state, action) => {},
    paginationFilter: (state, action) => {
      const { page, perPage } = action.payload;
      state.currentPage = page;
      state.perPage = perPage;
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      state.paginatedRepos = state.filteredRepos.slice(startIndex, endIndex);
    },
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
        state.filteredRepos = action.payload.repos;
        state.paginatedRepos = action.payload.repos.slice(
          state.currentPage - 1,
          state.perPage
        );
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

export const { sortByDate, searchFilter, facetFilter, paginationFilter } =
  githubSlice.actions;

export const githubSelector = (state) => state.github;
