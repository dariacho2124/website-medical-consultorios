import { Message } from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    // Validación de datos
    if (!firstName || !lastName || !phone || !email || !message) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Crear un nuevo mensaje
    const newMessage = new Message({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    // Guardar en la base de datos
    await newMessage.save();

    res
      .status(201)
      .json({ message: "Mensaje enviado con éxito", data: newMessage });
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
