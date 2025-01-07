import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jsonWebToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please fill full form", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
  });
  generateToken(user, "User Registered !!!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  generateToken(user, "User login success!", 200, res);
});


export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please fill in the full form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email already exists!`,
        400
      )
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });

  generateToken(admin, "New Admin Registered!", 201, res);
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully !!",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged  Out Successfully !!",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("File Format Not Supported !!", 400));
  }
  const { docAvatar } = req.files;
  const allowebFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowebFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported !!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Provide Full Details", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} aleady registered with this email !!`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered !!",
    doctor,
  });
});
