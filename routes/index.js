const express = require("express");
const router = express.Router();
const booksController = require("../controllers/authors");

// GET / => Homepage
router.get("/", booksController.getBooksHomePage);

module.exports = router;
