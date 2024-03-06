
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
});

app.use("/api/books", require("./routers/bookRouter"));
app.use("/api/users", require("./routers/userRouter"));

server.listen(config.PORT, () => {
  logger.info(`Server is running on http://localhost:${config.PORT}`)
});