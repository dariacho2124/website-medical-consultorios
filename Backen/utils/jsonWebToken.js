import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  // Generar el token JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  // Configurar la cookie con el JWT
  res.cookie('adminToken', token, {
    httpOnly: true, // Evita el acceso a la cookie desde el cliente
    secure: process.env.NODE_ENV === 'production', // Usa secure cookies en producción (requiere HTTPS)
    sameSite: 'None', // Permite que la cookie se envíe en solicitudes entre sitios
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000, // Duración de la cookie
  });

  // Responder al frontend
  res.status(statusCode).json({
    success: true,
    message,
    token, // Opcional: puedes enviar el token al cliente si lo necesitas
  });
};
