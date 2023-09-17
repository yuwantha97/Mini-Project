// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Online Learning Platform API',
      version: '1.0.0',
      description: 'API documentation for the Online Learning Platform',
    },
  },
  apis: ['./src/routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
