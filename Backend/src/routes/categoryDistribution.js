const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/category-distribution', async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);

    const categoryDistribution = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber]
          }
        }
      },
      {
        $group: {
          _id: '$category',
          itemCount: { $sum: 1 }
        }
      }
    ]);

    res.json(categoryDistribution);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category distribution", error: err.message });
  }
});

module.exports = router;
