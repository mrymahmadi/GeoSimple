const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST Geo Swagger Node.js",
    description: "Geo simple for save coordinates",
  },
  servers: [
    {
      url: "http://localhost:5400",
      description: "Local server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const setupSwagger = (app) =>
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
  );

module.exports = setupSwagger;
