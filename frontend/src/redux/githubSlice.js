import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import githubApis from "../api/githubAPI";

const saveStateToLocalStorage = (state) => {
  try {
    localStorage.setItem("globalState", JSON.stringify(state));
  } catch (error) {
    console.log(`Error saving the data to local storage: ${error}`);
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("globalState");
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(`Failed to load the data from local storage: ${error}`);
  }
};

export const githubLogin = createAsyncThunk(
  "github/githubLogin",
  async ({ gitToken, authToken }, thunkApi) => {
    try {
      const resp = await githubApis.getGithubAccess({
        githubToken: gitToken,
        authToken,
      });
      return resp;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllRepos = createAsyncThunk(
  "github/getAllRepos",
  async (args, thunkApi) => {
    try {
      const repos = JSON.parse(localStorage.getItem("repos"));
      if (repos && repos.length > 0) return repos;
      const resp = await githubApis.getAllRepos();

      localStorage.setItem("repos", JSON.stringify(resp.repos));
      return resp;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getReadme = createAsyncThunk(
  "github/getReadme",
  async (repoName, thunkApi) => {
    try {
      const resp = await githubApis.getReadme(repoName);
      if (resp?.readme) {
        return resp.readme;
      }
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getIssues = createAsyncThunk(
  "github/getIssues",
  async (repoName, thunkApi) => {
    try {
      const resp = await githubApis.getIssues(repoName);
      return resp.issues;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getContents = createAsyncThunk(
  "github/getContents",
  async ({ repoName, path }, thunkApi) => {
    try {
      const resp = await githubApis.getRepoContents(repoName, path);
      return resp.contents;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCommits = createAsyncThunk(
  "github/getCommits",
  async (repoName, thunkApi) => {
    try {
      const resp = await githubApis.getRepoCommits(repoName);
      return resp.commits;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
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

      return facet.options.some((option) => {
        const optionLower = option.toLowerCase();

        if (Array.isArray(repoField)) {
          // Handle array fields
          return repoField.some((field) => field.toLowerCase() === optionLower);
        } else if (typeof repoField === "string") {
          // Handle string fields
          return repoField.toLowerCase() === optionLower;
        } else if (typeof repoField === "object" && repoField !== null) {
          // Handle object fields (like { java: 12563, HTML: 85462 })
          return Object.keys(repoField).some(
            (key) => key.toLowerCase() === optionLower
          );
        }

        return false; // Exclude for unsupported types
      });
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

const INITIAL_STATE = loadStateFromLocalStorage() || {
  accessToken: "",
  userId: "",
  repos: [],
  readmeContent: "",
  filteredRepos: [],
  paginatedRepos: [],
  issues: [],
  commits: [],
  repoContents: [],
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
  currentTab: "readme",
};

const githubSlice = createSlice({
  name: "github",
  initialState: INITIAL_STATE,
  reducers: {
    searchFilter: (state, action) => {
      state.activeFilters.searchTerm = action.payload?.toLowerCase().trim();

      applyAllFilters(state);
      saveStateToLocalStorage(state);
    },
    sortByDate: (state, action) => {
      state.activeFilters.sortBy = action.payload;

      applyAllFilters(state);
      saveStateToLocalStorage(state);
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
      saveStateToLocalStorage(state);
    },
    paginationFilter: (state, action) => {
      const { page, perPage } = action.payload;
      state.currentPage = page || state.currentPage;
      state.perPage = perPage || state.perPage;
      applyAllFilters(state);
      saveStateToLocalStorage(state);
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
      saveStateToLocalStorage(state);
    },
    clearContents: (state) => {
      console.log("🚀 ~ state: clearContent is called");
      state.repoContents = [];
      localStorage.removeItem("readmeContent");
      saveStateToLocalStorage(state);
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

        state.currentPage = 1;
        applyAllFilters(state); // Apply all filters including pagination
        state.isLoading = false;
      })
      .addCase(getAllRepos.rejected, (state, action) => {
        state.error = action.payload;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getReadme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReadme.fulfilled, (state, action) => {
        state.readmeContent = action.payload;

        state.isLoading = false;
      })
      .addCase(getReadme.rejected, (state, action) => {
        state.error = action.payload;
        state.readmeContent = null;
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.issues = action.payload;
        state.isLoading = false;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.repoContents = action.payload;
        state.isLoading = false;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getCommits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommits.fulfilled, (state, action) => {
        const sortedCommits = action.payload.sort((cmt1, cmt2) => {
          return (
            new Date(cmt2.commit.committer.date) -
            new Date(cmt1.commit.committer.date)
          );
        });
        state.commits = sortedCommits;
        state.isLoading = false;
      })
      .addCase(getCommits.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default githubSlice.reducer;

export const {
  sortByDate,
  searchFilter,
  facetFilter,
  paginationFilter,
  setCurrentTab,
  clearContents,
} = githubSlice.actions;

export const githubSelector = (state) => state.github;
