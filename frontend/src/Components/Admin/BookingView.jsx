import React, { useEffect } from "react";
import { useBookingStore } from "../../Store/BookingStore";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiTruck,
} from "react-icons/fi";
import LoadingSpinner from "../../Components/LoadingSpinner";

const BookingView = ({ bookingId, onClose }) => {
  const {
    currentBooking,
    bookingDetailLoading,
    fetchBookingById,
    markBookingViewed,
    clearCurrentBooking,
  } = useBookingStore();

  useEffect(() => {
    if (!bookingId) return;

    const fetchData = async () => {
      await fetchBookingById(bookingId);
      markBookingViewed(bookingId);
    };

    fetchData();

    return () => clearCurrentBooking();
  }, [bookingId]);

  const vehicle = currentBooking?.vehicle || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start p-4 sm:p-6 overflow-auto z-50">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-3xl sm:max-w-4xl p-4 sm:p-6 relative transform transition-all duration-300 scale-100 animate-fadeIn overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
        >
          &times;
        </button>

        {bookingDetailLoading || !currentBooking ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size={50} />
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Booking Details
            </h2>

            {/* Vehicle Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl shadow-inner">
              {vehicle.images?.[0]?.url ? (
                <img
                  src={vehicle.images[0].url}
                  alt={vehicle.title}
                  className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-lg border-2 border-yellow-400 shadow-md"
                />
              ) : (
                <div className="w-full sm:w-32 h-48 sm:h-24 rounded-lg bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                  <FiTruck className="text-yellow-400 text-4xl" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <FiTruck className="text-yellow-400" /> {vehicle.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Model:</span> {vehicle.model}
                  </p>
                  <p>
                    <span className="font-semibold">Color:</span> {vehicle.color}
                  </p>
                  <p>
                    <span className="font-semibold">Reg#:</span> {vehicle.registration}
                  </p>
                  <p>
                    <span className="font-semibold">Engine:</span> {vehicle.engineType}
                  </p>
                  <p>
                    <span className="font-semibold">Mod:</span> {vehicle.modification}
                  </p>
                  <p>
                    <span className="font-semibold">Rent/Day:</span> ${vehicle.rentPerDay}
                  </p>
                  <p>
                    <span className="font-semibold">Rent w/Driver:</span> ${vehicle.rentPerDayWithDriver}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-neutral-700 mb-6"></div>

            {/* User Info */}
            <div className="mb-6 bg-gray-50 dark:bg-neutral-800/50 p-4 rounded-xl shadow-inner">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiUser className="text-yellow-400" /> User Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <FiUser className="text-yellow-400" /> {currentBooking.name}
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-yellow-400" /> {currentBooking.email}
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-yellow-400" /> {currentBooking.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-yellow-400" /> {currentBooking.address}
                </p>
              </div>
            </div>

            {/* Booking Info */}
            <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl shadow-inner grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-800 dark:text-gray-200">
              <p className="flex items-center gap-2">
                <FiMapPin className="text-yellow-400" /> Pick Location:{" "}
                <span className="font-medium">{currentBooking.pickLocation}</span>
              </p>
              <p className="flex items-center gap-2">
                <FiClock className="text-yellow-400" /> Pick Time:{" "}
                <span className="font-medium">{currentBooking.pickTime}</span>
              </p>
              <p className="flex items-center gap-2">
                <FiCalendar className="text-yellow-400" /> Booking Dates:{" "}
                <span className="font-medium">
                  {currentBooking.bookingDates
                    .map((d) => new Date(d).toLocaleDateString())
                    .join(", ")}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FiUser className="text-yellow-400" /> With Driver:{" "}
                <span className="font-medium">{currentBooking.withDriver ? "Yes" : "No"}</span>
              </p>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 dark:bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold shadow hover:bg-gray-600 dark:hover:bg-gray-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingView;
