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
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/dashboard`);
            setData(res.data.data);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const chartData = data.rooms.byCategory.map((item) => ({
        name: item._id,
        rooms: item.count,
    }));

    return (
        <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">

            {/* 🔥 HEADER */}
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-gray-800">
                Admin Dashboard
            </h1>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">

                <div className="bg-white p-4 lg:p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Bookings</p>
                        <h2 className="text-xl lg:text-2xl font-bold text-blue-600">
                        {data.bookings.total}
                        </h2>
                    </div>
                    <FaBed className="text-2xl lg:text-3xl text-blue-500" />
                </div>

                <div className="bg-white p-4 lg:p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Confirmed</p>
                        <h2 className="text-xl lg:text-2xl font-bold text-green-600">
                        {data.bookings.confirmed}
                        </h2>
                    </div>
                    <FaMoneyBillWave className="text-2xl lg:text-3xl text-green-500" />
                </div>

                <div className="bg-white p-4 lg:p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Pending</p>
                        <h2 className="text-xl lg:text-2xl font-bold text-yellow-500">
                        {data.bookings.pending}
                        </h2>
                    </div>
                    <FaClock className="text-2xl lg:text-3xl text-yellow-500" />
                </div>

                <div className="bg-white p-4 lg:p-5 rounded-xl shadow flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm">Revenue</p>
                        <h2 className="text-xl lg:text-2xl font-bold text-purple-600">
                        {data.revenue.formattedTotal}
                        </h2>
                    </div>
                    <FaMoneyBillWave className="text-2xl lg:text-3xl text-purple-500" />
                </div>

            </div>

            {/* 🔥 CHART + CALENDAR */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

                {/* 📊 CHART */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow lg:col-span-2">
                    <h2 className="font-semibold mb-4 text-sm lg:text-base">
                        Room Categories
                    </h2>

                    <div className="w-full h-[220px] sm:h-[250px] lg:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="rooms" fill="#1E3A8A" radius={[6, 6, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 📅 CALENDAR */}
                <div className="bg-white p-4 lg:p-5 rounded-xl shadow">
                    <h2 className="font-semibold mb-4 text-sm lg:text-base">
                        Booking Calendar
                    </h2>

                    <div className="w-full overflow-hidden">
                        <Calendar
                        onChange={setDate}
                        value={date}
                        className="w-full border-none"
                        />
                    </div>
                </div>

            </div>

            {/* 📋 BOOKINGS TABLE */}
            <div className="bg-white p-4 lg:p-5 rounded-xl shadow mt-6">
                <h2 className="font-semibold mb-4 text-sm lg:text-base">
                    Recent Bookings
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-sm">
                        <thead>
                            <tr className="border-b text-gray-500 text-left">
                                <th className="py-2">Guest</th>
                                <th className="py-2">Room</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Status</th>
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
                                            className={`px-3 py-1 rounded-full text-xs lg:text-sm ${
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