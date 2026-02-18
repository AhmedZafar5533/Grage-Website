import React from 'react'
import Header from '../Components/Header.jsx'
import Car1 from '../assets/images/carLogo3.png'
import Car2 from '../assets/images/carLogo2.png'
import Footer from '../Components/Footer.jsx';
import Revo from '../assets/images/revo.jpg'
import v8 from '../assets/images/v81.jpg'
import banner from '../assets/images/banner.png'
import range from '../assets/images/range.jpg'
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const features = [
    {
      img: Car1,
      title: "Premium Cars",
      desc: "Drive the most luxurious and modern cars for an unforgettable experience.",
    },
    {
      img: Car2,
      title: "Easy Booking",
      desc: "Reserve your car online in just a few clicks, hassle-free and fast.",
    },
    {
      img: Car1,
      title: "24/7 Support",
      desc: "Our team is available anytime to assist you with your rental needs.",
    },
  ];

  return (
    <div>
      <Header />

      <section
        className="
    w-full min-h-screen flex items-center
    bg-gradient-to-br from-gray-50 via-white to-gray-100
    dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black
    pt-20 md:pt-32
  "
      >

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6
      text-gray-900 dark:text-white
    ">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
              WELCOME TO THE <span className="text-yellow-500 dark:text-yellow-400">LUXURY</span> GARAGE
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl">
              Experience premium car rentals with unmatched comfort and style.
              Drive luxury, power, and elegance wherever you go.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-lg">
              Discover the ultimate luxury car rental experience. We offer premium cars,
              seamless booking, and personalized service for every ride.
              Your journey begins here.
            </p>
            <button
              onClick={() => navigate(`/luxuryFleet`)} // 🔴 Makes it clickable
              className="
    px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
    bg-yellow-500 hover:bg-yellow-600 text-black
    shadow-lg hover:shadow-yellow-500/40
    dark:bg-yellow-400 dark:hover:bg-yellow-500
    dark:hover:shadow-yellow-400/50 cursor-pointer
  "
            >
              Book Now
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="
          absolute -inset-4 rounded-full blur-3xl
          bg-yellow-300/30
          dark:bg-yellow-400/20
        "
            ></div>

            <img
              src={banner}
              alt="Luxury Car"
              className="
          relative w-[90%] lg:w-[110%] max-w-xl
          transform hover:scale-105 transition-transform duration-500
          drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]
          dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]
        "
            />
          </div>

        </div>
      </section>

      <section className="w-full py-16 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Garage <span className="text-yellow-400">Vehicles</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Browse our premium cars and book your favorite ride instantly. Experience luxury like never before.
          </p>

          {/* Vehicle Data */}
          {/** Each vehicle now has a name, image, and description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Toyota Revo",
                img: Revo,
                desc: "Experience unmatched speed and style with the Toyota Revo. Perfect for city drives or weekend getaways."
              },
              {
                name: "Range Rover",
                img: range,
                desc: "Feel the thrill of driving a Range Rover. Sleek design meets high performance."
              },
              {
                name: "LandCruiser V8",
                img: v8,
                desc: "Drive the iconic LandCruiser V8 and enjoy luxury, comfort, and precision engineering on every ride."
              }
            ].map((vehicle, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {vehicle.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {vehicle.desc}
                  </p>

                  <button
                    onClick={() => navigate(`/luxuryFleet`)}
                    className="cursor-pointer w-full px-6 py-3 rounded-xl font-semibold text-lg bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg hover:shadow-yellow-500/40 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:hover:shadow-yellow-400/50 transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="w-full py-16 bg-gray-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-yellow-400">Us</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Experience premium car rentals with top-notch service, luxury cars, and
            24/7 customer support. We make driving your dream car effortless.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg hover:shadow-yellow-400/40 transition-shadow duration-500"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
