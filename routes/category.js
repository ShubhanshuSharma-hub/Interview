const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.post('/', categoryController.addCategory);
router.get('/', categoryController.getAllCategories);
router.put('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.removeEmptyCategory);

module.exports = router;
