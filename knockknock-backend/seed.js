const bcrypt = require('bcryptjs');
const { sequelize } = require('./src/config/db');
const { User, Store, Product } = require('./src/models');

const stores = [
  { 
    name: "Tech Galaxy", 
    category: "Electronics", 
    distance: "0.8 km", 
    rating: 4.5, 
    reviews: 234, 
    deliveryTime: "10-15 min", 
    image: "🔌", 
    badge: "⚡ Fast" 
  },
  { 
    name: "MediCare Plus", 
    category: "Pharmacy", 
    distance: "1.2 km", 
    rating: 4.7, 
    reviews: 567, 
    deliveryTime: "8-12 min", 
    image: "💊", 
    badge: "✓ Verified" 
  },
  { 
    name: "Beauty Hub", 
    category: "Beauty", 
    distance: "0.5 km", 
    rating: 4.3, 
    reviews: 189, 
    deliveryTime: "10-15 min", 
    image: "💄", 
    badge: "🔥 Popular" 
  },
  { 
    name: "Fashion Point", 
    category: "Fashion", 
    distance: "1.5 km", 
    rating: 4.6, 
    reviews: 412, 
    deliveryTime: "15-20 min", 
    image: "👕", 
    badge: "⭐ Top Rated" 
  }
];

const products = [
  { name: "iPhone 15 Pro", price: 134900, mrp: 144900, storeId: 1, inStock: true, quantity: 3, category: "Electronics", image: "📱", rating: 4.8, reviews: 2341, discount: 7, badge: "Bestseller" },
  { name: "Samsung Galaxy S24", price: 79999, mrp: 89999, storeId: 1, inStock: true, quantity: 5, category: "Electronics", image: "📱", rating: 4.6, reviews: 1876, discount: 11, badge: "Deal" },
  { name: "Paracetamol 500mg", price: 15, mrp: 20, storeId: 2, inStock: true, quantity: 50, category: "Pharmacy", image: "💊", rating: 4.9, reviews: 567, discount: 25 },
  { name: "Lakme Lipstick", price: 450, mrp: 599, storeId: 3, inStock: true, quantity: 12, category: "Beauty", image: "💄", rating: 4.5, reviews: 234, discount: 25, badge: "Hot" },
  { name: "Levi's Jeans", price: 2999, mrp: 3999, storeId: 4, inStock: true, quantity: 8, category: "Fashion", image: "👖", rating: 4.7, reviews: 892, discount: 25 },
  { name: "Sony Headphones", price: 8999, mrp: 12999, storeId: 1, inStock: false, quantity: 0, category: "Electronics", image: "🎧", rating: 4.4, reviews: 445, discount: 31 },
  { name: "AirPods Pro", price: 24999, mrp: 27900, storeId: 1, inStock: true, quantity: 7, category: "Electronics", image: "🎧", rating: 4.9, reviews: 3421, discount: 10, badge: "Bestseller" },
  { name: "Vitamin D3 Tablets", price: 299, mrp: 450, storeId: 2, inStock: true, quantity: 30, category: "Pharmacy", image: "💊", rating: 4.7, reviews: 234, discount: 34 }
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Force sync (drops tables and recreates them - use with caution!)
    await sequelize.sync({ force: true });
    console.log('Tables synced...');

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash('admin123', salt);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@knockknock.com',
      password_hash,
      role: 'admin'
    });
    console.log('Admin user created (admin@knockknock.com / admin123)...');

    // Insert Stores
    await Store.bulkCreate(stores);
    console.log('Stores seeded...');

    // Insert Products
    await Product.bulkCreate(products);
    console.log('Products seeded...');

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
