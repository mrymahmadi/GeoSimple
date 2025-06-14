const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST Geo Swagger Node.js",
    description: "RESTful API backend for Geo",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://185.255.88.110:1766",
      description: "IP Local server",
    },
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
