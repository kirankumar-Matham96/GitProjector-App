import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/sigup",
  async (userData, thunkApi) => {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(URL, userData, options);
      console.log("🚀 ~ signup ~ resp:", resp);
      return resp;
    } catch (error) {
      console.log("🚀 ~ signup ~ error:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkApi) => {
    try {
      const data = { email, password };
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const resp = await axios.post(URL, data, options);
      console.log("🚀 ~ signin ~ resp:", resp);
      return resp;
    } catch (error) {
      console.log("🚀 ~ signin ~ error:", error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userName: "",
  email: "",
  token: "",
  isSucess: false,
  loading: false,
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state, action) => {
      state.loading = true;
      state.token = "";
      state.userName = "";
      state.email = "";
      state.isSucess = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isSucess = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      // signin
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isSucess = true;
        state.token = action.payload.token;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { signout } = authSlice.actions;
export const authSelector = (state) => state.authSlice.reducer;
