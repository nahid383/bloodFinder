import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-[68px] sm:min-h-[76px] flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 sm:gap-3 min-w-0"
          >

            {/* Logo Icon */}

            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-200">

              <span className="text-white text-lg sm:text-xl">
                ♥
              </span>

            </div>

            {/* Logo Text */}

            <div className="min-w-0">

              <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                BloodFinder
              </h1>

              <p className="hidden xs:block text-[10px] sm:text-xs text-slate-500">
                Connecting lives
              </p>

            </div>

          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden md:flex items-center gap-1">

            <NavLink
              to="/"
              className={navClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/donors"
              className={navClass}
            >
              Donors
            </NavLink>

            <NavLink
              to="/register"
              className={navClass}
            >
              Register
            </NavLink>

            <NavLink
              to="/find"
              className={({ isActive }) =>
                `ml-2 px-4 lg:px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-lg ${
                  isActive
                    ? "bg-indigo-700 shadow-indigo-200"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                }`
              }
            >
              Find a Donor
            </NavLink>

          </nav>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl transition"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* ================= MOBILE NAV ================= */}

        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-3">

            <nav className="flex flex-col gap-1">

              <NavLink
                to="/"
                onClick={closeMenu}
                className={navClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/donors"
                onClick={closeMenu}
                className={navClass}
              >
                Donors
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className={navClass}
              >
                Register
              </NavLink>

              <NavLink
                to="/find"
                onClick={closeMenu}
                className="mt-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold text-center transition"
              >
                Find a Donor
              </NavLink>

            </nav>

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;