const mongoose = require("mongoose");
const chalk = require("chalk");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", function () {
  console.log(
    chalk.green("Connected to MongoDB @"),
    chalk.red(`${db.host}:${db.port}`)
  );
});

db.on("error", function (err) {
  console.log(chalk.bold.red("Mongodb error:"), chalk.redBright(`${err}`));
});
