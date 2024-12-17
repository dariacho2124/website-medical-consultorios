export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();

    // Verificamos el rol del usuario y asignamos el nombre correcto a la cookie
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

    // Agregamos un log para verificar el nombre de la cookie y el token generado
    console.log(`Setting cookie: ${cookieName}, Token: ${token}`);

    res.status(statusCode)
        .cookie(cookieName, token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Configuración de expiración
            httpOnly: true, // Sólo accesible desde el servidor
            secure: false,  // Cambiar a true en producción con HTTPS
            sameSite: "lax", // Configuración para permitir solicitudes entre dominios
        })
        .json({
            success: true,
            message,
            user,
            token,
        });
};
