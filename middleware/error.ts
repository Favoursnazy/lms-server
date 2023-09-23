import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongbd ID error
  if (err.name === "CastError") {
    const message = `Resource not found, Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Dupliacte ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "jsonwebtokenError") {
    const message = "Json web token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
