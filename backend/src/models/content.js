// models/content.js

const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  file: { type: String, required: true }, // Store the file path or URL
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
});

module.exports = mongoose.model('Content', contentSchema);
