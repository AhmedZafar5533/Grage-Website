import React, { useState } from "react";
import { FiUpload, FiPlusCircle, FiX } from "react-icons/fi";
import { useVehicleStore } from "../../Store/AdminStore.js"; // import your store
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner";

const AddVehicle = () => {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [modification, setModification] = useState("");
  const [color, setColor] = useState("");
  const [registration, setRegistration] = useState("");
  const [engineType, setEngineType] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [rentPerDayWithDriver, setRentPerDayWithDriver] = useState("");
  const [images, setImages] = useState([]);

  const { addVehicle, loading } = useVehicleStore();

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

    images.forEach((file) => formData.append("images", file));

    try {
      await addVehicle(formData, (vehicle) => {
        // optional callback: reset form after success
        setTitle("");
        setModel("");
        setModification("");
        setColor("");
        setRegistration("");
        setEngineType("");
        setRentPerDay("");
        setRentPerDayWithDriver("");
        setImages([]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 dark:border dark:border-yellow-400 rounded-xl shadow-md">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-400 p-3 rounded-lg text-black">
          <FiPlusCircle size={24} />
        </div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Add New Vehicle</h2>
      </div>

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
                    onClick={() => handleRemoveImage(idx)}
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
              <span>Adding Vehicle...</span>
            </>
          ) : (
            "Add Vehicle"
          )}
        </button>

      </form>
    </div>
  );
};

export default AddVehicle;
