import React, { useState, useEffect } from "react";
import {
  FiX,
  FiTag,
  FiDroplet,
  FiHash,
  FiSettings,
  FiDollarSign,
  FiClock
} from "react-icons/fi";
import { useVehicleStore } from "../../Store/AdminStore.js";

const ViewVehicleModal = ({ vehicleId, onClose }) => {
  const { getVehicleById, selectedVehicle, loadingVehicle } = useVehicleStore();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (vehicleId && (!selectedVehicle || selectedVehicle._id !== vehicleId)) {
      getVehicleById(vehicleId);
    }
  }, [vehicleId]);

  if (!vehicleId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl w-11/12 md:w-4/5 lg:w-3/5 max-h-[90vh] overflow-y-auto shadow-2xl relative p-6">
        {/* Close button */}
        <button
          className="cursor-pointer absolute top-4 right-4 text-2xl text-gray-700 dark:text-gray-300 hover:text-yellow-400 transition"
          onClick={onClose}
        >
          <FiX />
        </button>

        {loadingVehicle || !selectedVehicle ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
          </div>
        ) : (
          <>
            {/* Vehicle Title */}
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white text-center">
              {selectedVehicle.title}
            </h2>

            {/* Image Section */}
            {selectedVehicle.images && selectedVehicle.images.length > 0 && (
              <div className="mb-6">
                {/* Main Image */}
                <div className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400">
                  <img
                    src={selectedVehicle.images[activeImage].url}
                    alt={`Vehicle ${activeImage + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105 cursor-pointer"
                    onClick={() =>
                      window.open(selectedVehicle.images[activeImage].url, "_blank")
                    }
                  />
                </div>

                {/* Thumbnail Carousel */}
                <div className="flex mt-4 gap-3 overflow-x-auto py-2">
                  {selectedVehicle.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        idx === activeImage
                          ? "border-yellow-400 shadow-md"
                          : "border-gray-300 hover:border-yellow-400"
                      }`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img
                        src={img.url}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicle Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiTag className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Model:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.model}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiSettings className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Modification:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.modification || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiDroplet className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Color:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.color}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiHash className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Registration:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.registration}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiSettings className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Engine Type:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.engineType}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiDollarSign className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Rent/Day:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.rentPerDay}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiDollarSign className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Rent w/ Driver:</span>
                <span className="text-gray-900 dark:text-white">{selectedVehicle.rentPerDayWithDriver}</span>
              </div>

              <div className="flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/20 p-3 rounded-lg shadow-inner">
                <FiClock className="text-yellow-400" />
                <span className="font-semibold text-gray-700 dark:text-white">Created At:</span>
                <span className="text-gray-900 dark:text-white">{new Date(selectedVehicle.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewVehicleModal;
