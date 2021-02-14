const dotenv = require("dotenv").config();
// const cors = require("cors");
const { static } = require("express");
const express = require("express");
const passport = require("./passport");
// const app = express();

const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  // Priority serve any static files.
  // app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  passport.setup(app);

  app.use(express.static(__dirname + "/public"));
  // app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.use(express.json());

  // Answer API requests.
  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.use("/auth", require("./auth"));
  app.use("/file", require("./file"));
  app.use("/videos", require("./videos"));

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", ["http://localhost:3000"]);
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", ["POST", "PUT", "GET"]);
//   next();
// });

// app.use(express.json());

// passport.setup(app);

// app.use(express.static("public"));

// app.use("/auth", require("./auth"));
// app.use("/file", require("./file"));
// app.use("/videos", require("./videos"));

// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server is now running.");
// });
