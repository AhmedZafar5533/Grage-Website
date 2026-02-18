import React, { useState } from "react";
import { FiX, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { useVehicleStore } from "../../Store/AdminStore";
import LoadingSpinner from "../../Components/LoadingSpinner";

const DeleteVehicleModal = ({ vehicle, onClose }) => {
  const { deleteVehicle, loading } = useVehicleStore();
  const [localLoading, setLocalLoading] = useState(false);

  const handleDelete = async () => {
    if (!vehicle?._id) return;
    setLocalLoading(true);
    try {
      await deleteVehicle(vehicle._id, () => {
        onClose(); // close modal after successful deletion
      });
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        {/* Warning Icon */}
        <div className="flex flex-col items-center text-center gap-4">
          <FiAlertTriangle size={48} className="text-red-500" />
          <h2 className="text-xl font-semibold">Delete Vehicle</h2>
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium">{vehicle?.title || "this vehicle"}</span>? 
            This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="cursor-pointer flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"
              disabled={loading || localLoading}
            >
              {loading || localLoading ? (
                <LoadingSpinner size={20} />
              ) : (
                <>
                  <FiTrash2 size={20} />
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

export default DeleteVehicleModal;
