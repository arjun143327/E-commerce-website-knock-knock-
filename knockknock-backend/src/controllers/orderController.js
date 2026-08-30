const { Order, OrderItem, Product, User } = require('../models');

exports.placeOrder = async (req, res) => {
  try {
    const { items, total, savings, address, paymentMethod } = req.body;
    const userId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain items' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle Wallet Payment
    if (paymentMethod === 'Wallet') {
      if (user.walletBalance < total) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }
      user.walletBalance -= total;
      await user.save();
    }

    // Create the order
    const order = await Order.create({
      userId,
      total,
      savings,
      address,
      paymentMethod,
      status: 'pending'
    });

    // Create order items
    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.cartQuantity || item.qty, // Support both formats
      priceAtPurchase: item.price
    }));

    await OrderItem.bulkCreate(orderItems);

    const savedOrder = await Order.findByPk(order.id, {
      include: [
        { model: OrderItem, include: [Product] },
        { model: User, attributes: ['id', 'name', 'email'] }
      ]
    });

    // Emit socket event to admin
    if (req.io) {
      req.io.emit('newOrder', savedOrder);
    }

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, userId: req.user.id } });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    // Process refund
    const user = await User.findByPk(req.user.id);
    user.walletBalance += order.total;
    await user.save();

    order.status = 'cancelled';
    await order.save();

    // Broadcast update
    req.io.emit('orderStatusChanged', {
      orderId: order.id,
      status: order.status,
      customerId: order.userId
    });

    res.json({ message: 'Order cancelled and refunded', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'image', 'price'] }]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate status
    const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await order.update({ status });

    // Emit socket event to user and admin
    if (req.io) {
      req.io.emit('orderStatusChanged', { orderId: order.id, status });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
