const express = require('express');
const router = express.Router();
const { getMovies, addMovie, getMovie, deleteMovie, updateMovie } = require('../controllers/movieController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all Movies
router.get('/', getMovies);

// POST a new Movie
router.post('/', addMovie);

// GET a single Movie
router.get('/:id', getMovie);

// DELETE a Movie
router.delete('/:id', deleteMovie);

// Update Movie using PUT
router.put('/:id', updateMovie);

module.exports = router;
