// src/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;
 

console.log('Attempting to connect to MongoDB using URI:', DB_URI);

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
