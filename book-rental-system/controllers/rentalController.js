const User = require('../models/User');
const Book = require('../models/Book');

// Add a new user
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Add a new book
exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Rent a book
exports.rentBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: "User or Book not found" });

    // Prevent duplicates
    if (!user.rentedBooks.includes(bookId)) user.rentedBooks.push(bookId);
    if (!book.rentedBy.includes(userId)) book.rentedBy.push(userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book rented successfully" });
  } catch (err) {
    next(err);
  }
};

// Return a book
exports.returnBook = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) return res.status(404).json({ error: "User or Book not found" });

    user.rentedBooks = user.rentedBooks.filter(id => id.toString() !== bookId);
    book.rentedBy = book.rentedBy.filter(id => id.toString() !== userId);

    await user.save();
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    next(err);
  }
};

// Get all books rented by a user
exports.getUserRentals = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate('rentedBooks');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user.rentedBooks);
  } catch (err) {
    next(err);
  }
};

// Get all users who rented a book
exports.getBookRenters = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('rentedBy');
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book.rentedBy);
  } catch (err) {
    next(err);
  }
};

// Update book
exports.updateBook = async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    // Remove book from all users' rentedBooks
    await User.updateMany(
      { rentedBooks: book._id },
      { $pull: { rentedBooks: book._id } }
    );

    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).json({ message: "Book deleted and rentals updated" });
  } catch (err) {
    next(err);
  }
};
