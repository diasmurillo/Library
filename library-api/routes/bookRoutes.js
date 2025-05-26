const express = require('express');
const router = express.Router();
const { createBook, updateBook, deleteBook, getBooks, getBookById, addReview } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);
router.get('/', getBooks);
router.get('/:id', getBookById); 
router.post('/:id/reviews', auth, addReview);

module.exports = router;