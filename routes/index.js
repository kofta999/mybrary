const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books");

// GET / => Homepage
router.get("/", booksController.getBooksHomePage);

module.exports = router;
