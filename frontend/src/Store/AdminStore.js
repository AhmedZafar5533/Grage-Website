import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useVehicleStore = create((set) => ({
  loadingVehicles: false, // changed
  loadingVehicle: false,  // new
  vehicles: [],
  selectedVehicle: null,

  addVehicle: async (formData, onSuccess) => {
    set({ loading: true });

    try {
      const res = await axios.post(
        `${baseUrl}/api/admin/addVehicle`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success("Vehicle added successfully");
        if (onSuccess) onSuccess(res.data.data);
      }

      set({ loading: false });
      return res.data.data;
    } catch (error) {
      set({ loading: false });

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;

      toast.error(backendMessage || "Failed to add vehicle");
      throw new Error(backendMessage);
    }
  },

  getAllVehicles: async () => {
    set({ loadingVehicles: true });
    try {
      const res = await axios.get(`${baseUrl}/api/admin/all`, { withCredentials: true });
      set({ vehicles: res.data.data, loadingVehicles: false });
      return res.data.data;
    } catch (error) {
      set({ loadingVehicles: false });
      toast.error(error?.response?.data?.message || "Failed to fetch vehicles");
      throw error;
    }
  },

  getAllVehiclesUsers: async () => {
    set({ loadingVehicles: true });
    try {
      const res = await axios.get(`${baseUrl}/api/admin/user/all`, { withCredentials: true });
      set({ vehicles: res.data.data, loadingVehicles: false });
      return res.data.data;
    } catch (error) {
      set({ loadingVehicles: false });
      toast.error(error?.response?.data?.message || "Failed to fetch vehicles");
      throw error;
    }
  },

  getVehicleById: async (id) => {
    if (!id) return;
    set({ loadingVehicle: true });
    try {
      const res = await axios.get(`${baseUrl}/api/admin/getVehicle/${id}`, { withCredentials: true });
      set({ selectedVehicle: res.data.data, loadingVehicle: false });
      return res.data.data;
    } catch (error) {
      set({ loadingVehicle: false });
      toast.error(error?.response?.data?.message || "Failed to fetch vehicle details");
      throw error;
    }
  },

  getVehicleByIdUser: async (id) => {
    if (!id) return;
    set({ loadingVehicle: true });
    try {
      const res = await axios.get(`${baseUrl}/api/admin/getVehicleUser/${id}`, { withCredentials: true });
      set({ selectedVehicle: res.data.data, loadingVehicle: false });
      return res.data.data;
    } catch (error) {
      set({ loadingVehicle: false });
      toast.error(error?.response?.data?.message || "Failed to fetch vehicle details");
      throw error;
    }
  },

   editVehicle: async (vehicleId, formData, onSuccess) => {
    if (!vehicleId) return;
    set({ loading: true });
    try {
      const res = await axios.put(`${baseUrl}/api/admin/editVehicle/${vehicleId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Vehicle updated successfully");
        // Update local state
       set((state) => ({
  vehicles: state.vehicles.map((v) =>
    v._id === vehicleId ? res.data.data : v
  ),
  selectedVehicle: res.data.data,
}));

        if (onSuccess) onSuccess(res.data.data);
      }
      set({ loading: false });
      return res.data.data;
    } catch (error) {
      set({ loading: false });
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message;
      toast.error(backendMessage || "Failed to update vehicle");
      throw new Error(backendMessage);
    }
  },

  deleteVehicle: async (vehicleId, onSuccess) => {
  if (!vehicleId) return;
  set({ loading: true });
  
  try {
    const res = await axios.delete(`${baseUrl}/api/admin/deleteVehicle/${vehicleId}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      toast.success("Vehicle deleted successfully");

      // Remove vehicle from local state
      set((state) => ({
        vehicles: state.vehicles.filter((v) => v._id !== vehicleId),
        selectedVehicle: state.selectedVehicle?._id === vehicleId ? null : state.selectedVehicle,
      }));

      if (onSuccess) onSuccess();
    }

    set({ loading: false });
    return res.data;
  } catch (error) {
    set({ loading: false });

    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message;

    toast.error(backendMessage || "Failed to delete vehicle");
    throw new Error(backendMessage);
  }
},

   resetSelectedVehicle: () => set({ selectedVehicle: null }),

  reset: () => set({
    loadingVehicles: false,
    loadingVehicle: false,
    vehicles: [],
    selectedVehicle: null,
  }),
}));
