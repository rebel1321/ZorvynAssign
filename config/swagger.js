import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard Backend"
    },
    servers: [
  {
    url: "http://localhost:5000",
    description: "Local server"
  },
  {
    url: "https://your-app-name.onrender.com",
    description: "Production server"
  }
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"] // 👈 important
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;