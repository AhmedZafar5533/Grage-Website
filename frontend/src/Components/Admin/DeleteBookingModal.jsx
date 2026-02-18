import React, { useState } from "react";
import { FiX, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { useBookingStore } from "../../Store/BookingStore";
import LoadingSpinner from "../../Components/LoadingSpinner";

const DeleteBookingModal = ({ booking, onClose }) => {
  const { deleteBooking, adminLoading } = useBookingStore();
  const [localLoading, setLocalLoading] = useState(false);

  const handleDelete = async () => {
    if (!booking?._id) return;
    setLocalLoading(true);

    try {
      await deleteBooking(booking._id);
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-[400px] p-6 relative animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <FiX size={24} />
        </button>

        {/* Warning Icon */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
            <FiAlertTriangle size={40} className="text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Delete Booking
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete booking for{" "}
            <span className="font-semibold text-yellow-500">
              {booking?.vehicle?.title}
            </span>? This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition flex items-center justify-center gap-2"
              disabled={adminLoading || localLoading}
            >
              {adminLoading || localLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                <>
                  <FiTrash2 />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;
