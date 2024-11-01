import "dotenv/config";
import express from "express";
import { connectToDB } from "./src/config/mongoose.config.js";
import { userRouter } from "./src/features/users/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.get("/", (req, res) =>
  res
    .status(200)
    .json({ success: true, message: "Welcome to GitProjector API" })
);

app.listen(3000, () => {
  console.log("server started and running at: 3000");
  connectToDB();
});
