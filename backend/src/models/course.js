// models/course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model for the lecturer
});

module.exports = mongoose.model('Course', courseSchema);
