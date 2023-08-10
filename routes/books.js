const express = require("express");
const booksController = require("../controllers/books");
const authController = require("../controllers/auth");
const router = express.Router();

// GET / => Get all books
router.get("/", booksController.getAllBooks);

// GET /new => New book form
router.get(
  "/new",
  authController.isLoggedIn,
  authController.isAdmin,
  booksController.getNewBookForm
);

// POST / => New book creation
router.post(
  "/",
  authController.isLoggedIn,
  authController.isAdmin,
  booksController.postNewBookForm
);

// GET /:id => Show book
router.get("/:id", booksController.getShowBook);

// GET /:id/edit => Edit book form
router.get(
  "/:id/edit",
  authController.isLoggedIn,
  authController.isAdmin,
  booksController.getEditBookForm
);

// PUT /:id => Update book
router.put(
  "/:id",
  authController.isLoggedIn,
  authController.isAdmin,
  booksController.putEditBookForm
);

// DELETE /:id => Delete book
router.delete(
  "/:id",
  authController.isLoggedIn,
  authController.isAdmin,
  booksController.deleteBook
);

// POST /:id/add-to-fav => Add book to the user's favorites
router.post("/:id/add-to-fav", authController.isLoggedIn, booksController.postAddBookToFav)

module.exports = router;
