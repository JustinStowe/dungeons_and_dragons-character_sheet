/*
 *Dependencies
 */
require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");
const chalk = require("chalk");
require(".config/database");
const app = express();

/*
 *Middleware
 */
app.use(favicon(path.join(__dirname, "build", favicon.ico)));
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(require("./config/auth"));

/*
 * Controllers
 */

//app.use()

//catch-all
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/*
 *Port and listening
 */
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(
    chalk.green("Application is listening on port:"),
    chalk.bold.red(`${PORT}`),
    chalk.blue("embark with wisdom")
  );
});
