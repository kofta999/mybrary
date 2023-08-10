const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// Get all books
exports.getAllBooks = async (req, res) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
};

// New book form
exports.getNewBookForm = async (req, res) => {
  renderNewPage(res, new Book());
};

// New book creation
exports.postNewBookForm = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  });

  try {
    saveCover(book, req.body.cover);
    const newBook = await book.save();
    res.redirect(`books/${newBook.id}`);
  } catch {
    renderNewPage(res, book, true);
  }
};

// Show book
exports.getShowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author").exec();
    res.render("books/show", { book: book });
  } catch {
    res.redirect("/");
  }
};

// Edit book form
exports.getEditBookForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderEditPage(res, book);
  } catch {
    res.redirect("/");
  }
};

// Update book
exports.putEditBookForm = async (req, res) => {
  let book;

  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.publishDate = new Date(req.body.publishDate);
    book.author = req.body.author;
    book.pageCount = req.body.pageCount;
    book.description = req.body.description;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book != null) {
      renderEditPage(res, book, true);
    } else {
      res.redirect("/");
    }
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.deleteOne();
    res.redirect("/books");
  } catch {
    if (book != null) {
      res.render("books/show", {
        book: book,
        errorMessage: "Could not remove book"
      });
    } else {
      res.redirect("/");
    }
  }
};

exports.getBooksHomePage = async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
  res.render("index", { books: books });
};

/**@type {import("express").RequestHandler} */
exports.getShowFavBooks = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "favoriteBooks"
  });
  res.render("books/favorites", { books: user.favoriteBooks });
};

exports.postAddBookToFav = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const bookId = req.params.id;
    if (user.favoriteBooks.includes(bookId)) {
      console.log("Book is already in favorites");
    } else {
      user.favoriteBooks.push(bookId);
      await user.save();
      console.log("Added book to favorites");
    }
    res.redirect(`/books/${bookId}`);
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
};

// Helper Functions

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, "new", hasError);
}

async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, "edit", hasError);
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: book
    };
    if (hasError) {
      if (form == "new") params.errorMessage = "Error creating book";
      else if (form == "edit") params.errorMessage = "Error updating book";
    }
    res.render(`books/${form}`, params);
  } catch {
    res.redirect("books");
  }
}
