const router = require('express').Router();
const listController = require('../controllers/listController.js');

router.get('/', listController.getList);
router.get('/victor', listController.getListById);
router.get('/list', listController.newList);

module.exports = router;