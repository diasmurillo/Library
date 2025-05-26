const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: "Invalid book ID" });
  }
};

exports.addReview = async (req, res) => {
  const { comment, rating } = req.body;
  const book = await Book.findById(req.params.id);
  book.reviews.push({ user: req.user.id, comment, rating });
  await book.save();
  res.json(book);
};
