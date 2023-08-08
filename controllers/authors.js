const Author = require("../models/author");
const Book = require("../models/book");

// Get all authors
exports.getAllAuthors = async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
};

// New author form
exports.getNewAuthorForm = (req, res) => {
  res.render("authors/new", { author: new Author() });
};

// New author creation
exports.postNewAuthorForm = async (req, res) => {
  const author = new Author({
    name: req.body.name,
    age: req.body.age
  });

  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author"
    });
  }
};

// Show an author
exports.getShowAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(6).exec();
    res.render(`authors/show`, { author: author, booksByAuthor: books });
  } catch {
    res.redirect("/");
  }
};

// Edit an author
exports.getEditAuthorForm = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect("/authors");
  }
};

// Update an author
exports.putEditAuthorForm = async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    author.age = req.body.age;
    await author.save();
    res.redirect(`/authors/${req.params.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating Author"
      });
    }
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  let author;
  try {
    author = Author.find({ _id: req.params.id });
    const query = author.getFilter();
    await Author.deleteOne({ _id: query._id });
    res.redirect("/authors");
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${req.params.id}`);
    }
  }
};
