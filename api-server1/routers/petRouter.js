const express = require('express');
const router = express.Router();
const { getPets, addPet, getPet, deletePet, updatePet } = require('../controllers/petController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all Pets
router.get('/', getPets);

// POST a new Pet
router.post('/', addPet);

// GET a single Pet
router.get('/:id', getPet);

// DELETE a Pet
router.delete('/:id', deletePet);

// Update Pet using PUT
router.put('/:id', updatePet);

module.exports = router;
