const mongoose = require('mongoose');
const TodoTask = require('../models/todoTaskModel');

// get all TodoTasks
const getTodoTasks = async (req, res) => {
  const user_id = req.user._id

  try {
    const todoTasks = await TodoTask.find({user_id}).sort({createdAt: -1})
    res.status(200).json(todoTasks)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Add one TodoTask
const addTodoTask = async (req, res) => {
  const {title, description, dueDate, completed} = req.body;

  try {
    const user_id = req.user._id;
    const newTodoTask = new TodoTask({title, description, dueDate, completed, user_id});
    await newTodoTask.save();
    res.status(201).json(newTodoTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Get TodoTask by ID
const getTodoTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such todoTask'});
  }

  try {
    const user_id = req.user._id;
    const todoTask = await TodoTask.findById(id).where('user_id').equals(user_id);
    if (!todoTask) {
      return res.status(404).json({ message: 'TodoTask not found' });
    }
    res.status(200).json(todoTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Delete TodoTask by ID
const deleteTodoTask = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const todoTask = await TodoTask.findByIdAndDelete({ _id: id, user_id: user_id });
    if (!todoTask) {
      return res.status(404).json({ message: 'TodoTask not found' });
    }
    res.status(200).json({ message: 'TodoTask deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

// Update TodoTask by ID
const updateTodoTask = async (req, res) => {
  const { id } = req.params;
  try {
    const user_id = req.user._id;
    const todoTask = await TodoTask.findOneAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!todoTask) {
      return res.status(404).json({ message: 'TodoTask not found' });
    }
    res.status(200).json(todoTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  getTodoTasks,
  addTodoTask,
  getTodoTask,
  deleteTodoTask,
  updateTodoTask,
};
