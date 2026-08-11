import React from "react";

const DonorFind = ({
  requestedBloodData,
  setRequestedBloodData,
  bloodGroups,
  divisions,
}) => {
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRequestedBloodData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Search Data:", requestedBloodData);
  };

  return (
    <div className="card bg-slate-900 shadow-sm mb-6">
      <div className="card-body">

        {/* Title */}
        <h2 className="card-title text-white mb-4">
          Donor Request
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Type your Name here"
            className="input w-full"
            value={requestedBloodData.name}
            onChange={handleChange}
            required
          />

          {/* Blood Group */}
          <select
            name="bloodGroup"
            value={requestedBloodData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Your Blood Group
            </option>

            {bloodGroups.map((bloodGroup) => (
              <option
                key={bloodGroup}
                value={bloodGroup}
              >
                {bloodGroup}
              </option>
            ))}
          </select>

          {/* Division */}
          <select
            name="division"
            value={requestedBloodData.division}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Your Division
            </option>

            {divisions.map((division) => (
              <option
                key={division}
                value={division}
              >
                {division}
              </option>
            ))}
          </select>

          {/* Find Donor Button */}
          <button
            type="submit"
            className="btn w-full text-white border-0"
            style={{
              backgroundColor: "#605DFF",
            }}
          >
            Find Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorFind;