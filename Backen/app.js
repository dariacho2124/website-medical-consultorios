import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./database/dbconnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import userRouter from "./router/userRouter.js";

// Inicializar la aplicación
const app = express();

// Configuración de variables de entorno
config({ path: "./config/config.env" });

// Middleware para analizar cookies
app.use(cookieParser());

// Middleware para habilitar CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Para enviar cookies a través del frontend
  })
);

// Middlewares de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para subir archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Conectar con la base de datos
dbconnection();

// Rutas
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

// Middleware de manejo de errores
app.use(errorMiddleware);

export default app;
