const express = require("express");
const authorsController = require("../controllers/authors");
const authController = require("../controllers/auth");
const router = express.Router();

// GET / => Get all authors
router.get("/", authorsController.getAllAuthors);

// GET /new => New author form
router.get(
  "/new",
  authController.isLoggedIn,
  authController.isAdmin,
  authorsController.getNewAuthorForm
);

// POST / => New author creation
router.post(
  "/",
  authController.isLoggedIn,
  authController.isAdmin,
  authorsController.postNewAuthorForm
);

// GET /:id => Show an author
router.get("/:id", authorsController.getShowAuthor);

// GET /:id/edit => Edit an author
router.get(
  "/:id/edit",
  authController.isLoggedIn,
  authController.isAdmin,
  authorsController.getEditAuthorForm
);

// PUT /:id => Update an author
router.put(
  "/:id",
  authController.isLoggedIn,
  authController.isAdmin,
  authorsController.putEditAuthorForm
);

// DELETE /:id => Delete an author
router.delete(
  "/:id",
  authController.isLoggedIn,
  authController.isAdmin,
  authorsController.deleteAuthor
);

module.exports = router;
