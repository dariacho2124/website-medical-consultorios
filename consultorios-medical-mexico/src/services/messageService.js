
export const sendMessage = async (messageData) => {
    try {
      const response = await fetch('http://localhost:4000/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error.message);
      throw error;
    }
  };
  