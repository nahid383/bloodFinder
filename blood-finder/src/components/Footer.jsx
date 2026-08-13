import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                ♥
              </div>

              <h2 className="text-xl font-bold">
                BloodFinder
              </h2>

            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              A simple platform designed to connect blood donors
              with people who need them — quickly, safely and
              efficiently.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

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

            <h3 className="font-semibold mb-4">
              Our Mission
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Making blood donation connections faster and easier
              so that help can reach those who need it when it
              matters most.
            </p>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm">

          <p className="text-slate-500">
            © 2026 BloodFinder. All rights reserved.
          </p>

          <p className="text-slate-500">
            Owned & developed by{" "}
            <span className="text-indigo-400 font-semibold">
              Fakibazz
            </span>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;