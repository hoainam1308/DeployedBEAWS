const experss = require('express');
const router = experss.Router();
const {GetAllProducts, CreateProduct, GetProductById, UpdateProduct, GetProductBySlug, GetProductByCategory, UpdatedProductImage, DeleteProduct} = require('../controllers/productController');
const {authenticate, authorize} = require('../middlewares/auth');
const upload = require('../middlewares/uploads');

// GET all products
router.get('/', GetAllProducts);
// Create a new product
router.post('/create', CreateProduct);
router.post('/createimg', upload.single('image'), CreateProduct);
router.post('/updateimg/:id', upload.single('image'), UpdatedProductImage);
// Get product by ID
router.get('/:id', GetProductById);
// Update product
router.put('/:id', authenticate, UpdateProduct);
// Get product by slug
router.get('/slug/:slug', GetProductBySlug);
// Get products by category
router.get('/category/:categoryId', GetProductByCategory);
// Delete product
router.delete('/:id', DeleteProduct);
module.exports = router;