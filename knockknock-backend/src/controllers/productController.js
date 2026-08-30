const { Product, Store } = require('../models');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, storeId, sortBy } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }
    if (category && category !== 'All') {
      whereClause.category = category;
    }
    if (storeId) {
      whereClause.storeId = storeId;
    }

    let orderClause = [];
    if (sortBy === 'price_low') {
      orderClause.push(['price', 'ASC']);
    } else if (sortBy === 'price_high') {
      orderClause.push(['price', 'DESC']);
    } else {
      orderClause.push(['id', 'DESC']); // Default sorting
    }

    const products = await Product.findAll({
      where: whereClause,
      include: [{ model: Store, attributes: ['name'] }],
      order: orderClause
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Store, attributes: ['name'] }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }
  
  // Return the public URL for the image
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const user = await require('../models/User').findByPk(userId);
    const hasWishlisted = await user.hasWishlistedProduct(product);

    if (hasWishlisted) {
      await user.removeWishlistedProduct(product);
      res.json({ message: 'Removed from wishlist', isWishlisted: false });
    } else {
      await user.addWishlistedProduct(product);
      res.json({ message: 'Added to wishlist', isWishlisted: true });
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await require('../models/User').findByPk(userId, {
      include: [{
        model: Product,
        as: 'wishlistedProducts',
        include: [{ model: Store, attributes: ['name'] }]
      }]
    });
    
    res.json(user.wishlistedProducts || []);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;
    
    const { Order, OrderItem } = require('../models');
    
    // Verify if the user actually bought the item and the order is completed
    const hasBought = await Order.findOne({
      where: {
        userId,
        status: 'completed'
      },
      include: [{
        model: OrderItem,
        where: { productId }
      }]
    });

    if (!hasBought) {
      return res.status(403).json({ message: 'You can only review products you have purchased and received.' });
    }

    const Review = require('../models/Review');
    const newReview = await Review.create({
      rating,
      comment,
      userId,
      productId
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const Review = require('../models/Review');
    const User = require('../models/User');

    const reviews = await Review.findAll({
      where: { productId },
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
