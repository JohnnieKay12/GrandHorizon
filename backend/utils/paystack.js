const axios = require('axios');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize a transaction
const initializePayment = async (email, amount, metadata = {}) => {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
        metadata,
        callback_url: metadata.callback_url || `${process.env.FRONTEND_URL}/payment/verify`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Payment initialization failed'
    };
  }
};

// Verify a transaction
const verifyPayment = async (reference) => {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Payment verification failed'
    };
  }
};

// Create a refund
const createRefund = async (transactionId, amount = null) => {
  try {
    const payload = { transaction: transactionId };
    if (amount) {
      payload.amount = amount * 100; // Convert to kobo
    }

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/refund`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Paystack refund error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || 'Refund creation failed'
    };
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
  createRefund
};
