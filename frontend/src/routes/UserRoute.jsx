import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default UserRoute;