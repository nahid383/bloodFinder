import { Routes, Route, Link } from "react-router-dom";

import Home from "../pages/Home";
import DonorList from "../components/DonorList";
import DonorRegistry from "../components/DonorRegistry";
import DonorFind from "../components/DonorFind";
import AIScoreResult from "../components/AIScoreResult";

const AppRoutes = ({
  donors,
  setDonors,
  divisions,
  bloodGroups,
  requestedBloodData,
  setRequestedBloodData,
  matchedDonorsData,
}) => {
  return (
    <Routes>

      {/* =========================================
          HOME
      ========================================= */}

      <Route
        path="/"
        element={<Home donorCount={donors.length} />}
      />

      {/* =========================================
          DONOR REGISTRATION
      ========================================= */}

      <Route
        path="/register"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <DonorRegistry
              divisions={divisions}
              bloodGroups={bloodGroups}
              donors={donors}
              setDonors={setDonors}
            />
          </div>
        }
      />

      {/* =========================================
          DONOR LIST
      ========================================= */}

      <Route
        path="/donors"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <DonorList
              divisions={divisions}
              bloodGroups={bloodGroups}
              donors={donors}
              setDonors={setDonors}
            />
          </div>
        }
      />

      {/* =========================================
          FIND DONOR
      ========================================= */}

      <Route
        path="/find"
        element={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

            <div className="space-y-6 sm:space-y-8">

              {/* Search Form */}

              <DonorFind
                bloodGroups={bloodGroups}
                divisions={divisions}
                requestedBloodData={requestedBloodData}
                setRequestedBloodData={setRequestedBloodData}
              />

              {/* Results */}

              <div id="donor-results">
                <AIScoreResult
                  matchedDonorsData={matchedDonorsData}
                />
              </div>

            </div>

          </div>
        }
      />

      {/* =========================================
          404 PAGE
      ========================================= */}

      <Route
        path="*"
        element={
          <div className="min-h-[60vh] flex items-center justify-center px-4">

            <div className="text-center">

              <h1 className="text-6xl sm:text-7xl font-black text-slate-900">
                404
              </h1>

              <p className="text-slate-500 mt-3 text-lg">
                Page not found
              </p>

              <p className="text-slate-400 text-sm mt-2">
                The page you are looking for doesn't exist.
              </p>

              <Link
                to="/"
                className="
                  inline-flex
                  items-center
                  justify-center
                  mt-6
                  px-6
                  py-3
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                  transition
                  active:scale-95
                "
              >
                ← Go Home
              </Link>

            </div>

          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;