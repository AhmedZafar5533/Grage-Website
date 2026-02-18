// imports
import React, { useState, useEffect } from "react";
import Logo from "../assets/images/logo1.jpeg";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";

// header component
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* main header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-md dark:bg-neutral-950 dark:shadow-sm dark:shadow-yellow-400"
          : "bg-black/0"
          }`}
      >
        <div className="max-w-[1300px]  mx-auto flex items-center p-3 md:pl-5 md:pr-5">
          {/* mobile menu button and logo */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                className={`w-9 h-9 stroke-current ${scrolled ? "text-black dark:text-white" : "text-black dark:text-white"}`}
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* mobile logo */}
            {/* mobile logo + title */}
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-xl bg-yellow-400">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </div>

              <div className="leading-tight">
                <h3 className="text-sm font-bold">
                  <span className={scrolled ? "text-black dark:text-white" : "text-yellow-400"}>
                    THE{" "}
                  </span>
                  <span className="text-yellow-400">
                    LUXURY{" "}
                  </span>
                  <span className={scrolled ? "text-black dark:text-white" : "text-yellow-400"}>
                    GARAGE
                  </span>
                </h3>

                <p className={`text-xs font-semibold ${scrolled ? "text-gray-600 dark:text-gray-400" : "text-black dark:text-white"}`}>
                  Rental Services
                </p>
              </div>
            </Link>

          </div>

          {/* desktop logo and title */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={`rounded-xl transition cursor-pointer ${scrolled ? "bg-yellow-400" : "bg-yellow-400"
                }`}
            >
              <img
                src={Logo}
                alt="logo"
                className="w-12 h-12 rounded-xl object-cover"
              />
            </Link>
            <div>
              <h3 className="text-xl font-bold">
                <span
                  className={
                    scrolled
                      ? "text-black dark:text-white"
                      : "text-yellow-400"
                  }
                >
                  THE{" "}
                </span>

                <span className="text-yellow-400">
                  LUXURY{" "}
                </span>

                <span
                  className={
                    scrolled
                      ? "text-black dark:text-white"
                      : "text-yellow-400"
                  }
                >
                  GARAGE
                </span>
              </h3>

              <h4
                className={`text-sm font-bold ${scrolled
                  ? "text-gray-600"
                  : "text-black dark:text-white"
                  }`}
              >
                Rental Services
              </h4>
            </div>
          </div>

          {/* desktop navigation */}
          <nav
            className={`hidden md:flex gap-8 font-medium transition-all duration-300 justify-center flex-1 ${scrolled
              ? "text-gray-700 dark:text-gray-500"
              : "text-white"
              }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-black px-2 py-1 rounded-md transition-all duration-300 hover:bg-transparent hover:backdrop-blur-md hover:text-yellow-400 border border-yellow-400 hover:border-yellow-400
                after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full dark:text-white
                ${scrolled ? "after:bg-black dark:after:bg-white" : "after:bg-black dark:after:bg-white"}
                ${isActive
                  ? " backdrop-blur-md text-black after:w-full"
                  : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/luxuryFleet"
              className={({ isActive }) =>
                `relative text-black px-2 py-1 rounded-md transition-all duration-300 hover:bg-transparent hover:backdrop-blur-md hover:text-yellow-400 border border-yellow-400 hover:border-yellow-400
                after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full dark:text-white
                ${scrolled ? "after:bg-black dark:after:bg-white" : "after:bg-black dark:after:bg-white"}
                ${isActive
                  ? " backdrop-blur-md text-black after:w-full"
                  : ""
                }`
              }
            >
              Luxury Fleet
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative text-black px-2 py-1 rounded-md transition-all duration-300 hover:bg-transparent hover:backdrop-blur-md hover:text-yellow-400 border border-yellow-400 hover:border-yellow-400
                after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full dark:text-white
                ${scrolled ? "after:bg-black dark:after:bg-white" : "after:bg-black dark:after:bg-white"}
                ${isActive
                  ? " backdrop-blur-md text-black after:w-full"
                  : ""
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `relative text-black px-2 py-1 rounded-md transition-all duration-300 hover:bg-transparent hover:backdrop-blur-md hover:text-yellow-400 border border-yellow-400 hover:border-yellow-400
                after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full dark:text-white
                ${scrolled ? "after:bg-black dark:after:bg-white" : "after:bg-black dark:after:bg-white"}
                ${isActive
                  ? " backdrop-blur-md text-black after:w-full"
                  : ""
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* right side actions */}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle
              className={`cursor-pointer ${scrolled
                ? "text-black border-yellow-400"
                : "text-black border-yellow-400"
                }`}
            />
          </div>
        </div>

        {/* mobile navigation menu */}
        <div
          className={`md:hidden bg-white dark:bg-neutral-950 shadow-lg transition-all duration-500 overflow-hidden ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col p-4 text-gray-700 dark:text-gray-300">
            <Link
              to="/"
              className="flex items-center gap-3 py-3 px-3 cursor-pointer border-b border-yellow-400  hover:bg-[#f0f4ff] dark:hover:bg-slate-800 transition"
            >
              <AiOutlineHome size={20} className="text-yellow-400" />
              Home
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-3 py-3 px-3 cursor-pointer border-b border-yellow-400  hover:bg-[#f0f4ff] dark:hover:bg-slate-800 transition"
            >
              <AiOutlineInfoCircle size={20} className="text-yellow-400" />
              Luxury Fleet
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-3 py-3 px-3 cursor-pointer border-b border-yellow-400  hover:bg-[#f0f4ff] dark:hover:bg-slate-800 transition"
            >
              <AiOutlineInfoCircle size={20} className="text-yellow-400" />
              About Us
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-3 py-3 px-3 cursor-pointer border-b border-yellow-400  hover:bg-[#f0f4ff] dark:hover:bg-slate-800 transition"
            >
              <AiOutlinePhone size={20} className="text-yellow-400" />
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
