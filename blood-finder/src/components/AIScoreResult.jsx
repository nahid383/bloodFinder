import React, { useEffect, useRef, useState } from "react";

const AIScoreResult = ({
  matchedDonorsData = [],
  requestedBloodData,
}) => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showScrollNotice, setShowScrollNotice] = useState(false);

  const isFirstRender = useRef(true);
  const noticeTimer = useRef(null);

  // =========================================
  // SHOW MOBILE "VIEW RESULTS" NOTICE
  // =========================================

  useEffect(() => {
    // Don't show notification on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only show after the user has selected/entered something
    const hasInput =
      requestedBloodData?.name?.trim() ||
      requestedBloodData?.bloodGroup ||
      requestedBloodData?.division;

    if (!hasInput) {
      return;
    }

    setShowScrollNotice(true);

    // Clear previous timer
    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
    }

    // Hide automatically after 5 seconds
    noticeTimer.current = setTimeout(() => {
      setShowScrollNotice(false);
    }, 5000);

    return () => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, [
    requestedBloodData?.name,
    requestedBloodData?.bloodGroup,
    requestedBloodData?.division,
  ]);

  // =========================================
  // SCROLL TO RESULTS
  // =========================================

  const scrollToResults = () => {
    const resultsSection = document.getElementById(
      "ai-matching-results"
    );

    if (resultsSection) {
      resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setShowScrollNotice(false);
  };

  // =========================================
  // REQUEST DONOR
  // =========================================

  const handleRequest = (donor) => {
    setSelectedDonor(donor);
  };

  // =========================================
  // CLOSE MODAL
  // =========================================

  const closeModal = () => {
    setSelectedDonor(null);
  };

  return (
    <>
      {/* =========================================
          MOBILE RESULT NOTICE
      ========================================= */}

      {showScrollNotice && (
        <div
          className="
            fixed
            bottom-4
            left-4
            right-4
            z-[90]
            md:hidden
            bg-slate-900
            text-white
            rounded-2xl
            shadow-2xl
            border
            border-slate-700
            p-4
          "
        >
          <div className="flex items-center gap-3">

            {/* Icon */}
            <div
              className="
                w-10
                h-10
                shrink-0
                rounded-xl
                bg-indigo-600
                flex
                items-center
                justify-center
              "
            >
              🔎
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">

              <p className="font-bold text-sm">
                Donor matches updated
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                Your matching results are below.
              </p>

            </div>

            {/* View Results */}
            <button
              type="button"
              onClick={scrollToResults}
              className="
                shrink-0
                px-3
                py-2
                rounded-lg
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                text-xs
                font-bold
                transition
              "
            >
              View
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowScrollNotice(false)}
              aria-label="Close notification"
              className="
                shrink-0
                w-7
                h-7
                rounded-full
                text-slate-400
                hover:text-white
                hover:bg-white/10
                transition
              "
            >
              ×
            </button>

          </div>
        </div>
      )}

      {/* =========================================
          AI MATCHING RESULTS
      ========================================= */}

      <section
        id="ai-matching-results"
        className="w-full scroll-mt-6"
      >

        {/* Section Header */}
        <div className="mb-6 sm:mb-8">

          <div className="flex items-center gap-3 mb-2">

            <div
              className="
                w-10
                h-10
                sm:w-11
                sm:h-11
                rounded-xl
                bg-indigo-100
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <span className="text-xl sm:text-2xl">
                ✨
              </span>
            </div>

            <div className="min-w-0">

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                AI Matching Results
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-1">
                Best available donors matched for your request
              </p>

            </div>

          </div>

        </div>

        {/* =========================================
            RESULTS
        ========================================= */}

        {matchedDonorsData.length > 0 ? (

          <div className="space-y-4 sm:space-y-5">

            {matchedDonorsData.map((donor, index) => {

              const score = Math.min(
                100,
                Math.max(0, Number(donor.score) || 0)
              );

              return (
                <div
                  key={donor.id}
                  className="
                    bg-white
                    rounded-2xl
                    sm:rounded-3xl
                    border
                    border-slate-200
                    shadow-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                    overflow-hidden
                  "
                >

                  {/* Top Accent */}
                  <div className="
                    h-1
                    bg-gradient-to-r
                    from-indigo-500
                    via-purple-500
                    to-red-500
                  " />

                  <div className="p-4 sm:p-6">

                    {/* =================================
                        TOP SECTION
                    ================================= */}

                    <div
                      className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-5
                      "
                    >

                      {/* Donor Information */}
                      <div className="flex-1 min-w-0">

                        {/* Name + Ranking */}
                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                            mb-5
                          "
                        >

                          <div className="
                            flex
                            items-center
                            gap-3
                            min-w-0
                          ">

                            {/* Avatar */}
                            <div
                              className="
                                w-11
                                h-11
                                sm:w-12
                                sm:h-12
                                shrink-0
                                rounded-full
                                bg-gradient-to-br
                                from-red-500
                                to-rose-600
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                                text-lg
                              "
                            >
                              {donor.name
                                ?.charAt(0)
                                ?.toUpperCase() || "D"}
                            </div>

                            <div className="min-w-0">

                              <h2
                                className="
                                  text-lg
                                  sm:text-xl
                                  font-bold
                                  text-slate-900
                                  truncate
                                "
                              >
                                {donor.name || "Unknown Donor"}
                              </h2>

                              <p className="
                                text-xs
                                sm:text-sm
                                text-slate-400
                                mt-0.5
                              ">
                                ID: {donor.id}
                              </p>

                            </div>

                          </div>

                          {/* Ranking */}
                          <div
                            className="
                              shrink-0
                              px-2.5
                              py-1
                              rounded-full
                              bg-indigo-50
                              text-indigo-600
                              text-xs
                              font-bold
                            "
                          >
                            #{index + 1}
                          </div>

                        </div>

                        {/* =================================
                            DONOR DETAILS
                        ================================= */}

                        <div
                          className="
                            grid
                            grid-cols-2
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-3
                          "
                        >

                          {/* Blood Group */}
                          <div
                            className="
                              rounded-xl
                              bg-red-50
                              border
                              border-red-100
                              p-3
                            "
                          >
                            <p className="
                              text-[11px]
                              sm:text-xs
                              text-slate-500
                              uppercase
                              tracking-wide
                            ">
                              Blood Group
                            </p>

                            <p className="
                              text-red-600
                              font-black
                              text-xl
                              sm:text-2xl
                              mt-1
                            ">
                              {donor.bloodGroup || "N/A"}
                            </p>

                          </div>

                          {/* Division */}
                          <div
                            className="
                              rounded-xl
                              bg-slate-50
                              border
                              border-slate-100
                              p-3
                            "
                          >
                            <p className="
                              text-[11px]
                              sm:text-xs
                              text-slate-500
                              uppercase
                              tracking-wide
                            ">
                              Division
                            </p>

                            <p className="
                              text-slate-900
                              font-semibold
                              text-sm
                              sm:text-base
                              mt-2
                              truncate
                            ">
                              {donor.division || "N/A"}
                            </p>

                          </div>

                          {/* Availability */}
                          <div
                            className="
                              rounded-xl
                              bg-green-50
                              border
                              border-green-100
                              p-3
                            "
                          >
                            <p className="
                              text-[11px]
                              sm:text-xs
                              text-slate-500
                              uppercase
                              tracking-wide
                            ">
                              Status
                            </p>

                            <div className="mt-2">

                              {donor.available ? (
                                <span className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  text-green-600
                                  font-semibold
                                  text-sm
                                ">
                                  <span className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-green-500
                                    animate-pulse
                                  " />
                                  Available
                                </span>
                              ) : (
                                <span className="
                                  text-slate-400
                                  text-sm
                                ">
                                  Unavailable
                                </span>
                              )}

                            </div>

                          </div>

                          {/* Score */}
                          <div
                            className="
                              rounded-xl
                              bg-indigo-50
                              border
                              border-indigo-100
                              p-3
                            "
                          >
                            <p className="
                              text-[11px]
                              sm:text-xs
                              text-slate-500
                              uppercase
                              tracking-wide
                            ">
                              Match
                            </p>

                            <p className="
                              text-indigo-600
                              font-black
                              text-xl
                              sm:text-2xl
                              mt-1
                            ">
                              {score}%
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* =================================
                          ACTION AREA
                      ================================= */}

                      <div
                        className="
                          flex
                          flex-row
                          lg:flex-col
                          items-center
                          gap-3
                          lg:min-w-[150px]
                        "
                      >

                        <button
                          type="button"
                          onClick={() => handleRequest(donor)}
                          className="
                            flex-1
                            lg:w-full
                            h-12
                            px-5
                            rounded-xl
                            bg-indigo-600
                            hover:bg-indigo-700
                            active:scale-[0.98]
                            text-white
                            font-bold
                            text-sm
                            transition-all
                            shadow-lg
                            shadow-indigo-100
                          "
                        >
                          Request Donor
                        </button>

                      </div>

                    </div>

                    {/* =================================
                        SCORE PROGRESS
                    ================================= */}

                    <div className="mt-5">

                      <div
                        className="
                          flex
                          justify-between
                          items-center
                          mb-2
                        "
                      >

                        <span className="text-xs text-slate-400">
                          Compatibility
                        </span>

                        <span className="
                          text-xs
                          font-bold
                          text-indigo-600
                        ">
                          {score}%
                        </span>

                      </div>

                      <div className="
                        w-full
                        h-2
                        rounded-full
                        bg-slate-100
                        overflow-hidden
                      ">
                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-indigo-500
                            to-purple-500
                            transition-all
                            duration-500
                          "
                          style={{
                            width: `${score}%`,
                          }}
                        />
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* =========================================
              NO RESULTS
          ========================================= */

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              sm:rounded-3xl
              p-8
              sm:p-12
              text-center
              shadow-sm
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
                text-3xl
                mb-5
              "
            >
              🔎
            </div>

            <h2 className="
              text-xl
              sm:text-2xl
              font-bold
              text-slate-900
            ">
              No matching donors found
            </h2>

            <p className="
              text-sm
              sm:text-base
              text-slate-500
              mt-2
              max-w-md
              mx-auto
            ">
              Try selecting a different blood group or division
              to find available donors.
            </p>

          </div>

        )}

      </section>

      {/* =========================================
          REQUEST MODAL
      ========================================= */}

      {selectedDonor && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-end
            sm:items-center
            justify-center
            bg-slate-950/70
            backdrop-blur-sm
            p-0
            sm:p-4
          "
          onClick={closeModal}
        >

          <div
            className="
              w-full
              sm:max-w-lg
              bg-white
              rounded-t-3xl
              sm:rounded-3xl
              shadow-2xl
              overflow-hidden
              max-h-[92vh]
              overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div
              className="
                bg-gradient-to-br
                from-indigo-600
                to-purple-700
                p-5
                sm:p-6
                text-white
              "
            >

              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <div className="
                    w-12
                    h-12
                    rounded-full
                    bg-white/15
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    shrink-0
                  ">
                    {selectedDonor.name
                      ?.charAt(0)
                      ?.toUpperCase() || "D"}
                  </div>

                  <div className="min-w-0">

                    <p className="
                      text-indigo-200
                      text-xs
                      font-bold
                      tracking-wider
                    ">
                      DONOR REQUEST
                    </p>

                    <h2 className="
                      text-xl
                      sm:text-2xl
                      font-black
                      mt-1
                      truncate
                    ">
                      {selectedDonor.name}
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close donor request"
                  className="
                    w-9
                    h-9
                    shrink-0
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                    flex
                    items-center
                    justify-center
                    text-xl
                    transition
                  "
                >
                  ×
                </button>

              </div>

            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6">

              {/* Information */}
              <div className="
                grid
                grid-cols-2
                gap-3
              ">

                {/* ID */}
                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                  border
                  border-slate-100
                ">
                  <p className="text-xs text-slate-400">
                    Donor ID
                  </p>

                  <p className="
                    text-slate-900
                    font-bold
                    mt-1
                    break-all
                  ">
                    {selectedDonor.id}
                  </p>
                </div>

                {/* Blood */}
                <div className="
                  bg-red-50
                  rounded-xl
                  p-4
                  border
                  border-red-100
                ">
                  <p className="text-xs text-slate-400">
                    Blood Group
                  </p>

                  <p className="
                    text-red-600
                    font-black
                    text-xl
                    mt-1
                  ">
                    {selectedDonor.bloodGroup}
                  </p>
                </div>

                {/* Division */}
                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                  border
                  border-slate-100
                ">
                  <p className="text-xs text-slate-400">
                    Division
                  </p>

                  <p className="
                    text-slate-900
                    font-semibold
                    mt-1
                  ">
                    {selectedDonor.division}
                  </p>
                </div>

                {/* Score */}
                <div className="
                  bg-indigo-50
                  rounded-xl
                  p-4
                  border
                  border-indigo-100
                ">
                  <p className="text-xs text-slate-400">
                    Match Score
                  </p>

                  <p className="
                    text-indigo-600
                    font-black
                    text-xl
                    mt-1
                  ">
                    {selectedDonor.score}%
                  </p>
                </div>

              </div>

              {/* Contact Box */}
              <div className="
                mt-5
                rounded-2xl
                bg-green-50
                border
                border-green-200
                p-5
              ">

                <div className="
                  flex
                  items-start
                  gap-3
                ">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                  ">
                    📞
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="
                      text-green-700
                      text-sm
                      font-bold
                    ">
                      CONTACT THE DONOR
                    </p>

                    <p className="
                      text-slate-600
                      text-sm
                      mt-1
                    ">
                      Contact the donor using this number:
                    </p>

                    <a
                      href={`tel:${selectedDonor.phone}`}
                      className="
                        block
                        text-xl
                        sm:text-2xl
                        font-black
                        text-green-600
                        mt-2
                        break-all
                        hover:underline
                      "
                    >
                      {selectedDonor.phone}
                    </a>

                    {/* Mobile Call Button */}
                    <a
                      href={`tel:${selectedDonor.phone}`}
                      className="
                        inline-flex
                        sm:hidden
                        items-center
                        justify-center
                        w-full
                        h-11
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        font-bold
                        mt-4
                      "
                    >
                      📞 Call Donor
                    </a>

                  </div>

                </div>

              </div>

              {/* Important Note */}
              <div className="
                mt-4
                p-4
                rounded-xl
                bg-amber-50
                border
                border-amber-100
              ">
                <p className="
                  text-xs
                  sm:text-sm
                  text-amber-700
                  leading-relaxed
                ">
                  Please contact the donor directly and confirm
                  their availability before arranging the donation.
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={closeModal}
                className="
                  w-full
                  h-12
                  mt-5
                  rounded-xl
                  bg-slate-900
                  hover:bg-slate-800
                  text-white
                  font-bold
                  transition
                "
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