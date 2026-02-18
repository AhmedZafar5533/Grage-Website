import React, { useEffect, useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import {
    FiEye,
    FiTag,
    FiDroplet,
    FiHash,
    FiDollarSign
} from "react-icons/fi";
import { useVehicleStore } from "../Store/AdminStore.js";
import LoadingSpinner from "../Components/LoadingSpinner";
import ViewVehicleModal from "../Components/User/ViewVehicleModal.jsx";
import { Link } from "react-router-dom";
import BookingModal from "../Components/User/BookingModal.jsx";
const LuxuryFleet = () => {
    const { getAllVehiclesUsers, vehicles, loadingVehicles, resetSelectedVehicle } = useVehicleStore();
    const [viewId, setViewId] = useState(null);
    const [open, setOpen] = useState(false);
    const [bookingVehicleId, setBookingVehicleId] = useState(null);


    useEffect(() => {
        getAllVehiclesUsers();
    }, []);

    if (loadingVehicles)
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size={40} />
            </div>
        );

    return (
        <>
            <Header />
            <div className="p-6 mt-20 pt-20 border-t border-yellow-400">
                <div className="flex flex-col items-center text-center mb-8 gap-3">
                    <div className="flex items-center justify-center gap-3">
                        <div className="bg-yellow-400 p-3 rounded-lg flex items-center justify-center">
                            <FiDollarSign className="text-black text-3xl" />
                        </div>
                        <h1 className="text-5xl font-bold dark:text-white">Our <span className="text-yellow-400">Luxury</span> Fleet</h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400  text-xl">
                        Explore our premium collection of vehicles. View details or book your favorite car instantly.
                    </p>
                </div>



                {vehicles.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">
                        No vehicles available at the moment.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle._id}
                                className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                            >
                                <img
                                    src={vehicle.image || "/car-placeholder.png"}
                                    alt={vehicle.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-5 space-y-3">
                                    <h3 className="text-xl font-semibold dark:text-white flex items-center gap-2">
                                        <FiTag className="text-yellow-400" /> {vehicle.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <FiTag className="text-yellow-400" /> Model: {vehicle.model}
                                    </p>

                                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <FiDroplet className="text-blue-400" /> Color: {vehicle.color}
                                    </p>

                                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <FiHash className="text-green-400" /> Reg: {vehicle.registration}
                                    </p>

                                    <div className="flex gap-3 pt-3">
                                        <button
                                            onClick={() => setViewId(vehicle._id)}
                                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-neutral-950 border text-yellow-400 hover:bg-neutral-800 hover:text-yellow-400 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            <FiEye /> View
                                        </button>

                                        <button
                                            onClick={() => {
                                                setBookingVehicleId(vehicle._id);
                                                setOpen(true);
                                            }}
                                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-medium transition-colors"
                                        >
                                            <FiDollarSign /> Book Now
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View Vehicle Modal */}
                {viewId && (
                    <ViewVehicleModal
                        vehicleId={viewId}
                        onClose={() => {
                            setViewId(null);
                            resetSelectedVehicle();
                        }}
                    />
                )}
                {open && bookingVehicleId && (
                    <BookingModal
                        vehicleId={bookingVehicleId}
                        onClose={() => {
                            setOpen(false);
                            setBookingVehicleId(null);
                        }}
                    />
                )}

            </div>
            <Footer />
        </>
    );
};

export default LuxuryFleet;
