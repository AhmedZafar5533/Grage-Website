import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Vehicle } from "../models/vehicle.model.js";
import cloudinary from "../utils/cloudinary.js";

const addVehicle = asyncHandler(async (req, res) => {
  const {
    title,
    model,
    modification,
    color,
    registration,
    engineType,
    rentPerDay,
    rentPerDayWithDriver,
  } = req.body;

  // 🔴 Required fields validation
  if (
    !title ||
    !model ||
    !color ||
    !registration ||
    !engineType ||
    !rentPerDay ||
    !rentPerDayWithDriver
  ) {
    throw new ApiError(400, "All required vehicle fields must be provided");
  }

  // 🔴 Check duplicate registration
  const existingVehicle = await Vehicle.findOne({ registration });
  if (existingVehicle) {
    throw new ApiError(409, "Vehicle with this registration already exists");
  }

  let images = [];

  // 🔴 Upload images to Cloudinary
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "vehicles",
          resource_type: "image",
        }
      );

      images.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }
  }

  // 🔴 Create vehicle
  const vehicle = await Vehicle.create({
    title,
    images,
    model,
    modification: modification || "None",
    color,
    registration,
    engineType,
    rentPerDay,
    rentPerDayWithDriver,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, vehicle, "Vehicle added successfully"));
});

const getAllVehiclesAdmin = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({})
    .select("title model color registration images createdAt")
    .sort({ createdAt: -1 });

  if (!vehicles.length) {
    throw new ApiError(404, "No vehicles found");
  }

  // Return only ONE image per vehicle
  const formattedVehicles = vehicles.map((vehicle) => ({
    _id: vehicle._id,
    title: vehicle.title,
    model: vehicle.model,
    color: vehicle.color,
    registration: vehicle.registration,
    image: vehicle.images?.[0]?.url || null,
    createdAt: vehicle.createdAt,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, formattedVehicles, "Vehicles fetched successfully")
    );
});

const getVehicleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Vehicle ID is required");
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  // Return full vehicle info with all images
  return res
    .status(200)
    .json(new ApiResponse(200, vehicle, "Vehicle fetched successfully"));
});

const editVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Vehicle ID is required");
  }

  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  // Extract fields from request body
  const {
    title,
    model,
    modification,
    color,
    registration,
    engineType,
    rentPerDay,
    rentPerDayWithDriver,
    removeImageIds, // Array of Cloudinary public_ids to remove
  } = req.body;

  // 🔴 Update basic fields if provided
  if (title) vehicle.title = title;
  if (model) vehicle.model = model;
  if (modification) vehicle.modification = modification;
  if (color) vehicle.color = color;
  if (registration) vehicle.registration = registration;
  if (engineType) vehicle.engineType = engineType;
  if (rentPerDay) vehicle.rentPerDay = rentPerDay;
  if (rentPerDayWithDriver) vehicle.rentPerDayWithDriver = rentPerDayWithDriver;

  // 🔴 Remove images if requested
  if (removeImageIds && Array.isArray(removeImageIds) && removeImageIds.length > 0) {
    for (const public_id of removeImageIds) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(public_id);
      // Remove from vehicle.images array
      vehicle.images = vehicle.images.filter(img => img.public_id !== public_id);
    }
  }

  // 🔴 Upload new images if provided
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "vehicles", resource_type: "image" }
      );

      vehicle.images.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }
  }

  // 🔴 Save changes
  await vehicle.save();

  return res
    .status(200)
    .json(new ApiResponse(200, vehicle, "Vehicle updated successfully"));
});

const deleteVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // 🔴 Validate vehicle ID
  if (!id) {
    throw new ApiError(400, "Vehicle ID is required");
  }

  // 🔴 Find vehicle by ID
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  // 🔴 Delete all images from Cloudinary
  if (vehicle.images && vehicle.images.length > 0) {
    for (const img of vehicle.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
  }

  // 🔴 Delete vehicle from database
  await Vehicle.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Vehicle deleted successfully"));
});

export { addVehicle, getAllVehiclesAdmin, getVehicleById, editVehicle, deleteVehicle};
