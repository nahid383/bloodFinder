import React from "react";

const AIScoreResult = ({ matchedDonorsData }) => {
  console.log(matchedDonorsData, "matched donor data");

  return (
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
        {matchedDonorsData && matchedDonorsData.length > 0 ? (
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
                      className="btn text-white border-0"
                      style={{
                        backgroundColor: "#605DFF",
                      }}
                    >
                      Request
                    </button>

                  </div>

                </div>
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
  );
};

export default AIScoreResult;