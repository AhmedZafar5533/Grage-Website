import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore.js";

export default function AdminProtectedRoute() {
  const { user, isAdmin } = useAuthStore();

  // Always check from store + localStorage
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const adminLoggedIn = (user && isAdmin) || (parsedUser && parsedUser.isAdmin);

  if (!adminLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
