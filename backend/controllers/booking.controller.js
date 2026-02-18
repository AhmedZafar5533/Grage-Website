import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Booking } from "../models/booking.model.js";
import { Vehicle } from "../models/vehicle.model.js";

const getBookedDatesByVehicle = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;

  if (!vehicleId) {
    throw new ApiError(400, "Vehicle ID is required");
  }

  const vehicleExists = await Vehicle.findById(vehicleId);
  if (!vehicleExists) {
    throw new ApiError(404, "Vehicle not found");
  }

  // Fetch all bookings and return all dates
  const bookings = await Booking.find({ vehicle: vehicleId }).select("bookingDates");

  const bookedDates = bookings.flatMap(b => b.bookingDates);

  return res.status(200).json(
    new ApiResponse(200, bookedDates, "Booked dates fetched successfully")
  );
});


/**
 * CREATE booking
 */
const createBooking = asyncHandler(async (req, res) => {
  const { vehicleId } = req.params;
  const {
    selectedDates, // now an array
    name,
    email,
    phone,
    address,
    pickLocation,
    pickTime,
    withDriver,
  } = req.body;

  if (
    !vehicleId ||
    !selectedDates?.length ||
    !name ||
    !email ||
    !phone ||
    !address ||
    !pickLocation ||
    !pickTime ||
    typeof withDriver === "undefined"
  ) {
    throw new ApiError(400, "All booking fields are required");
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  // Normalize dates to remove time
  const normalizedDates = selectedDates.map((d) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  // Check for already booked dates for this vehicle
  const existingBookings = await Booking.find({
    vehicle: vehicleId,
    bookingDates: { $in: normalizedDates },
  });

  if (existingBookings.length > 0) {
    const bookedDates = existingBookings
      .flatMap((b) => b.bookingDates)
      .filter((d) =>
        normalizedDates.some(
          (nd) => nd.getTime() === new Date(d).getTime()
        )
      )
      .map((d) => new Date(d).toLocaleDateString());
    throw new ApiError(
      409,
      `These dates are already booked: ${bookedDates.join(", ")}`
    );
  }

  // Upsert: one booking per user (email + vehicle)
  let booking = await Booking.findOne({ vehicle: vehicleId, email });

  if (booking) {
    // Merge new dates with existing ones
    booking.bookingDates = [
      ...new Set([
        ...booking.bookingDates.map((d) => d.getTime()),
        ...normalizedDates.map((d) => d.getTime()),
      ]),
    ].map((t) => new Date(t));
    await booking.save();
  } else {
    booking = await Booking.create({
      vehicle: vehicleId,
      bookingDates: normalizedDates,
      name,
      email,
      phone,
      address,
      pickLocation,
      pickTime,
      withDriver,
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking created successfully"));
});


const getAllBookingsAdmin = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;

  const bookings = await Booking.find()
    .populate({
      path: "vehicle",
      select: "title model color registration images",
    })
    .sort({ createdAt: -1 });

  // ✅ Remove bookings where vehicle is null
  const validBookings = bookings.filter((b) => b.vehicle);

  // ✅ Safe filtering
  const filteredBookings = search
    ? validBookings.filter((b) => {
        const model = b.vehicle?.model?.toLowerCase() || "";
        const registration = b.vehicle?.registration?.toLowerCase() || "";
        const searchValue = search.toLowerCase();

        return (
          model.includes(searchValue) ||
          registration.includes(searchValue)
        );
      })
    : validBookings;

  const formatted = filteredBookings.map((b) => ({
    _id: b._id,
    newBooking: !b.viewed,
    vehicle: {
      _id: b.vehicle._id,
      title: b.vehicle.title,
      model: b.vehicle.model,
      color: b.vehicle.color,
      registration: b.vehicle.registration,
      image: b.vehicle.images?.[0]?.url || null,
    },
    user: {
      name: b.name,
      email: b.email,
      phone: b.phone,
      address: b.address,
    },
    bookingDates: b.bookingDates,
    pickLocation: b.pickLocation,
    pickTime: b.pickTime,
    withDriver: b.withDriver,
    createdAt: b.createdAt,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, formatted, "Bookings fetched successfully"));
});


/**
 * Delete booking
 */
const deleteBookingAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  await Booking.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Booking deleted successfully"));
});

const markBookingViewed = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  booking.viewed = true; // mark as viewed
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking marked as viewed"));
});


const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "Booking ID is required");

  const booking = await Booking.findById(id).populate({
    path: "vehicle",
    select: "title model color registration images modification engineType rentPerDay rentPerDayWithDriver",
  });

  if (!booking) throw new ApiError(404, "Booking not found");

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking fetched successfully"));
});

export { getBookedDatesByVehicle, createBooking, getAllBookingsAdmin, deleteBookingAdmin, markBookingViewed, getBookingById};
