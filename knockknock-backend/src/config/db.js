const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './knockknock.sqlite',
  logging: false, // Set to console.log to see SQL queries
});

const connectDB = async () => {
  try {
    console.log('✅ SQLite Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
