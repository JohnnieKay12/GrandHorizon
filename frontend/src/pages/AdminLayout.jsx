import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-white text-black font-semibold shadow"
        : "text-gray-300 hover:text-yellow-400"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔥 MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-primary-900 text-white flex items-center justify-between px-4 py-3 z-50">
        <h2 className="font-bold">Admin</h2>
        <button onClick={() => setIsOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* 🔥 SIDEBAR (DESKTOP) */}
      <div className="hidden lg:flex w-64 bg-primary-900 text-white p-5 flex-col space-y-4">
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

      {/* 🔥 MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-primary-900 text-white p-5 transform transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Admin Panel</h2>
            <button onClick={() => setIsOpen(false)}>
              <FiX size={22} />
            </button>
          </div>

          <NavLink to="/admin" end className={linkClass} onClick={() => setIsOpen(false)}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/bookings" className={linkClass} onClick={() => setIsOpen(false)}>
            Bookings
          </NavLink>

          <NavLink to="/admin/rooms" className={linkClass} onClick={() => setIsOpen(false)}>
            Rooms
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass} onClick={() => setIsOpen(false)}>
            Reports
          </NavLink>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-4 pt-20 lg:pt-6 lg:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;