const mongoose = require('mongoose');
const Book = require('../models/bookModel');

// get all Books
const getBooks = async (req, res) => {
  const user_id = req.user._id

  try {
    const books = await Book.find({user_id}).sort({createdAt: -1})
    res.status(200).json(books)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Book
const addBook = async (req, res) => {
  const {title, author, genre} = req.body;

  try {
    const user_id = req.user._id;
    const newBook = new Book({title, author, genre, user_id});
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Book by ID
const getBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such book'});
  }

  try {
    const user_id = req.user._id;
    const book = await Book.findById(id).where('user_id').equals(user_id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Book by ID
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const book = await Book.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Book by ID
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const book = await Book.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getBooks,
  addBook,
  getBook,
  deleteBook,
  updateBook,
};
