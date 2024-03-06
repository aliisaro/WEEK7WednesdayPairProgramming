const mongoose = require('mongoose');
const Movie = require('../models/movieModel');

// get all Movies
const getMovies = async (req, res) => {
  const user_id = req.user._id

  try {
    const movies = await Movie.find({user_id}).sort({createdAt: -1})
    res.status(200).json(movies)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Movie
const addMovie = async (req, res) => {
  const {title, director, genre, releaseYear, rating} = req.body;

  try {
    const user_id = req.user._id;
    const newMovie = new Movie({title, director, genre, releaseYear, rating, user_id});
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Movie by ID
const getMovie = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such movie'});
  }

  try {
    const user_id = req.user._id;
    const movie = await Movie.findById(id).where('user_id').equals(user_id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Movie by ID
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const movie = await Movie.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Movie by ID
const updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const movie = await Movie.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getMovies,
  addMovie,
  getMovie,
  deleteMovie,
  updateMovie,
};
