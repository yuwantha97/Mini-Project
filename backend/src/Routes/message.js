// routes/message.js

const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const authMiddleware = require('../middleware/auth'); // Import the authentication middleware

// Send a message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    const sender = req.user.userId; // The sender is the authenticated user

    const message = new Message({ sender, recipient, content });
    await message.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Retrieve messages for the authenticated user
router.get('/inbox', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find messages where the user is the recipient
    const messages = await Message.find({ recipient: userId }).populate('sender');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Mark a message as read
router.put('/mark-read/:messageId', authMiddleware, async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const userId = req.user.userId;

    // Find the message and check if the user is the recipient
    const message = await Message.findById(messageId);

    if (!message || message.recipient.toString() !== userId) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
});

module.exports = router;
