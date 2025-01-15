import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin not Authentication", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources!`,
          
          403)); 
    }

  } catch (error) {
    return next(
      new ErrorHandler("Invalid token or token expired", 401)); // Token inválido o expirado
  }

  next();
});



export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;

  if (!token) {
    return next(new ErrorHandler("Patient not Authentication", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} not authorized for this resources!`,
          
          403)); 
    }

  } catch (error) {
    return next(
      new ErrorHandler("Invalid token or token expired", 401)); // Token inválido o expirado
  }

  next();
});

export const protectRoute = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};