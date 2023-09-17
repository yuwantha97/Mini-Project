const db = require('./db'); // Import the db object from db.js

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import the Swagger configuration

// Add the JSON body parser middleware
app.use(express.json());
const port = process.env.PORT || 3000;



// Import routes for User, Content, and Lecturer
const userRoutes = require('./routes/user');
const contentRoutes = require('./routes/content'); 
const lecturerRoutes = require('./routes/lecturer');
const messageRoutes = require('./Routes/message');

// Use the imported routes
app.use('/users', userRoutes);
app.use('/content', contentRoutes); // Use the appropriate path for Course Management
app.use('/lecturers', lecturerRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define other routes and middleware here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
