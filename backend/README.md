# Hotel Booking System - Backend

A complete REST API for a hotel booking system built with Node.js, Express, and MongoDB.

## Features

- **Room Management**: Full CRUD operations for hotel rooms
- **Booking System**: Create and manage bookings with unique booking IDs
- **Payment Integration**: Paystack payment processing
- **Email Notifications**: Automated emails for admin and customers using NodeMailer
- **WhatsApp Integration**: Generate WhatsApp contact links
- **Room Availability**: Prevent double bookings with date validation
- **Category Filtering**: Filter rooms by cheap, standard, or luxury categories

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Payment**: Paystack API
- **Email**: NodeMailer
- **Validation**: Express Validator

## Project Structure

```
backend/
├── config/
│   ├── db.js          # MongoDB connection
│   └── seed.js        # Room seed data
├── controllers/
│   ├── roomController.js     # Room CRUD operations
│   ├── bookingController.js  # Booking management
│   └── paymentController.js  # Payment processing
├── middleware/
│   ├── errorHandler.js  # Global error handling
│   └── validation.js    # Request validation
├── models/
│   ├── Room.js      # Room schema
│   └── Booking.js   # Booking schema
├── routes/
│   ├── roomRoutes.js     # Room API routes
│   ├── bookingRoutes.js  # Booking API routes
│   └── paymentRoutes.js  # Payment API routes
├── utils/
│   ├── email.js      # Email service
│   ├── paystack.js   # Paystack integration
│   └── whatsapp.js   # WhatsApp link generator
├── .env.example      # Environment variables template
├── package.json      # Dependencies
├── README.md         # Documentation
└── server.js         # Entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hotel_booking

# Email Configuration (NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@hotel.com

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# WhatsApp Configuration
WHATSAPP_NUMBER=+2348012345678
```

### 3. Setup MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas for cloud hosting.

### 4. Seed the Database

```bash
npm run seed
```

This will create 17 sample rooms across all categories.

### 5. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Rooms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Get all rooms (with filters) |
| GET | `/api/rooms/featured/list` | Get featured rooms |
| GET | `/api/rooms/category/:category` | Get rooms by category |
| GET | `/api/rooms/:id` | Get single room |
| GET | `/api/rooms/:id/availability` | Check room availability |
| POST | `/api/rooms` | Create new room |
| PUT | `/api/rooms/:id` | Update room |
| DELETE | `/api/rooms/:id` | Delete room |

**Query Parameters for GET /api/rooms:**
- `category` - Filter by category (cheap, standard, luxury)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `available` - Show only available rooms (true/false)
- `search` - Search by name or description

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/:id` | Get booking by booking ID |
| GET | `/api/bookings/mongo/:id` | Get booking by MongoDB ID |
| GET | `/api/bookings/user/:email` | Get user's bookings |
| POST | `/api/bookings` | Create new booking |
| POST | `/api/bookings/check-availability` | Check room availability |
| POST | `/api/bookings/:id/pay` | Initialize payment for booking |
| POST | `/api/bookings/verify-payment` | Verify payment |
| PUT | `/api/bookings/:id` | Update booking |
| DELETE | `/api/bookings/:id` | Delete booking |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/initialize` | Initialize payment |
| GET | `/api/payments/verify/:reference` | Verify payment |
| GET | `/api/payments/status/:bookingId` | Get payment status |
| POST | `/api/payments/refund` | Process refund |

## Request/Response Examples

### Create Booking

**Request:**
```json
POST /api/bookings
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+2348012345678",
  "roomId": "657123abc...",
  "checkIn": "2024-01-15",
  "checkOut": "2024-01-18",
  "guests": 2,
  "specialRequests": "Early check-in preferred"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "booking": {
      "bookingId": "HTL-12345",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+2348012345678",
      "roomId": "657123abc...",
      "checkIn": "2024-01-15T00:00:00.000Z",
      "checkOut": "2024-01-18T00:00:00.000Z",
      "guests": 2,
      "nights": 3,
      "totalAmount": 135000,
      "paymentStatus": "pending",
      "whatsappLink": "https://wa.me/..."
    },
    "room": { ... },
    "paymentInfo": {
      "amount": 135000,
      "currency": "NGN"
    }
  }
}
```

### Initialize Payment

**Request:**
```json
POST /api/bookings/:id/pay
```

**Response:**
```json
{
  "success": true,
  "message": "Payment initialized successfully",
  "data": {
    "authorization_url": "https://checkout.paystack.com/...",
    "reference": "PAYSTACK_REF_123",
    "access_code": "access_code_here"
  }
}
```

### Verify Payment

**Request:**
```json
POST /api/bookings/verify-payment
{
  "reference": "PAYSTACK_REF_123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "booking": { ... },
    "payment": {
      "status": "success",
      "amount": 135000,
      "paid_at": "2024-01-10T12:00:00.000Z"
    }
  }
}
```

## Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### Other Email Providers

Update `EMAIL_HOST` and `EMAIL_PORT` accordingly:
- Outlook: `smtp.office365.com`, port `587`
- Yahoo: `smtp.mail.yahoo.com`, port `587`

## Paystack Configuration

1. Create an account at [Paystack](https://paystack.com)
2. Get your API keys from the dashboard
3. Use test keys for development
4. Update `PAYSTACK_SECRET_KEY` and `PAYSTACK_PUBLIC_KEY`

## Room Categories & Pricing

| Category | Price Range | Description |
|----------|-------------|-------------|
| Cheap | ₦15,000 - ₦35,000 | Budget-friendly rooms with essential amenities |
| Standard | ₦40,000 - ₦80,000 | Comfortable rooms with modern amenities |
| Luxury | ₦100,000 - ₦250,000 | Premium suites with exclusive features |

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "status": "fail",
  "message": "Error description",
  "errors": [
    { "field": "email", "message": "Please provide a valid email" }
  ]
}
```

## License

MIT
