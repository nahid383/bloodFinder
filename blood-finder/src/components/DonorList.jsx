import React, { useState } from "react";

const DonorList = ({
  bloodGroups,
  divisions,
  donors,
  setDonors,
}) => {
  // ==============================
  // FILTER STATES
  // ==============================

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

    const matchesSearch =
      name.includes(searchText) ||
      phone.includes(searchText);

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
  // RESET FILTERS
  // ==============================

  const handleReset = () => {
    setSearch("");
    setBloodGroup("");
    setDivision("");
  };

  return (
    <div className="w-full">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-6 sm:mb-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

          <div>
            <p className="text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">
              BloodFinder
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Donor List
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Find registered blood donors by name, blood group,
              phone number or division.
            </p>
          </div>

          {/* Donor statistics */}

          <div className="flex flex-wrap gap-2">

            <div className="px-3 sm:px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <p className="text-[10px] sm:text-xs text-slate-400">
                Total Donors
              </p>

              <p className="text-lg sm:text-xl font-bold text-indigo-400">
                {donors.length}
              </p>
            </div>

            <div className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-[10px] sm:text-xs text-slate-400">
                Showing
              </p>

              <p className="text-lg sm:text-xl font-bold text-emerald-400">
                {filteredDonors.length}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          FILTER SECTION
      ========================================= */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">

        <div className="flex items-center gap-2 mb-5">

          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <span className="text-indigo-400 text-lg">
              🔎
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Search & Filter
            </h3>

            <p className="text-xs text-slate-500">
              Narrow down the donor list
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

          {/* Search */}

          <div className="sm:col-span-2 lg:col-span-1">

            <label className="block text-xs font-medium text-slate-400 mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                input
                w-full
                bg-slate-800
                border-slate-700
                text-white
                placeholder:text-slate-500
                focus:border-indigo-500
                focus:outline-none
              "
            />

          </div>

          {/* Blood Group */}

          <div>

            <label className="block text-xs font-medium text-slate-400 mb-2">
              Blood Group
            </label>

            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="
                select
                select-bordered
                w-full
                bg-slate-800
                border-slate-700
                text-white
                focus:border-indigo-500
                focus:outline-none
              "
            >

              <option value="">
                All Blood Groups
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

            <label className="block text-xs font-medium text-slate-400 mb-2">
              Division
            </label>

            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="
                select
                select-bordered
                w-full
                bg-slate-800
                border-slate-700
                text-white
                focus:border-indigo-500
                focus:outline-none
              "
            >

              <option value="">
                All Divisions
              </option>

              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}

            </select>

          </div>

          {/* Reset */}

          <div className="flex items-end">

            <button
              type="button"
              onClick={handleReset}
              className="
                btn
                w-full
                bg-slate-800
                hover:bg-slate-700
                border-slate-700
                text-slate-300
                hover:text-white
              "
            >
              Reset Filters
            </button>

          </div>

        </div>

      </div>

      {/* =========================================
          MOBILE DONOR CARDS
          Visible below md
      ========================================= */}

      <div className="md:hidden space-y-4">

        {filteredDonors.length > 0 ? (

          filteredDonors.map((donor) => (

            <div
              key={donor.id}
              className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-4
                shadow-lg
              "
            >

              {/* Top section */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    bg-red-500/10
                    border
                    border-red-500/20
                    flex
                    items-center
                    justify-center
                  ">
                    <span className="text-red-400 font-bold">
                      {donor.bloodGroup}
                    </span>
                  </div>

                  <div className="min-w-0">

                    <h3 className="font-bold text-white truncate">
                      {donor.name}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">
                      ID: {donor.id}
                    </p>

                  </div>

                </div>

                {donor.available ? (
                  <span className="
                    shrink-0
                    px-2.5
                    py-1
                    rounded-full
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    text-emerald-400
                    text-xs
                    font-semibold
                  ">
                    Available
                  </span>
                ) : (
                  <span className="
                    shrink-0
                    px-2.5
                    py-1
                    rounded-full
                    bg-slate-800
                    border
                    border-slate-700
                    text-slate-400
                    text-xs
                    font-semibold
                  ">
                    Unavailable
                  </span>
                )}

              </div>

              {/* Information */}

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-slate-800/70 rounded-xl p-3">

                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">
                    Division
                  </p>

                  <p className="text-sm font-medium text-slate-200 mt-1">
                    {donor.division}
                  </p>

                </div>

                <div className="bg-slate-800/70 rounded-xl p-3">

                  <p className="text-[11px] text-slate-500 uppercase tracking-wide">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-slate-200 mt-1 break-all">
                    {donor.phone}
                  </p>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            py-12
            px-5
            text-center
          ">

            <div className="text-4xl mb-4">
              🩸
            </div>

            <h3 className="text-lg font-semibold text-white">
              No donors found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your search or filter options.
            </p>

          </div>

        )}

      </div>

      {/* =========================================
          DESKTOP TABLE
          Visible from md
      ========================================= */}

      <div className="
        hidden
        md:block
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
        shadow-xl
      ">

        <div className="overflow-x-auto">

          <table className="table w-full">

            <thead>

              <tr className="border-b border-slate-800">

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  ID
                </th>

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  Name
                </th>

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  Blood Group
                </th>

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  Division
                </th>

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  Phone
                </th>

                <th className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wide">
                  Availability
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDonors.length > 0 ? (

                filteredDonors.map((donor) => (

                  <tr
                    key={donor.id}
                    className="
                      border-b
                      border-slate-800/70
                      hover:bg-slate-800/50
                      transition
                    "
                  >

                    {/* ID */}

                    <th className="text-slate-400 font-medium">
                      {donor.id}
                    </th>

                    {/* Name */}

                    <td className="text-white font-medium">
                      {donor.name}
                    </td>

                    {/* Blood Group */}

                    <td>

                      <span className="
                        inline-flex
                        items-center
                        justify-center
                        min-w-[48px]
                        px-3
                        py-1.5
                        rounded-lg
                        bg-red-500/10
                        border
                        border-red-500/20
                        text-red-400
                        font-bold
                        text-sm
                      ">
                        {donor.bloodGroup}
                      </span>

                    </td>

                    {/* Division */}

                    <td className="text-slate-300">
                      {donor.division}
                    </td>

                    {/* Phone */}

                    <td className="text-slate-300">
                      {donor.phone}
                    </td>

                    {/* Availability */}

                    <td>

                      {donor.available ? (

                        <span className="
                          inline-flex
                          px-3
                          py-1.5
                          rounded-full
                          bg-emerald-500/10
                          border
                          border-emerald-500/20
                          text-emerald-400
                          text-xs
                          font-semibold
                        ">
                          Available
                        </span>

                      ) : (

                        <span className="
                          inline-flex
                          px-3
                          py-1.5
                          rounded-full
                          bg-slate-800
                          border
                          border-slate-700
                          text-slate-400
                          text-xs
                          font-semibold
                        ">
                          Unavailable
                        </span>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-14"
                  >

                    <div className="text-4xl mb-3">
                      🩸
                    </div>

                    <p className="text-lg font-semibold text-white">
                      No donors found
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Try changing your search or filter options.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default DonorList;