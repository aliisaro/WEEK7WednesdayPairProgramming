const express = require('express');
const router = express.Router();
const { getTodoTasks, addTodoTask, getTodoTask, deleteTodoTask, updateTodoTask } = require('../controllers/todoTaskController');
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
router.use(requireAuth)

// GET all TodoTasks
router.get('/', getTodoTasks);

// POST a new TodoTask
router.post('/', addTodoTask);

// GET a single TodoTask
router.get('/:id', getTodoTask);

// DELETE a TodoTask
router.delete('/:id', deleteTodoTask);

// Update TodoTask using PUT
router.put('/:id', updateTodoTask);

module.exports = router;
