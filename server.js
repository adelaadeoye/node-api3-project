const express = require("express");
const helmet = require("helmet");

const userRouter = require("./users/userRouter");
const postRouter =require('./posts/postRouter')
const server = express();

server.use(express.json());
server.use("/api/users", [ helmet(), logger, userRouter]);
server.use("/api/posts", [ helmet(), logger, postRouter]);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} at [${new Date().toISOString()}]`
  );

  next();
}

module.exports = server;
