import mongoose from "mongoose";

const githubSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  repos: {
    type: Object,
  },
});

export const githubModel = githubSchema.model();
