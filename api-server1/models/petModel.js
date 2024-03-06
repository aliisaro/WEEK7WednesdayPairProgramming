const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  user_id: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);

