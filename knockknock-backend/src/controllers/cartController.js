const { CartItem, Product, Store } = require('../models');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ 
        model: Product, 
        as: 'product',
        include: [{ model: Store, attributes: ['name'] }]
      }]
    });
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cartItem = await CartItem.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += (quantity || 1);
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ userId, productId, quantity: quantity || 1 });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { id } = req.params; // Product ID
    const { change } = req.body;
    const userId = req.user.id;

    let cartItem = await CartItem.findOne({ where: { userId, productId: id } });
    if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });

    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {
      await cartItem.destroy();
      return res.json({ message: 'Item removed from cart' });
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await CartItem.destroy({ where: { userId } });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
