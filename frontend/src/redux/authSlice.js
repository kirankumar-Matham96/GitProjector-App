import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../api/userAPI";

export const signup = createAsyncThunk(
  "auth/sigup",
  async (userData, thunkApi) => {
    try {
      const resp = await userAPI.userSignup(userData);
      return resp;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (userData, thunkApi) => {
    try {
      return await userAPI.userSignin(userData);
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userName: "",
  email: "",
  token: "",
  isLoading: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    signout: (state, action) => {
      state.isLoading = true;
      state.token = "";
      state.userName = "";
      state.email = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        alert("User added successfully!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      // signin
      .addCase(signin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        alert("User logged in successfully!");
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { setUser, signout } = authSlice.actions;
export const authSelector = (state) => state.auth;
