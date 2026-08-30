const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  distance: {
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
  deliveryTime: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  badge: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'stores',
  timestamps: false,
});

module.exports = Store;
