import { Router } from "express";
import {
  getBookedDatesByVehicle,
  createBooking,
  getAllBookingsAdmin,
  deleteBookingAdmin,
  markBookingViewed,
  getBookingById,
} from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
const router = Router();

// Calendar → disabled dates
router.get(
  "/vehicle/:vehicleId/booked-dates",
  getBookedDatesByVehicle
);

// Book Now submit
router.post(
  "/vehicle/:vehicleId/book",
  createBooking
);
router.get("/admin/bookings",verifyJWT, isAdmin, getAllBookingsAdmin);
router.delete("/admin/bookings/:id",verifyJWT, isAdmin, deleteBookingAdmin);
router.put("/admin/bookings/:id/viewed",verifyJWT, isAdmin, markBookingViewed);
router.get("/admin/bookings/:id",verifyJWT, isAdmin, getBookingById);
export default router;
    