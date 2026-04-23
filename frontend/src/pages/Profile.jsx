import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
    FiUser,
    FiMail,
    FiPhone,
    FiEdit2,
    FiSave,
    FiLogOut,
} from "react-icons/fi";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, logout, isLoading, updateProfile } = useAuth();

    if (isLoading)
        return <div className="pt-32 text-center">Loading...</div>;
    if (!user)
        return <div className="pt-32 text-center">No user data</div>;

    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);

        const res = await updateProfile(formData);

        if (res.success) {
            toast.success(res.message);
            setIsEditing(false);
        } else {
            toast.error(res.message);
        }

        setSaving(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4">

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 space-y-10"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-serif font-bold">
                            Manage Account
                        </h1>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary-900 text-white rounded-lg shadow hover:opacity-90"
                            >
                                <FiEdit2 /> Edit
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow"
                                >
                                    <FiSave />
                                    {saving ? "Saving..." : "Save"}
                                </button>

                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({
                                        name: user.name,
                                        email: user.email,
                                        phone: user.phone || "",
                                        });
                                    }}
                                        className="px-4 py-2 border rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PROFILE HEADER */}
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-primary-900 text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
                            {user?.avatar && user.avatar.startsWith("http") ? (
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                user?.name?.charAt(0).toUpperCase()
                            )}
                        </div>

                        <div>
                            <p className="text-xl font-semibold">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* FORM SECTION */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">
                            Personal Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* NAME */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Full Name
                                </label>
                                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-primary-500">
                                    <FiUser />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full outline-none bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Email
                                </label>
                                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1 bg-gray-50">
                                    <FiMail />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full outline-none bg-transparent cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* PHONE */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    Phone
                                </label>
                                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-primary-500">
                                    <FiPhone />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter phone number"
                                        className="w-full outline-none bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LOGOUT */}
                    <div className="border-t pt-6">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-red-500 font-medium hover:opacity-80"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;