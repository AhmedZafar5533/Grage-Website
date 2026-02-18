import React, { useEffect, useState, useCallback } from "react";
import { useBookingStore } from "../../Store/BookingStore";
import BookingView from "../../Components/Admin/BookingView";
import DeleteBookingModal from "../../Components/Admin/DeleteBookingModal";
import { FiUser, FiPhone, FiMail, FiCalendar, FiTruck } from "react-icons/fi";

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const AllBookings = () => {
  const { adminBookings, adminLoading, fetchAdminBookings } = useBookingStore();

  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDeleteBooking, setSelectedDeleteBooking] = useState(null);

  useEffect(() => {
    fetchAdminBookings();
  }, []);

  const debouncedFetch = useCallback(
    debounce((value) => fetchAdminBookings(value), 300),
    []
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetch(value);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-neutral-950 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        All Bookings
      </h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by car model..."
        value={search}
        onChange={onSearchChange}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Booking cards */}
      {adminLoading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      ) : adminBookings.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminBookings.map((b) => (
            <div
              key={b._id}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* New badge */}
              {b.newBooking && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold text-xs animate-pulse">
                  New
                </span>
              )}

              {/* Vehicle Section */}
              <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20">
                {b.vehicle.image ? (
                  <img
                    src={b.vehicle.image}
                    alt={b.vehicle.title}
                    className="w-28 h-20 rounded-lg object-cover border-2 border-yellow-400 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-20 rounded-lg bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                    <FiTruck className="text-yellow-400 text-3xl" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    <FiTruck className="text-yellow-400" />
                    {b.vehicle.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Model: <span className="font-semibold">{b.vehicle.model}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Reg#: <span className="font-semibold">{b.vehicle.registration}</span>
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-neutral-700"></div>

              {/* User Section */}
              <div className="p-4 bg-gray-50 dark:bg-neutral-800/50">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FiUser className="text-yellow-400" /> User Info
                </h4>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                  <FiUser className="text-yellow-400" /> <span className="font-medium">{b.user.name}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1">
                  <FiMail className="text-yellow-400" /> <span className="font-medium">{b.user.email}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FiPhone className="text-yellow-400" /> <span className="font-medium">{b.user.phone}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-neutral-700"></div>

              {/* Booking Dates */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 flex items-center gap-2 rounded-b-2xl">
                <FiCalendar className="text-yellow-400 text-xl" />
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {b.bookingDates.map((d) => new Date(d).toLocaleDateString()).join(", ")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 p-4 bg-gray-100 dark:bg-neutral-900">
                <button
                  onClick={() => setSelectedBooking(b._id)}
                  className="bg-yellow-400 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-yellow-500 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => setSelectedDeleteBooking(b)}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking View Modal */}
      {selectedBooking && (
        <BookingView
          bookingId={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {/* Delete Booking Modal */}
      {selectedDeleteBooking && (
        <DeleteBookingModal
          booking={selectedDeleteBooking}
          onClose={() => setSelectedDeleteBooking(null)}
        />
      )}
    </div>
  );
};

export default AllBookings;
