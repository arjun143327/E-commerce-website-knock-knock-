const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');
const requireAdmin = require('../middleware/requireAdmin');

// Protected routes (requires login)
router.post('/', authenticate, orderController.placeOrder);
router.get('/', authenticate, orderController.getUserOrders);
router.put('/:id/cancel', authenticate, orderController.cancelOrder);

// Admin routes
router.get('/all', authenticate, requireAdmin, orderController.getAllOrders);
router.put('/:id/status', authenticate, requireAdmin, orderController.updateOrderStatus);

module.exports = router;
