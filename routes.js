const express = require("express");
const app = express();
app.use(express.json());

const indexRouter = require("./routers/index.js");
const gamesRouter = require("./routers/game.js");
const playersRouter = require("./routers/players.js");

app.use("/", indexRouter);

app.use("/games", gamesRouter);

app.use("/players", playersRouter);

module.exports = app;