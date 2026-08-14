import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* ================= TOP ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">

          {/* Brand */}

          <div className="sm:col-span-2 lg:col-span-1">

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-950/30">

                <span className="text-white text-lg">
                  ♥
                </span>

              </div>

              <h2 className="text-xl font-bold">
                BloodFinder
              </h2>

            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-sm sm:text-base">
              A simple platform designed to connect blood donors
              with people who need them — quickly, safely and
              efficiently.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-semibold mb-4 text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400 text-sm">

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/donors"
                className="hover:text-white transition"
              >
                Donor List
              </Link>

              <Link
                to="/register"
                className="hover:text-white transition"
              >
                Become a Donor
              </Link>

              <Link
                to="/find"
                className="hover:text-white transition"
              >
                Find a Donor
              </Link>

            </div>

          </div>

          {/* Mission */}

          <div>

            <h3 className="font-semibold mb-4 text-white">
              Our Mission
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Making blood donation connections faster and easier
              so that help can reach those who need it when it
              matters most.
            </p>

          </div>

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="border-t border-slate-800 mt-8 sm:mt-10 pt-6">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">

            <p className="text-slate-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} BloodFinder. All rights reserved.
            </p>

            <p className="text-slate-500 text-xs sm:text-sm">
              Owned & developed by{" "}
              <span className="text-indigo-400 font-semibold">
                Fakibazz
              </span>
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;