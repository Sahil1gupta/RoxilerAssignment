const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/price-distribution', async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);

    const priceDistribution = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber]
          }
        }
      },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: '901-above',
          output: { count: { $sum: 1 } }
        }
      }
    ]);

    res.json(priceDistribution);
  } catch (err) {
    res.status(500).json({ message: "Error fetching price distribution", error: err.message });
  }
});

module.exports = router;
