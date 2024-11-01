import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res
    .status(200)
    .json({ success: true, message: "Welcome to GitProjector API" })
);

app.listen(3000, () => {
    console.log("server started and running at: 3000");
})