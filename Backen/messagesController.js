import Message from '../models/messageModel.js';

// Crear un mensaje
export const createMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    const newMessage = new Message({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error saving message', error });
  }
};

// Obtener mensajes
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};
