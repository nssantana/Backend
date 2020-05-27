const router = require('express').Router();
const { validate, listValidation, taskValidation } = require('../config/validation.js'); 
const listController = require('../controllers/listController.js');
const taskController = require('../controllers/taskController.js');

router.get('/', listController.getList);
router.post('/list', validate(listValidation), listController.newList);
router.post('/list/:list/task', validate(taskValidation), listController.addTaskToList);
router.delete('/list/:list/task/:task', listController.removeTask);
router.patch('/task/:task', taskController.switchTaskStatus);

module.exports = router;