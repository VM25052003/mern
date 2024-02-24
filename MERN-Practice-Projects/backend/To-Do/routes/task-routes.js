const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const taskController = require('../controllers/task-controller')

//1) Home/ Get all tasks - GET /
router.get('/', taskController.getTasks)

//2) Insertion - POST /tasks/new  
router.post('/', [
        body('task').not().isEmpty(),
        body('description').isLength({min: 5}),
], taskController.addTask)

//3) Editing - PATCH /tasks/:taskId
router.patch('/:taskId',  [
        body('task').not().isEmpty(),
        body('description').isLength({min: 5}),
], taskController.editTask)

//4) Deletion DELETE /tasks/:taskId
router.delete('/:taskId', taskController.deleteTask)

module.exports = router