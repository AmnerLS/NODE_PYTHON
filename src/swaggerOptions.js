const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FoodNow API',
      version: '1.0.0',
      description: 'API de FoodNow',
    },
  },
  apis: ['./routes/index.routes'], // Ruta hacia tus archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = options;