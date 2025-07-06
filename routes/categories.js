const express = require('express');
const router = express.Router();
const { GetAllCategories, CreateCategory, GetCategoryById, UpdateCategory, DeleteCategory } = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');
// GET all categories
router.get('/', GetAllCategories);
// Create a new category
router.post('/create', CreateCategory);
// Get category by ID
router.get('/:id', GetCategoryById);
// Update category
router.put('/:id', UpdateCategory);
// Delete category
router.delete('/:id', DeleteCategory);
module.exports = router;
