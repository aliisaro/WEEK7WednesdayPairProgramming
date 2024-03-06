const express = require('express');
const router = express.Router();
const { getBooks, addBook, getBook, deleteBook, updateBook } = require('../controllers/bookController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all Books
router.get('/', getBooks);

// POST a new Book
router.post('/', addBook);

// GET a single Book
router.get('/:id', getBook);

// DELETE a Book
router.delete('/:id', deleteBook);

// Update Book using PUT
router.put('/:id', updateBook);

module.exports = router;
