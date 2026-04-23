# Grand Horizon Hotel - Frontend

A modern, responsive React frontend for the Hotel Booking System built with Vite, Tailwind CSS, and Framer Motion.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Beautiful page transitions and scroll animations using Framer Motion
- **Hero Carousel**: Auto-sliding hero section with 4 background images and animated text
- **Room Filtering**: Filter rooms by category (Cheap, Standard, Luxury)
- **Booking Flow**: Complete booking process with availability checking
- **Payment Integration**: Paystack payment processing
- **WhatsApp Integration**: Direct contact links for customer support
- **Multiple Pages**: Home, Rooms, Room Details, Booking, About, Contact, Gallery, and Footer pages

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns
- **Carousel**: Swiper

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── RoomCard.jsx
│   │   ├── Features.jsx
│   │   ├── Testimonials.jsx
│   │   ├── GoogleMap.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── SectionTitle.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Rooms.jsx
│   │   ├── RoomDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── BookingConfirmation.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Gallery.jsx
│   │   └── footer/      # Footer pages
│   │       ├── FAQ.jsx
│   │       ├── Terms.jsx
│   │       ├── Privacy.jsx
│   │       ├── Refund.jsx
│   │       ├── Services.jsx
│   │       ├── Careers.jsx
│   │       ├── Blog.jsx
│   │       └── Support.jsx
│   ├── context/         # React Context
│   │   └── BookingContext.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── utils/           # Utility functions
│   │   └── helpers.js
│   ├── assets/          # Static assets
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Pages

| Page | Description |
|------|-------------|
| `/` | Home page with hero carousel, featured rooms, testimonials |
| `/rooms` | Room listing with category filtering |
| `/rooms/:id` | Single room details with booking form |
| `/booking/:roomId` | Complete booking form |
| `/booking-confirmation/:bookingId` | Booking confirmation and payment |
| `/about` | About the hotel and team |
| `/contact` | Contact form and information |
| `/gallery` | Photo gallery with lightbox |
| `/faq` | Frequently asked questions |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |
| `/refund` | Refund policy |
| `/services` | Hotel services and amenities |
| `/careers` | Job openings |
| `/blog` | Blog posts |
| `/support` | Customer support |

## Design System

### Colors

- **Primary**: `#1e3a8a` (Deep Blue)
- **Gold**: `#fbbf24` (Accent)
- **Background**: `#f9fafb` (Light Gray)
- **Text**: `#1f2937` (Dark Gray)

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Currency

All prices are displayed in **Nigerian Naira (₦)**

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. 

Key endpoints:
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get single room
- `POST /api/bookings` - Create booking
- `POST /api/bookings/:id/pay` - Initialize payment
- `POST /api/bookings/verify-payment` - Verify payment

## Customization

### Changing Hero Images

Edit the `heroSlides` array in `src/components/Hero.jsx`:

```javascript
const heroSlides = [
  {
    id: 1,
    image: 'your-image-url',
    title: 'Your Title',
    subtitle: 'Your Subtitle',
    description: 'Your description',
  },
  // ...
]
```

### Adding New Rooms

Rooms are managed through the backend. Use the seed script or API to add rooms.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
