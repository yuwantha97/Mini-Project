// middleware/auth.js

const jwt = require('jsonwebtoken');

// Combined authentication middleware
function authenticate(req, res, next) {
  // Extract the JWT token from the request header
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Authentication failed: Missing token' });
  }

  try {
    // Verify the token using your secret key
    const decodedToken = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key

    // Check if the decoded token has the role of "admin" or "lecturer"
    if (req.url.includes('/admin') && decodedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied: Not an admin' });
    } else if (req.url.includes('/lecturer') && decodedToken.role !== 'lecturer') {
      return res.status(403).json({ error: 'Permission denied: Not a lecturer' });
    } else if (req.url.includes('/student') && decodedToken.role !== 'student') {
      return res.status(403).json({ error: 'Permission denied: Not a student' });
    }

    // Attach the decoded token to the request object for use in the route handlers
    req.user = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed: Invalid token' });
  }
}

module.exports = authenticate;
