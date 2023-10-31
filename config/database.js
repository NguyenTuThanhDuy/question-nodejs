// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_ENGINE = process.env.MONGO_ENGINE;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

const mongoUrl = `${MONGO_ENGINE}${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUrl}/${MONGO_DB_NAME}?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDB;