const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/statistics', async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);

    const statistics = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalUnsoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
        }
      }
    ]);

    res.json(statistics.length ? statistics[0] : { totalSaleAmount: 0, totalSoldItems: 0, totalUnsoldItems: 0 });
  } catch (err) {
    res.status(500).json({ message: "Error fetching statistics", error: err.message });
  }
});

module.exports = router;
