const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email to admin when new booking is made
const sendAdminNotification = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Hotel Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking Received - ${bookingData.bookingId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-id { background: #fbbf24; color: #1e3a8a; padding: 10px 20px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 10px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: bold; color: #6b7280; }
            .detail-value { color: #1f2937; }
            .amount { font-size: 24px; color: #059669; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Alert</h1>
              <p>A new reservation has been made!</p>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <span class="booking-id">${bookingData.bookingId}</span>
              </div>
              
              <h3 style="color: #1e3a8a; margin-top: 20px;">Guest Information</h3>
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${bookingData.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${bookingData.email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${bookingData.phone}</span>
              </div>
              
              <h3 style="color: #1e3a8a; margin-top: 20px;">Booking Details</h3>
              <div class="detail-row">
                <span class="detail-label">Room:</span>
                <span class="detail-value">${bookingData.roomName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Check-in:</span>
                <span class="detail-value">${new Date(bookingData.checkIn).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Check-out:</span>
                <span class="detail-value">${new Date(bookingData.checkOut).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Guests:</span>
                <span class="detail-value">${bookingData.guests} person(s)</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Nights:</span>
                <span class="detail-value">${bookingData.nights} night(s)</span>
              </div>
              
              <h3 style="color: #1e3a8a; margin-top: 20px;">Payment Information</h3>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value" style="color: ${bookingData.paymentStatus === 'paid' ? '#059669' : '#d97706'}; font-weight: bold;">${bookingData.paymentStatus.toUpperCase()}</span>
              </div>
              <div style="text-align: center; margin-top: 20px; padding: 20px; background: #ecfdf5; border-radius: 8px;">
                <p style="margin: 0; color: #6b7280;">Total Amount</p>
                <p class="amount">₦${bookingData.totalAmount.toLocaleString()}</p>
              </div>
              
              ${bookingData.specialRequests ? `
              <h3 style="color: #1e3a8a; margin-top: 20px;">Special Requests</h3>
              <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24;">${bookingData.specialRequests}</p>
              ` : ''}
            </div>
            <div class="footer">
              <p>This is an automated notification from your Hotel Booking System.</p>
              <p>© ${new Date().getFullYear()} Hotel Management System</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
};

// Send confirmation email to user after successful payment
const sendUserConfirmation = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Hotel Reservations" <${process.env.EMAIL_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmed - ${bookingData.bookingId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .confirmation-badge { background: white; color: #059669; padding: 8px 20px; border-radius: 20px; font-weight: bold; display: inline-block; margin-top: 15px; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
            .booking-id { background: #1e3a8a; color: white; padding: 12px 25px; border-radius: 25px; font-weight: bold; display: inline-block; margin: 15px 0; font-size: 18px; }
            .section { margin-bottom: 25px; }
            .section-title { color: #1e3a8a; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #fbbf24; }
            .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #1f2937; text-align: right; }
            .total-box { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0; }
            .total-amount { font-size: 32px; font-weight: bold; margin: 10px 0; }
            .whatsapp-btn { background: #25d366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 15px 0; font-weight: bold; }
            .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            .social-links { margin: 20px 0; }
            .social-links a { margin: 0 10px; color: #1e3a8a; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmed!</h1>
              <span class="confirmation-badge">✓ PAYMENT SUCCESSFUL</span>
              <p style="margin-top: 15px;">Thank you for choosing our hotel</p>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <p style="color: #6b7280; margin-bottom: 5px;">Your Booking Reference</p>
                <span class="booking-id">${bookingData.bookingId}</span>
              </div>
              
              <div class="info-box">
                <strong>Hello ${bookingData.name},</strong><br>
                Your reservation has been confirmed and payment received. We look forward to welcoming you!
              </div>
              
              <div class="section">
                <div class="section-title">Guest Details</div>
                <div class="detail-row">
                  <span class="detail-label">Full Name</span>
                  <span class="detail-value">${bookingData.name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email</span>
                  <span class="detail-value">${bookingData.email}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Phone</span>
                  <span class="detail-value">${bookingData.phone}</span>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">Reservation Details</div>
                <div class="detail-row">
                  <span class="detail-label">Room Type</span>
                  <span class="detail-value">${bookingData.roomName}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in Date</span>
                  <span class="detail-value">${new Date(bookingData.checkIn).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out Date</span>
                  <span class="detail-value">${new Date(bookingData.checkOut).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Number of Guests</span>
                  <span class="detail-value">${bookingData.guests} person(s)</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Duration</span>
                  <span class="detail-value">${bookingData.nights} night(s)</span>
                </div>
              </div>
              
              <div class="total-box">
                <p style="margin: 0; opacity: 0.9;">Total Amount Paid</p>
                <p class="total-amount">₦${bookingData.totalAmount.toLocaleString()}</p>
                <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Payment Status: ${bookingData.paymentStatus.toUpperCase()}</p>
              </div>
              
              ${bookingData.specialRequests ? `
              <div class="section">
                <div class="section-title">Special Requests</div>
                <p style="background: #f9fafb; padding: 15px; border-radius: 8px;">${bookingData.specialRequests}</p>
              </div>
              ` : ''}
              
              <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f0fdf4; border-radius: 12px;">
                <p style="margin: 0 0 15px 0; color: #166534;">Need assistance? Contact us on WhatsApp</p>
                <a href="${bookingData.whatsappLink}" class="whatsapp-btn">Chat on WhatsApp</a>
              </div>
              
              <div class="info-box" style="background: #fffbeb; border-left-color: #fbbf24;">
                <strong>Check-in Information:</strong><br>
                Check-in time: 2:00 PM<br>
                Check-out time: 12:00 PM<br>
                Please bring a valid ID for verification.
              </div>
            </div>
            <div class="footer">
              <div class="social-links">
                <a href="#">Website</a> | 
                <a href="#">Facebook</a> | 
                <a href="#">Instagram</a>
              </div>
              <p>If you have any questions, please contact us at ${process.env.ADMIN_EMAIL}</p>
              <p>© ${new Date().getFullYear()} Hotel Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending user confirmation:', error);
    return false;
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation
};
