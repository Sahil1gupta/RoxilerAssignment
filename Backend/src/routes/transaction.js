const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/transaction', async (req, res) => {
  const { search = '', page = 1, limit = 10 } = req.query;

  try {
    let query = {};
    if (!isNaN(search)) {
      query = { price: search };
    } else {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [{ title: searchRegex }, { description: searchRegex }]
      };
    }

    const transactions = await Product.find(query)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const count = await Product.countDocuments(query);

    res.json({
      transactions,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions", error: err.message });
  }
});

module.exports = router;
