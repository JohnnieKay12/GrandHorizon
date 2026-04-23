import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-white text-black font-semibold shadow"
        : "text-gray-300 hover:text-yellow-400"
    }`;

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-primary-900 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/bookings" className={linkClass}>
          Bookings
        </NavLink>

        <NavLink to="/admin/rooms" className={linkClass}>
          Rooms
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          Reports
        </NavLink>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;