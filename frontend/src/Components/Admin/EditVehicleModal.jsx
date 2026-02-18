// Components/Admin/EditVehicleModal.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiUpload, FiPlusCircle } from "react-icons/fi";
import { useVehicleStore } from "../../Store/AdminStore.js";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { toast } from "react-toastify";

const EditVehicleModal = ({ vehicleId, onClose }) => {
  const {
    getVehicleById,
    selectedVehicle,
    loadingVehicle,
    editVehicle,
    loading,
  } = useVehicleStore();

  // Form states
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [modification, setModification] = useState("");
  const [color, setColor] = useState("");
  const [registration, setRegistration] = useState("");
  const [engineType, setEngineType] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [rentPerDayWithDriver, setRentPerDayWithDriver] = useState("");
  const [images, setImages] = useState([]); // New images
  const [existingImages, setExistingImages] = useState([]); // Already uploaded images
  const [removeImageIds, setRemoveImageIds] = useState([]); // IDs to remove

  // Fetch vehicle details on open
  useEffect(() => {
    if (vehicleId && (!selectedVehicle || selectedVehicle._id !== vehicleId)) {
      getVehicleById(vehicleId);
    }
  }, [vehicleId]);

  // Prefill form when vehicle data is loaded
  useEffect(() => {
    if (selectedVehicle && selectedVehicle._id === vehicleId) {
      setTitle(selectedVehicle.title || "");
      setModel(selectedVehicle.model || "");
      setModification(selectedVehicle.modification || "");
      setColor(selectedVehicle.color || "");
      setRegistration(selectedVehicle.registration || "");
      setEngineType(selectedVehicle.engineType || "");
      setRentPerDay(selectedVehicle.rentPerDay || "");
      setRentPerDayWithDriver(selectedVehicle.rentPerDayWithDriver || "");
      setExistingImages(selectedVehicle.images || []);
    }
  }, [selectedVehicle]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length + existingImages.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  // Remove a new image before upload
  const handleRemoveNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing image (mark for deletion)
  const handleRemoveExistingImage = (public_id) => {
    setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
    setRemoveImageIds((prev) => [...prev, public_id]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !model || !color || !registration || !engineType || !rentPerDay || !rentPerDayWithDriver) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("model", model);
    formData.append("modification", modification);
    formData.append("color", color);
    formData.append("registration", registration);
    formData.append("engineType", engineType);
    formData.append("rentPerDay", rentPerDay);
    formData.append("rentPerDayWithDriver", rentPerDayWithDriver);
    removeImageIds.forEach((id) => formData.append("removeImageIds[]", id));
    images.forEach((file) => formData.append("images", file));

   try {
  const updatedVehicle = await editVehicle(vehicleId, formData, () => {
    onClose(); // you close the modal
  });

  // Sync existingImages immediately (optional if modal stays open)
  setExistingImages(updatedVehicle.images || []);
} catch (err) {
  console.error(err);
}

  };

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
          <div>
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-white text-center">
              Edit Vehicle
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Vehicle Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Model */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Modification */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">Modification</label>
                <input
                  type="text"
                  value={modification}
                  onChange={(e) => setModification(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Color */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Color <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Registration */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Registration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Engine Type */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Engine Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={engineType}
                  onChange={(e) => setEngineType(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Rent */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Rent Per Day <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={rentPerDay}
                  onChange={(e) => setRentPerDay(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  Rent Per Day With Driver <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={rentPerDayWithDriver}
                  onChange={(e) => setRentPerDayWithDriver(e.target.value)}
                  className="p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Image Upload */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 dark:text-gray-300">Upload Images (max 5)</label>
                <label className="flex items-center gap-2 cursor-pointer p-3 border border-dashed border-gray-400 dark:border-slate-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                  <FiUpload className="text-yellow-400 " size={20} />
                  <span className="text-gray-600 dark:text-gray-300">Choose Images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {existingImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        <img
                          src={img.url}
                          alt="existing"
                          className="w-20 h-20 object-cover rounded-md border border-gray-300 dark:border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(img.public_id)}
                          className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Images */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        <img
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-md border border-gray-300 dark:border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(idx)}
                          className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer mt-4 bg-yellow-400 hover:bg-yellow-500 text-black dark:text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size={22} color="#000000" />
                    <span>Updating Vehicle...</span>
                  </>
                ) : (
                  "Update Vehicle"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditVehicleModal;
