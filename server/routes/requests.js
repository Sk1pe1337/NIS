const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещён: только для админов' });
  }
  const requests = await Request.find().sort({ timestamp: -1 });
  res.json(requests);
});

router.post('/', auth, async (req, res) => {
  const { productCode } = req.body;
  const product = await Product.findOne({ code: productCode });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const newRequest = new Request({ productCode });
  await newRequest.save();
  res.json(newRequest);
});

router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Только админ может подтверждать' });
  }
  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status: 'готов' },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
