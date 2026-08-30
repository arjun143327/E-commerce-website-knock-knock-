const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  }
}, {
  tableName: 'wishlist',
  timestamps: true,
});

// Associations
User.belongsToMany(Product, { through: Wishlist, as: 'wishlistedProducts', foreignKey: 'userId' });
Product.belongsToMany(User, { through: Wishlist, as: 'wishlistedBy', foreignKey: 'productId' });

module.exports = Wishlist;
