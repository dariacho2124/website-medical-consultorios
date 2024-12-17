class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Manejo de errores específicos
    if (err.code === 11000) {
        err = new ErrorHandler(
            `Duplicate ${Object.keys(err.keyValue)} Entered`,
            400
        );
    }
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("Invalid JSON Web Token, please try again!", 400);
    }
    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("JSON Web Token expired, please try again!", 400);
    }
    if (err.name === "CastError") {
        err = new ErrorHandler(`Invalid value for ${err.path}`, 400);
    }

    // Respuesta de error
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};


export default ErrorHandler;  
export { errorMiddleware }; 
