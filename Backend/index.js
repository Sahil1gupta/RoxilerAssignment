require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routers
const categoryDistributionRouter = require('./src/routes/categoryDistribution');
const priceDistributionRouter = require('./src/routes/priceDistribution');
const statisticsRouter = require('./src/routes/statistics');
const transactionRouter = require('./src/routes/transaction');

const app = express();

app.use(cors());
app.use(express.json());

// Use the routers
app.use('/api', categoryDistributionRouter);
app.use('/api', priceDistributionRouter);
app.use('/api', statisticsRouter);
app.use('/api', transactionRouter);

// MongoDB connection and seed
const Product = require('./src/models/Product');
const axios = require('axios');

const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      await Product.insertMany(response.data);
      console.log('Database seeded successfully');
    } else {
      console.log('Database already seeded');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    seedDatabase();
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
