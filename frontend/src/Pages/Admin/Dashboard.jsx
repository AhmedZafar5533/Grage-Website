import React, { useEffect, useState } from "react";
import StatCard from "../../Components/Admin/StatCard";
import QuickAction from "../../Components/Admin/QuickAction";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineMessage,
  AiOutlineNotification,
} from "react-icons/ai";
import { useVehicleStore } from "../../Store/AdminStore";
import { useBookingStore } from "../../Store/BookingStore"; // ✅ import booking store

export default function Dashboard() {
  const { getAllVehicles, vehicles } = useVehicleStore();
  const { fetchAdminBookings, adminBookings } = useBookingStore(); // ✅ booking store
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true); // separate loading for bookings

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setBookingLoading(true);
      try {
        await getAllVehicles(); // fetch vehicles
        await fetchAdminBookings(); // fetch bookings
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
        setBookingLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        <StatCard
          title="Total Vehicles"
          value={loading ? "..." : vehicles.length} // dynamic vehicle count
          icon={<AiOutlineUser className="dark:text-white" />}
          color="from-blue-500 to-blue-400"
          className="dark:bg-slate-800 dark:text-white"
        />
        <StatCard
          title="Total Bookings"
          value={bookingLoading ? "..." : adminBookings.length} // ✅ dynamic booking count
          icon={<AiOutlineClockCircle className="dark:text-white" />}
          color="from-yellow-500 to-yellow-400"
          className="dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold mb-4 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            label="Add New Vehicle"
            icon={<AiOutlineUser className="dark:text-yellow-400" />}
            color="border-blue-500"
            to="/admin/addVehicle"
          />
          <QuickAction
            label="View Vehicles"
            icon={<AiOutlineUser className="dark:text-yellow-400" />}
            color="border-green-500"
            to="/admin/viewVehicle"
          />
          <QuickAction
            label="View Bookings"
            icon={<AiOutlineClockCircle className="dark:text-yellow-400" />}
            color="border-yellow-500"
            to="/admin/allBookings"
          />
        </div>
      </div>
    </div>
  );
}
