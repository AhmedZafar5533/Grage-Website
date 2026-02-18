import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const normalizeDate = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const useBookingStore = create((set) => ({
  loadingBookedDates: false,
  bookingLoading: false,
  bookedDates: [],
  adminBookings: [],
  adminLoading: false,
  currentBooking: null,
  bookingDetailLoading: false,

  getBookedDates: async (vehicleId) => {
    if (!vehicleId) return;
    set({ loadingBookedDates: true });

    try {
      const res = await axios.get(
        `${baseUrl}/api/bookings/vehicle/${vehicleId}/booked-dates`
      );
      const normalizedDates = res.data.data.map(normalizeDate);
      set({ bookedDates: normalizedDates, loadingBookedDates: false });
      return normalizedDates;
    } catch (error) {
      set({ loadingBookedDates: false });
      toast.error(error?.response?.data?.message || "Failed to fetch booked dates");
      throw error;
    }
  },

  createBooking: async (vehicleId, bookingData, onSuccess) => {
    if (!vehicleId) return;
    set({ bookingLoading: true });

    try {
      const res = await axios.post(
        `${baseUrl}/api/bookings/vehicle/${vehicleId}/book`,
        bookingData
      );

      if (res.status === 201) {
        toast.success("Vehicle booked successfully");

        const newBookedDates = bookingData.selectedDates.map(normalizeDate);
        set((state) => {
          const mergedDates = [
            ...state.bookedDates,
            ...newBookedDates.filter(
              (d) => !state.bookedDates.some((bd) => bd.getTime() === d.getTime())
            ),
          ];
          return { bookedDates: mergedDates };
        });

        if (onSuccess) onSuccess(res.data.data);
      }

      set({ bookingLoading: false });
      return res.data.data;
    } catch (error) {
      set({ bookingLoading: false });
      const backendMessage =
        error?.response?.data?.message || error?.response?.data?.error || error.message;
      toast.error(backendMessage || "Booking failed");
      throw new Error(backendMessage);
    }
  },

  resetBooking: () => set({ loadingBookedDates: false, bookingLoading: false, bookedDates: [] }),

  fetchAdminBookings: async (search = "") => {
    set({ adminLoading: true });
    try {
      const res = await axios.get(`${baseUrl}/api/bookings/admin/bookings`, {
        params: { search },
        withCredentials: true, // ✅ send cookie for auth
      });
      set({ adminBookings: res.data.data, adminLoading: false });
      return res.data.data;
    } catch (error) {
      set({ adminLoading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch bookings");
      throw error;
    }
  },

  deleteBooking: async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/bookings/admin/bookings/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        adminBookings: state.adminBookings.filter((b) => b._id !== id),
      }));
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete booking");
      throw error;
    }
  },

  markBookingViewed: async (id) => {
    set((state) => ({
      adminBookings: state.adminBookings.map((b) =>
        b._id === id ? { ...b, newBooking: false } : b
      ),
    }));
    try {
      await axios.put(`${baseUrl}/api/bookings/admin/bookings/${id}/viewed`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.log("Failed to mark booking viewed:", err);
    }
  },

  fetchBookingById: async (id) => {
    if (!id) return;
    set({ bookingDetailLoading: true });

    try {
      const res = await axios.get(`${baseUrl}/api/bookings/admin/bookings/${id}`, {
        withCredentials: true,
      });
      set({ currentBooking: res.data.data, bookingDetailLoading: false });
      return res.data.data;
    } catch (error) {
      set({ bookingDetailLoading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch booking");
      throw error;
    }
  },

  clearCurrentBooking: () => set({ currentBooking: null }),
}));
