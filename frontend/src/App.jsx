import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layout Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import VerifyPayment from './pages/VerifyPayment'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import MyBookings from "./pages/MyBookings";
import Profile from './pages/Profile';
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';

// Footer Pages
import FAQ from './pages/footer/FAQ'
import Terms from './pages/footer/Terms'
import Privacy from './pages/footer/Privacy'
import Refund from './pages/footer/Refund'
import Services from './pages/footer/Services'
import Careers from './pages/footer/Careers'
import Blog from './pages/footer/Blog'
import Support from './pages/footer/Support'

// Context
import { BookingProvider } from './context/BookingContext'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLayout from "./pages/AdminLayout";
import Bookings from "./pages/admin/Bookings";
import AdminRooms from "./pages/admin/AdminRooms";
import Reports from "./pages/admin/Reports";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './components/Toast'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <ToastProvider>
          <BookingProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-gray-50">
              
              {/* Hide Navbar in Admin */}
              {!isAdminPage && <Navbar />}

              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Main Pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/rooms/:id" element={<RoomDetails />} />
                    <Route path="/booking/:roomId" element={<Booking />} />
                    <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
                    <Route path="/payment/verify" element={<VerifyPayment />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<Gallery />} />

                    <Route element={<UserRoute />}>
                      <Route path="/my-bookings" element={<MyBookings />} />
                      <Route path="/profile" element={<Profile />} />
                    </Route>

                    {/* Admin */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route path="rooms" element={<AdminRooms />} />
                        <Route path="reports" element={<Reports />} />
                      </Route>
                    </Route>

                    {/* Footer Pages */}
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/refund" element={<Refund />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/support" element={<Support />} />
                  </Routes>
                </AnimatePresence>
              </main>

              {/* Hide Footer in Admin */}
              {!isAdminPage && <Footer />}

            </div>
          </BookingProvider>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
    
  );
}

export default App
