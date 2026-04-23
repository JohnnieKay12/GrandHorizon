import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  })

  const updateBookingData = (newData) => {
    setBookingData((prev) => ({ ...prev, ...newData }))
  }

  const clearBookingData = () => {
    setBookingData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 1,
      specialRequests: '',
    })
    setCurrentBooking(null)
  }

  const setBooking = (booking) => {
    setCurrentBooking(booking)
  }

  const value = {
    currentBooking,
    bookingData,
    updateBookingData,
    clearBookingData,
    setBooking,
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}
