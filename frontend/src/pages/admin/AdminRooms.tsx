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

  useEffect(() => {
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

    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    setActionLoading(id);
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  };

  const toggleAvailability = async (room) => {
    setActionLoading(room._id);
    try {
      const updated = { ...room, isAvailable: !room.isAvailable };

      await axios.put(
        `http://localhost:5000/api/rooms/${room._id}`,
        updated
      );

      setRooms((prev) =>
        prev.map((r) => (r._id === room._id ? updated : r))
      );

      toast.success("Updated");
    } catch {
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.description) {
      toast.error("Fill required fields");
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

        toast.success("Updated");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/rooms",
          payload
        );

        setRooms((prev) => [...prev, res.data.data]);
        toast.success("Added");
      }

      setShowModal(false);
      setEditingRoom(null);
    } catch {
      toast.error("Failed");
    } finally {
      setActionLoading(null);
    }
  };

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

  return (
    <div className="p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Rooms</h1>

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
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          + Add Room
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search room..."
          className="border px-3 py-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="all">All Categories</option>
          <option value="luxury">Luxury</option>
          <option value="standard">Standard</option>
          <option value="cheap">Cheap</option>
        </select>

        <select
          onChange={(e) => setFilterAvailability(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRooms.map((room) => (
            <div key={room._id} className="bg-white rounded-xl shadow overflow-hidden">

              <img
                src={room.images?.[0] || "https://via.placeholder.com/300"}
                className="h-40 sm:h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="font-semibold text-base sm:text-lg">
                  {room.name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 capitalize">
                  {room.category}
                </p>

                <p className="font-bold mt-2">
                  ₦{room.price?.toLocaleString()}
                </p>

                <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                  room.isAvailable
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {room.isAvailable ? "Available" : "Unavailable"}
                </span>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 mt-4 text-xs sm:text-sm">

                  <button
                    onClick={() => toggleAvailability(room)}
                    className="px-3 py-1 bg-gray-600 text-white rounded"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => {
                      setEditingRoom(room);
                      setForm({ ...room, images: room.images?.[0] });
                      setShowModal(true);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(room._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-4 sm:p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-bold mb-4">
              {editingRoom ? "Edit Room" : "Add Room"}
            </h2>

            <input
              placeholder="Name"
              className="w-full border p-2 mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full border p-2 mb-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 mb-2"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;