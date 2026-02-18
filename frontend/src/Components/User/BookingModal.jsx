import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useBookingStore } from "../../Store/BookingStore";
import LoadingSpinner from "../LoadingSpinner";

// 🔹 Utility to normalize dates to midnight
const normalizeDate = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

const BookingModal = ({ vehicleId, onClose }) => {
  const {
    getBookedDates,
    bookedDates,
    createBooking,
    loadingBookedDates,
    bookingLoading,
    resetBooking,
  } = useBookingStore();

  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pickLocation: "",
    pickTime: "",
    withDriver: false,
  });

  useEffect(() => {
    getBookedDates(vehicleId);
    return () => resetBooking();
  }, [vehicleId]);

  // 🔹 Disable booked dates in calendar
  const isDateDisabled = ({ date }) =>
    bookedDates.some(
      (d) => normalizeDate(d).getTime() === normalizeDate(date).getTime()
    );

  // 🔹 Handle selecting/unselecting dates
  const handleDateSelect = (date) => {
    const normalized = normalizeDate(date);

    setSelectedDates((prev) =>
      prev.some((d) => normalizeDate(d).getTime() === normalized.getTime())
        ? prev.filter((d) => normalizeDate(d).getTime() !== normalized.getTime())
        : [...prev, normalized]
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, pickLocation, pickTime } = formData;

    if (!selectedDates.length)
      return toast.error("Please select at least one date");

    if (!name || !email || !phone || !address || !pickLocation || !pickTime)
      return toast.error("All fields are required");

    try {
      // 🔹 Submit all selected dates in one request
      await createBooking(vehicleId, {
        selectedDates,
        ...formData,
      });

      // 🔹 Refresh calendar to mark new booked dates
      getBookedDates(vehicleId);

      onClose();
    } catch (error) {
      toast.error(error.message || "Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-h-[95vh] overflow-y-auto">

       

        <div className="grid md:grid-cols-2 min-h-full">

          {/* LEFT SIDE: Calendar */}
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 text-black">
            <h2 className="text-3xl font-bold mb-6">Book Your Ride</h2>

            <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl">
              {loadingBookedDates ? (
                <LoadingSpinner />
              ) : (
               <Calendar
  onClickDay={handleDateSelect}
  tileDisabled={isDateDisabled}
  tileClassName={({ date }) =>
    bookedDates.some(
      (d) => normalizeDate(d).getTime() === normalizeDate(date).getTime()
    )
      ? "booked-date"
      : ""
  }
  minDate={new Date()}
  className="modern-calendar"
/>

              )}
            </div>

            {selectedDates.length > 0 && (
              <div className="mt-6 bg-black/20 p-4 rounded-xl">
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                  Selected Dates
                </h4>
                <div className="space-y-2 text-sm">
                  {selectedDates.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <FiCheckCircle />
                      {normalizeDate(d).toLocaleDateString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Booking Form */}
          <div className="p-8 space-y-4">
            <FormInput icon={<FiUser />} name="name" placeholder="Full Name" onChange={handleChange} />
            <FormInput icon={<FiMail />} name="email" placeholder="Email Address" onChange={handleChange} />
            <FormInput icon={<FiPhone />} name="phone" placeholder="Phone Number" onChange={handleChange} />
            <FormInput icon={<FiMapPin />} name="address" placeholder="Full Address" onChange={handleChange} />
            <FormInput icon={<FiMapPin />} name="pickLocation" placeholder="Pick Up Location" onChange={handleChange} />

            {/* Pick Time */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FiClock /></span>
              <input
                type="text"
                name="pickTime"
                placeholder="Select Pick Time"
                onFocus={(e) => (e.target.type = "time")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-neutral-800 
                border border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 
                outline-none transition-all dark:text-white"
              />
            </div>

            {/* With Driver Toggle */}
            <div className="flex items-center justify-between bg-gray-100 dark:bg-neutral-800 p-4 rounded-xl">
              <span className="text-sm font-medium dark:text-white">With Driver</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="withDriver"
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600
                peer-checked:after:translate-x-full peer-checked:after:border-white
                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={bookingLoading}
              className="cursor-pointer w-full bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold py-3 rounded-xl shadow-lg"
            >
              {bookingLoading ? "Processing..." : "Confirm Booking"}
            </button>

            <button
  onClick={onClose}
  className="w-full mt-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 text-black dark:text-white 
  bg-transparent hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all font-semibold"
>
  Close
</button>

          </div>
        </div>
      </div>

      {/* Calendar Styling */}
      <style>
        {`
          .modern-calendar { border: none; background: transparent; width: 100%; }
          .modern-calendar button { border-radius: 10px; padding: 10px; }
          .modern-calendar .react-calendar__tile--active { background: black !important; color: white !important; }
          .modern-calendar .react-calendar__tile:hover { background: rgba(0,0,0,0.2); }
         

        `}
      </style>
      
    </div>
  );
};

export default BookingModal;

/* Input Component */
const FormInput = ({ icon, ...props }) => (
  <div className="relative mt-4">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
    <input
      {...props}
      required
      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-neutral-800 
      border border-transparent focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 
      outline-none transition-all dark:text-white"
    />
  </div>
);
