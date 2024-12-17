import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./errorMiddleware.js";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin not Authentication", 400)); // Token no encontrado
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404)); // Usuario no encontrado
    }

    if (req.user.role !== "Admin") {
      return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`, 403)); // Rol no autorizado
    }

  } catch (error) {
    return next(new ErrorHandler("Invalid token or token expired", 401)); // Token inválido o expirado
  }

  next(); // Continuar si todo está correcto
});



export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken;

  if (!token) {
    return next(
      new ErrorHandler("Patient Not Authorizated!", 400)
    );
  }
const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
req.user = await User.findById(decoded.id);
if(req.user.role !== "Patient"){
  return next(
    new ErrorHandler(
      `${req.user.role} not authorized for this resources!`,
      403
    )
  );
}

  next(); // Continuamos si el rol es correcto
});
