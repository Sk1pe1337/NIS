const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Product.deleteMany({}); 
    await Product.insertMany([
      { code: 'PC1001', name: 'Игровой компьютер', price: 350000 },
      { code: 'NB2002', name: 'Ноутбук ASUS', price: 280000 },
      { code: 'MN3003', name: 'Монитор Samsung', price: 120000 },
      { code: 'TUF25647', name: 'Ноутбук TUF F15', price: 580000 },
      
    ]);
    console.log('Товары добавлены');
    mongoose.disconnect();
  })
  .catch(console.error);
