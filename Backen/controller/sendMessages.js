export const sendMessage = (req, res) => {
    const messageData = req.body;
  
    if (!messageData || !messageData.message) {
      return res.status(400).json({ success: false, error: 'Message data is required' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: messageData,
    });
  };
  