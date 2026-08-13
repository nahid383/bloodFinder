import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-4">

        <div className="navbar min-h-[76px] px-0">

          {/* Logo */}
          <div className="flex-1">

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-200">
                <span className="text-white text-xl">
                  ♥
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  BloodFinder
                </h1>

                <p className="text-xs text-slate-500">
                  Connecting lives
                </p>
              </div>

            </Link>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">

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
                `ml-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-lg ${
                  isActive
                    ? "bg-indigo-700 shadow-indigo-200"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                }`
              }
            >
              Find a Donor
            </NavLink>

          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">

            <button
              tabIndex={0}
              className="btn btn-ghost"
            >
              ☰
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-2xl shadow-xl w-52 p-3 mt-3 border border-slate-100"
            >

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/donors">Donors</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <Link to="/find">Find a Donor</Link>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;