const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticate = require('../middleware/authenticate');
const requireAdmin = require('../middleware/requireAdmin');
const multer = require('multer');
const path = require('path');

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Public routes
router.get('/', productController.getAllProducts);
router.get('/wishlist', authenticate, productController.getWishlist);
router.post('/:id/wishlist', authenticate, productController.toggleWishlist);
router.get('/:id', productController.getProductById);
router.get('/:id/reviews', productController.getProductReviews);
router.post('/:id/reviews', authenticate, productController.addReview);

// Admin only routes
router.post('/', authenticate, requireAdmin, productController.createProduct);
router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

// Image upload route
router.post('/upload', authenticate, requireAdmin, upload.single('image'), productController.uploadImage);

module.exports = router;
