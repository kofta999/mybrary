// Dotenv for development environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// App instance
const app = express();

// App sets and middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(methodOverride('_method'));

// Database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

// Main routing
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

// App start
app.listen(process.env.PORT || 4000, () => console.log("Connected on port 4000"));
