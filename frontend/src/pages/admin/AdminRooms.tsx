import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterAvailability, setFilterAvailability] = useState("all");

    const [actionLoading, setActionLoading] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "standard",
        price: "",
        images: "",
        description: "",
        amenities: [],
        maxGuests: 2,
        bedType: "",
        roomSize: "",
        isAvailable: true,
    });

    // 📡 Fetch
    const fetchRooms = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/rooms");
            setRooms(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // 🗑 Delete
    const handleDelete = async (id) => {
        if (!confirm("Delete this room?")) return;
    
        setActionLoading(id);
    
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${id}`);
            setRooms((prev) => prev.filter((r) => r._id !== id));
            toast.success("Room deleted");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete room");
        } finally {
            setActionLoading(null);
        }
    };

    // 🔄 Toggle
    const toggleAvailability = async (room) => {
        setActionLoading(room._id);
    
        try {
            const updated = { ...room, isAvailable: !room.isAvailable };
    
            await axios.put(
                `http://localhost:5000/api/rooms/${room._id}`,
                updated
            );
    
            setRooms((prev) =>
                prev.map((r) =>
                    r._id === room._id ? updated : r
                )
            );
    
            toast.success("Availability updated");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update");
        } finally {
            setActionLoading(null);
        }
    };

    // ➕ ADD / ✏️ EDIT SAVE
    const handleSave = async () => {

        if (!form.name || !form.price || !form.description) {
            toast.error("Please fill all required fields");
            return;
        }

        const payload = {
            ...form,
            price: Number(form.price),
            maxGuests: Number(form.maxGuests),
            images: [form.images],
        };
    
        setActionLoading("save");
    
        try {
            if (editingRoom) {
                const res = await axios.put(
                    `http://localhost:5000/api/rooms/${editingRoom._id}`,
                    payload
                );
    
                setRooms((prev) =>
                    prev.map((r) =>
                        r._id === editingRoom._id ? res.data.data : r
                    )
                );
    
                toast.success("Room updated");
            } else {
                const res = await axios.post(
                    "http://localhost:5000/api/rooms",
                    payload
                );
    
                setRooms((prev) => [...prev, res.data.data]);
    
                toast.success("Room added");
            }
    
            setShowModal(false);
            setEditingRoom(null);
            setForm({
                name: "",
                category: "standard",
                price: "",
                images: "",
                description: "",
                amenities: [],
                maxGuests: 2,
                bedType: "",
                roomSize: "",
                isAvailable: true,
            });
        } catch (err) {
            console.error(err);
            toast.error("Save failed");
        } finally {
            setActionLoading(null);
        }
    };

    // 🔍 FILTER LOGIC
    const filteredRooms = rooms.filter((r) => {
        return (
            r.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterCategory === "all" || r.category === filterCategory) &&
            (filterAvailability === "all" ||
                (filterAvailability === "available"
                    ? r.isAvailable
                    : !r.isAvailable))
        );
    });

    const amenitiesList = [
        "Free WiFi",
        "Smart TV",
        "Mini Bar",
        "Air Conditioning",
        "Balcony",
        "Swimming Pool",
        "Breakfast",
        "Parking",
    ];

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex flex-wrap gap-4 justify-between mb-6">
                <h1 className="text-2xl font-bold">Rooms</h1>

                <button
                    onClick={() => {
                        setEditingRoom(null);
                        setForm({
                            name: "",
                            category: "standard",
                            price: "",
                            images: "",
                            description: "",
                            amenities: [],
                            maxGuests: 2,
                            bedType: "",
                            roomSize: "",
                            isAvailable: true,
                        });
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add Room
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search room..."
                    className="border px-3 py-2 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="all">All Categories</option>
                    <option value="luxury">Luxury</option>
                    <option value="standard">Standard</option>
                    <option value="cheap">Cheap</option>
                </select>

                <select
                    onChange={(e) => setFilterAvailability(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map((room) => (
                        <div key={room._id} className="bg-white rounded-xl shadow">

                            <img
                                src={room.images?.[0] || "https://via.placeholder.com/300"}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4">
                                <h2 className="font-semibold">{room.name}</h2>

                                <p className="text-sm text-gray-500 capitalize">
                                    {room.category}
                                </p>

                                <p className="font-bold mt-2">
                                    ₦{room.price?.toLocaleString()}
                                </p>

                                <span
                                    className={`px-2 py-1 text-xs rounded ${
                                        room.isAvailable
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {room.isAvailable ? "Available" : "Unavailable"}
                                </span>

                                {/* Actions */}
                                <div className="flex justify-between mt-4 text-sm items-center">

                                    {/* Toggle Button */}
                                    <button
                                        onClick={() => toggleAvailability(room)}
                                        disabled={actionLoading === room._id}
                                        className={`px-3 py-1 rounded text-white ${
                                            room.isAvailable ? "bg-green-500" : "bg-gray-500"
                                        }`}
                                    >
                                        {actionLoading === room._id
                                            ? "..."
                                            : room.isAvailable
                                            ? "Disable"
                                            : "Enable"}
                                    </button>

                                    {/* Edit */}
                                    <button
                                        onClick={() => {
                                            setEditingRoom(room);
                                            setForm({
                                                name: room.name,
                                                category: room.category,
                                                price: room.price,
                                                images: room.images?.[0],
                                                description: room.description || "",
                                                amenities: room.amenities || [],
                                                maxGuests: room.maxGuests || 2,
                                                bedType: room.bedType || "",
                                                roomSize: room.roomSize || "",
                                                isAvailable: room.isAvailable,
                                            });
                                            setShowModal(true);
                                        }}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </button>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        disabled={actionLoading === room._id}
                                        className="text-red-600"
                                    >
                                        {actionLoading === room._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-full max-w-md">

                        <h2 className="text-lg font-bold mb-4">
                            {editingRoom ? "Edit Room" : "Add Room"}
                        </h2>

                        <input
                            placeholder="Name"
                            className="w-full border p-2 mb-2"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <select
                            className="w-full border p-2 mb-2"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        >
                            <option value="luxury">Luxury</option>
                            <option value="standard">Standard</option>
                            <option value="cheap">Cheap</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full border p-2 mb-2"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />

                        <input
                            placeholder="Image URL"
                            className="w-full border p-2 mb-2"
                            value={form.images}
                            onChange={(e) =>
                                setForm({ ...form, images: e.target.value })
                            }
                        />

                        <div className="mb-3">
                            <p className="font-semibold mb-2">Amenities</p>

                            <div className="grid grid-cols-2 gap-2">
                                {amenitiesList.map((item) => (
                                    <label key={item} className="text-sm">
                                        <input
                                            type="checkbox"
                                            checked={form.amenities.includes(item)}
                                            onChange={() => {
                                                if (form.amenities.includes(item)) {
                                                    setForm({
                                                        ...form,
                                                        amenities: form.amenities.filter(a => a !== item)
                                                    });
                                                } else {
                                                    setForm({
                                                        ...form,
                                                        amenities: [...form.amenities, item]
                                                    });
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <input
                            type="number"
                            placeholder="Max Guests"
                            className="w-full border p-2 mb-2"
                            value={form.maxGuests}
                            onChange={(e) =>
                                setForm({ ...form, maxGuests: e.target.value })
                            }
                        />

                        <input
                            placeholder="Bed Type (e.g King Size)"
                            className="w-full border p-2 mb-2"
                            value={form.bedType}
                            onChange={(e) =>
                                setForm({ ...form, bedType: e.target.value })
                            }
                        />

                        <input
                            placeholder="Room Size (e.g 60 sqm)"
                            className="w-full border p-2 mb-2"
                            value={form.roomSize}
                            onChange={(e) =>
                                setForm({ ...form, roomSize: e.target.value })
                            }
                        />



                        <textarea
                            placeholder="Description"
                            className="w-full border p-2 mb-2"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={actionLoading === "save"}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                {actionLoading === "save" ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;