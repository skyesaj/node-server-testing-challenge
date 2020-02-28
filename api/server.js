const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

// router

const userRouter = require("../routers/userRouter");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  return res.send("Welcome to the API");
});

module.exports = server;
