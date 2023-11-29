// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_ENGINE = process.env.MONGO_ENGINE;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const username = encodeURIComponent("pnpdev9@gmail.com");
const password = encodeURIComponent("S8t0Jr9qY^!g");

// const mongoUrl = `${MONGO_ENGINE}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
const mongoUrl = `mongodb+srv://${username}:${password}@cadb.vo7grnd.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDB;