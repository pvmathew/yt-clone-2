const dotenv = require("dotenv").config();
const cors = require("cors");
const { static } = require("express");
const express = require("express");
const passport = require("./passport");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", ["POST", "PUT", "GET"]);
  next();
});

app.use(express.json());

passport.setup(app);

app.use(express.static("public"));

app.use("/auth", require("./auth"));
app.use("/file", require("./file"));
app.use("/videos", require("./videos"));

app.listen(process.env.PORT, () => {
  console.log("Server is now running.");
});
