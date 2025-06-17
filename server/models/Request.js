const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  productCode: String,     
  status: {
    type: String,
    default: 'в ожидании',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Request', requestSchema);
