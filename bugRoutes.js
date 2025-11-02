const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

// Get all bugs
router.get('/', async (req, res) => {
  const bugs = await Bug.find();
  res.status(200).json(bugs);
});

// Create new bug
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ message: 'All fields are required' });

  const newBug = new Bug({ title, description });
  await newBug.save();
  res.status(201).json(newBug);
});

// Update bug status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const updatedBug = await Bug.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.status(200).json(updatedBug);
});

// Delete bug
router.delete('/:id', async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;