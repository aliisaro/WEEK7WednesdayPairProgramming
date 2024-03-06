const mongoose = require('mongoose');
const Pet = require('../models/petModel');

// get all Pets
const getPets = async (req, res) => {
  const user_id = req.user._id

  try {
    const pets = await Pet.find({user_id}).sort({createdAt: -1})
    res.status(200).json(pets)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one Pet
const addPet = async (req, res) => {
  const {name, species, age} = req.body;

  try {
    const user_id = req.user._id;
    const newPet = new Pet({name, species, age, user_id});
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get Pet by ID
const getPet = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such pet'});
  }

  try {
    const user_id = req.user._id;
    const pet = await Pet.findById(id).where('user_id').equals(user_id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete Pet by ID
const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const pet = await Pet.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update Pet by ID
const updatePet = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const pet = await Pet.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getPets,
  addPet,
  getPet,
  deletePet,
  updatePet,
};
