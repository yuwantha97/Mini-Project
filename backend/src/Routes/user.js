// src/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });

        // Hash the password before saving it to the database
        const saltRounds = 10;
        user.password = await bcrypt.hash(password, saltRounds);

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    console.log(error);
  }
});

// User login with JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user with the provided username exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    //const bcrypt = require('bcrypt');
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

        // Generate a JWT token with user information
        const secretKey = 'your-secret-key';
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });


    // Issue a token or create a session to authenticate the user
    // Implement your authentication strategy here (e.g., JWT, session)

    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// CRUD operations for admin
router.get('/', async (req, res) => {
  try {
    // Implement authentication check here (ensure the user is an admin)
    
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Implement authentication check here (ensure the user is an admin)

    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Implement authentication check here (ensure the user is an admin)

    const { username, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Implement authentication check here (ensure the user is an admin)

    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Role assignment for admin
router.put('/:id/assign-role', async (req, res) => {
  try {
    console.log('Received id:', req.params.id);

    // Implement authentication check here (ensure the user is an admin)

    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign role' });
    console.log(error)
  }

});

module.exports = router;
