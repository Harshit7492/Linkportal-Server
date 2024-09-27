const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectToMongo;
