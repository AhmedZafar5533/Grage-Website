// AdminLoginPage.jsx
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useAuthStore } from "../../Store/AuthStore.js"; // import your auth store
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLoginPage() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Form validation
  const validate = () => {
    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) validationErrors.email = "Enter a valid email";

    if (!password) validationErrors.password = "Password is required";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      validationErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, and 1 number";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // stop if validation fails

    // Call login from authStore
   authStore.loginUser(
  { email, password },
  (data) => { // <-- get the fresh data directly from store
    if (data.isAdmin) { // <-- use API response, not old Zustand state
      navigate("/admin/dashboard");
    } else {
      toast.error("You are not an admin");
    }
  }
);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 dark:bg-black">
      <div className="bg-white dark:bg-black rounded-3xl w-[90%] max-w-md p-8 shadow-2xl border border-[#FFD700]/30">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#FFD700]">Admin Login</h2>
        <p className="text-center text-gray-500 mt-1 mb-6 dark:text-gray-300">
          Login to access your Luxury Garage Admin Panel
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1 dark:text-white">Email</label>
            <span className="absolute left-3 top-10 text-[#FFD700]">
              <AiOutlineMail size={20} />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 p-3 border rounded-xl outline-none border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] dark:text-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-1 dark:text-white">Password</label>
            <span className="absolute left-3 top-10 text-[#FFD700]">
              <AiOutlineLock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-10 pr-12 p-3 border rounded-xl outline-none border-[#FFD700] focus:ring-2 focus:ring-[#FFD700] dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-[38px] text-gray-500 hover:text-black dark:hover:text-white"
            >
              {showPassword ? <AiOutlineEyeInvisible size={23} /> : <AiOutlineEye size={23} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button or Loader */}
          {authStore.loading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="cursor-pointer w-full bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-xl transition font-semibold text-lg shadow-md hover:shadow-lg"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
