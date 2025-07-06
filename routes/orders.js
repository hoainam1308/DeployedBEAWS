const express = require('express');
const router = express.Router();
const { GetAllOrders, CreateOrder, GetOrderById, GetOrderByEmail, GetOrderByUserId, UpdateOrder, DeleteOrder, GetMyOrders, GetDetailsByOrderId} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middlewares/auth');

// GET all orders
router.get('/', GetAllOrders);
// Get order by ID
router.get('/get/:id', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderById);
// Get orders by user ID
router.get('/user/:userId', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderByUserId);
// Get order details by order ID
router.get('/details/:id', authenticate, GetDetailsByOrderId);
// Update order status
router.post('/mine', authenticate, GetMyOrders);
// Create a new order
router.post('/create', authenticate, CreateOrder);
// Get order by user email
router.get('/email/:email', authenticate, authorize(["STAFF", "ADMIN"]), GetOrderByEmail);
// Update order
router.put('/:id', authenticate, authorize(["STAFF", "ADMIN"]), UpdateOrder);
// Delete order
router.delete('/:id', authenticate, authorize(["STAFF", "ADMIN"]), DeleteOrder);

module.exports = router;