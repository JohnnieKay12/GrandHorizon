import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState([]);
    const [occupancy, setOccupancy] = useState([]);
    const [summary, setSummary] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        avgOccupancy: 0,
    });

    const fetchReports = async () => {
        try {
            const [rev, occ] = await Promise.all([
                api.get("/admin/reports/revenue"),
                api.get("/admin/reports/occupancy"),
            ]);

            setRevenue(rev.data || []);
            setOccupancy(occ.data || []);

            // ✅ Compute KPIs properly
            const totalRevenue = rev.data.reduce((acc, r) => acc + r.total, 0);
            const totalBookings = rev.data.reduce((acc, r) => acc + r.bookings, 0);

            setSummary({
                totalRevenue,
                totalBookings,
                avgOccupancy: occ.summary?.avgOccupancy || 0,
            });

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Reports Dashboard</h1>

            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <>
                    {/* KPI */}
                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Total Revenue</p>
                            <h2 className="text-xl font-bold">
                                ₦{summary.totalRevenue.toLocaleString()}
                            </h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Total Bookings</p>
                            <h2 className="text-xl font-bold">
                                {summary.totalBookings}
                            </h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Avg Occupancy</p>
                            <h2 className="text-xl font-bold">
                                {summary.avgOccupancy}%
                            </h2>
                        </div>

                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Revenue Trend</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#1E3A8A" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Booking Trend */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Bookings Trend</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="bookings" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Occupancy Chart */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Occupancy Over Time</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={occupancy}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="occupiedRooms" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default Reports;