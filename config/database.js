// config/database.js
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://duynguyen:duynguyen@localhost:27017'; // Change this if your MongoDB server is running on a different host or port
const dbName = 'duynguyen'; // Change 'your-database-name' to the name of your MongoDB database

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}/${dbName}?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDB;