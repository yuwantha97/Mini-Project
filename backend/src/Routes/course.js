// routes/course.js

const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const authMiddleware = require('../middleware/auth'); // Implement JWT-based authentication middleware

// Create a new course
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is an admin (you can add this logic to your auth middleware)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const { name, description, lecturer } = req.body;
    const course = new Course({ name, description, lecturer });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a course' });
  }
});

// Edit a course
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is an admin

    // Update the course based on the provided ID
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the course' });
  }
});

// Delete a course
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is an admin

    // Delete the course based on the provided ID
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the course' });
  }
});

// Assign a lecturer to a course
router.put('/:id/assign-lecturer', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is an admin

    // Update the course with a new lecturer
    const { lecturer } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { lecturer },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign a lecturer' });
  }
});

// List all courses
router.get('/', async (req, res) => {
  try {
    // Implement authentication check here if needed (e.g., restrict access to logged-in users)

    const courses = await Course.find().populate('lecturer', 'username'); // Populate lecturer field with lecturer's username
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
});

module.exports = router;
