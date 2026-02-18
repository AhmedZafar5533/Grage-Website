import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CiPhone, CiMail, CiLocationOn, CiGlobe } from "react-icons/ci";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactUs() {
  return (
    <>
      <Header />

      {/* Main Container */}
      <div className="relative bg-gray-50 dark:bg-neutral-900 min-h-screen pt-24">
        {/* Banner Section */}
        <div className="relative bg-black/80 dark:bg-neutral-950 h-60 flex items-center justify-center overflow-hidden rounded-b-3xl">
          {/* Yellow Stars Background */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-yellow-400 rounded-full w-2 h-2 animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
          </div>
          {/* Heading */}
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 z-10">
            Contact Us
          </h1>
        </div>

        {/* Content Section - Overlapping Card */}
        <div className="max-w-4xl mx-auto -mt-16 p-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl relative z-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We'd love to hear from you! Reach out for bookings, inquiries, or any questions about our luxury cars.
          </p>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <CiPhone className="text-yellow-400 text-2xl" />
              <span className="text-gray-700 dark:text-gray-300">+92 333 5242816</span>
            </div>
            <div className="flex items-center gap-3">
              <CiMail className="text-yellow-400 text-2xl" />
              <span className="text-gray-700 dark:text-gray-300">support@luxurygarage.com</span>
            </div>
            <div className="flex items-center gap-3">
              <CiLocationOn className="text-yellow-400 text-2xl" />
              <span className="text-gray-700 dark:text-gray-300">
                Plot no 36, Mini Commercial, Bahria Town Phase 7, Rawalpindi
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CiGlobe className="text-yellow-400 text-2xl" />
              <span className="text-gray-700 dark:text-gray-300">www.luxurygarage.com</span>
            </div>
          </div>

         
        </div>
      </div>

      <Footer />
    </>
  );
}
