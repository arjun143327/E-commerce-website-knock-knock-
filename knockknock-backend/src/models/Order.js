const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'ready', 'completed', 'rejected'),
    defaultValue: 'pending',
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  savings: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  address: {
    type: DataTypes.STRING,
  },
  paymentMethod: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Relationships
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Order;
