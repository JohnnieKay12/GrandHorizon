import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="pt-32 text-center">Loading...</div>;
    }

    // ❌ Not logged in
    if (!user) {
        return <Navigate to="/login?role=admin" replace />;
    }

    // ❌ Not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // ✅ Admin allowed
    return <Outlet />;
};

export default AdminRoute;