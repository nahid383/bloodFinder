import React from "react";

const Header = () => {
  return (
    <div className="card bg-slate-900 shadow-sm mb-6">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-white">
          BloodFinder
        </h1>

        <p className="text-slate-300">
          Donor registry, search, request management, and AI matching score.
        </p>
      </div>
    </div>
  );
};

export default Header;