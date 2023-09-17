// routes/student.js

const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Course = require('../models/course');
const authMiddleware = require('../middleware/auth'); // Implement JWT-based authentication middleware

// Student registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const student = new Student({ username, password });

    // Hash the password before saving it to the database
    const saltRounds = 10;
    student.password = await bcrypt.hash(password, saltRounds);

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Student login with JWT
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the student with the provided username exists in the database
    const student = await Student.findOne({ username });

    if (!student) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Generate a JWT token for student authentication
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    const token = jwt.sign({ userId: student._id, username: student.username, role: 'student' }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Browse available courses
router.get('/courses', async (req, res) => {
  try {
    // Implement authentication check here if needed (e.g., restrict access to logged-in users)

    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve available courses' });
  }
});

// Enroll in a course
router.post('/courses/enroll/:courseId', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is a student (you can add this logic to your auth middleware)
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const studentId = req.user.userId;
    const courseId = req.params.courseId;

    // Check if the course with the provided courseId exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if the student is already enrolled in the course
    const student = await Student.findById(studentId);

    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: 'Student is already enrolled in the course' });
    }

    // Enroll the student in the course
    student.enrolledCourses.push(courseId);
    await student.save();

    res.status(200).json({ message: 'Enrolled in the course successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
});

// View enrolled courses
router.get('/courses/enrolled', authMiddleware, async (req, res) => {
  try {
    // Ensure that the user is a student (you can add this logic to your auth middleware)
    if (req.user.role !== 'student') {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const studentId = req.user.userId;

    // Find the student and populate the enrolledCourses field with course details
    const student = await Student.findById(studentId).populate('enrolledCourses');

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve enrolled courses' });
  }
});

module.exports = router;
