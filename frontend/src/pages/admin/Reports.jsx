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

      const totalRevenue = rev.data.reduce((acc, r) => acc + r.total, 0);
      const totalBookings = rev.data.reduce((acc, r) => acc + r.bookings, 0);

      setSummary({
        totalRevenue,
        totalBookings,
        avgOccupancy: occ.data?.summary?.avgOccupancy || 0,
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
    <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
        Reports Dashboard
      </h1>

      {loading ? (
        <p className="text-center mt-10">Loading reports...</p>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-lg lg:text-xl font-bold">
                ₦{summary.totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h2 className="text-lg lg:text-xl font-bold">
                {summary.totalBookings}
              </h2>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Avg Occupancy</p>
              <h2 className="text-lg lg:text-xl font-bold">
                {summary.avgOccupancy}%
              </h2>
            </div>

          </div>

          {/* REVENUE CHART */}
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4 text-sm lg:text-base">
              Revenue Trend
            </h2>

            <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#1E3A8A" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BOOKINGS + OCCUPANCY (STACK ON MOBILE) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

            {/* BOOKINGS TREND */}
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4 text-sm lg:text-base">
                Bookings Trend
              </h2>

              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#16A34A" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* OCCUPANCY */}
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow">
              <h2 className="font-semibold mb-4 text-sm lg:text-base">
                Occupancy Over Time
              </h2>

              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancy}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="occupiedRooms"
                      stroke="#F59E0B"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Reports;