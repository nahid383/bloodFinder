import React, { useState } from "react";

const AIScoreResult = ({ matchedDonorsData }) => {
  const [selectedDonor, setSelectedDonor] = useState(null);

  console.log(matchedDonorsData, "matched donor data");

  const handleRequest = (donor) => {
    setSelectedDonor(donor);
  };

  const closeModal = () => {
    setSelectedDonor(null);
  };

  return (
    <>
      <div className="card bg-slate-900 shadow-sm mb-6">
        <div className="card-body">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">
              AI Matching Score
            </h1>

            <p className="text-slate-300 mt-1">
              Find the best donor match for you
            </p>
          </div>

          {/* Donor Results */}
          {matchedDonorsData &&
          matchedDonorsData.length > 0 ? (
            <div className="space-y-4">

              {matchedDonorsData.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* Donor Information */}
                    <div className="flex-1">

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h2 className="text-xl font-bold text-white">
                          {donor.name}
                        </h2>

                        <span className="text-sm text-slate-400">
                          {donor.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                        {/* Blood Group */}
                        <div>
                          <p className="text-sm text-slate-400">
                            Blood Group
                          </p>

                          <span className="badge badge-error mt-1">
                            {donor.bloodGroup}
                          </span>
                        </div>

                        {/* Division */}
                        <div>
                          <p className="text-sm text-slate-400">
                            Division
                          </p>

                          <p className="text-white font-medium mt-1">
                            {donor.division}
                          </p>
                        </div>

                        {/* Phone */}
                        <div>
                          <p className="text-sm text-slate-400">
                            Phone
                          </p>

                          <p className="text-white font-medium mt-1">
                            {donor.phone}
                          </p>
                        </div>

                        {/* Availability */}
                        <div>
                          <p className="text-sm text-slate-400">
                            Availability
                          </p>

                          {donor.available ? (
                            <span className="badge badge-success mt-1">
                              Available
                            </span>
                          ) : (
                            <span className="badge badge-ghost mt-1">
                              Unavailable
                            </span>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* Score + Request */}
                    <div className="flex items-center gap-4">

                      {/* Score */}
                      <div className="text-center">
                        <p className="text-sm text-slate-400">
                          Match Score
                        </p>

                        <div className="radial-progress text-primary mt-1">
                          {donor.score}%
                        </div>
                      </div>

                      {/* Request Button */}
                      <button
                        type="button"
                        onClick={() => handleRequest(donor)}
                        className="btn text-white border-0"
                        style={{
                          backgroundColor: "#605DFF",
                        }}
                      >
                        Request
                      </button>

                    </div>
                  </div>

                  {/* Score Bar */}
                  <progress
                    className="progress progress-primary w-full mt-4"
                    value={donor.score}
                    max="100"
                  />
                </div>
              ))}

            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 text-lg">
                No matching donors found.
              </p>

              <p className="text-slate-500 text-sm mt-2">
                Try selecting a different blood group or division.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* =========================
          REQUEST MODAL
      ========================= */}

      {selectedDonor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div
              className="px-6 py-5"
              style={{
                background:
                  "linear-gradient(135deg, #605DFF, #4037c9)",
              }}
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-indigo-200 text-sm font-semibold">
                    DONOR REQUEST
                  </p>

                  <h2 className="text-2xl font-bold text-white mt-1">
                    {selectedDonor.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl"
                >
                  ×
                </button>

              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">

              {/* Donor Information */}
              <div className="grid grid-cols-2 gap-3">

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Donor ID
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {selectedDonor.id}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Blood Group
                  </p>

                  <p className="text-red-400 font-bold text-xl mt-1">
                    {selectedDonor.bloodGroup}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Division
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {selectedDonor.division}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Match Score
                  </p>

                  <p className="text-indigo-400 font-bold text-xl mt-1">
                    {selectedDonor.score}%
                  </p>
                </div>

              </div>

              {/* Contact */}
              <div className="mt-5 bg-green-950/40 border border-green-800/50 rounded-xl p-5">

                <p className="text-green-400 text-sm font-semibold">
                  CONTACT THE DONOR
                </p>

                <p className="text-white font-semibold mt-2">
                  Contact via this number:
                </p>

                <a
                  href={`tel:${selectedDonor.phone}`}
                  className="block text-2xl font-bold text-green-400 mt-1 hover:underline"
                >
                  {selectedDonor.phone}
                </a>

              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="btn w-full mt-5 bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIScoreResult;