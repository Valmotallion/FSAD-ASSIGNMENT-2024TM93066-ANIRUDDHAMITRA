// utils/swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const packageJson = require('../package.json'); // Adjusted path

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Vaccination Portal API',
      version: packageJson.version,
      description: 'API documentation for the School Vaccination Portal',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"]
  // Adjust this path to match your routes folder
};

const swaggerDocs = (app) => {
  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
