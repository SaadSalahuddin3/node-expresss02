const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/libraryController');

router.post('/add-book', ctrl.addBook);
router.post('/add-member', ctrl.addMember);
router.post('/borrow-book', ctrl.borrowBook);
router.post('/return-book', ctrl.returnBook);
router.get('/member-borrowed-books/:memberId', ctrl.getMemberBorrowedBooks);
router.get('/book-borrowers/:bookId', ctrl.getBookBorrowers);
router.put('/update-book/:bookId', ctrl.updateBook);
router.delete('/delete-book/:bookId', ctrl.deleteBook);

module.exports = router;
