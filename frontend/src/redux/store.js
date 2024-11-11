import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import githubReducer from "./githubSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    github: githubReducer,
  },
});
