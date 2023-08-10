// Dotenv for development environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// TODO:
// Implement Authorization: like admin roles and such
// and some users can be authors who can add books
// adding authors and any books can only be for admins
// users can only view books

// What makes users special from guests is the ability to favorite books,
// mark them as read, wishlist, etc. Add that

// Check if sessions are working correctly

// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
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
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(flash());

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
app.use("/", authRouter);

// App start
app.listen(process.env.PORT || 4000, () =>
  console.log("Connected on port 4000")
);
