import React, { useEffect, useState } from "react";

const DonorList = ({ bloodGroups, divisions, donors, setDonors }) => {
 

  // Filter states
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [division, setDivision] = useState("");

  // Load donor data
  useEffect(() => {
    const loadDonors = async () => {
      try {
        const res = await fetch("/data.json");

        if (!res.ok) {
          throw new Error("Failed to load donor data");
        }

        const data = await res.json();
        setDonors(data);
      } catch (error) {
        console.error("Error loading donors:", error);
      }
    };

    loadDonors();
  }, []);

  // Filter donors
  const filteredDonors = donors.filter((donor) => {
    const searchText = search.toLowerCase().trim();

    const name = donor.name?.toLowerCase() || "";
    const phone = donor.phone?.toString() || "";

    // Search by name or phone
    const matchesSearch =
      name.includes(searchText) ||
      phone.includes(searchText);

    // Filter by blood group
    const matchesBloodGroup =
      bloodGroup === "" ||
      donor.bloodGroup === bloodGroup;

    // Filter by division
    const matchesDivision =
      division === "" ||
      donor.division === division;

    return (
      matchesSearch &&
      matchesBloodGroup &&
      matchesDivision
    );
  });

  // Reset all filters
  const handleReset = () => {
    setSearch("");
    setBloodGroup("");
    setDivision("");
  };

  return (
    <div className="container mx-auto py-8">

      {/* =========================
          TITLE + DONOR COUNT
      ========================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        <h2 className="text-3xl font-bold text-white">
          Donor List
        </h2>

        <div className="flex gap-2">

          {/* Total Donors */}
          <div className="badge badge-primary badge-lg">
            Total: {donors.length}
          </div>

          {/* Filtered Donors */}
          <div className="badge badge-secondary badge-lg">
            Showing: {filteredDonors.length}
          </div>

        </div>

      </div>

      {/* =========================
          SEARCH & FILTERS
      ========================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        {/* Blood Group */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="select select-bordered w-full"
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

        {/* Division */}
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="select select-bordered w-full"
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

        {/* Reset */}
        <button
          onClick={handleReset}
          className="btn btn-outline"
        >
          Reset Filters
        </button>

      </div>

      {/* =========================
          DONOR TABLE
      ========================== */}
      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>
            <tr>
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

                <tr key={donor.id}>

                  {/* ID */}
                  <th>
                    {donor.id}
                  </th>

                  {/* Name */}
                  <td>
                    {donor.name}
                  </td>

                  {/* Blood Group */}
                  <td>
                    <span className="badge badge-error">
                      {donor.bloodGroup}
                    </span>
                  </td>

                  {/* Division */}
                  <td>
                    {donor.division}
                  </td>

                  {/* Phone */}
                  <td>
                    {donor.phone}
                  </td>

                  {/* Availability */}
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
                  className="text-center py-8"
                >
                  No donors found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DonorList;