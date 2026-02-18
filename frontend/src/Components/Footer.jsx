import { CiGlobe, CiPhone, CiMail, CiLocationOn } from "react-icons/ci";
import { FaBalanceScale, FaInfoCircle } from "react-icons/fa";
import { MdOutlineChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/images/carLogo2.png"; // adjust path if needed

export default function Footer() {
  return (
    <footer className="bg-neutral-950 mt-20 text-white dark:bg-neutral-950 dark:border-t dark:border-yellow-400">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* About / Logo */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Luxury Garage Logo"
              className="w-12 h-12 bg-yellow-400 rounded-lg border-2 border-yellow-400"
            />
            <h2 className="text-2xl font-bold text-yellow-400 transition">
              The Luxury Garage
            </h2>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            Your trusted platform for luxury car rentals. Experience premium vehicles,
            seamless booking, and unmatched service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-yellow-400 transition">
            <FaInfoCircle /> Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-yellow-400/20 transition"
              >
                <MdOutlineChevronRight className="text-yellow-400" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-yellow-400/20 transition"
              >
                <MdOutlineChevronRight className="text-yellow-400" /> About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-yellow-400/20 transition"
              >
                <MdOutlineChevronRight className="text-yellow-400" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-yellow-400 transition">
            <CiGlobe /> Contact
          </h2>

          <ul className="space-y-3">
            {/* Phone */}
            <li className="flex items-start gap-3 px-2 py-1 rounded hover:bg-yellow-400/20 transition">
              <CiPhone className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0 text-yellow-400 mt-0.5" />
              <span className="leading-relaxed">+92 333 5242816</span>
            </li>

            {/* Email */}
            <li className="flex items-start gap-3 px-2 py-1 rounded hover:bg-yellow-400/20 transition">
              <CiMail className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0 text-yellow-400 mt-0.5" />
              <span className="break-all leading-relaxed">
                support@luxurygarage.com
              </span>
            </li>

            {/* Address */}
            <li className="flex items-start gap-3 px-2 py-1 rounded hover:bg-yellow-400/20 transition">
              <CiLocationOn className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0 text-yellow-400 mt-0.5" />
              <span className="leading-relaxed">
                Plot no 36, mini commercial bahria town phase 7 Rawalpindi
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white/20 mx-6 md:mx-10" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-white/80 text-sm">
        <p>© 2026 The Luxury Garage. All rights reserved.</p>
       
      </div>
    </footer>
  );
}
