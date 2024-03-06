const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String },
  genre: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number },
  user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);

