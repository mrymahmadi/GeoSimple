const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST geo Swagger Node.js",
    description: "RESTful API backend for geo",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://185.255.88.110:1760",
      description: "IP Local server",
    },
    {
      url: "http://localhost:5400",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Point: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "12345",
          },
          name: {
            type: "string",
            example: "Sample Point",
          },
        },
      },
      Polygon: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "65f1c28a9c8e8b3d8c8e8b3d",
          },
          area: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["Polygon"],
                example: "Polygon",
              },
              coordinates: {
                type: "array",
                items: {
                  type: "array",
                  items: {
                    type: "array",
                    items: { type: "number" },
                    minItems: 2,
                    maxItems: 2,
                  },
                },
                example: [
                  [
                    [51.389, 35.6895],
                    [51.3891, 35.6896],
                    [51.3892, 35.6894],
                    [51.389, 35.6895],
                  ],
                ],
              },
            },
          },
        },
      },
    },
  },
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
