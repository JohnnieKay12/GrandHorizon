import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaBed,
    FaMoneyBillWave,
    FaClock
} from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(new Date());

    const fetchDashboard = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/dashboard");
            setData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!data) return <p className="text-center mt-20">Loading...</p>;

    // 📊 Chart Data (Rooms Category)
    const chartData = data.rooms.byCategory.map((item) => ({
        name: item._id,
        rooms: item.count,
    }));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Admin Dashboard
            </h1>

            {/* 🔥 Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                <div className="bg-white p-5 rounded-xl shadow flex justify-between">
                    <div>
                        <p className="text-gray-500">Bookings</p>
                        <h2 className="text-2xl font-bold text-blue-600">
                            {data.bookings.total}
                        </h2>
                    </div>
                    <FaBed className="text-3xl text-blue-500" />
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex justify-between">
                    <div>
                        <p className="text-gray-500">Confirmed</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            {data.bookings.confirmed}
                        </h2>
                    </div>
                    <FaMoneyBillWave className="text-3xl text-green-500" />
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex justify-between">
                    <div>
                        <p className="text-gray-500">Pending</p>
                        <h2 className="text-2xl font-bold text-yellow-500">
                            {data.bookings.pending}
                        </h2>
                    </div>
                    <FaClock className="text-3xl text-yellow-500" />
                </div>

                <div className="bg-white p-5 rounded-xl shadow flex justify-between">
                    <div>
                        <p className="text-gray-500">Revenue</p>
                        <h2 className="text-2xl font-bold text-purple-600">
                            {data.revenue.formattedTotal}
                        </h2>
                    </div>
                    <FaMoneyBillWave className="text-3xl text-purple-500" />
                </div>

            </div>

            {/* 🔥 GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 📊 CHART */}
                <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
                    <h2 className="font-semibold mb-4">Room Categories</h2>

                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="rooms" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 📅 CALENDAR */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="font-semibold mb-4">Booking Calendar</h2>
                    <Calendar onChange={setDate} value={date} />
                </div>

            </div>

            {/* 📋 BOOKINGS TABLE */}
            <div className="bg-white p-5 rounded-xl shadow mt-6">
                <h2 className="font-semibold mb-4">Recent Bookings</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-2 text-left">Guest</th>
                                <th className="py-2 text-left">Room</th>
                                <th className="py-2 text-left">Amount</th>
                                <th className="py-2 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.recentBookings.map((b) => (
                                <tr key={b._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">{b.name}</td>
                                    <td>{b.roomId?.name}</td>
                                    <td>₦{b.totalAmount.toLocaleString()}</td>
                                    <td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;