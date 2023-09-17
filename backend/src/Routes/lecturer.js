// routes/lecturer.js

const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturer');
const authMiddleware = require('../middleware/auth'); // Implement JWT-based authentication middleware

// Lecturer registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const lecturer = new Lecturer({ username, password });

    // Hash the password before saving it to the database
    const saltRounds = 10;
    lecturer.password = await bcrypt.hash(password, saltRounds);

    await lecturer.save();
    res.status(201).json({ message: 'Lecturer registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Lecturer login with JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the lecturer with the provided username exists in the database
    const lecturer = await Lecturer.findOne({ username });

    if (!lecturer) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, lecturer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token for lecturer authentication
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ userId: lecturer._id, username: lecturer.username, role: 'lecturer' }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Create course content (lectures, assignments, descriptions)
router.post('/courses', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is a lecturer (you can add this logic to your auth middleware)
    if (req.user.role !== 'lecturer') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const { name, description, lecturer } = req.body;
    const course = new Course({ name, description, lecturer });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course content' });
  }
});

module.exports = router;
