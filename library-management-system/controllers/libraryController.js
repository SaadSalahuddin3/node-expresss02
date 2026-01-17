const Book = require('../models/Book');
const Member = require('../models/Member');

// Add Book
exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Add Member
exports.addMember = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

// Borrow Book
exports.borrowBook = async (req, res, next) => {
  try {
    const { memberId, bookId } = req.body;

    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    if (book.status !== 'available') return res.status(400).json({ error: 'Book is already borrowed' });

    if (!book.borrowers.includes(memberId)) book.borrowers.push(memberId);
    if (!member.borrowedBooks.includes(bookId)) member.borrowedBooks.push(bookId);

    await book.save();
    await member.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (err) {
    next(err);
  }
};

// Return Book
exports.returnBook = async (req, res, next) => {
  try {
    const { memberId, bookId } = req.body;

    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ error: 'Book or Member not found' });

    book.borrowers = book.borrowers.filter(borrower => borrower.toString() !== memberId);
    member.borrowedBooks = member.borrowedBooks.filter(bookRef => bookRef.toString() !== bookId);

    await book.save();
    await member.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (err) {
    next(err);
  }
};

// Get all books borrowed by a member
exports.getMemberBorrowedBooks = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.memberId).populate('borrowedBooks');
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.status(200).json(member.borrowedBooks);
  } catch (err) {
    next(err);
  }
};

// Get all borrowers of a book
exports.getBookBorrowers = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId).populate('borrowers');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book.borrowers);
  } catch (err) {
    next(err);
  }
};

// Update book
exports.updateBook = async (req, res, next) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Remove this book from all members' borrowedBooks
    await Member.updateMany({ borrowedBooks: book._id }, { $pull: { borrowedBooks: book._id } });

    await book.remove();

    res.status(200).json({ message: 'Book deleted and cleaned up' });
  } catch (err) {
    next(err);
  }
};
