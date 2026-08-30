const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Store = require('./Store');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mrp: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  badge: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Relationships
Store.hasMany(Product, { foreignKey: 'storeId' });
Product.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Product;
