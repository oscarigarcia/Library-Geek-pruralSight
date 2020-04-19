const express = require("express");
const bookRouter = express.Router();

const router = (nav) => {
  const booksList = [{ title: "Dark night", genre: "blood" }];

  bookRouter.route("/").get((req, res) => {
    res.render("booksListView", {
      nav,
      title: "Library Geek",
      booksList,
    });
  });

  bookRouter.route("/:id").get((req, res) => {
    const { id } = req.params;
    res.render("bookView", {
      nav,
      title: "Library Geek",
      book: booksList[id],
    });
  });
  return bookRouter;
};

module.exports = router;
