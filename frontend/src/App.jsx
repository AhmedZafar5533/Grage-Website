import './App.css'
import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useThemeStore } from "./Store/ThemeStore.js";
import Home from './Pages/Home.jsx'
import LoginPopup from './Pages/Admin/adminLogin.jsx';
import Dashboard from './Pages/Admin/Dashboard.jsx';
import AdminProtectedRoute from './Routes/ProtectedRoutes.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import AddVehicle from './Pages/Admin/AddVehicle.jsx';
import ViewVehicle from './Pages/Admin/ViewVehicle.jsx';
import ViewVehicles from './Pages/Admin/ViewVehicle.jsx';
import LuxuryFleet from './Pages/LuxuryFleet.jsx';
import AllBookings from './Pages/Admin/AllBookings.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import ContactUs from './Pages/ContactUs.jsx';
function App() {

  const dark = useThemeStore((state) => state.dark);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"   // 👈 THIS is important
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/luxuryFleet' element={<LuxuryFleet/>}/>
        <Route path='/admin/login' element={<LoginPopup/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>

         <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/addVehicle" element={<AddVehicle />} />
            <Route path="/admin/viewVehicle" element={<ViewVehicles />} />
            <Route path="/admin/allBookings" element={<AllBookings />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
