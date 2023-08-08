const express = require("express");
const booksController = require("../controllers/books");
const router = express.Router();

// GET / => Get all books
router.get("/", booksController.getAllBooks);

// GET /new => New book form
router.get("/new", booksController.getNewBookForm);

// POST / => New book creation
router.post("/", booksController.postNewBookForm);

// GET /:id => Show book
router.get("/:id", booksController.getShowBook);

// GET /:id/edit => Edit book form
router.get("/:id/edit", booksController.getEditBookForm);

// PUT /:id => Update book
router.put("/:id", booksController.putEditBookForm);

// DELETE /:id => Delete book
router.delete("/:id", booksController.deleteBook);

module.exports = router;
