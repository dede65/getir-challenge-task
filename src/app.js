const express = require("express");
require("./db/mongoose");

const recordRouter = require("./routers/recordRouter");

const app = express();

// Add express.json() to parse the request body)
app.use(express.json());
app.use("/", recordRouter);

app.get("/", (req, res) => res.send("Getir Task Challenge"));

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: `Can't ${req.method} ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
