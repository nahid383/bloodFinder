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
    <section className="max-w-6xl mx-auto py-10 md:py-16">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="text-center mb-10">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold mb-5">

          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

          Find a Blood Donor

        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-950">
          Find the right blood.
        </h1>

        <p className="max-w-2xl mx-auto mt-4 text-slate-500 text-lg leading-relaxed">
          Tell us what blood you need and where you are located.
          BloodFinder will help you find compatible donors.
        </p>

      </div>

      {/* =========================
          MAIN SEARCH CARD
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">

        {/* =========================
            LEFT INFORMATION PANEL
        ========================= */}

        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#605DFF] to-[#4037c9] p-8 md:p-10">

          {/* Decorations */}

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative z-10 h-full flex flex-col justify-between">

            <div>

              {/* Icon */}

              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7">

                <span className="text-4xl">
                  🩸
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">

                Someone needs
                <span className="block text-indigo-200">
                  your help.
                </span>

              </h2>

              <p className="text-indigo-100 mt-5 leading-relaxed">
                Finding compatible blood shouldn't be difficult.
                Enter your requirements and we'll help you find
                suitable donors.
              </p>

            </div>

            {/* Features */}

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Find compatible blood groups
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Prioritize donors near you
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  ✓
                </div>

                <p className="text-white">
                  Get the best matches first
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            SEARCH FORM
        ========================= */}

        <div className="lg:col-span-3 p-8 md:p-10">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-slate-900">
              Blood Request
            </h2>

            <p className="text-slate-500 mt-1">
              Enter the details below to search for donors.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =========================
                NAME
            ========================= */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full h-12"
                value={requestedBloodData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* =========================
                BLOOD GROUP
            ========================= */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Required Blood Group
              </label>

              <select
                name="bloodGroup"
                value={requestedBloodData.bloodGroup}
                onChange={handleChange}
                className="select select-bordered w-full h-12"
                required
              >

                <option value="" disabled>
                  Select blood group
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

            </div>

            {/* =========================
                DIVISION
            ========================= */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Your Division
              </label>

              <select
                name="division"
                value={requestedBloodData.division}
                onChange={handleChange}
                className="select select-bordered w-full h-12"
                required
              >

                <option value="" disabled>
                  Select your division
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

            </div>

            {/* =========================
                INFO BOX
            ========================= */}

            <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-4">

              <div className="flex gap-3">

                <div className="text-xl">
                  💡
                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-900">
                    How matching works
                  </p>

                  <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
                    We prioritize compatible blood groups,
                    donors from your division, and currently
                    available donors.
                  </p>

                </div>

              </div>

            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================= */}

            <button
              type="submit"
              className="w-full h-13 rounded-xl text-white font-bold text-base border-0 transition-all duration-200 shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #605DFF, #4037c9)",
              }}
            >
              Find Compatible Donors →
            </button>

          </form>

        </div>

      </div>

      {/* =========================
          BOTTOM NOTE
      ========================= */}

      <div className="text-center mt-8">

        <p className="text-sm text-slate-400">
          BloodFinder helps connect people with compatible
          blood donors when it matters most ❤️
        </p>

      </div>

    </section>
  );
};

export default DonorFind;