# Grand Horizon Hotel - Full-Stack Booking System

A complete, production-ready hotel booking system with a React frontend and Node.js backend.

## Project Overview

Grand Horizon Hotel is a luxury hotel booking platform featuring:
- **17 rooms** across 3 categories (Cheap, Standard, Luxury)
- **Online booking** with availability checking
- **Paystack payment** integration
- **Email notifications** for admin and customers
- **WhatsApp integration** for customer support
- **Responsive design** with smooth animations

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Payment**: Paystack API
- **Email**: NodeMailer
- **Validation**: Express Validator

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons

## Project Structure

```
hotel-booking-system/
├── backend/              # Node.js + Express API
│   ├── config/          # Database & seed data
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Validation & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Email, Paystack, WhatsApp
│   └── server.js        # Entry point
│
└── frontend/            # React + Vite app
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page components
    │   ├── context/     # React Context
    │   ├── services/    # API services
    │   └── utils/       # Helper functions
    └── index.html
```

## Features

### Backend Features
- ✅ Room CRUD API (Create, Read, Update, Delete)
- ✅ Booking system with unique HTL-XXXXX IDs
- ✅ Room availability checking (prevents double bookings)
- ✅ Paystack payment integration
- ✅ Email notifications (admin & customer)
- ✅ WhatsApp link generation
- ✅ Input validation & error handling
- ✅ 17 pre-seeded rooms

### Frontend Features
- ✅ Auto-sliding hero carousel (4 images)
- ✅ Room filtering by category
- ✅ Booking flow with availability check
- ✅ Payment integration
- ✅ Responsive design
- ✅ Smooth animations
- ✅ All footer pages (FAQ, Terms, Privacy, etc.)

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Paystack account (for payments)
- Gmail account (for emails)

### 1. Clone and Setup

```bash
cd hotel-booking-system
```

### 2. Setup Backend

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Seed database
npm run seed

# Start server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel_booking
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@hotel.com
PAYSTACK_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:5173
WHATSAPP_NUMBER=+2348012345678
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
```

## API Endpoints

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get single room |
| POST | `/api/rooms` | Create room |
| PUT | `/api/rooms/:id` | Update room |
| DELETE | `/api/rooms/:id` | Delete room |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/:id` | Get booking |
| POST | `/api/bookings/:id/pay` | Initialize payment |
| POST | `/api/bookings/verify-payment` | Verify payment |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero carousel |
| `/rooms` | Room listing with filters |
| `/rooms/:id` | Room details |
| `/booking/:roomId` | Booking form |
| `/booking-confirmation/:id` | Confirmation & payment |
| `/about` | About the hotel |
| `/contact` | Contact form |
| `/gallery` | Photo gallery |
| `/faq`, `/terms`, `/privacy`, `/refund` | Footer pages |

## Currency

All prices are in **Nigerian Naira (₦)**

## Room Categories & Pricing

| Category | Price Range |
|----------|-------------|
| Cheap | ₦15,000 - ₦35,000 |
| Standard | ₦40,000 - ₦80,000 |
| Luxury | ₦100,000 - ₦250,000 |

## Screenshots

### Homepage
- Hero carousel with auto-sliding images
- Featured rooms section
- Testimonials
- Google Maps integration

### Rooms Page
- Category filtering (All, Cheap, Standard, Luxury)
- Search functionality
- Price range filters

### Booking Flow
- Availability checking
- Guest information form
- Paystack payment
- Confirmation page with WhatsApp link

## Development

### Backend Scripts
```bash
npm run dev      # Start with nodemon
npm start        # Start production
npm run seed     # Seed database with rooms
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

### Backend (e.g., Render, Railway, Heroku)
1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy from GitHub

### Frontend (e.g., Vercel, Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or issues, please contact:
- Email: support@grandhorizon.com
- Phone: +234 801 234 5678

---

**Built with ❤️ for the hospitality industry**
