const express = require("express");
const authorsController = require("../controllers/authors");
const router = express.Router();

// GET / => Get all authors
router.get("/", authorsController.getAllAuthors);

// GET /new => New author form
router.get("/new", authorsController.getNewAuthorForm);

// POST / => New author creation
router.post("/", authorsController.postNewAuthorForm);

// GET /:id => Show an author
router.get("/:id", authorsController.getShowAuthor);

// GET /:id/edit => Edit an author
router.get("/:id/edit", authorsController.getEditAuthorForm);

// PUT /:id => Update an author
router.put("/:id", authorsController.putEditAuthorForm);

// DELETE /:id => Delete an author
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
