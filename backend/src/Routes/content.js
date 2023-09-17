// routes/content.js

const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const Content = require('../models/content');
const authMiddleware = require('../middleware/auth'); // Implement JWT-based authentication middleware

// Configure Multer for file uploads (you can customize this as needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload course content (Admin and Lecturer)
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    // Ensure that the user is an Admin or Lecturer
    if (req.user.role !== 'admin' && req.user.role !== 'lecturer') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const { title, description, course } = req.body;
    const fileBuffer = req.file.buffer; // Access the uploaded file content

    // Save the file and create a new content record
    const content = new Content({ title, description, course });

    // Store the file content as needed (e.g., save to a file system or cloud storage)
    // You can customize this part based on your storage solution

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload content' });
  }
});

// View and manage uploaded content (Admin and Lecturer)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is an Admin or Lecturer

    // Retrieve and return a list of uploaded content
    const content = await Content.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content' });
  }
});

module.exports = router;
