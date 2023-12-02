import Book from "../model/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ data: books, success: true, get: true });
  } catch (err) {
    console.log("Error when getting all books: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, get: false });
  }
};

export const getByIdBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book is not found", success: false });
    }
    res.status(200).json({ data: book, success: true, get: true });
  } catch (err) {
    console.log("Error when getting book by ID: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, get: false });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, description, page, author } = req.body;
    const image = req.file ? req.file.filename : null;
    const book = await Book.create({
      title,
      description,
      page,
      author,
      image,
    });
    res.status(201).json({ data: book, success: true, created: true });
  } catch (err) {
    console.log("Error when creating Book: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, created: false });
  }
};

export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const { title, description, page, author } = req.body;
    const image = req.file ? req.file.filename : null;

    const updated = await Book.update(
      { title, description, page, author, image },
      { where: { id: bookId } }
    );
    if (updated[0]) {
      const updatedBook = await Book.findByPk(bookId);
      res.status(200).json({ data: updatedBook, success: true, updated: true });
    } else {
      return res.status(404).json({ msg: "Book is not found", success: false });
    }
  } catch (err) {
    console.log("Error when updating book: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, updated: false });
  }
};

export const deleteAllBooks = async (req, res) => {
  try {
    await Book.destroy({ truncate: true });
    res.status(204).json({
      msg: "All Books are deleted successfully",
      success: true,
      deleted: true,
    });
  } catch (err) {
    console.log("Error when deleting all books: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, deleted: false });
  }
};

export const deleteByIdBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deleted = await Book.destroy({ where: { id: bookId } });
    if (deleted) {
      res.status(204).json({
        msg: "Book is deleted successfully",
        success: true,
        deleted: true,
      });
    } else {
      return res
        .status(404)
        .json({ msg: "Book is not found", success: false, deleted: false });
    }
  } catch (err) {
    console.log("Error when deleting book: ", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error", success: false, deleted: false });
  }
};
