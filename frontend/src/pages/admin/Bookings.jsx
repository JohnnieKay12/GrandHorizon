import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/bookings");
            setBookings(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // 🔍 Filter bookings
    const filteredBookings = bookings.filter((b) =>
        b.name?.toLowerCase().includes(search.toLowerCase())
    );

    // 📅 Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Bookings</h1>

                <input
                    type="text"
                    placeholder="Search guest..."
                    className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
            
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">Guest</th>
                            <th className="p-4">Room</th>
                            <th className="p-4">Check-in</th>
                            <th className="p-4">Check-out</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Booking</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center p-6 text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            filteredBookings.map((b) => (
                                <tr
                                    key={b._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-4 font-medium">{b.name}</td>

                                    <td className="p-4 text-gray-600">
                                        {b.roomId?.name || "N/A"}
                                    </td>

                                    <td className="p-4">{formatDate(b.checkIn)}</td>

                                    <td className="p-4">{formatDate(b.checkOut)}</td>

                                    <td className="p-4 font-semibold">
                                        ₦{b.totalAmount?.toLocaleString()}
                                    </td>

                                    {/* Payment Status */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                b.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {b.paymentStatus}
                                        </span>
                                    </td>

                                    {/* Booking Status */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                b.bookingStatus === "confirmed"
                                                ? "bg-blue-100 text-blue-600"
                                                : b.bookingStatus === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : b.bookingStatus === "cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {b.bookingStatus}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 text-center space-x-2">
                                        <button
                                            onClick={() => navigate(`/booking-confirmation/${bookingId}`)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </button>

                                        <button className="text-red-500 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;