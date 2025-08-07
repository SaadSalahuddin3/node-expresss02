const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/rentalController');

router.post('/add-user', ctrl.addUser);
router.post('/add-book', ctrl.addBook);
router.post('/rent-book', ctrl.rentBook);
router.post('/return-book', ctrl.returnBook);
router.get('/user-rentals/:userId', ctrl.getUserRentals);
router.get('/book-renters/:bookId', ctrl.getBookRenters);
router.put('/update-book/:bookId', ctrl.updateBook);
router.delete('/delete-book/:bookId', ctrl.deleteBook);

module.exports = router;
