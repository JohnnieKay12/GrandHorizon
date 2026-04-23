// Generate WhatsApp link with pre-filled message
const generateWhatsAppLink = (bookingData) => {
  const phoneNumber = process.env.WHATSAPP_NUMBER?.replace(/\D/g, ''); // Remove non-digits
  
  if (!phoneNumber) {
    console.warn('WhatsApp number not configured');
    return '#';
  }

  const message = encodeURIComponent(
    `Hello, I just booked a room at your hotel.\n\n` +
    `Booking ID: ${bookingData.bookingId}\n` +
    `Room: ${bookingData.roomName}\n` +
    `Check-in: ${new Date(bookingData.checkIn).toLocaleDateString('en-NG')}\n` +
    `Check-out: ${new Date(bookingData.checkOut).toLocaleDateString('en-NG')}\n` +
    `Guests: ${bookingData.guests}\n` +
    `Total: ₦${bookingData.totalAmount?.toLocaleString() || 'N/A'}\n\n` +
    `I would like to confirm my booking and ask a few questions. Thank you!`
  );

  return `https://wa.me/${phoneNumber}?text=${message}`;
};

// Generate generic contact link
const generateContactLink = (message = '') => {
  const phoneNumber = process.env.WHATSAPP_NUMBER?.replace(/\D/g, '');
  
  if (!phoneNumber) {
    return '#';
  }

  const encodedMessage = encodeURIComponent(message || 'Hello, I would like to inquire about your hotel services.');
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

module.exports = {
  generateWhatsAppLink,
  generateContactLink
};
