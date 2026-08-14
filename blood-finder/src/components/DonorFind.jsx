import React from "react";

const DonorFind = ({
  requestedBloodData,
  setRequestedBloodData,
  bloodGroups,
  divisions,
}) => {
  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRequestedBloodData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Search Data:", requestedBloodData);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-0 sm:px-2 py-8 sm:py-10 lg:py-16">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="text-center mb-8 sm:mb-10 px-2">

        {/* Badge */}

        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">

          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />

          Find a Blood Donor

        </div>

        {/* Heading */}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 leading-tight">

          Find the right blood.

        </h1>

        {/* Description */}

        <p className="max-w-2xl mx-auto mt-3 sm:mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">

          Tell us what blood you need and where you are located.
          BloodFinder will help you find compatible donors.

        </p>

      </div>

      {/* =========================
          MAIN SEARCH CARD
      ========================= */}

      <div className="grid grid-cols-1 lg:grid-cols-5 bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">

        {/* =========================
            LEFT INFORMATION PANEL
        ========================= */}

        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#605DFF] to-[#4037c9] p-6 sm:p-8 md:p-10">

          {/* Decorations */}

          <div className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 -left-20 sm:-bottom-28 sm:-left-24 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col justify-between h-full">

            {/* Content */}

            <div>

              {/* Icon */}

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-5 sm:mb-7">

                <span className="text-3xl sm:text-4xl">
                  🩸
                </span>

              </div>

              {/* Heading */}

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">

                Someone needs

                <span className="block text-indigo-200">
                  your help.
                </span>

              </h2>

              {/* Description */}

              <p className="text-indigo-100 mt-4 sm:mt-5 leading-relaxed text-sm sm:text-base">

                Finding compatible blood shouldn't be difficult.
                Enter your requirements and we'll help you find
                suitable donors.

              </p>

            </div>

            {/* =========================
                FEATURES
            ========================= */}

            <div className="mt-8 sm:mt-10 space-y-4">

              {/* Feature 1 */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-sm">

                  ✓

                </div>

                <p className="text-white text-sm sm:text-base">
                  Find compatible blood groups
                </p>

              </div>

              {/* Feature 2 */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-sm">

                  ✓

                </div>

                <p className="text-white text-sm sm:text-base">
                  Prioritize donors near you
                </p>

              </div>

              {/* Feature 3 */}

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-sm">

                  ✓

                </div>

                <p className="text-white text-sm sm:text-base">
                  Get the best matches first
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =========================
            SEARCH FORM
        ========================= */}

        <div className="lg:col-span-3 p-5 sm:p-7 md:p-10">

          {/* Form Header */}

          <div className="mb-6 sm:mb-7">

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">

              Blood Request

            </h2>

            <p className="text-slate-500 mt-1 text-sm sm:text-base">

              Enter the details below to search for donors.

            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =========================
                NAME
            ========================= */}

            <div>

              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Your Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full h-12 min-h-12 text-sm sm:text-base"
                value={requestedBloodData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* =========================
                BLOOD GROUP
            ========================= */}

            <div>

              <label
                htmlFor="bloodGroup"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Required Blood Group
              </label>

              <select
                id="bloodGroup"
                name="bloodGroup"
                value={requestedBloodData.bloodGroup}
                onChange={handleChange}
                className="select select-bordered w-full h-12 min-h-12 text-sm sm:text-base"
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

              <label
                htmlFor="division"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Your Division
              </label>

              <select
                id="division"
                name="division"
                value={requestedBloodData.division}
                onChange={handleChange}
                className="select select-bordered w-full h-12 min-h-12 text-sm sm:text-base"
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

              <div className="flex items-start gap-3">

                <div className="text-lg sm:text-xl shrink-0">
                  💡
                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-900">
                    How matching works
                  </p>

                  <p className="text-xs sm:text-sm text-indigo-700 mt-1 leading-relaxed">

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
              className="
                w-full
                min-h-12
                h-12
                sm:h-13
                rounded-xl
                text-white
                font-bold
                text-sm
                sm:text-base
                border-0
                transition-all
                duration-200
                shadow-lg
                shadow-indigo-200
                hover:-translate-y-0.5
                active:translate-y-0
              "
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

      <div className="text-center mt-6 sm:mt-8 px-3">

        <p className="text-xs sm:text-sm text-slate-400">

          BloodFinder helps connect people with compatible
          blood donors when it matters most ❤️

        </p>

      </div>

    </section>
  );
};

export default DonorFind;