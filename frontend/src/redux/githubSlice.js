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

const applyAllFilters = (state) => {
  let results = [...state.repos];

  // Search filter
  if (state.activeFilters.searchTerm) {
    const searchTerm = state.activeFilters.searchTerm.toLowerCase().trim();
    results = results.filter((repo) =>
      repo.name?.toLowerCase().includes(searchTerm)
    );
  }

  // Facet filter
  results = results.filter((repo) => {
    return state.activeFilters.facets.every((facet) => {
      if (!facet.options.length) return true;
      const repoField = repo[facet.title.toLowerCase()];
      if (!repoField) return false;
      return facet.options.some((option) =>
        repoField
          .map((field) => field.toLowerCase())
          .includes(option.toLowerCase())
      );
    });
  });

  // Sort filter
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 0 : date;
  };

  const sortOptions = {
    createdDateAsc: (a, b) => parseDate(a.created_at) - parseDate(b.created_at),
    createdDateDesc: (a, b) =>
      parseDate(b.created_at) - parseDate(a.created_at),
    updatedDateAsc: (a, b) => parseDate(a.pushed_at) - parseDate(b.pushed_at),
    updatedDateDesc: (a, b) => parseDate(b.pushed_at) - parseDate(a.pushed_at),
  };

  const sortFunc = sortOptions[state.activeFilters.sortBy];
  if (sortFunc) {
    results = results.sort(sortFunc);
  }

  state.filteredRepos = results;

  // pagination
  const startIndex = (state.currentPage - 1) * state.perPage;
  const endIndex = startIndex + state.perPage;
  state.paginatedRepos = results.slice(startIndex, endIndex);
};

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
    facets: [],
    sortBy: "",
  },
};

const githubSlice = createSlice({
  name: "github",
  initialState: INITIAL_STATE,
  reducers: {
    searchFilter: (state, action) => {
      state.activeFilters.searchTerm = action.payload?.toLowerCase().trim();

      applyAllFilters(state);
    },
    sortByDate: (state, action) => {
      state.activeFilters.sortBy = action.payload;

      applyAllFilters(state);
    },
    facetFilter: (state, action) => {
      const foundFacetIndex = state.activeFilters.facets.findIndex(
        (item) => item.title === action.payload.title
      );

      // Update or replace facet options
      if (foundFacetIndex === -1) {
        state.activeFilters.facets.push(action.payload);
      } else {
        state.activeFilters.facets[foundFacetIndex].options =
          action.payload.options;
      }

      applyAllFilters(state);
    },

    paginationFilter: (state, action) => {
      const { page, perPage } = action.payload;
      state.currentPage = page || state.currentPage;
      state.perPage = perPage || state.perPage;
      applyAllFilters(state);
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

        state.currentPage = 1; // Reset to page 1
        applyAllFilters(state); // Apply all filters including pagination
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

export const { sortByDate, searchFilter, facetFilter, paginationFilter } = githubSlice.actions;

export const githubSelector = (state) => state.github;
