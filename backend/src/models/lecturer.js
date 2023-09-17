// models/lecturer.js

const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
