import React, { useState } from "react";

const DonorList = ({
  bloodGroups,
  divisions,
  donors,
  setDonors,
}) => {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");

  // ==============================
  // FILTER DONORS
  // ==============================

  const filteredDonors = donors.filter((donor) => {
    const searchText = search.toLowerCase().trim();

    const name = donor.name?.toLowerCase() || "";
    const phone = donor.phone?.toString() || "";
    const id = donor.id?.toString().toLowerCase() || "";

    const matchesSearch =
      name.includes(searchText) ||
      phone.includes(searchText) ||
      id.includes(searchText);

    const matchesBloodGroup =
      bloodGroup === "" ||
      donor.bloodGroup === bloodGroup;

    const matchesDivision =
      division === "" ||
      donor.division === division;

    return (
      matchesSearch &&
      matchesBloodGroup &&
      matchesDivision
    );
  });

  // ==============================
  // RESET
  // ==============================

  const handleReset = () => {
    setSearch("");
    setBloodGroup("");
    setDivision("");
  };

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-14">

      {/* ==============================
          PAGE HEADER
      ============================== */}

      <div className="mb-8">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Blood donor network
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
              Find a Blood Donor
            </h1>

            <p className="text-slate-500 mt-3 text-base md:text-lg max-w-2xl leading-relaxed">
              Browse registered donors and find someone who
              matches your blood group and location.
            </p>
          </div>

          {/* Statistics */}

          <div className="flex gap-3">

            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">
                Total donors
              </p>

              <p className="text-2xl font-black text-slate-900">
                {donors.length}
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3">
              <p className="text-xs text-indigo-500">
                Showing
              </p>

              <p className="text-2xl font-black text-indigo-700">
                {filteredDonors.length}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ==============================
          FILTER PANEL
      ============================== */}

      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-sm mb-8">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Search & Filter
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Search by donor name, ID or phone number.
            </p>
          </div>

          {(search || bloodGroup || division) && (
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
            >
              Clear
            </button>
          )}

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Search */}

          <div className="lg:col-span-2">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search donor
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔎
              </span>

              <input
                type="text"
                placeholder="Name, donor ID or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl bg-slate-50 border-slate-200 focus:border-indigo-500 focus:outline-none text-slate-900"
              />

            </div>

          </div>

          {/* Blood Group */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blood group
            </label>

            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="select select-bordered w-full h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              <option value="">
                All blood groups
              </option>

              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

          </div>

          {/* Division */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Division
            </label>

            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="select select-bordered w-full h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              <option value="">
                All divisions
              </option>

              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>

      {/* ==============================
          MOBILE DONOR CARDS
      ============================== */}

      <div className="grid grid-cols-1 gap-4 md:hidden">

        {filteredDonors.length > 0 ? (

          filteredDonors.map((donor) => (

            <div
              key={donor.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >

              {/* Top */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 font-black text-lg">
                    {donor.bloodGroup}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {donor.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      ID: {donor.id}
                    </p>
                  </div>

                </div>

                {donor.available ? (
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold">
                    Available
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                    Unavailable
                  </span>
                )}

              </div>

              {/* Information */}

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">
                    Division
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {donor.division}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">
                    Phone
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1 break-all">
                    {donor.phone}
                  </p>
                </div>

              </div>

              {/* Contact */}

              {donor.phone && (
                <a
                  href={`tel:${donor.phone}`}
                  className="mt-4 w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center transition"
                >
                  📞 Contact Donor
                </a>
              )}

            </div>

          ))

        ) : (

          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

            <div className="text-4xl mb-4">
              🩸
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              No donors found
            </h3>

            <p className="text-slate-500 text-sm mt-2">
              Try changing your search or filters.
            </p>

            <button
              onClick={handleReset}
              className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>

          </div>

        )}

      </div>

      {/* ==============================
          DESKTOP TABLE
      ============================== */}

      <div className="hidden md:block bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-100">

          <h2 className="text-xl font-bold text-slate-900">
            Registered Donors
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Available donor information
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-left">

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Donor
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Blood
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Division
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDonors.length > 0 ? (

                filteredDonors.map((donor) => (

                  <tr
                    key={donor.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* Donor */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black">
                          {donor.bloodGroup}
                        </div>

                        <div>

                          <p className="font-bold text-slate-900">
                            {donor.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            ID: {donor.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Blood */}

                    <td className="px-6 py-5">

                      <span className="inline-flex items-center justify-center min-w-12 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold">
                        {donor.bloodGroup}
                      </span>

                    </td>

                    {/* Division */}

                    <td className="px-6 py-5 text-slate-700 font-medium">
                      {donor.division}
                    </td>

                    {/* Phone */}

                    <td className="px-6 py-5">

                      <a
                        href={`tel:${donor.phone}`}
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                      >
                        {donor.phone}
                      </a>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      {donor.available ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-sm font-semibold">
                          <span className="w-2 h-2 bg-slate-400 rounded-full" />
                          Unavailable
                        </span>
                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <div className="text-4xl mb-4">
                      🩸
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      No donors found
                    </h3>

                    <p className="text-slate-500 text-sm mt-2">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
};

export default DonorList;