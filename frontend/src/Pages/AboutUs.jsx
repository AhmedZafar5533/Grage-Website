import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Sample About Us content
const aboutPoints = [
  "Premium luxury car rentals for exclusive experiences.",
  "Wide selection of sports cars, SUVs, and exotic vehicles.",
  "Seamless online booking and personalized customer service.",
  "Professional chauffeurs available for your convenience.",
  "Commitment to safety, reliability, and luxury.",
];

export default function AboutUs() {
  return (
    <>
      <Header />

      {/* Add padding-top equal to header height (if header is fixed) */}
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
            About Us
          </h1>
        </div>

        {/* Content Section - overlapping card */}
        <div className="max-w-4xl mx-auto -mt-16 p-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl relative z-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Who We Are
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            At <span className="font-semibold text-yellow-400">The Luxury Garage</span>, we provide top-tier luxury car rental services with a focus on premium vehicles, unmatched service, and an exceptional experience for every client.
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {aboutPoints.map((point, index) => (
              <li key={index} className="hover:text-yellow-400 transition">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
