import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiTag,
  FiDroplet,
  FiHash
} from "react-icons/fi";
import { useVehicleStore } from "../../Store/AdminStore.js";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ViewVehicleModal from "../../Components/Admin/ViewVehicleModal.jsx";
import EditVehicleModal from "../../Components/Admin/EditVehicleModal.jsx";
import DeleteVehicleModal from "../../Components/Admin/DeleteVehicleModal.jsx"; // ✅ Import modal

const ViewVehicles = () => {
  const { getAllVehicles, vehicles, loadingVehicles, resetSelectedVehicle } = useVehicleStore();
  const [viewId, setViewId] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);
  const [deleteVehicleData, setDeleteVehicleData] = useState(null); // ✅ store full vehicle object

  useEffect(() => {
    getAllVehicles();
  }, []);

  if (loadingVehicles)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size={40} />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Manage Vehicles
      </h1>

      {vehicles.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No vehicles found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white dark:bg-neutral-950 border border-yellow-400 rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={vehicle.image || "/car-placeholder.png"}
                alt={vehicle.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold dark:text-white">
                  {vehicle.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FiTag className="text-yellow-400" />
                  <span>Model:</span> {vehicle.model}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FiDroplet className="text-blue-400" />
                  <span>Color:</span> {vehicle.color}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FiHash className="text-green-400" />
                  <span>Reg:</span> {vehicle.registration}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-3">
                  <button
                    onClick={() => setViewId(vehicle._id)}
                    className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                  >
                    <FiEye /> View
                  </button>

                  <button
                    onClick={() => setEditVehicle(vehicle)}
                    className="cursor-pointer flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md"
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    onClick={() => setDeleteVehicleData(vehicle)} // ✅ open delete modal
                    className="cursor-pointer flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                  >
                    <FiTrash2 /> Delete
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

      {/* Edit Vehicle Modal */}
      {editVehicle && (
        <EditVehicleModal
          vehicleId={editVehicle._id}
          onClose={() => {
            setEditVehicle(null);
            resetSelectedVehicle();
          }}
        />
      )}

      {/* Delete Vehicle Modal */}
      {deleteVehicleData && (
        <DeleteVehicleModal
          vehicle={deleteVehicleData}
          onClose={() => setDeleteVehicleData(null)} // close modal
        />
      )}
    </div>
  );
};

export default ViewVehicles;
