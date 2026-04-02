import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoute.js";
import financeRoutes from "./routes/financeRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());



// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);

app.use("/api/finance", financeRoutes);

app.use("/api/dashboard", dashboardRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working"
  });
});

app.use(errorMiddleware);

export default app;