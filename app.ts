require("dotenv").config();
import express, { Response, Request, NextFunction } from "express";

// Export express
export const app = express();

import cors from "cors";
import cookeParser from "cookie-parser";

// Error Handler
import { ErrorMiddleware } from "./middleware/error";

// Body Parser
app.use(express.json({ limit: "50mb" }));

// Cookie Parser
app.use(cookeParser());

// Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Checking api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Unknown Route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Error Middleware
app.use(ErrorMiddleware);
