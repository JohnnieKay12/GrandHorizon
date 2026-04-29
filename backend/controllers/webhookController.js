const crypto = require('crypto');
const Booking = require('../models/Booking');

const handlePaystackWebhook = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;

    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    // 🔒 VERIFY PAYSTACK SIGNATURE
    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(401).send('Invalid signature');
    }

    const event = req.body;

    // 🎯 PAYMENT SUCCESS EVENT
    if (event.event === 'charge.success') {
      const reference = event.data.reference;

      console.log("🔥 Webhook received for:", reference);

      const booking = await Booking.findOne({
        paystackReference: reference,
      }).populate('roomId');

      if (!booking) {
        console.log("❌ Booking not found");
        return res.sendStatus(200);
      }

      // Avoid duplicate update
      if (booking.paymentStatus === 'paid') {
        return res.sendStatus(200);
      }

      // ✅ UPDATE BOOKING
      booking.paymentStatus = 'paid';
      booking.bookingStatus = 'confirmed';
      await booking.save();

      console.log("✅ Booking updated via webhook");

      // (Optional) Send emails in background
      // Same logic you already have

      return res.sendStatus(200);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};

module.exports = { handlePaystackWebhook };