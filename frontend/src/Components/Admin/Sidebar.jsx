import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/carLogo2.png";
import { MdForum } from "react-icons/md";
import { BsFillFilePostFill } from "react-icons/bs";
import { MdOutlinePreview } from "react-icons/md";
import { useAuthStore } from "../../Store/AuthStore.js";
import { FaCar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { PiSlideshowLight } from "react-icons/pi";
import {
    AiOutlineDashboard,
    AiOutlineUser,
    AiOutlineFileText,
    AiOutlineNotification,
    AiOutlineMessage,
    AiOutlineRight,
    AiOutlineDown,
    AiOutlineClose,
    AiOutlineProfile,
    AiOutlineCheckCircle,
    AiOutlineHistory,
    AiOutlineInbox,
    AiOutlineLogout
} from "react-icons/ai";

export default function Sidebar({ open, setOpen }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();
    const logoutUser = useAuthStore((state) => state.logoutUser);
    const navigate = useNavigate();

    // Auto-close sidebar on small screens
    useEffect(() => {
        if (window.innerWidth < 768) setOpen(false);
    }, []);

    const logoutUserWithRedirect = () => {
        logoutUser();
        navigate("/admin/login");
    };

    // Sidebar Menu Items
    const menuItems = [
        { name: "Dashboard", icon: AiOutlineDashboard, base: "/admin/dashboard" },
        {
            name: "Fleet Management",
            icon: FaCar,
            sub: [
                { name: "View Vehicles", path: "/admin/viewVehicle", icon: HiOutlineViewfinderCircle },
                { name: "Add Vehicle", path: "/admin/addVehicle", icon: IoMdAdd },
            ]
        },
        {
            name: "Bookings",
            icon: MdOutlineBookmarkBorder,
            sub: [
                { name: "All Bookings", path: "/admin/AllBookings", icon: PiSlideshowLight },
            ]
        },
    ];

    // Sidebar Content
    const sidebarContent = (
        <div className="flex flex-col h-full p-4 dark:bg-neutral-950">

            {/* Logo Section */}
            <div className="flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-3">
                    <img src={Logo} alt="logo" className="w-12 h-12 bg-yellow-400 rounded-xl" />
                    {(open || window.innerWidth < 768) && (
                        <div>
                            <h1 className="text-lg font-bold text-yellow-400 uppercase">Luxury Garage</h1>
                            <p className="text-xs text-black dark:text-white ">Management System</p>
                        </div>
                    )}
                </div>
                <button
                    className="md:hidden text-black dark:text-white hover:text-yellow-400 "
                    onClick={() => setOpen(false)}>
                    <AiOutlineClose size={22} />
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item, i) => {
                    const Icon = item.icon;
                    const hasSub = item.sub && item.sub.length > 0;
                    const isActive = location.pathname === item.base || (hasSub && item.sub.some(s => s.path === location.pathname));

                    return (
                        <div key={i}>
                            {hasSub ? (
                                <>
                                    {/* Menu Button with Dropdown */}
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                                        className={`cursor-pointer flex items-center justify-between w-full p-3 rounded-lg font-semibold transition
                      ${isActive ? "bg-[#f6dd82] text-black" : "text-gray-600 hover:bg-[#f6dd82] hover:text-black"}`}>
                                        <div className="flex items-center gap-3">
                                            <Icon size={22} className={isActive ? "text-black" : ""} />
                                            {open && <span>{item.name}</span>}
                                        </div>
                                        {open && (activeMenu === i ? <AiOutlineDown /> : <AiOutlineRight />)}
                                    </button>

                                    {/* Submenu */}
                                    {open && activeMenu === i && (
                                        <div className="ml-11 mt-1 flex flex-col gap-1">
                                            {item.sub.map((sub, idx) => {
                                                const SubIcon = sub.icon;
                                                return (
                                                    <NavLink
                                                        key={idx}
                                                        to={sub.path || "#"}
                                                        className={`flex items-center gap-2 text-sm font-normal p-2 rounded-md transition
                              ${location.pathname === sub.path
                                                                ? "bg-[#f6dd82] text-black"
                                                                : "text-gray-500 dark:hover:text-black  hover:bg-[#f6dd82] "}`}>
                                                        <SubIcon size={16} />
                                                        {sub.name}
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Direct NavLink */
                                <NavLink
                                    to={item.base || "#"}
                                    className={`flex items-center gap-3 w-full p-3 rounded-lg font-semibold transition
                    ${isActive
                                            ? "bg-[#f6dd82]  text-black"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-[#f6dd82] hover:text-black"}`}>
                                    <Icon size={22} className={isActive ? "text-black" : ""} />
                                    {open && <span>{item.name}</span>}
                                </NavLink>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Sign Out Button (UI only, no backend) */}
            <button
  onClick={logoutUserWithRedirect} // call the backend logout logic
  className="cursor-pointer mt-auto flex items-center gap-2 px-4 py-3 font-medium text-[#f87171] rounded-md transition transform hover:scale-105 hover:ring-1 hover:ring-[#f87171] hover:bg-[#fee2e2]"
>
  <AiOutlineLogout size={20} /> {open && "Sign Out"}
</button>

        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                animate={{ width: open ? 260 : 80 }}
                transition={{ duration: 0.25 }}
                className="hidden md:flex flex-col bg-white dark:bg-neutral-950 dark:border-r dark:border-yellow-400 shadow-lg min-h-screen"
            >
                {sidebarContent}
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-neutral-950 shadow-lg z-50"
                    >
                        {sidebarContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
