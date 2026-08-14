import React, { useEffect, useRef, useState } from "react";

const DonorList = ({
  bloodGroups,
  divisions,
  donors,
  setDonors,
}) => {
  // =========================
  // FILTER STATES
  // =========================

  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");

  // Result section reference
  const resultsRef = useRef(null);

  // =========================
  // FILTER DONORS
  // =========================

  const filteredDonors = donors.filter((donor) => {
    const searchText = search.toLowerCase().trim();

    const name = donor.name?.toLowerCase() || "";
    const phone = donor.phone?.toString() || "";

    // Search by name or phone
    const matchesSearch =
      searchText === "" ||
      name.includes(searchText) ||
      phone.includes(searchText);

    // Blood group
    const matchesBloodGroup =
      bloodGroup === "" ||
      donor.bloodGroup === bloodGroup;

    // Division
    const matchesDivision =
      division === "" ||
      donor.division === division;

    return (
      matchesSearch &&
      matchesBloodGroup &&
      matchesDivision
    );
  });

  // =========================
  // CHECK WHETHER FILTER IS ACTIVE
  // =========================

  const hasActiveFilter =
    search.trim() !== "" ||
    bloodGroup !== "" ||
    division !== "";

  // =========================
  // SCROLL TO RESULTS
  // =========================

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // =========================
  // RESET FILTERS
  // =========================

  const handleReset = () => {
    setSearch("");
    setBloodGroup("");
    setDivision("");
  };

  // =========================
  // OPTIONAL:
  // SHOW RESULT MESSAGE AFTER
  // FILTER CHANGES
  // =========================

  useEffect(() => {
    if (!hasActiveFilter) return;

    // Don't automatically scroll.
    // The user can decide when to view results.
  }, [search, bloodGroup, division]);

  return (
    <div className="w-full">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <p className="text-sm font-semibold text-indigo-400 mb-1">
            BLOODFINDER
          </p>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Donor List
          </h2>

          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Find available blood donors across Bangladesh.
          </p>
        </div>

        {/* =========================
            COUNTERS
        ========================= */}

        <div className="flex flex-wrap gap-2">

          <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold">
            Total: {donors.length}
          </div>

          <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-semibold">
            Showing: {filteredDonors.length}
          </div>

        </div>

      </div>

      {/* =========================
          FILTER CARD
      ========================= */}

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 mb-6">

        <div className="mb-5">

          <h3 className="text-lg font-bold text-slate-900">
            Find a donor
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Search by name, phone number, blood group or division.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* =========================
              SEARCH
          ========================= */}

          <div className="md:col-span-1">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search
            </label>

            <input
              type="text"
              placeholder="Name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                input
                input-bordered
                w-full
                bg-white
                text-slate-900
                border-slate-300
                focus:border-indigo-500
                focus:outline-none
              "
            />

          </div>

          {/* =========================
              BLOOD GROUP
          ========================= */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Blood Group
            </label>

            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="
                select
                select-bordered
                w-full
                bg-white
                text-slate-900
                border-slate-300
                focus:border-indigo-500
                focus:outline-none
              "
            >

              <option value="">
                All Blood Groups
              </option>

              {bloodGroups.map((group) => (
                <option
                  key={group}
                  value={group}
                  className="bg-white text-slate-900"
                >
                  {group}
                </option>
              ))}

            </select>

          </div>

          {/* =========================
              DIVISION
          ========================= */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Division
            </label>

            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="
                select
                select-bordered
                w-full
                bg-white
                text-slate-900
                border-slate-300
                focus:border-indigo-500
                focus:outline-none
              "
            >

              <option value="">
                All Divisions
              </option>

              {divisions.map((div) => (
                <option
                  key={div}
                  value={div}
                  className="bg-white text-slate-900"
                >
                  {div}
                </option>
              ))}

            </select>

          </div>

          {/* =========================
              RESET
          ========================= */}

          <div className="flex items-end">

            <button
              type="button"
              onClick={handleReset}
              className="
                btn
                btn-outline
                w-full
                border-slate-300
                text-slate-700
                hover:bg-slate-100
              "
            >
              Reset Filters
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================
          MOBILE RESULT NOTIFICATION
      ================================================== */}

      {hasActiveFilter && (
        <div className="md:hidden mb-6">

          {filteredDonors.length > 0 ? (

            <div className="
              rounded-2xl
              bg-indigo-50
              border
              border-indigo-100
              p-4
              shadow-sm
            ">

              <div className="flex items-start gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-full
                  bg-indigo-100
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  🔎
                </div>

                <div className="flex-1">

                  <p className="font-bold text-indigo-900">
                    {filteredDonors.length}{" "}
                    {filteredDonors.length === 1
                      ? "donor"
                      : "donors"}{" "}
                    found
                  </p>

                  <p className="text-sm text-indigo-700 mt-1">
                    Your search results are below. Scroll down
                    to view the matching donors.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToResults}
                    className="
                      mt-3
                      inline-flex
                      items-center
                      justify-center
                      px-4
                      py-2
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-700
                      text-white
                      text-sm
                      font-semibold
                      transition
                    "
                  >
                    View Results ↓
                  </button>

                </div>

              </div>

            </div>

          ) : (

            <div className="
              rounded-2xl
              bg-red-50
              border
              border-red-100
              p-4
            ">

              <div className="flex items-start gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-full
                  bg-red-100
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  !
                </div>

                <div>

                  <p className="font-bold text-red-900">
                    No donors found
                  </p>

                  <p className="text-sm text-red-700 mt-1">
                    No donor matches your selected blood group,
                    division or search.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="
                      mt-3
                      text-sm
                      font-semibold
                      text-red-700
                      underline
                    "
                  >
                    Clear filters
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>
      )}

      {/* =========================
          RESULTS SECTION
      ========================= */}

      <div
        ref={resultsRef}
        className="scroll-mt-24"
      >

        {/* Results heading */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

          <div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Matching Donors
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              {filteredDonors.length} donor
              {filteredDonors.length !== 1 ? "s" : ""} found
            </p>

          </div>

        </div>

        {/* =========================
            MOBILE DONOR CARDS
        ========================= */}

        <div className="md:hidden space-y-4">

          {filteredDonors.length > 0 ? (

            filteredDonors.map((donor) => (

              <div
                key={donor.id}
                className="
                  bg-white
                  rounded-2xl
                  p-5
                  shadow-lg
                  border
                  border-slate-100
                "
              >

                {/* Name + ID */}

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h4 className="text-lg font-bold text-slate-900">
                      {donor.name}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">
                      ID: {donor.id}
                    </p>

                  </div>

                  <span className="
                    px-3
                    py-1.5
                    rounded-lg
                    bg-red-100
                    text-red-600
                    font-bold
                    text-sm
                  ">
                    {donor.bloodGroup}
                  </span>

                </div>

                {/* Information */}

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-slate-50 rounded-xl p-3">

                    <p className="text-xs text-slate-400">
                      Division
                    </p>

                    <p className="font-semibold text-slate-800 mt-1">
                      {donor.division}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-3">

                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    <p className="font-semibold text-slate-800 mt-1 break-all">
                      {donor.phone}
                    </p>

                  </div>

                </div>

                {/* Availability */}

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Availability
                  </span>

                  {donor.available ? (

                    <span className="
                      px-3
                      py-1.5
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-xs
                      font-bold
                    ">
                      ● Available
                    </span>

                  ) : (

                    <span className="
                      px-3
                      py-1.5
                      rounded-full
                      bg-slate-100
                      text-slate-500
                      text-xs
                      font-bold
                    ">
                      Unavailable
                    </span>

                  )}

                </div>

                {/* Call button */}

                {donor.phone && (
                  <a
                    href={`tel:${donor.phone}`}
                    className="
                      btn
                      w-full
                      mt-4
                      bg-indigo-600
                      hover:bg-indigo-700
                      text-white
                      border-0
                    "
                  >
                    📞 Contact Donor
                  </a>
                )}

              </div>

            ))

          ) : (

            <div className="
              bg-white
              rounded-2xl
              p-8
              text-center
            ">

              <div className="text-4xl mb-3">
                🩸
              </div>

              <h4 className="text-lg font-bold text-slate-900">
                No donors found
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                Try another blood group or division.
              </p>

            </div>

          )}

        </div>

        {/* =========================
            DESKTOP TABLE
        ========================= */}

        <div className="
          hidden
          md:block
          overflow-x-auto
          rounded-2xl
          bg-white
          shadow-xl
          border
          border-slate-100
        ">

          <table className="table">

            <thead>

              <tr className="text-slate-600">

                <th>ID</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Division</th>
                <th>Phone</th>
                <th>Available</th>

              </tr>

            </thead>

            <tbody>

              {filteredDonors.length > 0 ? (

                filteredDonors.map((donor) => (

                  <tr
                    key={donor.id}
                    className="text-slate-800"
                  >

                    <th>{donor.id}</th>

                    <td className="font-semibold">
                      {donor.name}
                    </td>

                    <td>

                      <span className="badge badge-error">
                        {donor.bloodGroup}
                      </span>

                    </td>

                    <td>
                      {donor.division}
                    </td>

                    <td>
                      {donor.phone}
                    </td>

                    <td>

                      {donor.available ? (

                        <span className="badge badge-success">
                          Available
                        </span>

                      ) : (

                        <span className="badge badge-ghost">
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
                    className="text-center py-10 text-slate-500"
                  >
                    No donors found.

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