const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const sql = require("mssql");

const app = express();
const port = process.env.PORT;

const config = {
  user: "root",
  password: "arjori02",
  server: "localhost",
  database: "library_geek",
  Port: 3306,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Book" },
  { link: "/authors", title: "Author" },
];
const bookRouter = require("./src/routes/bookRoutes")(nav);

app.use("/books", bookRouter);

app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../dist/index.html"));
  // sendFile(__dirname + "/src/view/index.html");
  res.render("index", {
    nav: [
      { link: "/books", title: "Books" },
      { link: "/authors", title: "Authors" },
    ],
    title: "Library Geek",
  });
});

app.listen(port, () => {
  debug("Open the Deadpool " + chalk.cyanBright(`${port}`));
  //   console.log(chalk.blue("Generating minified bundle for production..."));
});
