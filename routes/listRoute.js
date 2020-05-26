const router = require('express').Router();
const listController = require('../controllers/listController.js');

router.get('/', listController.getList);
router.post('/list', listController.newList);
router.post('/list/:list/task', listController.addTaskToList);
router.delete('/list/:list/task/:task', listController.removeTask);

module.exports = router;