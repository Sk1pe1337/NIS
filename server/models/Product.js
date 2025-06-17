const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  price: Number,
});
module.exports = mongoose.model('Product', productSchema);
